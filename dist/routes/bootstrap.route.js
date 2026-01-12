"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const constants_1 = require("../types/constants");
const constants_2 = require("../types/constants");
const constants_3 = require("../types/constants");
const buildBootstrap_1 = require("../bootstrap/buildBootstrap");
const apiResponses_1 = require("../utils/apiResponses");
exports.router = (0, express_1.Router)();
exports.router.get(constants_3.ROUTES.BOOTSTRAP, (req, res) => {
    const clientType = req.header(constants_2.HEADERS.CLIENT_TYPE) ||
        constants_1.ClientTypeEnum.WEB;
    const response = (0, buildBootstrap_1.buildBootstrap)({ clientType });
    res.json((0, apiResponses_1.apiResponse)(response, "Bootstrap loaded"));
});
exports.default = exports.router;
