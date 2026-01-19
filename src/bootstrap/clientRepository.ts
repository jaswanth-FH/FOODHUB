import { Client } from "../types/client";
import * as Constants from "../types/constants";
import { CapabilitySchema, ClientSchema } from "../types/schemas";
import { ERROR_CODES } from "../types/errorCodes";
import { z } from "zod";
import { prisma } from "../utils/prisma";


/* ---------------- VALIDATION ---------------- */

const ClientsSchema = z.array(ClientSchema);

const validateClients = (data: unknown): Client[] => {
  return ClientsSchema.parse(data);
};

/* ---------------- READ ---------------- */
async function read(): Promise<Client[]> {
  const clients = await prisma.client.findMany({
    include: {
      capabilities: { include: { capability: true } },
      devices: true
    }
  });

  const mapped: Client[] = clients.map(c => ({
    id: c.id,
    type: c.type as Constants.ClientTypeEnum,
    status: c.status as Constants.StatusEnum,

    capabilities: c.capabilities.map(cc => ({
      name: cc.capability.name as Constants.FunctionsEnum | Constants.FeatureKeyEnum,
      category: cc.capability.category as "FUNCTION" | "FEATURE"
    })),

    devices: c.devices.map(d => ({
      id: d.id,
      model: d.model || "",
      ip: d.ip || "",
      status: d.status as Constants.StatusEnum
    })),

    meta: {
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString()
    }
  }));

  return validateClients(mapped);
}

/* ---------------- WRITE (SAFE UPSERT) ---------------- */

async function write(data: Client[]): Promise<void> {
  await prisma.$transaction(async tx => {

    const ids = data.map(c => c.id);


    for (const client of data) {

      await tx.client.upsert({
        where: { id: client.id },
        update: {
          type: client.type,
          status: client.status,
          updatedAt: new Date(client.meta.updatedAt)
        },
        create: {
          id: client.id,
          type: client.type,
          status: client.status,
          createdAt: new Date(client.meta.createdAt),
          updatedAt: new Date(client.meta.updatedAt)
        }
      });

      await tx.device.deleteMany({ where: { clientId: client.id } });
      await tx.clientCapability.deleteMany({ where: { clientId: client.id } });

      for (const d of client.devices) {
        await tx.device.create({
          data: {
            clientId: client.id,
            model: d.model,
            ip: d.ip,
            status: d.status
          }
        });
      }

      for (const cap of client.capabilities) {
        const c = await tx.capability.upsert({
          where: { name: cap.name },
          update: {},
          create: {
            name: cap.name,
            category: cap.category
          }
        });

        await tx.clientCapability.create({
          data: {
            clientId: client.id,
            capabilityId: c.id
          }
        });
      }
    }
  });
}

/* ---------------- PUBLIC API ---------------- */

export async function getAllClients() {
  return read();
}

export async function getClientById(id: string) {
  const list = await read();
  return list.find(c => c.id === id);
}

export async function createClient(client: Client) {
  const validated = ClientSchema.parse(client);

  const list = await read();

  if (list.some(c => c.id === validated.id)) {
    throw {
      code: ERROR_CODES.CLIENT_ALREADY_EXISTS,
      message: "Client already exists"
    };
  }

  list.push(validated);
  await write(list);

  return validated;
}

export async function updateClient(id: string, updated: Partial<Client>) {
  const list = await read();
  const index = list.findIndex(c => c.id === id);

  if (index === -1) {
    throw {
      code: ERROR_CODES.CLIENT_NOT_FOUND,
      message: "Client not found"
    };
  }

  const merged = ClientSchema.parse({
    ...list[index],
    ...updated,
    meta: {
      ...list[index].meta,
      updatedAt: new Date().toISOString()
    }
  });

  list[index] = merged;
  await write(list);

  return merged;
}
export async function deleteClient(id: string) {
  await prisma.$transaction(async tx => {

    await tx.clientCapability.deleteMany({
      where: { clientId: id }
    });

    await tx.device.deleteMany({
      where: { clientId: id }
    });

    const deleted = await tx.client.deleteMany({
      where: { id }
    });

    if (deleted.count === 0) {
      throw {
        code: ERROR_CODES.CLIENT_NOT_FOUND,
        message: "Client not found"
      };
    }
  });
}

/* ---------------- DERIVED ---------------- */

export async function getClientFunctions(id: string) {
  const c = await getClientById(id);
  if (!c) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };
  return c.capabilities
    .filter(x => x.category === "FUNCTION")
    .map(x => x.name);
}

export async function getClientFeatures(id: string) {
  const c = await getClientById(id);
  if (!c) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };
  return c.capabilities
    .filter(x => x.category === "FEATURE")
    .map(x => x.name);
}

export async function getClientDevices(id: string) {
  const c = await getClientById(id);
  if (!c) {
    throw {
      code: ERROR_CODES.CLIENT_NOT_FOUND,
      message: "Client not found"
    };
  }
  return c.devices;
}

export async function updateClientFunctions(
  id: string,
  functions: Constants.FunctionsEnum[]
) {
  const c = await getClientById(id);
  if (!c) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };

  return updateClient(id, {
    capabilities: [
      ...c.capabilities.filter(x => x.category !== "FUNCTION"),
      ...functions.map(f => ({ name: f, category: "FUNCTION" as const }))
    ]
  });
}

export async function updateClientFeatures(
  id: string,
  features: Constants.FeatureKeyEnum[]
) {
  const c = await getClientById(id);
  if (!c) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };

  return updateClient(id, {
    capabilities: [
      ...c.capabilities.filter(x => x.category !== "FEATURE"),
      ...features.map(f => ({ name: f, category: "FEATURE" as const }))
    ]
  });
}

export async function updateClientDevices(id: string, devices: any[]) {
  return updateClient(id, { devices });
}

export async function updateClientStatus(id: string, status: Constants.StatusEnum) {
  return updateClient(id, { status });
}
