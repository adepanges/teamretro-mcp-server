import { idFilterSchema, idSchema, onlyIdSchema, paginationSchema, tagFilterSchema } from 'src/schemas/generic.js';
import { createToolResponse } from 'src/utils/tools.js';

import { retrospectivesService } from './service.js';

export const retrospectiveTools = {
  list_retrospectives: {
    schema: paginationSchema.extend({
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description:
      "List retrospectives from TeamRetro with filtering by team tags and IDs, and pagination using offset and limit parameters",
    handler: async (args: {
      offset?: number;
      limit?: number;
      teamTags?: string;
      teamIds?: string;
    }) => createToolResponse(retrospectivesService.listRetrospectives(args)),
  },

  get_retrospective: {
    schema: onlyIdSchema,
    description: "Retrieve detailed information about a single retrospective by its unique ID",
    handler: async (args: { id: string }) =>
      createToolResponse(retrospectivesService.getRetrospective(args.id)),
  },

  delete_retrospective: {
    schema: onlyIdSchema,
    description: "Delete an existing retrospective by its ID",
    handler: async (args: { id: string }) => {
      return createToolResponse(
        retrospectivesService.deleteRetrospective(args.id)
      );
    },
  },
};
