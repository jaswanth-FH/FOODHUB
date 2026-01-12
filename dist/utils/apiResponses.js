"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = apiResponse;
exports.apiError = apiError;
function apiResponse(data, message = "OK", meta) {
    return {
        status: "success",
        message,
        data,
        meta
    };
}
function apiError(message, code, meta) {
    return {
        status: "error",
        code,
        message,
        data: null,
        meta
    };
}
