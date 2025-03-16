import { z } from 'zod';

import {
    dateStringSchema, idFilterSchema, idSchema, objectEmailSchema, paginationSchema,
    stringFilterSchema, titleSchema
} from '../../utils/schema.js';
import { createToolResponse } from '../../utils/tools.js';
import { actionsService } from './service.js';

export const actionTools = {
  list_actions: {
    schema: z.object({
      ...paginationSchema,
      teamTags: stringFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "List actions from TeamRetro with filtering and pagination",
    handler: async (args: {
      offset?: number;
      limit?: number;
      teamTags?: string;
      teamIds?: string;
    }) => createToolResponse(actionsService.listActions(args)),
  },

  create_action: {
    schema: z.object({
      teamId: idSchema,
      title: titleSchema,
      due: dateStringSchema.nullable().optional(),
      complete: dateStringSchema.nullable().optional(),
      assignedTo: z.array(objectEmailSchema).max(16).default([]).optional(),
    }),
    description: "Create a new action in TeamRetro",
    handler: async (args: Action) =>
      createToolResponse(actionsService.createAction(args)),
  },

  get_action: {
    schema: z.object({
      actionId: idSchema,
    }),
    description: "Get a single action by ID",
    handler: async (args: { actionId: string }) =>
      createToolResponse(actionsService.getAction(args.actionId)),
  },
};
