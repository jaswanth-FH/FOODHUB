import { FeaturePlugin, BootstrapContext } from "../../types/bootstrap";

export class PayByLinkPlugin implements FeaturePlugin {
  key = "pay_by_link";

  isEnabled(ctx: BootstrapContext): boolean {
    return ctx.clientType !== "KIOSK";
  }

  expose() {
    return {
      enabled: true
    };
  }
}
