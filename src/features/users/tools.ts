import { z } from 'zod';

import { createToolResponse } from '../../utils/tools.js';
import { usersService } from './service.js';

export const userTools = {
  list_users: {
    schema: z.object({
      offset: z.number().min(0).optional().default(0).describe('number'),
      limit: z.number().min(1).max(1000).optional().default(1000).describe('number')
    }),
    description: 'List users with pagination',
    handler: async (args: { offset?: number; limit?: number }) => {
      return createToolResponse(usersService.listUsers(args));
    }
  },
  add_user: {
    schema: z.object({
      email: z.string().email(),
      name: z.string().nullable().optional(),
    }),
    description: 'Add or update a user by email',
    handler: async (args: { email: string; name: string | null; emailAddress: string }) => {
      return createToolResponse(
        usersService.addUser(args.email, {
          name: args.name,
          emailAddress: args.email,
        })
      );
    }
  },
  update_user: {
    schema: z.object({
      email: z.string().email().describe('string'),
      name: z.string().nullable().describe('string'),
      emailAddress: z.string().email().describe('string')
    }),
    description: 'Update an existing user\'s information',
    handler: async (args: { email: string; name?: string | null; emailAddress?: string }) => {
      return createToolResponse(
        usersService.updateUser(args.email, {
          name: args.name,
          emailAddress: args.emailAddress,
        })
      );
    }
  },
  delete_user: {
    schema: z.object({
      email: z.string().email().describe('string')
    }),
    description: 'Delete a user by email',
    handler: async (args: { email: string }) => {
      return createToolResponse(usersService.deleteUser(args.email));
    }
  },
  get_user: {
    schema: z.object({
      email: z.string().email().describe('string')
    }),
    description: 'Get a single user by email',
    handler: async (args: { email: string }) => {
      return createToolResponse(usersService.getUser(args.email));
    }
  }
};

