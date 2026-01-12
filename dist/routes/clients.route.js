"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../types/constants");
const apiResponses_1 = require("../utils/apiResponses");
const clientRepository_1 = require("../bootstrap/clientRepository");
const router = (0, express_1.Router)();
router.get(constants_1.ROUTES.CLIENTS, (req, res) => {
    res.json((0, apiResponses_1.apiResponse)((0, clientRepository_1.getAllClients)(), "Clients loaded"));
});
router.get(`${constants_1.ROUTES.CLIENTS}/:id`, (req, res) => {
    const client = (0, clientRepository_1.getClientById)(req.params.id);
    if (!client)
        throw new Error("Client not found");
    res.json((0, apiResponses_1.apiResponse)(client, "Client loaded"));
});
router.post(constants_1.ROUTES.CLIENTS, (req, res) => {
    const client = (0, clientRepository_1.createClient)(req.body);
    res.json((0, apiResponses_1.apiResponse)(client, "Client created"));
});
router.put(`${constants_1.ROUTES.CLIENTS}/:id`, (req, res) => {
    const client = (0, clientRepository_1.updateClient)(req.params.id, req.body);
    res.json((0, apiResponses_1.apiResponse)(client, "Client updated"));
});
router.delete(`${constants_1.ROUTES.CLIENTS}/:id`, (req, res) => {
    (0, clientRepository_1.deleteClient)(req.params.id);
    res.json((0, apiResponses_1.apiResponse)(null, "Client deleted"));
});
router.get(`${constants_1.ROUTES.CLIENTS}/:id/functions`, (req, res) => {
    res.json((0, apiResponses_1.apiResponse)((0, clientRepository_1.getClientFunctions)(req.params.id), "Client Functions loaded"));
});
router.put(`${constants_1.ROUTES.CLIENTS}/:id/functions`, (req, res) => {
    const updated = (0, clientRepository_1.updateClientFunctions)(req.params.id, req.body);
    res.json((0, apiResponses_1.apiResponse)(updated, "Client Functions updated"));
});
router.get(`${constants_1.ROUTES.CLIENTS}/:id/features`, (req, res) => {
    res.json((0, apiResponses_1.apiResponse)((0, clientRepository_1.getClientFeatures)(req.params.id), "Client features loaded"));
});
router.put(`${constants_1.ROUTES.CLIENTS}/:id/features`, (req, res) => {
    const updated = (0, clientRepository_1.updateClientFeatures)(req.params.id, req.body);
    res.json((0, apiResponses_1.apiResponse)(updated, "Client features updated"));
});
router.get(`${constants_1.ROUTES.CLIENTS}/:id/devices`, (req, res) => {
    res.json((0, apiResponses_1.apiResponse)((0, clientRepository_1.getClientDevices)(req.params.id), "Client devices loaded"));
});
router.put(`${constants_1.ROUTES.CLIENTS}/:id/devices`, (req, res) => {
    const updated = (0, clientRepository_1.updateClientDevices)(req.params.id, req.body);
    res.json((0, apiResponses_1.apiResponse)(updated, "Client devices updated"));
});
router.patch(`${constants_1.ROUTES.CLIENTS}/:id/status`, (req, res) => {
    const updated = (0, clientRepository_1.updateClientStatus)(req.params.id, req.body.status);
    res.json((0, apiResponses_1.apiResponse)(updated, "Client status updated"));
});
exports.default = router;
