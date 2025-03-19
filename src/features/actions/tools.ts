import { Action, actionSchema } from 'src/schemas/Action.js';
import { idFilterSchema, paginationSchema, tagFilterSchema } from 'src/schemas/generic.js';
import { createToolResponse } from 'src/utils/tools.js';

import { actionsService } from './service.js';

export const actionTools = {
  list_actions: {
    schema: paginationSchema.extend({
      teamTags: tagFilterSchema,
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
    schema: actionSchema.pick({
      teamId: true,
      title: true,
      due: true,
      complete: true,
      assignedTo: true,
    }),
    description: "Create a new action in TeamRetro",
    handler: async (args: Action) =>
      createToolResponse(actionsService.createAction(args)),
  },

  get_action: {
    schema: actionSchema.pick({ id: true }),
    description: "Get a single action by ID",
    handler: async (args: { id: string }) =>
      createToolResponse(actionsService.getAction(args.id)),
  },
};
