import { Router } from "express";
import { apiResponse } from "../utils/apiResponses";
import { getAllClients, getClientById } from "../bootstrap/clientRepository";

const router = Router();

router.get("/clients", (req, res) => {
  const clients = getAllClients();
  res.json(apiResponse(clients, "Clients loaded"));
});

router.get("/clients/:id", (req, res) => {
  const client = getClientById(req.params.id);

  if (!client) {
    throw new Error("Client not found");
  }

  res.json(apiResponse(client, "Client loaded"));
});

export default router;
