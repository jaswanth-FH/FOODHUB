import { Client } from "../types/client";
import * as Constants from "../types/constants";
import { normalizeEnum } from "../utils/normalizeEnum";
import { ClientSchema } from "../types/schemas";
import { ERROR_CODES } from "../types/errorCodes";
import { z } from "zod";
import { prisma } from "../utils/prisma";

const ClientsSchema = z.array(ClientSchema);

const validateClients = (data: unknown): Client[] => {
  return ClientsSchema.parse(data);
};
async function read(): Promise<Client[]> {
  const clients = await prisma.client.findMany({
    include: {
      capabilities: {
        include: { capability: true }
      },
      devices: true
    }
  });

  const mapped = clients.map(client => ({
    id: client.id,
    type: client.type as Constants.ClientTypeEnum,
    status: client.status as Constants.StatusEnum,

    capabilities: client.capabilities.map(c => ({
      name: c.capability.name,
      category: c.capability.category
    })),

    devices: client.devices.map(d => ({
      id: d.id,
      model: d.model || "",
      ip: d.ip || "",
      status: d.status || ""
    })),

    meta: {
      createdAt: client.createdAt.toISOString(),
      updatedAt: client.updatedAt.toISOString()
    }
  }));

  return validateClients(mapped);
}

async function write(data: Client[]): Promise<void> {
  await prisma.$transaction(async tx => {

    for (const client of data) {
      await tx.client.create({
        data: {
          id: client.id,
          type: client.type,
          status: client.status,
          createdAt: new Date(client.meta.createdAt),
          updatedAt: new Date(client.meta.updatedAt)
        }
      });

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
    create: { name: cap.name, category: cap.category }
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


export async function getAllClients(): Promise<Client[]> {
  return await read();
}

export async function getClientById(id: string): Promise<Client | undefined> {
  const list = await read();
  return list.find(c => c.id === id);
}

export async function createClient(client: Client): Promise<Client> {
  const validated = ClientSchema.parse(client);

  const list = await read();

  if (list.find(c => c.id === validated.id)) {
    throw {
      code: ERROR_CODES.CLIENT_ALREADY_EXISTS,
      message: "Client already exists"
    };
  }

  list.push(validated);
  await write(list);

  return validated;
}

export async function updateClient(id: string, updated: Partial<Client>): Promise<Client> {
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




export async function deleteClient(id: string): Promise<void> {
  const list = await read();
  const filtered = list.filter(c => c.id !== id);

  if (filtered.length === list.length) {
    throw {
      code: ERROR_CODES.CLIENT_NOT_FOUND,
      message: "Client not found"
    };
  }

  await write(filtered);
}

export async function getClientFunctions(id: string) {
  const client = await getClientById(id);
  if (!client) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };
  return extractFunctions(client);
}

export async function getClientFeatures(id: string) {
  const client = await getClientById(id);
  if (!client) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };
  return extractFeatures(client);
}


export async function updateClientFunctions(
  id: string,
  functions: Constants.FunctionsEnum[]
): Promise<Client> {
  const client = await getClientById(id);
  if (!client) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };

  const newCaps = [
    ...client.capabilities.filter(c => c.category !== "FUNCTION"),
    ...functions.map(f => ({ name: f, category: "FUNCTION" as const }))
  ];

  return await updateClient(id, { capabilities: newCaps });
}

export async function updateClientFeatures(
  id: string,
  features: Constants.FeatureKeyEnum[]
): Promise<Client> {
  const client = await getClientById(id);
  if (!client) throw { code: ERROR_CODES.CLIENT_NOT_FOUND };

  const newCaps = [
    ...client.capabilities.filter(c => c.category !== "FEATURE"),
    ...features.map(f => ({ name: f, category: "FEATURE" as const }))
  ];

  return await updateClient(id, { capabilities: newCaps });
}

export async function getClientDevices(id: string): Promise<any[]> {
  const client = await getClientById(id);
  if (!client) throw {
    code: ERROR_CODES.CLIENT_NOT_FOUND,
    message: "Client not found"
  };
  return client.devices;
}

export async function updateClientDevices(id: string, devices: any[]): Promise<Client> {
  return await updateClient(id, { devices });
}

export async function updateClientStatus(id: string, status: Constants.StatusEnum): Promise<Client> {
  return await updateClient(id, { status });
}

function extractFunctions(client: Client): Constants.FunctionsEnum[] {
  return client.capabilities
    .filter(c => c.category === "FUNCTION")
    .map(c => c.name as Constants.FunctionsEnum);
}

function extractFeatures(client: Client): Constants.FeatureKeyEnum[] {
  return client.capabilities
    .filter(c => c.category === "FEATURE")
    .map(c => c.name as Constants.FeatureKeyEnum);
}

