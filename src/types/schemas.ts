import { z } from "zod";
import {
  ClientTypeEnum,
  StatusEnum,
  FunctionsEnum,
  FeatureKeyEnum
} from "./constants";

export const ClientTypeSchema = z.enum(ClientTypeEnum);
export const StatusSchema = z.enum(StatusEnum);
export const FunctionSchema = z.enum(FunctionsEnum);
export const FeatureSchema = z.enum(FeatureKeyEnum);

export const DeviceSchema = z.object({
  id: z.string(),
  model: z.string(),
  ip: z.string(),
  status: z.string(),
});


export const ClientSchema = z.object({
  id: z.string().min(3),
  type: ClientTypeSchema,
  status: StatusSchema,
  functions: z.array(FunctionSchema),
  features: z.array(FeatureSchema),
  devices: z.array(DeviceSchema),
  meta: z.object({
    createdAt: z.string(),
    updatedAt: z.string()
  })
});

export type ClientDTO = z.infer<typeof ClientSchema>;
