"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = exports.DeviceSchema = exports.FeatureSchema = exports.FunctionSchema = exports.StatusSchema = exports.ClientTypeSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("./constants");
exports.ClientTypeSchema = zod_1.z.enum(constants_1.ClientTypeEnum);
exports.StatusSchema = zod_1.z.enum(constants_1.StatusEnum);
exports.FunctionSchema = zod_1.z.enum(constants_1.FunctionsEnum);
exports.FeatureSchema = zod_1.z.enum(constants_1.FeatureKeyEnum);
exports.DeviceSchema = zod_1.z.object({
    id: zod_1.z.string(),
    model: zod_1.z.string(),
    ip: zod_1.z.string(),
    status: zod_1.z.string(),
});
exports.ClientSchema = zod_1.z.object({
    id: zod_1.z.string().min(3),
    type: exports.ClientTypeSchema,
    status: exports.StatusSchema,
    functions: zod_1.z.array(exports.FunctionSchema),
    features: zod_1.z.array(exports.FeatureSchema),
    devices: zod_1.z.array(exports.DeviceSchema),
    meta: zod_1.z.object({
        createdAt: zod_1.z.string(),
        updatedAt: zod_1.z.string()
    })
});
