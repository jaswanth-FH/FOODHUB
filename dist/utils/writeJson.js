"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJson = writeJson;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function writeJson(fileName, data) {
    const filePath = path_1.default.join(__dirname, "..", "data", fileName);
    await fs_1.default.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
