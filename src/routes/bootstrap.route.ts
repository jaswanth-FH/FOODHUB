import { Router } from "express";
import { ClientTypeEnum } from "../types/constants";
import { HEADERS } from "../types/constants";
import { ROUTES } from "../types/constants";
import { buildBootstrap } from "../bootstrap/buildBootstrap";
import { apiResponse } from "../utils/responses";


export const router = Router();


router.get(ROUTES.BOOTSTRAP, (req, res) => {
  const clientType =
    (req.header(HEADERS.CLIENT_TYPE) as ClientTypeEnum) ||
    ClientTypeEnum.WEB;

  const response = buildBootstrap({ clientType });

  res.json(apiResponse(response, "Bootstrap loaded"));
});


export default router;