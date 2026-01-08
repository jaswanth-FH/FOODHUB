import { Router } from "express";
import { buildBootstrap } from "../bootstrap/buildBootstrap";
import { ClientType } from "../types/bootstrap";

const router = Router();

router.get("/bootstrap", (req, res) => {
  const clientType =
    (req.header("X-Client-Type") as ClientType) || "WEB";

  const response = buildBootstrap({ clientType });

  res.json(response);
});

export default router;
