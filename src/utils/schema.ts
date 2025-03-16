import { z } from "zod";

export const paginationSchema = {
  offset: z.number().int().min(0).default(0).describe("number"),
  limit: z.number().int().min(1).max(1000).default(1000).describe("number"),
};

export const idRegex = /^[a-zA-Z0-9]{22}$/;

export const idsRegex = /^([a-zA-Z0-9]{22})?(,[a-zA-Z0-9]{22})*$/;

export const idSchema = z.string().regex(idRegex, "Invalid ID format").describe("string");

export const nameSchema = z.string().min(1).max(64).describe("string");

export const tagSchema = z.string().min(0).max(16).describe("string");

export const tagsSchema = z.array(tagSchema).describe("string[]");

export const emailSchema = z.string().email();

export const memberSchema = z.object({
  email: z.string().email(),
  name: z.string().nullable().optional(),
  teamAdmin: z.boolean().default(false),
});
