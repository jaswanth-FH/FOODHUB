import { loadJson } from "../utils/loadJson";
import { writeJson } from "../utils/writeJson";
import { Client } from "../types/client";
import * as Constants from "../types/constants";
import { ClientSchema } from "../types/schemas";
import { z } from "zod";

const FILE = "clients.json";

const ClientsSchema = z.array(ClientSchema);


const validateClients = (data: unknown): Client[] => {
  return ClientsSchema.parse(data);
};

function read(): Client[] {
  const data = loadJson<Client[]>(FILE);
  return validateClients(data);
}

function write(data: Client[]) {
  validateClients(data);
  writeJson(FILE, data);
}


export function getAllClients(): Client[] {
  return read();
}

export function getClientById(id: string): Client | undefined {
  return read().find(c => c.id === id);
}

export function createClient(client: Client): Client {
  const clients = read();
  client = ClientSchema.parse(client);
  clients.push(client);
  write(clients);
  return client;
}

export function updateClient(id: string, updated: Partial<Client>): Client {
  const clients = read();
  const index = clients.findIndex(c => c.id === id);

  if (index === -1) {
    throw new Error("Client not found");
  }

  const newClient = ClientSchema.parse({
    ...clients[index],
    ...updated,
    meta: {
      ...clients[index].meta,
      updatedAt: new Date().toISOString()
    }
  });

  clients[index] = newClient;
  write(clients);
  return clients[index];
}

export function deleteClient(id: string): void {
  const clients = read();
  const filtered = clients.filter(c => c.id !== id);

  if (filtered.length === clients.length) {
    throw new Error("Client not found");
  }

  write(filtered);
}


export function getClientFunctions(id: string) {
  const client = getClientById(id);
  if (!client) throw new Error("Client not found");
  return client.functions;
}

export function updateClientFunctions(id: string, functions: Constants.FunctionsEnum[]) {
  return updateClient(id, { functions });
}

export function getClientFeatures(id: string) {
  const client = getClientById(id);
  if (!client) throw new Error("Client not found");
  return client.features;
}

export function updateClientFeatures(id: string, features: Constants.FeatureKeyEnum[]) {
  return updateClient(id, { features });
}

export function getClientDevices(id: string) {
  const client = getClientById(id);
  if (!client) throw new Error("Client not found");
  return client.devices;
}

export function updateClientDevices(id: string, devices: any[]) {
  return updateClient(id, { devices });
}

export function updateClientStatus(id: string, status: Constants.StatusEnum) {
  return updateClient(id, { status });
}
