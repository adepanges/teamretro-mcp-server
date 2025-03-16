import { z } from "zod";

const paginationSchema = z.object({
  offset: z.number().int().min(0).default(0).describe("number"),
  limit: z.number().int().min(1).max(1000).default(1000).describe("number"),
});

const idRegex = /^[a-zA-Z0-9]{22}$/;
const idsRegex = /^([a-zA-Z0-9]{22})?(,[a-zA-Z0-9]{22})*$/;

export const idSchema = z.string().regex(idRegex, "Invalid ID format").describe("string");

export const nameSchema = z.string().min(1).max(64).describe("string");

export const tagSchema = z.string().min(0).max(16).describe("string");

export const tagsSchema = z.array(tagSchema).describe("string[]");

export const listTeamsSchema = z.object({
  paginationSchema,
  teamTags: z.string().optional().describe("string,string,..."),
  teamIds: z.string().regex(idsRegex).optional().describe("string,string,..."),
});

export const detailTeamSchema = z.object({
  teamId: idSchema,
});

export const updateTeamSchema = z.object({
  teamId: idSchema,
  name: nameSchema,
  tags: tagsSchema.optional(),
});

const memberSchema = z.object({
  email: z.string().email(),
  name: z.string().nullable().optional(),
  teamAdmin: z.boolean().default(false),
});

export const createTeamSchema = z.object({
  name: nameSchema,
  tags: tagsSchema.optional(),
  members: z
    .array(memberSchema)
    .optional()
    .describe("{ email: string, name?: string, teamAdmin?: boolean }[]"),
});

export const deleteTeamSchema = z.object({
  teamId: idSchema,
});


export const emailSchema = z.string().email();

export const listUsersSchema = {
  ...paginationSchema,
};

export const addUserSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
});

export const updateUserSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
  emailAddress: emailSchema,
});

export const deleteUserSchema = z.object({
  email: emailSchema,
});

export const getUserSchema = z.object({
  email: emailSchema,
});