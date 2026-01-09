import { ClientTypeEnum } from "./constants";
import { ApiNameEnum } from "./constants";
import { FeatureKeyEnum } from "./constants";
import { Status } from "./constants";

export interface ClientMeta {
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  type: ClientTypeEnum;
  status: Status;
  apis: ApiNameEnum[];
  features: FeatureKeyEnum[];
  capabilities: Record<string, boolean>;
  devices: any[];
  meta: ClientMeta;
}
