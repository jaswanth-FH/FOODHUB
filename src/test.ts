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
  StatusEnum,
  FeatureKeyEnum
} from "../src/types/constants";

import { ERROR_CODES } from "../src/types/errorCodes";
import {
  resolveDependencies,
  validateDependencies,
  getDependencies
} from "../src/utils/capabilityDependencies";

const TEST_NAME = `test-client-${Date.now()}`;

async function run() {
  console.log("======= CLIENT REPOSITORY TEST SUITE =======\n");

  /* ---------------- INITIAL LOAD ---------------- */

  const initial = await getAllClients();
  assert(Array.isArray(initial));
  console.log("✔ getAllClients passed\n");

  /* ---------------- CREATE CLIENT ---------------- */

  const newClient = {
    name: TEST_NAME,
    type: ClientTypeEnum.WEB,
    status: StatusEnum.ACTIVE,
    capabilities: [
      { name: FunctionsEnum.MENU, category: "FUNCTION" as const },
      { name: FeatureKeyEnum.PAY_BY_LINK, category: "FEATURE" as const }
    ],
    devices: []
  };

  const created = await createClient(newClient as any);
  assert(created);
  assert(created.name === TEST_NAME);

  console.log("✔ createClient passed\n");

  /* ---------------- FETCH BY NAME ---------------- */

  const fetched = await getClientByName(TEST_NAME);
  assert(fetched);
  assert(fetched!.name === TEST_NAME);

  console.log("✔ getClientByName passed\n");

  /* ---------------- PARTIAL UPDATE ---------------- */

  const updated = await updateClient(TEST_NAME, {
    capabilities: [{ name: FunctionsEnum.PAYMENTS, category: "FUNCTION" }]
  } as any);

  assert(updated);
  console.log("✔ partial update passed\n");

  /* ---------------- ADD FUNCTION ---------------- */

  const add = await updateClient(TEST_NAME, {
    capabilities: [
      { name: FunctionsEnum.PAYMENTS, category: "FUNCTION" },
      { name: FunctionsEnum.MENU, category: "FUNCTION" }
    ]
  } as any);

  assert(add);
  assert(add.capabilities.some(c => c.name === FunctionsEnum.MENU));
  console.log("✔ add function passed\n");

  /* ---------------- DUPLICATE CLIENT ---------------- */

  try {
    await createClient(newClient as any);
    assert(false);
  } catch (err: any) {
    assert(err.code === ERROR_CODES.CLIENT_ALREADY_EXISTS);
    console.log("✔ duplicate client test passed\n");
  }

  /* ---------------- UPDATE MISSING ---------------- */

  try {
    await updateClient("missing-client", { status: StatusEnum.DISABLED });
    assert(false);
  } catch (err: any) {
    assert(err.code === ERROR_CODES.CLIENT_NOT_FOUND);
    console.log("✔ update missing client passed\n");
  }

  /* ---------------- DELETE CLIENT ---------------- */

  await deleteClient(TEST_NAME);
  const deleted = await getClientByName(TEST_NAME);
  assert(!deleted);

  console.log("✔ deleteClient passed\n");

  /* ---------------- DELETE MISSING ---------------- */

  try {
    await deleteClient(TEST_NAME);
    assert(false);
  } catch (err: any) {
    assert(err.code === ERROR_CODES.CLIENT_NOT_FOUND);
    console.log("✔ delete missing client passed\n");
  }

  /* ---------------- DEPENDENCY SYSTEM ---------------- */

  console.log("\n=== CAPABILITY DEPENDENCIES TEST ===");

  const testCapabilities = [
    { name: FeatureKeyEnum.PAY_BY_LINK, category: "FEATURE" as const },
    { name: FunctionsEnum.MENU, category: "FUNCTION" as const }
  ];

  const resolved = resolveDependencies(testCapabilities);

  assert(resolved.some(c => c.name === FunctionsEnum.PAYMENTS));
  assert(resolved.some(c => c.name === FeatureKeyEnum.PAY_BY_LINK));
  assert(resolved.some(c => c.name === FunctionsEnum.MENU));

  console.log("✔ resolveDependencies passed");

  const validCapabilities = [
    { name: FeatureKeyEnum.PAY_BY_LINK, category: "FEATURE" as const },
    { name: FunctionsEnum.PAYMENTS, category: "FUNCTION" as const }
  ];

  const invalidCapabilities = [
    { name: FeatureKeyEnum.PAY_BY_LINK, category: "FEATURE" as const }
  ];

  assert.doesNotThrow(() => validateDependencies(validCapabilities));
  assert.throws(() => validateDependencies(invalidCapabilities));

  console.log("✔ validateDependencies passed");

  const deps = getDependencies(FeatureKeyEnum.PAY_BY_LINK, "FEATURE");

  assert(deps.length === 1);
  assert(deps[0].name === FunctionsEnum.PAYMENTS);

  console.log("✔ getDependencies passed");

  /* ---------------- CREATE WITH DEPENDENCIES ---------------- */

  const testName2 = `test-dependencies-${Date.now()}`;

  const clientWithDependencies = {
    name: testName2,
    type: ClientTypeEnum.WEB,
    status: StatusEnum.ACTIVE,
    capabilities: [
      { name: FeatureKeyEnum.PAY_BY_LINK, category: "FEATURE" },
      { name: FunctionsEnum.MENU, category: "FUNCTION" }
    ],
    devices: []
  };

  const createdWithDependencies = await createClient(clientWithDependencies as any);
  assert(createdWithDependencies);

  const hasPayments = createdWithDependencies.capabilities.some(
    c => c.name === FunctionsEnum.PAYMENTS && c.category === "FUNCTION"
  );

  assert(hasPayments);

  await deleteClient(testName2);

  console.log("✔ dependency injection in createClient passed");

  console.log("\n=================================");
  console.log("ALL TESTS PASSED ✅");
  console.log("=================================\n");
}

run().catch(err => {
  console.error("\n❌ TEST SUITE FAILED");
  console.error(err);
  process.exit(1);
});
