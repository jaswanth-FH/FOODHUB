import { z } from "zod";
import {
  ClientTypeEnum,
  StatusEnum,
  FunctionsEnum,
  FeatureKeyEnum
} from "./constants";
import { CapabilityCategory } from "../utils/prisma";


/* ---------------- ENUM SCHEMAS ---------------- */

export const ClientTypeSchema = z.enum(ClientTypeEnum);
export const StatusSchema = z.enum(StatusEnum);
export const FunctionSchema = z.enum(FunctionsEnum);
export const FeatureSchema = z.enum(FeatureKeyEnum);

/* ---------------- CAPABILITY ---------------- */

export const CapabilitySchema = z.object({
  name: z.union([FunctionSchema, FeatureSchema]),
  category: z.enum(CapabilityCategory),
});

/* ---------------- DEVICE ---------------- */

export const DeviceSchema = z.object({
  id: z.number().optional(),
  model: z.string(),
  ip: z.string(),
  status: StatusSchema
});

/* ---------------- CLIENT ---------------- */

export const ClientCreateSchema = z.object({
  name: z.string().min(3),
  type: ClientTypeSchema,
  status: StatusSchema,
  capabilities: z.array(CapabilitySchema),
  devices: z.array(DeviceSchema.omit({ id: true }))
});

export const ClientSchema = ClientCreateSchema.extend({
  id: z.number(),
  meta: z.object({
    createdAt: z.string(),
    updatedAt: z.string()
  })
});




export type ClientDTO = z.infer<typeof ClientCreateSchema>;

