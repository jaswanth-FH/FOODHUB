import { prisma } from "../src/utils/prisma";
import { CLIENTS } from "../src/data/clients.data";

async function main() {
  console.log("Seeding the database...");
  
  for (const client of CLIENTS) {
    await prisma.client.upsert({
      where: { id: client.id },
      update: {
        type: client.type,
        status: client.status,
        updatedAt: new Date(client.meta.updatedAt),
        devices: {
          deleteMany: {},
          create: client.devices.map(d => ({
            deviceId: d.id,
            ip: d.ip,
            model: d.model,
            status: d.status
          }))
        },
        capabilities: {
          deleteMany: {},
          create: client.functions.map(f => ({
            capability: {
              connectOrCreate: {
                where: { name: String(f) },
                create: { name: String(f), category: "FUNCTION" }
              }
            }
          }))
        }
      },
      create: {
        id: client.id,
        type: client.type,
        status: client.status,
        createdAt: new Date(client.meta.createdAt),
        updatedAt: new Date(client.meta.updatedAt),
        devices: {
          create: client.devices.map(d => ({
            deviceId: d.id,
            ip: d.ip,
            model: d.model,
            status: d.status
          }))
        },
        capabilities: {
          create: client.functions.map(f => ({
            capability: {
              connectOrCreate: {
                where: { name: String(f) },
                create: { name: String(f), category: "FUNCTION" }
              }
            }
          }))
        }
      }
    });
  }
  
  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });