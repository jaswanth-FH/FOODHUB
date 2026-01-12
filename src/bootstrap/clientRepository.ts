import { CLIENTS } from "../data/clients.data";
import { Client } from "../types/client";
import * as Constants from "../types/constants";
import { normalizeEnum } from "../utils/normalizeEnum";
import { ClientSchema } from "../types/schemas";
import { ERROR_CODES } from "../types/errorCodes";
import { z } from "zod";


let clients : Client[] = [...CLIENTS];


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
  const normalized: Client = {
    ...client,

    type: normalizeEnum(Constants.ClientTypeEnum, client.type, Constants.ClientTypeEnum.WEB),

    status: normalizeEnum(Constants.StatusEnum, client.status, Constants.StatusEnum.ACTIVE),

    functions: Array.isArray(client.functions)
      ? client.functions.map(f =>
          normalizeEnum(Constants.FunctionsEnum, f)
        )
      : [],

    features: Array.isArray(client.features)
      ? client.features.map(f =>
          normalizeEnum(Constants.FeatureKeyEnum, f)
        )
      : [],

    devices: Array.isArray(client.devices) ? client.devices : [],

    meta: client.meta
  };

  const validated = ClientSchema.parse(normalized);

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

  const current = list[index];

  const normalized: Partial<Client> = {
    type: updated.type !== undefined
      ? normalizeEnum(Constants.ClientTypeEnum, updated.type)
      : current.type,

    status: updated.status !== undefined
      ? normalizeEnum(Constants.StatusEnum, updated.status)
      : current.status,

    functions: updated.functions !== undefined
      ? updated.functions.map(f =>
          normalizeEnum(Constants.FunctionsEnum, f)
        )
      : current.functions,

    features: updated.features !== undefined
      ? updated.features.map(f =>
          normalizeEnum(Constants.FeatureKeyEnum, f)
        )
      : current.features,

    devices: updated.devices !== undefined
      ? updated.devices
      : current.devices
  };

  const newClient = ClientSchema.parse({
    ...current,
    ...normalized,
    meta: {
      ...current.meta,
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
