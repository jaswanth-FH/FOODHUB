"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadJson = loadJson;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function loadJson(fileName) {
    const filePath = path_1.default.join(__dirname, "..", "data", fileName);
    const raw = await fs_1.default.promises.readFile(filePath, "utf-8");
    return JSON.parse(raw);
}
