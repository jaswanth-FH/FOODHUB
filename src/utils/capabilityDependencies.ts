import { FunctionsEnum, FeatureKeyEnum } from "../types/constants";

/**
 * Defines the dependency relationships between features and required functions.
 * When a feature is enabled, all its dependencies will be automatically enabled.
 * This prevents configuration errors by ensuring required functions are always present.
 */
export const CAPABILITY_DEPENDENCIES: Record<FeatureKeyEnum, FunctionsEnum[]> = {
  [FeatureKeyEnum.PAY_BY_LINK]: [FunctionsEnum.PAYMENTS],
  [FeatureKeyEnum.PARTIAL_REFUND]: [FunctionsEnum.PAYMENTS],
  [FeatureKeyEnum.DELIVERY_TRACKING]: [FunctionsEnum.DELIVERY]
};

/**
 * Resolves all dependencies for a given set of capabilities.
 * Returns the complete set of capabilities including all required dependencies.
 *
 * @param capabilities - Current capabilities to resolve dependencies for
 * @returns Complete set of capabilities including all required dependencies
 */
export function resolveDependencies(
  capabilities: Array<{ name: FunctionsEnum | FeatureKeyEnum; category: "FUNCTION" | "FEATURE" }>
): Array<{ name: FunctionsEnum | FeatureKeyEnum; category: "FUNCTION" | "FEATURE" }> {
  const resolved = new Set<string>();
  const result: Array<{ name: FunctionsEnum | FeatureKeyEnum; category: "FUNCTION" | "FEATURE" }> = [];

  // Helper function to add capabilities and their dependencies
  const addCapability = (name: FunctionsEnum | FeatureKeyEnum, category: "FUNCTION" | "FEATURE") => {
    if (resolved.has(name)) return;

    resolved.add(name);
    result.push({ name, category });

    // If it's a feature, add its required functions
    if (category === "FEATURE" && CAPABILITY_DEPENDENCIES[name as FeatureKeyEnum]) {
      const dependencies = CAPABILITY_DEPENDENCIES[name as FeatureKeyEnum];
      dependencies.forEach(dep => {
        addCapability(dep, "FUNCTION");
      });
    }
  };

  // Process all capabilities
  capabilities.forEach(cap => {
    addCapability(cap.name, cap.category);
  });

  return result;
}

/**
 * Validates that all required dependencies are present for the given capabilities.
 * Throws an error if any feature is missing its required functions.
 *
 * @param capabilities - Current capabilities to validate
 * @returns true if all dependencies are present, false otherwise
 */
export function validateDependencies(
  capabilities: Array<{ name: FunctionsEnum | FeatureKeyEnum; category: "FUNCTION" | "FEATURE" }>
): boolean {
  const functionNames = new Set<FunctionsEnum>(
    capabilities.filter(cap => cap.category === "FUNCTION").map(cap => cap.name as FunctionsEnum)
  );

  const invalidFeatures: string[] = [];

  capabilities.forEach(cap => {
    if (cap.category === "FEATURE" && CAPABILITY_DEPENDENCIES[cap.name as FeatureKeyEnum]) {
      const dependencies = CAPABILITY_DEPENDENCIES[cap.name as FeatureKeyEnum];
      const missingDependencies = dependencies.filter(dep => !functionNames.has(dep));

      if (missingDependencies.length > 0) {
        invalidFeatures.push(
          `${cap.name} is missing required functions: ${missingDependencies.join(", ")}`
        );
      }
    }
  });

  if (invalidFeatures.length > 0) {
    throw new Error(`Invalid capabilities: ${invalidFeatures.join("; ")}`);
  }

  return true;
}

/**
 * Returns all dependencies for a specific capability.
 *
 * @param name - Capability name
 * @param category - Capability category
 * @returns Array of required dependencies
 */
export function getDependencies(
  name: FunctionsEnum | FeatureKeyEnum,
  category: "FUNCTION" | "FEATURE"
): Array<{ name: FunctionsEnum; category: "FUNCTION" | "FEATURE" }> {
  if (category === "FUNCTION") {
    return [];
  }

  const dependencies = CAPABILITY_DEPENDENCIES[name as FeatureKeyEnum];
  return (dependencies || []).map(dep => ({
    name: dep,
    category: "FUNCTION"
  }));
}
