"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionsForClient = getFunctionsForClient;
const clients_data_1 = require("../data/clients.data");
let clients = [...clients_data_1.CLIENTS];
async function getFunctionsForClient(clientType) {
    const client = clients.find(c => c.type === clientType);
    return client ? client.functions : [];
}
