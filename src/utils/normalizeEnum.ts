export function normalizeEnum<E extends Record<string, string>>(
  enumObj: E,
  input?: string,
  fallback?: E[keyof E]
): E[keyof E] {
  const values = Object.values(enumObj) as Array<E[keyof E]>;

  if (!input) return fallback ?? values[0];

  const upper = input.trim().toUpperCase();

  return values.includes(upper as E[keyof E])
    ? (upper as E[keyof E])
    : fallback ?? values[0];
}
