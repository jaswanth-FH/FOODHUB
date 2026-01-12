"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFeatures = resolveFeatures;
const payByLink_plugin_1 = require("./payByLink.plugin");
const plugins = [
    new payByLink_plugin_1.PayByLinkPlugin()
];
async function resolveFeatures(ctx) {
    const result = {};
    for (const plugin of plugins) {
        if (await plugin.isEnabled(ctx)) {
            result[plugin.key] = await plugin.expose();
        }
    }
    return result;
}
