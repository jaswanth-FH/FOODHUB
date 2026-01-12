"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBootstrap = buildBootstrap;
const defaults_1 = require("./defaults");
const plugins_1 = require("./plugins");
const normalizeEnum_1 = require("../utils/normalizeEnum");
const constants_1 = require("../types/constants");
const clientApiMap_1 = require("./clientApiMap");
const constants_2 = require("../types/constants");
async function buildBootstrap(ctx) {
    const clientType = await (0, normalizeEnum_1.normalizeEnum)(constants_1.ClientTypeEnum, ctx.clientType, constants_1.ClientTypeEnum.WEB);
    return {
        system: defaults_1.SYSTEM_DEFAULTS,
        client: {
            type: clientType,
            functions: await (0, clientApiMap_1.getFunctionsForClient)(clientType)
        },
        features: await (0, plugins_1.resolveFeatures)({ clientType }),
        meta: {
            version: constants_2.META.VERSION,
            generatedAt: new Date().toISOString()
        }
    };
}
