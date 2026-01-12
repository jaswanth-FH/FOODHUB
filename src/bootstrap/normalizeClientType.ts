import { ClientTypeEnum } from "../types/constants";

export async function normalizeClientType(
  input?: string
): Promise<ClientTypeEnum> {
  if (!input) return ClientTypeEnum.WEB;

  const upper = input.toUpperCase();

  return Object.values(ClientTypeEnum).includes(
    upper as ClientTypeEnum
  )
    ? (upper as ClientTypeEnum)
    : ClientTypeEnum.WEB;
}
