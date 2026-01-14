import { BootstrapContext } from "../types/bootstrap";
import { SYSTEM_DEFAULTS } from "./defaults";
import { resolveFeatures } from "./plugins";
import { normalizeEnum } from "../utils/normalizeEnum";
import { ClientTypeEnum } from "../types/constants";
import { getFunctionsForClient } from "./clientApiMap";
import { META } from "../types/constants";

export async function buildBootstrap(ctx: BootstrapContext) {
  const clientType = await normalizeEnum(ClientTypeEnum, ctx.clientType, ClientTypeEnum.WEB);
  return {
    system: SYSTEM_DEFAULTS,

    client: {
      type: clientType,
      functions: await getFunctionsForClient(clientType)
    },

    features: await resolveFeatures({ clientType }),

    meta: {
      version: META.VERSION,
      generatedAt: new Date().toISOString()
    }
  };
}
