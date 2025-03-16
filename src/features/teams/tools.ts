import { z } from "zod";

import { createToolResponse } from "src/utils/tools.js";
import { teamsService } from "./service.js";
import {
  idFilterSchema,
  idSchema,
  nameSchema,
  paginationSchema,
  tagFilterSchema,
  tagsSchema,
} from "src/utils/schema/generic.js";
import { TeamMember, teamMemberSchema, teamSchema } from "src/utils/schema/Team.js";

export const teamTools = {
  list_teams: {
    schema: paginationSchema.extend({
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "List teams from TeamRetro with filtering and pagination",
    handler: async (args: {
      offset?: number;
      limit?: number;
      teamTags?: string;
      teamIds?: string;
    }) => createToolResponse(teamsService.listTeams(args)),
  },

  detail_team: {
    schema: teamSchema.pick({ id: true }),
    description: "Get a single team by ID",
    handler: async (args: { id: string }) =>
      createToolResponse(teamsService.getTeam(args.id)),
  },

  update_team: {
    schema: teamSchema.pick({
      id: true,
      name: true,
      tags: true
    }),
    description: "Update an existing team",
    handler: async (args: {
      id: string;
      name?: string;
      tags?: string[];
    }) => {
      const { id, ...updateData } = args;
      return createToolResponse(teamsService.updateTeam(id, updateData));
    },
  },

  create_team: {
    schema: teamSchema.pick({
      name: true,
      tags: true,
      members: true,
    }),
    description: "Create a new team with optional members and tags",
    handler: async (args: {
      name: string;
      tags?: string[];
      members?: TeamMember[];
    }) => createToolResponse(teamsService.createTeam(args)),
  },

  delete_team: {
    schema: z.object({
      teamId: idSchema,
    }),
    description: "Delete an existing team",
    handler: async (args: { teamId: string }) =>
      createToolResponse(teamsService.deleteTeam(args.teamId)),
  },
};
