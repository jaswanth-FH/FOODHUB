"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeClientType = normalizeClientType;
const constants_1 = require("../types/constants");
async function normalizeClientType(input) {
    if (!input)
        return constants_1.ClientTypeEnum.WEB;
    const upper = input.toUpperCase();
    return Object.values(constants_1.ClientTypeEnum).includes(upper)
        ? upper
        : constants_1.ClientTypeEnum.WEB;
}
