export type ClientType = "WEB" | "POS" | "KIOSK" | "DELIVERY";

export interface BootstrapContext {
  clientType: ClientType;
}

export interface FeaturePlugin {
  key: string;
  isEnabled(ctx: BootstrapContext): boolean;
  expose(): Record<string, unknown>;
}
