import { CLIENTS } from "../data/clients.data";
import { ClientTypeEnum } from "../types/constants";
import { FunctionsEnum } from "../types/constants";

interface ClientFeatureConfig {
  id: string;
  type: ClientTypeEnum;
  status: string;
  functions: FunctionsEnum[];
}

let clients: ClientFeatureConfig[] = CLIENTS.map(c => ({
  id: c.id,
  type: c.type,
  status: c.status,
  functions: c.capabilities
    .filter(cap => cap.category === "FUNCTION")
    .map(cap => cap.name as FunctionsEnum)
}));

export async function getFunctionsForClient(
  clientType: ClientTypeEnum
): Promise<FunctionsEnum[]> {
  const client = clients.find(c => c.type === clientType);
  return client ? client.functions : [];
}
