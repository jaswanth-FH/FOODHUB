import { FeaturePlugin, BootstrapContext } from "../../types/bootstrap";
import { PayByLinkPlugin } from "./payByLink.plugin";

const plugins: FeaturePlugin[] = [
  new PayByLinkPlugin()
];

export function resolveFeatures(ctx: BootstrapContext) {
  const result: Record<string, unknown> = {};

  for (const plugin of plugins) {
    if (plugin.isEnabled(ctx)) {
      result[plugin.key] = plugin.expose();
    }
  }

  return result;
}
