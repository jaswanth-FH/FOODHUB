import { ClientType } from "../types/bootstrap";

const VALID_CLIENT_TYPES: ClientType[] = [
  "WEB",
  "POS",
  "KIOSK",
  "DELIVERY"
];

export function normalizeClientType(
  input?: string
): ClientType {
  if (!input) return "WEB";

  const upper = input.toUpperCase();

  return VALID_CLIENT_TYPES.includes(upper as ClientType)
    ? (upper as ClientType)
    : "WEB";
}
