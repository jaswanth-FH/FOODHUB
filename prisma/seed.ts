import { prisma, CapabilityCategory } from "../src/utils/prisma";
import { CLIENTS } from "../src/data/clients.data";

async function main() {
  console.log("Seeding database...\n");

  await prisma.$transaction(async tx => {

    for (const client of CLIENTS) {

      /* ---------------- CLIENT ---------------- */

      const dbClient = await tx.client.upsert({
        where: { name: client.name },
        update: {
          type: client.type,
          status: client.status
        },
        create: {
          name: client.name,
          type: client.type,
          status: client.status
        }
      });

      const clientId = dbClient.id;

      /* ---------------- DEVICES ---------------- */

      await tx.device.deleteMany({
        where: { clientId }
      });

      for (const d of client.devices) {
        await tx.device.create({
          data: {
            ip: d.ip,
            model: d.model,
            status: d.status,
            clientId
          }
        });
      }

      /* ---------------- CAPABILITIES ---------------- */

      // clear old relations first
      await tx.clientCapability.deleteMany({
        where: { clientId }
      });

      for (const cap of client.capabilities) {

        const category =
          cap.category.toUpperCase() as CapabilityCategory;

        const capability = await tx.capability.upsert({
          where: { name: String(cap.name) },
          update: { category },
          create: {
            name: String(cap.name),
            category
          }
        });

        await tx.clientCapability.create({
          data: {
            clientId,
            capabilityId: capability.id
          }
        });
      }

      console.log(`✔ Seeded ${client.name}`);
    }

  });

  console.log("\nDatabase seeded successfully ✅");
}

main()
  .catch(e => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
