import { z } from "zod";

// ----------------------
// -------- Regex -------
// ----------------------
export const idRegex = /^[a-zA-Z0-9]{22}$/;

export const idsRegex = /^([a-zA-Z0-9]{22})?(,[a-zA-Z0-9]{22})*$/;

// ----------------------
// --- Generic Schemas ---
// ----------------------

export const paginationSchema = z.object({
  offset: z.number().int().min(0).default(0).describe("number"),
  limit: z.number().int().min(1).max(1000).default(1000).describe("number"),
});

export const idSchema = z.string().regex(idRegex, "Invalid ID format").describe("id");

export const nameSchema = z.string().min(1).max(64).describe("string");

export const tagSchema = z.string().min(0).max(16).describe("string");

export const tagsSchema = z.array(tagSchema).describe("string[]");

export const emailSchema = z.string().email().describe("email");

export const dateStringSchema = z.string().datetime().describe("iso datetime");

export const booleanSchema = z.boolean().default(false).describe("boolean");

export const tagFilterSchema = z.string()
  .optional()
  .describe("tag,tag,other tag,...");

export const idFilterSchema = z.string()
  .regex(idsRegex)
  .optional()
  .describe("id,id,...");

export const nullableStringSchema = z.string().nullable();
export const titleSchema = z.string().min(1).max(10000);

export const baseSchema = z.object({
  id: idSchema,
  created: dateStringSchema.optional(),
});

export const hasEmail = z.object({
  email: emailSchema.readonly(),
});

export const hasName = z.object({
  name: nameSchema,
});

export const hasNameEmail = z.object({}).merge(hasName).merge(hasEmail);
