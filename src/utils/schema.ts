import { z } from "zod";

export const paginationSchema = {
  offset: z.number().int().min(0).default(0).describe("number"),
  limit: z.number().int().min(1).max(1000).default(1000).describe("number"),
};


// ----------------------
// -------- Regex -------
// ----------------------
export const idRegex = /^[a-zA-Z0-9]{22}$/;

export const idsRegex = /^([a-zA-Z0-9]{22})?(,[a-zA-Z0-9]{22})*$/;

// ----------------------
// --- Common Schemas ---
// ----------------------

export const stringSchema = z.string().describe("string");

export const idSchema = stringSchema.regex(idRegex, "Invalid ID format");

export const nameSchema = stringSchema.min(1).max(64);

export const tagSchema = stringSchema.min(0).max(16);

export const tagsSchema = z.array(tagSchema).describe("string[]");

export const emailSchema = stringSchema.email().describe("email");

export const dateStringSchema = stringSchema.datetime().describe("iso date");

export const booleanSchema = z.boolean().default(false).describe("boolean");

export const stringFilterSchema = z
  .string()
  .optional()
  .describe("string,string,...");

export const idFilterSchema = z
  .string()
  .regex(idsRegex)
  .optional()
  .describe("id,id,...");

export const nullableStringSchema = stringSchema.nullable();
export const titleSchema = stringSchema.min(1).max(10000);

export const objectEmailSchema = z.object({
  email: emailSchema,
});

// ----------------------
// --- Entity Schemas ---
// ----------------------

export const memberSchema = z.object({
  email: emailSchema,
  name: nameSchema.nullable().optional(),
  teamAdmin: booleanSchema,
});
