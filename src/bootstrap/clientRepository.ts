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

function read(): Client[] {
  return validateClients(clients);
}

function write(data: Client[]) {
  clients = validateClients(data);
}

export function getAllClients(): Client[] {
  return read();
}

export function getClientById(id: string): Client | undefined {
  return read().find(c => c.id === id);
}

export function createClient(client: Client): Client {
  const validated = ClientSchema.parse(client);

  const list = read();

  if (list.find(c => c.id === validated.id)) {
    throw {
      code: ERROR_CODES.CLIENT_ALREADY_EXISTS,
      message: "Client already exists"
    };
  }

  list.push(validated);
  write(list);

  return validated;
}

export function updateClient(id: string, updated: Partial<Client>): Client {
  const list = read();
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
  write(list);

  return newClient;
}

export function deleteClient(id: string): void {
  const list = read();
  const filtered = list.filter(c => c.id !== id);

  if (filtered.length === list.length) {
    throw {
      code: ERROR_CODES.CLIENT_NOT_FOUND,
      message: "Client not found"
    };
  }

  write(filtered);
}


export function getClientFunctions(id: string) {
  const client = getClientById(id);
  if (!client) throw {
    code: ERROR_CODES.CLIENT_NOT_FOUND,
    message: "Client not found"
  };
  return client.functions;
}

export function updateClientFunctions(id: string, functions: Constants.FunctionsEnum[]) {
  return updateClient(id, { functions });
}

export function getClientFeatures(id: string) {
  const client = getClientById(id);
  if (!client) throw {
    code: ERROR_CODES.CLIENT_NOT_FOUND,
    message: "Client not found"
  };
  return client.features;
}

export function updateClientFeatures(id: string, features: Constants.FeatureKeyEnum[]) {
  return updateClient(id, { features });
}

export function getClientDevices(id: string) {
  const client = getClientById(id);
  if (!client) throw {
    code: ERROR_CODES.CLIENT_NOT_FOUND,
    message: "Client not found"
  };
  return client.devices;
}

export function updateClientDevices(id: string, devices: any[]) {
  return updateClient(id, { devices });
}

export function updateClientStatus(id: string, status: Constants.StatusEnum) {
  return updateClient(id, { status });
}
