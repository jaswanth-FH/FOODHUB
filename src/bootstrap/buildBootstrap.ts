import { BootstrapContext } from "../types/bootstrap";
import { SYSTEM_DEFAULTS } from "./defaults";
import { CLIENT_CAPABILITIES } from "./clientCapabilities";
import { resolveFeatures } from "./plugins";

export function buildBootstrap(ctx: BootstrapContext) {
  return {
    system: SYSTEM_DEFAULTS,

    client: {
      type: ctx.clientType,
      capabilities: CLIENT_CAPABILITIES[ctx.clientType]
    },

    features: resolveFeatures(ctx),

    meta: {
      version: "v1",
      generatedAt: new Date().toISOString()
    }
  };
}
