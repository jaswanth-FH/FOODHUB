import { Router } from "express";
import { ROUTES } from "../types/constants";
import { responseMessage } from "../utils/responses";
import { ERROR_CODES } from "../types/errorCodes";
import {
  getAllClients,
  getClientByName,
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

/* ---------------- LIST ---------------- */
router.get(ROUTES.CLIENTS, async (req, res, next) => {
  try {
    const clients = await getAllClients();
    res.json(responseMessage(clients, "Clients loaded"));
  } catch (err) {
    next(err);
  }
});

/* ---------------- GET ONE ---------------- */
router.get(`${ROUTES.CLIENTS}/:name`, async (req, res, next) => {
  try {
    const client = await getClientByName(req.params.name);

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

/* ---------------- CREATE ---------------- */
router.post(ROUTES.CLIENTS, async (req, res, next) => {
  try {
    const client = await createClient(req.body);
    res.json(responseMessage(client, "Client created"));
  } catch (err) {
    next(err);
  }
});

/* ---------------- UPDATE ---------------- */
router.put(`${ROUTES.CLIENTS}/:name`, async (req, res, next) => {
  try {
    const client = await updateClient(req.params.name, req.body);
    res.json(responseMessage(client, "Client updated"));
  } catch (err) {
    next(err);
  }
});

/* ---------------- DELETE ---------------- */
router.delete(`${ROUTES.CLIENTS}/:name`, async (req, res, next) => {
  try {
    await deleteClient(req.params.name);
    res.json(responseMessage(null, "Client deleted"));
  } catch (err) {
    next(err);
  }
});

/* ---------------- FUNCTIONS ---------------- */
router.get(`${ROUTES.CLIENTS}/:name/functions`, async (req, res, next) => {
  try {
    const data = await getClientFunctions(req.params.name);
    res.json(responseMessage(data, "Client functions loaded"));
  } catch (err) {
    next(err);
  }
});

router.put(`${ROUTES.CLIENTS}/:name/functions`, async (req, res, next) => {
  try {
    const updated = await updateClientFunctions(req.params.name, req.body);
    res.json(responseMessage(updated, "Client functions updated"));
  } catch (err) {
    next(err);
  }
});

/* ---------------- FEATURES ---------------- */
router.get(`${ROUTES.CLIENTS}/:name/features`, async (req, res, next) => {
  try {
    const data = await getClientFeatures(req.params.name);
    res.json(responseMessage(data, "Client features loaded"));
  } catch (err) {
    next(err);
  }
});

router.put(`${ROUTES.CLIENTS}/:name/features`, async (req, res, next) => {
  try {
    const updated = await updateClientFeatures(req.params.name, req.body);
    res.json(responseMessage(updated, "Client features updated"));
  } catch (err) {
    next(err);
  }
});

/* ---------------- DEVICES ---------------- */
router.get(`${ROUTES.CLIENTS}/:name/devices`, async (req, res, next) => {
  try {
    const data = await getClientDevices(req.params.name);
    res.json(responseMessage(data, "Client devices loaded"));
  } catch (err) {
    next(err);
  }
});

router.put(`${ROUTES.CLIENTS}/:name/devices`, async (req, res, next) => {
  try {
    const updated = await updateClientDevices(req.params.name, req.body);
    res.json(responseMessage(updated, "Client devices updated"));
  } catch (err) {
    next(err);
  }
});

/* ---------------- STATUS ---------------- */
router.patch(`${ROUTES.CLIENTS}/:name/status`, async (req, res, next) => {
  try {
    const updated = await updateClientStatus(req.params.name, req.body.status);
    res.json(responseMessage(updated, "Client status updated"));
  } catch (err) {
    next(err);
  }
});

export default router;
