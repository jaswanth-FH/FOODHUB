"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const errorCodes_1 = require("../types/errorCodes");
const apiResponses_1 = require("./apiResponses");
const logger_1 = require("./logger");
function errorHandler(err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
        logger_1.logger.warn("Validation error", {
            path: req.path,
            method: req.method,
            issues: err.issues
        });
        return res.status(400).json((0, apiResponses_1.apiError)("Request validation failed", errorCodes_1.ERROR_CODES.VALIDATION_ERROR, { issues: err.issues }));
    }
    if (err.code && errorCodes_1.ERROR_CODES[err.code]) {
        logger_1.logger.info("Application error", {
            code: err.code,
            message: err.message,
            path: req.path
        });
        return res.status(400).json((0, apiResponses_1.apiError)(err.message, err.code));
    }
    logger_1.logger.error("Unhandled system error", {
        message: err.message,
        stack: err.stack,
        path: req.path
    });
    return res.status(500).json((0, apiResponses_1.apiError)("Internal server error", errorCodes_1.ERROR_CODES.INTERNAL_SERVER_ERROR));
}
