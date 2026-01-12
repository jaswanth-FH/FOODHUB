import { Router } from "express";
import { apiResponse } from "../utils/apiResponses";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientApis,
  updateClientApis,
  getClientFeatures,
  updateClientFeatures,
  getClientCapabilities,
  updateClientCapabilities,
  getClientDevices,
  updateClientDevices,
  updateClientStatus
} from "../bootstrap/clientRepository";

const router = Router();


router.get("/clients", (req, res) => {
  res.json(apiResponse(getAllClients(), "Clients loaded"));
});


router.get("/clients/:id", (req, res) => {
  const client = getClientById(req.params.id);
  if (!client) throw new Error("Client not found");
  res.json(apiResponse(client, "Client loaded"));
});


router.post("/clients", (req, res) => {
  const client = createClient(req.body);
  res.json(apiResponse(client, "Client created"));
});


router.put("/clients/:id", (req, res) => {
  const client = updateClient(req.params.id, req.body);
  res.json(apiResponse(client, "Client updated"));
});

router.delete("/clients/:id", (req, res) => {
  deleteClient(req.params.id);
  res.json(apiResponse(null, "Client deleted"));
});

router.get("/clients/:id/apis", (req, res) => {
  res.json(apiResponse(getClientApis(req.params.id), "Client APIs loaded"));
});

router.put("/clients/:id/apis", (req, res) => {
  const updated = updateClientApis(req.params.id, req.body);
  res.json(apiResponse(updated, "Client APIs updated"));
});

router.get("/clients/:id/features", (req, res) => {
  res.json(apiResponse(getClientFeatures(req.params.id), "Client features loaded"));
});

router.put("/clients/:id/features", (req, res) => {
  const updated = updateClientFeatures(req.params.id, req.body);
  res.json(apiResponse(updated, "Client features updated"));
});


router.get("/clients/:id/capabilities", (req, res) => {
  res.json(apiResponse(getClientCapabilities(req.params.id), "Client capabilities loaded"));
});

router.put("/clients/:id/capabilities", (req, res) => {
  const updated = updateClientCapabilities(req.params.id, req.body);
  res.json(apiResponse(updated, "Client capabilities updated"));
});

router.get("/clients/:id/devices", (req, res) => {
  res.json(apiResponse(getClientDevices(req.params.id), "Client devices loaded"));
});

router.put("/clients/:id/devices", (req, res) => {
  const updated = updateClientDevices(req.params.id, req.body);
  res.json(apiResponse(updated, "Client devices updated"));
});

router.patch("/clients/:id/status", (req, res) => {
  const updated = updateClientStatus(req.params.id, req.body.status);
  res.json(apiResponse(updated, "Client status updated"));
});


export default router;
