import { BootstrapContext } from "../types/bootstrap";
import { SYSTEM_DEFAULTS } from "./defaults";
import { resolveFeatures } from "./plugins";
import { normalizeClientType } from "./normalizeClientType";
import { getFunctionsForClient } from "./clientApiMap";
import { META } from "../types/constants";

export function buildBootstrap(ctx: BootstrapContext) {
  const clientType = normalizeClientType(ctx.clientType);

  return {
    system: SYSTEM_DEFAULTS,

    client: {
      type: clientType,
      functions: getFunctionsForClient(clientType)
    },

    features: resolveFeatures({ clientType }),

    meta: {
      version: META.VERSION,
      generatedAt: new Date().toISOString()
    }
  };
}
