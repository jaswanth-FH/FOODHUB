"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeEnum = normalizeEnum;
function normalizeEnum(enumObj, input, fallback) {
    const values = Object.values(enumObj);
    if (!input)
        return fallback ?? values[0];
    const upper = input.trim().toUpperCase();
    return values.includes(upper)
        ? upper
        : fallback ?? values[0];
}
