import { z } from 'zod';
import { idFilterSchema, tagFilterSchema } from 'src/schemas/generic.js';

import { reportsService } from './service.js';
import { createToolResponse } from 'src/utils/tools.js';

export const reportTools = {
  team_activity_report: {
    schema: z.object({
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "Generate a team activity report from TeamRetro with filtering by team tags and team IDs",
    handler: async (args: {
      teamTags?: string;
      teamIds?: string;
    }) => {
      return createToolResponse(
         reportsService.teamActivityReport(args)
       );
    }
  },
};
