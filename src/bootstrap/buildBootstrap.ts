import { BootstrapContext } from "../types/bootstrap";
import { SYSTEM_DEFAULTS } from "./defaults";
import { CLIENT_CAPABILITIES } from "./clientCapabilities";
import { resolveFeatures } from "./plugins";
import { normalizeClientType } from "./normalizeClientType";

export function buildBootstrap(ctx: BootstrapContext) {
  const clientType = normalizeClientType(ctx.clientType);

  return {
    system: SYSTEM_DEFAULTS,

    client: {
      type: clientType,
      capabilities: CLIENT_CAPABILITIES[clientType]
    },

    features: resolveFeatures({ clientType }),

    meta: {
      version: "v1",
      generatedAt: new Date().toISOString()
    }
  };
}
