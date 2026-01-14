import { FeaturePlugin, BootstrapContext } from "../../types/bootstrap";
import { PayByLinkPlugin } from "./payByLink.plugin";

const plugins: FeaturePlugin[] = [
  new PayByLinkPlugin()
];

export async function resolveFeatures(ctx: BootstrapContext): Promise<Record<string, unknown>> {
  const result: Record<string, unknown> = {};

  for (const plugin of plugins) {
    if (await plugin.isEnabled(ctx)) {
      result[plugin.key] = await plugin.expose();
    }
  }

  return result;
}
