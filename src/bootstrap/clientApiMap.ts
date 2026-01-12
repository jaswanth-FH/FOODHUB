import { CLIENTS } from "../data/clients.data";
import { ClientTypeEnum } from "../types/constants";
import { FunctionsEnum } from "../types/constants";

interface ClientFeatureConfig {
  id: string;
  type: ClientTypeEnum;
  status: string;
  functions: FunctionsEnum[];
}
let clients = [...CLIENTS] as ClientFeatureConfig[];

export async function getFunctionsForClient(
  clientType: ClientTypeEnum
): Promise<FunctionsEnum[]> {
  const client = clients.find(c => c.type === clientType);
  return client ? client.functions : [];
}
