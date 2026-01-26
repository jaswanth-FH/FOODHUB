import { ClientTypeEnum, FunctionsEnum, FeatureKeyEnum, StatusEnum } from "./constants";

export interface ClientMeta {
  createdAt: string;
  updatedAt: string;
}

export interface Capability {
  name: FunctionsEnum | FeatureKeyEnum;
  category: "FUNCTION" | "FEATURE";
}

export interface Device {
  id?: number;
  model: string;
  ip: string;
  status: StatusEnum;
}

export interface Client {
  id: number;
  name: string;
  type: ClientTypeEnum;
  status: StatusEnum;
  capabilities: Capability[];
  devices: Device[];
  meta: ClientMeta;
}