import { loadJson } from "../utils/loadJson";
import { Client } from "../types/client";

const clients = loadJson<Client[]>("clients.json");

export function getAllClients(): Client[] {
  return clients;
}

export function getClientById(id: string): Client | undefined {
  return clients.find(c => c.id === id);
}
