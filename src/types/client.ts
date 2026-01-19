import { ClientTypeEnum } from "./constants";
import { FunctionsEnum } from "./constants";
import { FeatureKeyEnum } from "./constants";
import { StatusEnum } from "./constants";

export interface ClientMeta {
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  type: ClientTypeEnum;
  status: StatusEnum;
  functions: FunctionsEnum[];
  features: FeatureKeyEnum[];
  devices: any[];
  meta: ClientMeta;
}
