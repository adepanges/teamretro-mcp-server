import { z } from "zod";

import { createToolResponse } from "../../utils/tools.js";
import { usersService } from "./service.js";
import {
  emailSchema,
  nameSchema,
  paginationSchema,
} from "../../schemas/generic.js";

export const userTools = {
  list_users: {
    schema: paginationSchema,
    description: "List users with pagination using offset and limit parameters to control the number of results returned",
    handler: async (args: { offset?: number; limit?: number }) =>
      createToolResponse(usersService.listUsers(args)),
  },

  add_user: {
    schema: z.object({
      email: emailSchema,
      name: nameSchema.optional(),
    }),
    description: "Add a new user or update an existing user's information by their email address, specifying optional name and emailAddress",
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
    description: "Update an existing user's details, such as their name and emailAddress, by providing their current email",
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
    description: "Delete a user by their email address",
    handler: async (args: { email: string }) =>
      createToolResponse(usersService.deleteUser(args.email)),
  },

  get_user: {
    schema: z.object({
      email: emailSchema,
    }),
    description: "Retrieve detailed information about a single user by their email address",
    handler: async (args: { email: string }) =>
      createToolResponse(usersService.getUser(args.email)),
  },
};
