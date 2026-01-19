import { FeatureKeyEnum } from "../../types/constants";
import { ClientTypeEnum } from "../../types/constants";
import { FeaturePlugin, BootstrapContext } from "../../types/bootstrap";

export class PayByLinkPlugin implements FeaturePlugin {
  key = FeatureKeyEnum.PAY_BY_LINK;

  isEnabled(ctx: BootstrapContext): boolean {
    return ctx.clientType !== ClientTypeEnum.KIOSK;
  }

  expose() {
    return {
      enabled: true
    };
  }
}
