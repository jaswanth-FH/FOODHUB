import { Client } from "../types/client";
import * as Constants from "../types/constants";
import { ClientSchema , ClientCreateSchema } from "../types/schemas";
import { ERROR_CODES } from "../types/errorCodes";

import { prisma } from "../utils/prisma";

/* ---------------- MAPPER ---------------- */

function mapClient(c: any): Client {
  return ClientSchema.parse({
    id: c.id,
    name: c.name,
    type: c.type,
    status: c.status,
    capabilities: c.capabilities.map((cc: any) => ({
      name: cc.capability.name,
      category: cc.capability.category
    })),
    devices: c.devices.map((d: any) => ({
      id: d.id,
      model: d.model,
      ip: d.ip,
      status: d.status
    })),
    meta: {
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString()
    }
  });
}

/* ---------------- READ ---------------- */

export async function getAllClients(): Promise<Client[]> {
  const clients = await prisma.client.findMany({
    include: {
      capabilities: { include: { capability: true } },
      devices: true
    }
  });

  return clients.map(mapClient);
}

export async function getClientByName(name: string): Promise<Client | undefined> {
  const c = await prisma.client.findUnique({
    where: { name },
    include: {
      capabilities: { include: { capability: true } },
      devices: true
    }
  });

  if (!c) return undefined;
  return mapClient(c);
}


export async function getClientByID(id: number): Promise<Client | undefined> {
  const c = await prisma.client.findUnique({
    where: { id },
    include: {
      capabilities: { include: { capability: true } },
      devices: true
    }
  });

  if (!c) return undefined;
  return mapClient(c);
}


/* ---------------- CREATE ---------------- */
export async function createClient(client: unknown) {
  const validated = ClientCreateSchema.parse(client);

  return prisma.$transaction(async tx => {

    const exists = await tx.client.findUnique({
      where: { name: validated.name }
    });

    if (exists) {
      throw {
        code: ERROR_CODES.CLIENT_ALREADY_EXISTS,
        message: "Client already exists"
      };
    }

    const created = await tx.client.create({
      data: {
        name: validated.name,
        type: validated.type,
        status: validated.status
      }
    });

    for (const d of validated.devices) {
      await tx.device.create({
        data: {
          clientId: created.id,
          ip: d.ip,
          model: d.model,
          status: d.status
        }
      });
    }

    for (const cap of validated.capabilities) {
      const capability = await tx.capability.upsert({
        where: { name: cap.name },
        update: {},
        create: {
          name: cap.name,
          category: cap.category
        }
      });

      await tx.clientCapability.upsert({
        where: {
          clientId_capabilityId: {
            clientId: created.id,
            capabilityId: capability.id
          }
        },
        update: {},
        create: {
          clientId: created.id,
          capabilityId: capability.id
        }
      });
    }

    const full = await tx.client.findUnique({
  where: { id: created.id },
  include: {
    capabilities: { include: { capability: true } },
    devices: true
  }
});

return mapClient(full);
  });
}

export async function updateClient(name: string, updated: Partial<Client>) {
  const existing = await prisma.client.findUnique({
    where: { name }
  });

  if (!existing) {
    throw {
      code: ERROR_CODES.CLIENT_NOT_FOUND,
      message: "Client not found"
    };
  }

  await prisma.client.update({
    where: { name },
    data: {
      type: updated.type,
      status: updated.status
    }
  });

  if (updated.devices) {
    await prisma.device.deleteMany({ where: { clientId: existing.id } });

    for (const d of updated.devices) {
      await prisma.device.create({
        data: {
          clientId: existing.id,
          ip: d.ip,
          model: d.model,
          status: d.status
        }
      });
    }
  }

  if (updated.capabilities) {
    await prisma.clientCapability.deleteMany({
      where: { clientId: existing.id }
    });

    for (const cap of updated.capabilities) {
      const capability = await prisma.capability.upsert({
        where: { name: cap.name },
        update: {},
        create: {
          name: cap.name,
          category: cap.category
        }
      });

      await prisma.clientCapability.create({
        data: {
          clientId: existing.id,
          capabilityId: capability.id
        }
      });
    }
  }

  return getClientByName(name);
}



export async function deleteClient(name: string) {
  const c = await prisma.client.findUnique({ where: { name } });

  if (!c) {
    throw {
      code: ERROR_CODES.CLIENT_NOT_FOUND,
      message: "Client not found"
    };
  }

  await prisma.clientCapability.deleteMany({
    where: { clientId: c.id }
  });

  await prisma.device.deleteMany({
    where: { clientId: c.id }
  });

  await prisma.client.delete({
    where: { name }
  });
}



export async function getClientFunctions(name: string) {
  const c = await getClientByName(name);
  if (!c) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };

  return c.capabilities
    .filter(x => x.category === "FUNCTION")
    .map(x => x.name);
}

export async function getClientFeatures(name: string) {
  const c = await getClientByName(name);
  if (!c) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };

  return c.capabilities
    .filter(x => x.category === "FEATURE")
    .map(x => x.name);
}

export async function getClientDevices(name: string) {
  const c = await getClientByName(name);
  if (!c) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };

  return c.devices;
}

export async function updateClientFunctions(
  name: string,
  functions: Constants.FunctionsEnum[]
) {
  const c = await getClientByName(name);
  if (!c) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };

  return updateClient(name, {
    capabilities: [
      ...c.capabilities.filter(x => x.category !== "FUNCTION"),
      ...functions.map(f => ({ name: f, category: "FUNCTION" as const }))
    ]
  });
}

export async function updateClientFeatures(
  name: string,
  features: Constants.FeatureKeyEnum[]
) {
  const c = await getClientByName(name);
  if (!c) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };

  return updateClient(name, {
    capabilities: [
      ...c.capabilities.filter(x => x.category !== "FEATURE"),
      ...features.map(f => ({ name: f, category: "FEATURE" as const }))
    ]
  });
}

export async function updateClientStatus(name: string, status: Constants.StatusEnum) {
  return updateClient(name, { status });
}
