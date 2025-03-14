import { z } from 'zod';
import { createToolResponse } from '../../utils/tools.js';
import { teamMembersService } from "./service.js";

export const teamMembersTools = {
  list_team_members: {
    schema: z.object({
      teamId: z.string().regex(/^[a-zA-Z0-9]{22}$/, "Invalid team ID format").describe("string"),
      offset: z.number().int().min(0).default(0).describe("number"),
      limit: z.number().int().min(1).max(1000).default(1000).describe("number")
    }),
    description: "List team members with pagination",
    handler: async (args: {
      teamId: string;
      offset?: number;
      limit?: number;
    }) => {
      return createToolResponse(teamMembersService.listTeamMembers(args));
    },
  }
};
