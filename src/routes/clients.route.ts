import { Router } from "express";
import { ROUTES } from "../types/constants";
import { apiResponse } from "../utils/apiResponses";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientFunctions,
  updateClientFunctions,
  getClientFeatures,
  updateClientFeatures,
  getClientDevices,
  updateClientDevices,
  updateClientStatus
} from "../bootstrap/clientRepository";

const router = Router();


router.get(ROUTES.CLIENTS, (req, res) => {
  res.json(apiResponse(getAllClients(), "Clients loaded"));
});


router.get(`${ROUTES.CLIENTS}/:id`, (req, res) => {
  const client = getClientById(req.params.id);
  if (!client) throw new Error("Client not found");
  res.json(apiResponse(client, "Client loaded"));
});


router.post(ROUTES.CLIENTS, (req, res) => {
  const client = createClient(req.body);
  res.json(apiResponse(client, "Client created"));
});


router.put(`${ROUTES.CLIENTS}/:id`, (req, res) => {
  const client = updateClient(req.params.id, req.body);
  res.json(apiResponse(client, "Client updated"));
});

router.delete(`${ROUTES.CLIENTS}/:id`, (req, res) => {
  deleteClient(req.params.id);
  res.json(apiResponse(null, "Client deleted"));
});

router.get(`${ROUTES.CLIENTS}/:id/functions`, (req, res) => {
  res.json(apiResponse(getClientFunctions(req.params.id), "Client Functions loaded"));
});

router.put(`${ROUTES.CLIENTS}/:id/functions`, (req, res) => {
  const updated = updateClientFunctions(req.params.id, req.body);
  res.json(apiResponse(updated, "Client Functions updated"));
});

router.get(`${ROUTES.CLIENTS}/:id/features`, (req, res) => {
  res.json(apiResponse(getClientFeatures(req.params.id), "Client features loaded"));
});

router.put(`${ROUTES.CLIENTS}/:id/features`, (req, res) => {
  const updated = updateClientFeatures(req.params.id, req.body);
  res.json(apiResponse(updated, "Client features updated"));
});

router.get(`${ROUTES.CLIENTS}/:id/devices`, (req, res) => {
  res.json(apiResponse(getClientDevices(req.params.id), "Client devices loaded"));
});

router.put(`${ROUTES.CLIENTS}/:id/devices`, (req, res) => {
  const updated = updateClientDevices(req.params.id, req.body);
  res.json(apiResponse(updated, "Client devices updated"));
});

router.patch(`${ROUTES.CLIENTS}/:id/status`, (req, res) => {
  const updated = updateClientStatus(req.params.id, req.body.status);
  res.json(apiResponse(updated, "Client status updated"));
});


export default router;
