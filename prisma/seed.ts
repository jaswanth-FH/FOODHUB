import { prisma } from "../src/utils/prisma";
import { CLIENTS } from "../src/data/clients.data";

async function main() {
  console.log("Seeding the database...");

  for (const client of CLIENTS) {

    // -------------------------
    // CLIENT
    // -------------------------
    await prisma.client.upsert({
      where: { id: client.id },
      update: {
        type: client.type,
        status: client.status,
        updatedAt: new Date()
      },
      create: {
        id: client.id,
        type: client.type,
        status: client.status,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // -------------------------
    // DEVICES
    // -------------------------
    await prisma.device.deleteMany({
      where: { clientId: client.id }
    });

    for (const d of client.devices) {
      await prisma.device.create({
        data: {
          ip: d.ip,
          model: d.model,
          status: d.status,
          clientId: client.id
        }
      });
    }

    // -------------------------
    // CAPABILITIES
    // -------------------------
    for (const cap of client.capabilities) {
      const capability = await prisma.capability.upsert({
        where: { name: String(cap.name) },
        update: {},
        create: {
          name: String(cap.name),
          category: cap.category.toUpperCase()
        }
      });

      await prisma.clientCapability.upsert({
        where: {
          clientId_capabilityId: {
            clientId: client.id,
            capabilityId: capability.id
          }
        },
        update: {},
        create: {
          clientId: client.id,
          capabilityId: capability.id
        }
      });
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
