import { createToolResponse } from '../../utils/tools.js';
import { teamMembersService } from "./service.js";
import { idSchema, paginationSchema } from 'src/schemas/generic.js';

export const teamMembersTools = {
  list_team_members: {
    schema: paginationSchema.extend({
      teamId: idSchema,
    }),
    description: "List team members with pagination",
    handler: async (args: {
      teamId: string;
      offset?: number;
      limit?: number;
    }) => {
      return createToolResponse(teamMembersService.listTeamMembers(args));
    },
  },
};
