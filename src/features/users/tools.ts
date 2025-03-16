import { z } from "zod";

import { createToolResponse } from "../../utils/tools.js";
import { usersService } from "./service.js";
import {
  emailSchema,
  nameSchema,
  paginationSchema,
} from "../../utils/schema.js";

export const userTools = {
  list_users: {
    schema: z.object({
      ...paginationSchema,
    }),
    description: "List users with pagination",
    handler: async (args: { offset?: number; limit?: number }) =>
      createToolResponse(usersService.listUsers(args)),
  },

  add_user: {
    schema: z.object({
      email: emailSchema,
      name: nameSchema.optional(),
    }),
    description: "Add or update a user by email",
    handler: async (args: {
      email: string;
      name: string | null;
      emailAddress: string;
    }) =>
      createToolResponse(
        usersService.addUser(args.email, {
          name: args.name,
          emailAddress: args.emailAddress,
        })
      ),
  },

  update_user: {
    schema: z.object({
      email: emailSchema,
      name: nameSchema.optional(),
      emailAddress: emailSchema,
    }),
    description: "Update an existing user's information",
    handler: async (args: {
      email: string;
      name?: string | null;
      emailAddress?: string;
    }) =>
      createToolResponse(
        usersService.updateUser(args.email, {
          name: args.name,
          emailAddress: args.emailAddress,
        })
      ),
  },

  delete_user: {
    schema: z.object({
      email: emailSchema,
    }),
    description: "Delete a user by email",
    handler: async (args: { email: string }) =>
      createToolResponse(usersService.deleteUser(args.email)),
  },

  get_user: {
    schema: z.object({
      email: emailSchema,
    }),
    description: "Get a single user by email",
    handler: async (args: { email: string }) =>
      createToolResponse(usersService.getUser(args.email)),
  },
};
