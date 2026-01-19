import { ClientTypeEnum } from "./constants";
import { FeatureKeyEnum } from "./constants";

export interface BootstrapContext {
  clientType: ClientTypeEnum;
}

export interface FeaturePlugin {
  key: FeatureKeyEnum;
  isEnabled(ctx: BootstrapContext): boolean;
  expose(): Record<string, unknown>;
}
