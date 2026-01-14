export function normalizeEnum<E extends Record<string, string>>(
  enumObj: E,
  input?: string,
  fallback?: E[keyof E]
): E[keyof E] {
  const values = Object.values(enumObj) as Array<E[keyof E]>;

  if (!input) return fallback ?? values[0];


  if (values.includes(input as E[keyof E])) {
    return input as E[keyof E];
  }

  const key = input.toUpperCase() as keyof E;
  if (enumObj[key]) {
    return enumObj[key];
  }

  return fallback ?? values[0];
}
