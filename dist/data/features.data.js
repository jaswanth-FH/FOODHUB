"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURES = void 0;
const constants_1 = require("../types/constants");
exports.FEATURES = {
    "pay_by_link": {
        "enabledFor": [constants_1.ClientTypeEnum.WEB, constants_1.ClientTypeEnum.POS],
        "disabledFor": [constants_1.ClientTypeEnum.KIOSK]
    }
};
