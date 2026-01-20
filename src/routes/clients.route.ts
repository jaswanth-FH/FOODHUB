import { Router } from "express";
import { ROUTES } from "../types/constants";
import { responseMessage  } from "../utils/responses";
import { ERROR_CODES } from "../types/errorCodes";
import {
  getAllClients,
  getClientByID,
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


router.get(ROUTES.CLIENTS, async (req, res, next) => {
  try {
    const clients = await getAllClients();
    res.json(responseMessage(clients, "Clients loaded"));
  } catch (err) {
    next(err);
  }
});

router.get(`${ROUTES.CLIENTS}/:id`, async (req, res, next) => {
  try {
    const client = await getClientByID(Number(req.params.id));

    if (!client) {
      return next({
        code: ERROR_CODES.CLIENT_NOT_FOUND,
        message: "Client not found"
      });
    }

    res.json(responseMessage(client, "Client loaded"));
  } catch (err) {
    next(err);
  }
});

router.post(ROUTES.CLIENTS, async (req, res, next) => {
  try {
    const client = await createClient(req.body);
    res.json(responseMessage(client, "Client created"));
  } catch (err) {
    next(err);
  }
});


router.put(`${ROUTES.CLIENTS}/:id`, async (req, res, next) => {
  try {
    const client = await updateClient(req.params.id, req.body);
    res.json(responseMessage(client, "Client updated"));
  } catch (err) {
    next(err);
  }
});

router.delete(`${ROUTES.CLIENTS}/:id`, async (req, res, next) => {
  try {
    await deleteClient(req.params.id);
    res.json(responseMessage(null, "Client deleted"));
  } catch (err) {
    next(err);
  }
});


router.get(`${ROUTES.CLIENTS}/:id/functions`, async (req, res, next) => {
  try {
    const data = await getClientFunctions(req.params.id);
    res.json(responseMessage(data, "Client functions loaded"));
  } catch (err) {
    next(err);
  }
});

router.put(`${ROUTES.CLIENTS}/:id/functions`, async (req, res, next) => {
  try {
    const updated = await updateClientFunctions(req.params.id, req.body);
    res.json(responseMessage(updated, "Client functions updated"));
  } catch (err) {
    next(err);
  }
});


router.get(`${ROUTES.CLIENTS}/:id/features`, async (req, res, next) => {
  try {
    const data = await getClientFeatures(req.params.id);
    res.json(responseMessage(data, "Client features loaded"));
  } catch (err) {
    next(err);
  }
});

router.put(`${ROUTES.CLIENTS}/:id/features`, async (req, res, next) => {
  try {
    const updated = await updateClientFeatures(req.params.id, req.body);
    res.json(responseMessage(updated, "Client features updated"));
  } catch (err) {
    next(err);
  }
});

router.get(`${ROUTES.CLIENTS}/:id/devices`, async (req, res, next) => {
  try {
    const data = await getClientDevices(req.params.id);
    res.json(responseMessage(data, "Client devices loaded"));
  } catch (err) {
    next(err);
  }
});

router.put(`${ROUTES.CLIENTS}/:id/devices`, async (req, res, next) => {
  try {
    const updated = await updateClientDevices(req.params.id, req.body);
    res.json(responseMessage(updated, "Client devices updated"));
  } catch (err) {
    next(err);
  }
});


router.patch(`${ROUTES.CLIENTS}/:id/status`, async (req, res, next) => {
  try {
    const updated = await updateClientStatus(req.params.id, req.body.status);
    res.json(responseMessage(updated, "Client status updated"));
  } catch (err) {
    next(err);
  }
});

export default router;
