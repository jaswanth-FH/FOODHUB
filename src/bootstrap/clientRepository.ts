import { loadJson } from "../utils/loadJson";
import { writeJson } from "../utils/writeJson";
import { Client } from "../types/client";
import { Status } from "../types/constants";
const FILE = "clients.json";

function read(): Client[] {
  return loadJson<Client[]>(FILE);
}

function write(data: Client[]) {
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

  clients[index] = {
    ...clients[index],
    ...updated,
    meta: {
      ...clients[index].meta,
      updatedAt: new Date().toISOString()
    }
  };

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


export function getClientApis(id: string) {
  const client = getClientById(id);
  if (!client) throw new Error("Client not found");
  return client.apis;
}

export function updateClientApis(id: string, apis: any[]) {
  return updateClient(id, { apis });
}

export function getClientFeatures(id: string) {
  const client = getClientById(id);
  if (!client) throw new Error("Client not found");
  return client.features;
}

export function updateClientFeatures(id: string, features: any[]) {
  return updateClient(id, { features });
}

export function getClientCapabilities(id: string) {
  const client = getClientById(id);
  if (!client) throw new Error("Client not found");
  return client.capabilities;
}

export function updateClientCapabilities(id: string, capabilities: any) {
  return updateClient(id, { capabilities });
}

export function getClientDevices(id: string) {
  const client = getClientById(id);
  if (!client) throw new Error("Client not found");
  return client.devices;
}

export function updateClientDevices(id: string, devices: any[]) {
  return updateClient(id, { devices });
}

export function updateClientStatus(id: string, status: Status) {
  return updateClient(id, { status });
}
