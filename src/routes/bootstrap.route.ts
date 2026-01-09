import { Router } from "express";
import { ClientTypeEnum } from "../constants";
import { HEADERS } from "../constants";
import { ROUTES } from "../constants";
import { buildBootstrap } from "../bootstrap/buildBootstrap";

export const router = Router();


router.get(ROUTES.BOOTSTRAP, (req, res) => {
  const clientType =
    (req.header(HEADERS.CLIENT_TYPE) as ClientTypeEnum) ||
    ClientTypeEnum.WEB;

  const response = buildBootstrap({ clientType });

  res.json(response);
});
