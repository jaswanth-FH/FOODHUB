"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bootstrap_route_1 = __importDefault(require("./routes/bootstrap.route"));
const errorHandler_1 = require("./utils/errorHandler");
const clients_route_1 = __importDefault(require("./routes/clients.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", bootstrap_route_1.default);
app.use("/", clients_route_1.default);
app.use(errorHandler_1.errorHandler);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Bootstrap service running on port ${PORT}`);
});
