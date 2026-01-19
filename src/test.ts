import assert from "assert";
import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
  getClientById
} from "../src/bootstrap/clientRepository";

import {
  FunctionsEnum,
  ClientTypeEnum,
  StatusEnum
} from "../src/types/constants";

import { ERROR_CODES } from "../src/types/errorCodes";
async function run() {
  // --------------------
  // Initial Load
  // --------------------
  const initial = await getAllClients();
  console.log("Initial clients:", initial);
  assert(Array.isArray(initial), "Initial clients should be array");
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

  const created = await createClient(newClient as any);
  console.log("Created client:", created);

  assert(created.id === "test-client");
  assert(created.type === ClientTypeEnum.WEB);
  assert(created.status === StatusEnum.ACTIVE);

  console.log("✔ createClient + normalization passed\n");

  // --------------------
  // Fetch by ID
  // --------------------
  const fetched = await getClientById("test-client");
  console.log("Fetched client:", fetched);

  assert(fetched);
  console.log("✔ getClientById passed\n");

  // --------------------
  // Partial Update
  // --------------------
  const updated = await updateClient("test-client", {
    functions: [FunctionsEnum.PAYMENTS]
  } as any);

  console.log("Updated client:", updated);

 
  // --------------------
  // addition of function test
  // --------------------
const client = await getClientById("test-client");

if (!client) throw new Error("Client missing");

const newFunctions = [
  ...client.functions,
  FunctionsEnum.MENU
];

const add = await updateClient("test-client", {
  functions: newFunctions
});
console.log("After adding function:", add);
assert(add.functions.includes(FunctionsEnum.MENU));
console.log("✔ addition of function test passed\n");


  assert(add.functions.includes(FunctionsEnum.MENU));
  assert(add.type === ClientTypeEnum.WEB);
  assert(add.status === StatusEnum.ACTIVE);

  console.log("✔ partial update preserved state passed\n");

  // --------------------
  // ZOD VALIDATION TESTS
  // --------------------

  console.log("Testing Zod validation failures...\n");

  try {
    await createClient({
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
    } as any);

    assert(false, "Expected Zod validation to fail");
  } catch (err: any) {
    console.log("Zod error output:", err);

    assert(err.errors || err.issues, "Expected Zod error object");
    console.log("✔ Zod validation failure test passed\n");
  }

  // --------------------
  // Duplicate Client Test
  // --------------------
  try {
    await createClient(newClient as any);
    assert(false, "Expected duplicate client error");
  } catch (err: any) {
    console.log("Duplicate error:", err);
    assert(err.code === ERROR_CODES.CLIENT_ALREADY_EXISTS);
    console.log("✔ duplicate client error test passed\n");
  }



  // --------------------
  // Update Non-Existing Client
  // --------------------
  try {
    await updateClient("missing-client", { status: StatusEnum.DISABLED });
    assert(false, "Expected client not found error");
  } catch (err: any) {
    console.log("Missing update error:", err);
    assert(err.code === ERROR_CODES.CLIENT_NOT_FOUND);
    console.log("✔ update missing client error passed\n");
  }

  // --------------------
  // Delete Client
  // --------------------
  await deleteClient("test-client");
  const deleted = await getClientById("test-client");

  console.log("Deleted lookup result:", deleted);

  assert(!deleted);
  console.log("✔ deleteClient passed\n");

  // --------------------
  // Delete Missing Client
  // --------------------
  try {
    await deleteClient("test-client");
    assert(false, "Expected delete missing client error");
  } catch (err: any) {
    console.log("Delete missing error:", err);
    assert(err.code === ERROR_CODES.CLIENT_NOT_FOUND);
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
