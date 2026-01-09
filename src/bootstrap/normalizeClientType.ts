import { ClientTypeEnum } from "../constants";

export function normalizeClientType(
  input?: string
): ClientTypeEnum {
  if (!input) return ClientTypeEnum.WEB;

  const upper = input.toUpperCase();

  return Object.values(ClientTypeEnum).includes(
    upper as ClientTypeEnum
  )
    ? (upper as ClientTypeEnum)
    : ClientTypeEnum.WEB;
}
