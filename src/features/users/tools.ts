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
  }
};
