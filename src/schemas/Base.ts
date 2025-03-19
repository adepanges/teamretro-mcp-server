import { z } from "zod";
import { dateStringSchema, emailSchema, idSchema, nameSchema } from "./generic.js";

export const baseSchema = z.object({
  id: idSchema,
  created: dateStringSchema.optional(),
});

export const hasEmail = z.object({
  email: emailSchema.readonly(),
});

export const hasName = z.object({
  name: nameSchema.nullable().optional(),
});

export const hasNameEmail = z.object({}).merge(hasName).merge(hasEmail);
