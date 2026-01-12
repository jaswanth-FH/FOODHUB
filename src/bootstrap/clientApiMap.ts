import { loadJson } from "../utils/loadJson";
import { ClientTypeEnum } from "../types/constants";
import { FunctionsEnum } from "../types/constants";

interface ClientApiConfig {
  id: string;
  type: ClientTypeEnum;
  status: string;
  functions: FunctionsEnum[];
}

const clients = loadJson<ClientApiConfig[]>("clients.json");

export function getFunctionsForClient(
  clientType: ClientTypeEnum
): FunctionsEnum[] {
  const client = clients.find(c => c.type === clientType);
  return client ? client.functions : [];
}
