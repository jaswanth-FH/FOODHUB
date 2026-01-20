import assert from "assert";
import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
  getClientByName
} from "../src/bootstrap/clientRepository";

import {
  FunctionsEnum,
  ClientTypeEnum,
  StatusEnum
} from "../src/types/constants";

import { ERROR_CODES } from "../src/types/errorCodes";

const TEST_NAME = `test-client-${Date.now()}`;

async function run() {
  console.log("======= CLIENT REPOSITORY TEST SUITE =======\n");

  // --------------------
  // Initial Load
  // --------------------
  const initial = await getAllClients();
  console.log("Initial clients:", initial);
  assert(Array.isArray(initial));
  console.log("✔ getAllClients passed\n");

  // --------------------
  // Create Client
  // --------------------
  const newClient = {
    name: TEST_NAME,
    type: ClientTypeEnum.WEB,
    status: StatusEnum.ACTIVE,
    capabilities: [
      { name: FunctionsEnum.MENU, category: "FUNCTION" },
      { name: "pay_by_link", category: "FEATURE" }
    ],
    devices: [],
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

const created = await createClient(newClient as any);
assert(created, "createClient returned undefined");

console.log("Created client:", created);
assert(created.name === TEST_NAME);


  assert(created.name === TEST_NAME);
  console.log("✔ createClient passed\n");

  // --------------------
  // Fetch by Name
  // --------------------
  const fetched = await getClientByName(TEST_NAME);
  assert(fetched, "getClientByName returned undefined");
  console.log("Fetched client:", fetched);
  assert(fetched.name === TEST_NAME);

  assert(fetched);
  console.log("✔ getClientByName passed\n");

  // --------------------
  // Partial Update
  // --------------------
  const updated = await updateClient(TEST_NAME, {
    capabilities: [{ name: FunctionsEnum.PAYMENTS, category: "FUNCTION" }]
  } as any);
  assert(updated, "Updated client is undefined");

  console.log("Updated client:", updated);
  console.log("✔ partial update passed\n");

  // --------------------
  // Addition of function
  // --------------------
  const add = await updateClient(TEST_NAME, {
    capabilities: [
      { name: FunctionsEnum.PAYMENTS, category: "FUNCTION" },
      { name: FunctionsEnum.MENU, category: "FUNCTION" }
    ]
  } as any);

  console.log("After adding function:", add);
  assert(add, "Add client is undefined");
  assert(add.capabilities.some(c => c.name === FunctionsEnum.MENU));
  console.log("✔ add function passed\n");

  // --------------------
  // Duplicate Client Test
  // --------------------
  try {
    await createClient(newClient as any);
    assert(false);
  } catch (err: any) {
    console.log("Duplicate error:", err.code);
    assert(err.code === ERROR_CODES.CLIENT_ALREADY_EXISTS);
    console.log("✔ duplicate client test passed\n");
  }

  // --------------------
  // Update Non-Existing Client
  // --------------------
  try {
    await updateClient("missing-client", { status: StatusEnum.DISABLED });
    assert(false);
  } catch (err: any) {
    console.log("Missing update error:", err.code);
    assert(err.code === ERROR_CODES.CLIENT_NOT_FOUND);
    console.log("✔ update missing client passed\n");
  }

  // --------------------
  // Delete Client
  // --------------------
  await deleteClient(TEST_NAME);
  const deleted = await getClientByName(TEST_NAME);

  console.log("Deleted lookup:", deleted);
  assert(!deleted);
  console.log("✔ deleteClient passed\n");

  // --------------------
  // Delete Missing Client
  // --------------------
  try {
    await deleteClient(TEST_NAME);
    assert(false);
  } catch (err: any) {
    console.log("Delete missing error:", err.code);
    assert(err.code === ERROR_CODES.CLIENT_NOT_FOUND);
    console.log("✔ delete missing client passed\n");
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
