import { CLIENTS } from "../data/clients.data";
import { Client } from "../types/client";
import * as Constants from "../types/constants";
import { ClientSchema } from "../types/schemas";
import { ERROR_CODES } from "../types/errorCodes";
import { z } from "zod";


let clients: Client[] = [...CLIENTS];


const ClientsSchema = z.array(ClientSchema);


const validateClients = (data: unknown): Client[] => {
  return ClientsSchema.parse(data);
};

async function read(): Promise<Client[]> {
  return validateClients(clients);
}

async function write(data: Client[]): Promise<void> {
  clients = validateClients(data);
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

  const newClient = ClientSchema.parse({
    ...list[index],
    ...updated,
    meta: {
      ...list[index].meta,
      updatedAt: new Date().toISOString()
    }
  });

  list[index] = newClient;
  await write(list);
  return newClient;
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

export async function getClientFunctions(id: string): Promise<Constants.FunctionsEnum[]> {
  const client = await getClientById(id);
  if (!client) throw {
    code: ERROR_CODES.CLIENT_NOT_FOUND,
    message: "Client not found"
  };
  return client.functions;
}

export async function updateClientFunctions(id: string, functions: Constants.FunctionsEnum[]): Promise<Client> {
  return await updateClient(id, { functions });
}

export async function getClientFeatures(id: string): Promise<Constants.FeatureKeyEnum[]> {
  const client = await getClientById(id);
  if (!client) throw {
    code: ERROR_CODES.CLIENT_NOT_FOUND,
    message: "Client not found"
  };
  return client.features;
}

export async function updateClientFeatures(id: string, features: Constants.FeatureKeyEnum[]): Promise<Client> {
  return await updateClient(id, { features });
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
