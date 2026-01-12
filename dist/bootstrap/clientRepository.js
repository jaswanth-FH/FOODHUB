"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClients = getAllClients;
exports.getClientById = getClientById;
exports.createClient = createClient;
exports.updateClient = updateClient;
exports.deleteClient = deleteClient;
exports.getClientFunctions = getClientFunctions;
exports.updateClientFunctions = updateClientFunctions;
exports.getClientFeatures = getClientFeatures;
exports.updateClientFeatures = updateClientFeatures;
exports.getClientDevices = getClientDevices;
exports.updateClientDevices = updateClientDevices;
exports.updateClientStatus = updateClientStatus;
const clients_data_1 = require("../data/clients.data");
const Constants = __importStar(require("../types/constants"));
const normalizeEnum_1 = require("../utils/normalizeEnum");
const schemas_1 = require("../types/schemas");
const errorCodes_1 = require("../types/errorCodes");
const zod_1 = require("zod");
let clients = [...clients_data_1.CLIENTS];
const ClientsSchema = zod_1.z.array(schemas_1.ClientSchema);
const validateClients = (data) => {
    return ClientsSchema.parse(data);
};
async function read() {
    return validateClients(clients);
}
async function write(data) {
    clients = validateClients(data);
}
async function getAllClients() {
    return await read();
}
async function getClientById(id) {
    const list = await read();
    return list.find(c => c.id === id);
}
async function createClient(client) {
    const normalized = {
        ...client,
        type: (0, normalizeEnum_1.normalizeEnum)(Constants.ClientTypeEnum, client.type, Constants.ClientTypeEnum.WEB),
        status: (0, normalizeEnum_1.normalizeEnum)(Constants.StatusEnum, client.status, Constants.StatusEnum.ACTIVE),
        functions: Array.isArray(client.functions)
            ? client.functions.map(f => (0, normalizeEnum_1.normalizeEnum)(Constants.FunctionsEnum, f))
            : [],
        features: Array.isArray(client.features)
            ? client.features.map(f => (0, normalizeEnum_1.normalizeEnum)(Constants.FeatureKeyEnum, f))
            : [],
        devices: Array.isArray(client.devices) ? client.devices : [],
        meta: client.meta
    };
    const validated = schemas_1.ClientSchema.parse(normalized);
    const list = await read();
    if (list.find(c => c.id === validated.id)) {
        throw {
            code: errorCodes_1.ERROR_CODES.CLIENT_ALREADY_EXISTS,
            message: "Client already exists"
        };
    }
    list.push(validated);
    await write(list);
    return validated;
}
async function updateClient(id, updated) {
    const list = await read();
    const index = list.findIndex(c => c.id === id);
    if (index === -1) {
        throw {
            code: errorCodes_1.ERROR_CODES.CLIENT_NOT_FOUND,
            message: "Client not found"
        };
    }
    const current = list[index];
    const normalized = {
        type: updated.type !== undefined
            ? (0, normalizeEnum_1.normalizeEnum)(Constants.ClientTypeEnum, updated.type)
            : current.type,
        status: updated.status !== undefined
            ? (0, normalizeEnum_1.normalizeEnum)(Constants.StatusEnum, updated.status)
            : current.status,
        functions: updated.functions !== undefined
            ? updated.functions.map(f => (0, normalizeEnum_1.normalizeEnum)(Constants.FunctionsEnum, f))
            : current.functions,
        features: updated.features !== undefined
            ? updated.features.map(f => (0, normalizeEnum_1.normalizeEnum)(Constants.FeatureKeyEnum, f))
            : current.features,
        devices: updated.devices !== undefined
            ? updated.devices
            : current.devices
    };
    const newClient = schemas_1.ClientSchema.parse({
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
async function deleteClient(id) {
    const list = await read();
    const filtered = list.filter(c => c.id !== id);
    if (filtered.length === list.length) {
        throw {
            code: errorCodes_1.ERROR_CODES.CLIENT_NOT_FOUND,
            message: "Client not found"
        };
    }
    await write(filtered);
}
async function getClientFunctions(id) {
    const client = await getClientById(id);
    if (!client)
        throw {
            code: errorCodes_1.ERROR_CODES.CLIENT_NOT_FOUND,
            message: "Client not found"
        };
    return client.functions;
}
async function updateClientFunctions(id, functions) {
    return await updateClient(id, { functions });
}
async function getClientFeatures(id) {
    const client = await getClientById(id);
    if (!client)
        throw {
            code: errorCodes_1.ERROR_CODES.CLIENT_NOT_FOUND,
            message: "Client not found"
        };
    return client.features;
}
async function updateClientFeatures(id, features) {
    return await updateClient(id, { features });
}
async function getClientDevices(id) {
    const client = await getClientById(id);
    if (!client)
        throw {
            code: errorCodes_1.ERROR_CODES.CLIENT_NOT_FOUND,
            message: "Client not found"
        };
    return client.devices;
}
async function updateClientDevices(id, devices) {
    return await updateClient(id, { devices });
}
async function updateClientStatus(id, status) {
    return await updateClient(id, { status });
}
