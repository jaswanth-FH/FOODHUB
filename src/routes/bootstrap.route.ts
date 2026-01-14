import { Router } from "express";
import { ClientTypeEnum } from "../types/constants";
import { HEADERS } from "../types/constants";
import { ROUTES } from "../types/constants";
import { buildBootstrap } from "../bootstrap/buildBootstrap";
import { responseMessage} from "../utils/responses";


export const router = Router();


router.get(ROUTES.BOOTSTRAP, async (req, res) => {
  const clientType =
    (req.header(HEADERS.CLIENT_TYPE) as ClientTypeEnum) ||
    ClientTypeEnum.WEB;

  const response = await buildBootstrap({ clientType });

  res.json(responseMessage(response, "Bootstrap loaded"));
});


export default router;