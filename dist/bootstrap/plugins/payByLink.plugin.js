"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayByLinkPlugin = void 0;
const constants_1 = require("../../types/constants");
const constants_2 = require("../../types/constants");
class PayByLinkPlugin {
    constructor() {
        this.key = constants_1.FeatureKeyEnum.PAY_BY_LINK;
    }
    isEnabled(ctx) {
        return ctx.clientType !== constants_2.ClientTypeEnum.KIOSK;
    }
    expose() {
        return {
            enabled: true
        };
    }
}
exports.PayByLinkPlugin = PayByLinkPlugin;
