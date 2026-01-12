import { CLIENTS } from "../data/clients.data";
import { ClientTypeEnum } from "../types/constants";
import { FunctionsEnum } from "../types/constants";

interface ClientApiConfig {
  id: string;
  type: ClientTypeEnum;
  status: string;
  functions: FunctionsEnum[];
}
let clients = [...CLIENTS] as ClientApiConfig[];

export function getFunctionsForClient(
  clientType: ClientTypeEnum
): FunctionsEnum[] {
  const client = clients.find(c => c.type === clientType);
  return client ? client.functions : [];
}
