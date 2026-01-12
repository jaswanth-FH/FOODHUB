"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const clientRepository_1 = require("../dist/bootstrap/clientRepository");
const constants_1 = require("../dist/types/constants");
const errorCodes_1 = require("../dist/types/errorCodes");
async function run() {
    // --------------------
    // Initial Load
    // --------------------
    const initial = await (0, clientRepository_1.getAllClients)();
    console.log("Initial clients:", initial);
    (0, assert_1.default)(Array.isArray(initial), "Initial clients should be array");
    console.log("✔ getAllClients passed\n");
    // --------------------
    // Create Client
    // --------------------
    const newClient = {
        id: "test-client",
        type: "web",
        status: "active",
        functions: ["menu"],
        features: ["pay_by_link"],
        devices: [],
        meta: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    };
    const created = await (0, clientRepository_1.createClient)(newClient);
    console.log("Created client:", created);
    (0, assert_1.default)(created.id === "test-client");
    (0, assert_1.default)(created.type === constants_1.ClientTypeEnum.WEB);
    (0, assert_1.default)(created.status === constants_1.StatusEnum.ACTIVE);
    console.log("✔ createClient + normalization passed\n");
    // --------------------
    // Fetch by ID
    // --------------------
    const fetched = await (0, clientRepository_1.getClientById)("test-client");
    console.log("Fetched client:", fetched);
    (0, assert_1.default)(fetched);
    console.log("✔ getClientById passed\n");
    // --------------------
    // Partial Update
    // --------------------
    const updated = await (0, clientRepository_1.updateClient)("test-client", {
        functions: [constants_1.FunctionsEnum.PAYMENTS]
    });
    console.log("Updated client:", updated);
    // --------------------
    // addition of function test
    // --------------------
    const client = await (0, clientRepository_1.getClientById)("test-client");
    if (!client)
        throw new Error("Client missing");
    const newFunctions = [
        ...client.functions,
        constants_1.FunctionsEnum.MENU
    ];
    const add = await (0, clientRepository_1.updateClient)("test-client", {
        functions: newFunctions
    });
    console.log("After adding function:", add);
    (0, assert_1.default)(add.functions.includes(constants_1.FunctionsEnum.MENU));
    console.log("✔ addition of function test passed\n");
    (0, assert_1.default)(add.functions.includes(constants_1.FunctionsEnum.MENU));
    (0, assert_1.default)(add.type === constants_1.ClientTypeEnum.WEB);
    (0, assert_1.default)(add.status === constants_1.StatusEnum.ACTIVE);
    console.log("✔ partial update preserved state passed\n");
    // --------------------
    // ZOD VALIDATION TESTS
    // --------------------
    console.log("Testing Zod validation failures...\n");
    try {
        await (0, clientRepository_1.createClient)({
            id: "x",
            type: "INVALID",
            status: "WRONG",
            functions: undefined,
            features: undefined,
            devices: [],
            meta: {
                createdAt: "",
                updatedAt: ""
            }
        });
        (0, assert_1.default)(false, "Expected Zod validation to fail");
    }
    catch (err) {
        console.log("Zod error output:", err);
        (0, assert_1.default)(err.errors || err.issues, "Expected Zod error object");
        console.log("✔ Zod validation failure test passed\n");
    }
    // --------------------
    // Duplicate Client Test
    // --------------------
    try {
        await (0, clientRepository_1.createClient)(newClient);
        (0, assert_1.default)(false, "Expected duplicate client error");
    }
    catch (err) {
        console.log("Duplicate error:", err);
        (0, assert_1.default)(err.code === errorCodes_1.ERROR_CODES.CLIENT_ALREADY_EXISTS);
        console.log("✔ duplicate client error test passed\n");
    }
    // --------------------
    // Update Non-Existing Client
    // --------------------
    try {
        await (0, clientRepository_1.updateClient)("missing-client", { status: constants_1.StatusEnum.DISABLED });
        (0, assert_1.default)(false, "Expected client not found error");
    }
    catch (err) {
        console.log("Missing update error:", err);
        (0, assert_1.default)(err.code === errorCodes_1.ERROR_CODES.CLIENT_NOT_FOUND);
        console.log("✔ update missing client error passed\n");
    }
    // --------------------
    // Delete Client
    // --------------------
    await (0, clientRepository_1.deleteClient)("test-client");
    const deleted = await (0, clientRepository_1.getClientById)("test-client");
    console.log("Deleted lookup result:", deleted);
    (0, assert_1.default)(!deleted);
    console.log("✔ deleteClient passed\n");
    // --------------------
    // Delete Missing Client
    // --------------------
    try {
        await (0, clientRepository_1.deleteClient)("test-client");
        (0, assert_1.default)(false, "Expected delete missing client error");
    }
    catch (err) {
        console.log("Delete missing error:", err);
        (0, assert_1.default)(err.code === errorCodes_1.ERROR_CODES.CLIENT_NOT_FOUND);
        console.log("✔ delete missing client error passed\n");
    }
    console.log("=================================");
    console.log("ALL TESTS PASSED ✅");
    console.log("=================================\n");
}
run().catch(err => {
    console.error("\n❌ TEST SUITE FAILED");
    console.error(err);
    process.exit(1);
});
