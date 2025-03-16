import { createToolResponse } from '../../utils/tools.js';
import { usersService } from './service.js';
import {
  addUserSchema,
  deleteUserSchema,
  getUserSchema,
  listUsersSchema,
  updateUserSchema,
  nameSchema
} from '../../utils/schema.js';

/**
 * User management tools.
 */
export const userTools = {
  /**
   * Lists users with pagination.
   * @param args - The arguments for listing users.
   * @param args.offset - The offset for pagination.
   * @param args.limit - The limit for pagination.
   * @returns A tool response with the list of users.
   * @example
   * ```ts
   * const users = await userTools.list_users.handler({ offset: 0, limit: 10 });
   * ```
   */
  list_users: {
    schema: listUsersSchema,
    description: 'List users with pagination',
    handler: async (args: { offset?: number; limit?: number }) => createToolResponse(usersService.listUsers(args)),
  },

  /**
   * Adds or updates a user by email.
   * @param args - The arguments for adding or updating a user.
   * @param args.email - The email of the user.
   * @param args.name - The name of the user.
   * @param args.emailAddress - The email address of the user.
   * @returns A tool response with the added or updated user.
   * @example
   * ```ts
   * const user = await userTools.add_user.handler({ email: 'test@example.com', name: 'Test User', emailAddress: 'test@example.com' });
   * ```
   */
  add_user: {
    schema: addUserSchema,
    description: 'Add or update a user by email',
    handler: async (args: { email: string; name: string | null; emailAddress: string }) => createToolResponse(usersService.addUser(args.email, { name: args.name, emailAddress: args.emailAddress })),
  },

  /**
   * Updates an existing user's information.
   * @param args - The arguments for updating a user.
   * @param args.email - The email of the user.
   * @param args.name - The name of the user.
   * @param args.emailAddress - The email address of the user.
   * @returns A tool response with the updated user.
   * @example
   * ```ts
   * const user = await userTools.update_user.handler({ email: 'test@example.com', name: 'Test User', emailAddress: 'test@example.com' });
   * ```
   */
  update_user: {
    schema: updateUserSchema,
    description: 'Update an existing user\'s information',
    handler: async (args: { email: string; name?: string | null; emailAddress?: string }) => createToolResponse(usersService.updateUser(args.email, { name: args.name, emailAddress: args.emailAddress })),
  },

  /**
   * Deletes a user by email.
   * @param args - The arguments for deleting a user.
   * @param args.email - The email of the user.
   * @returns A tool response with the deleted user.
   * @example
   * ```ts
   * const user = await userTools.delete_user.handler({ email: 'test@example.com' });
   * ```
   */
  delete_user: {
    schema: deleteUserSchema,
    description: 'Delete a user by email',
    handler: async (args: { email: string }) => createToolResponse(usersService.deleteUser(args.email)),
  },

  /**
   * Gets a single user by email.
   * @param args - The arguments for getting a user.
   * @param args.email - The email of the user.
   * @returns A tool response with the user.
   * @example
   * ```ts
   * const user = await userTools.get_user.handler({ email: 'test@example.com' });
   * ```
   */
  get_user: {
    schema: getUserSchema,
    description: 'Get a single user by email',
    handler: async (args: { email: string }) => createToolResponse(usersService.getUser(args.email)),
  },
};
