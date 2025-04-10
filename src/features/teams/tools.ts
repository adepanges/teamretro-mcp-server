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
} from "src/schemas/generic.js";
import { TeamMember, teamMemberSchema, teamSchema } from "src/schemas/Team.js";

export const teamTools = {
  list_teams: {
    schema: paginationSchema.extend({
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "List teams from TeamRetro with filtering by tags and IDs, and pagination using offset and limit parameters",
    handler: async (args: {
      offset?: number;
      limit?: number;
      teamTags?: string;
      teamIds?: string;
    }) => createToolResponse(teamsService.listTeams(args)),
  },

  detail_team: {
    schema: teamSchema.pick({ id: true }),
    description: "Retrieve detailed information about a single team by its unique ID",
    handler: async (args: { id: string }) =>
      createToolResponse(teamsService.getTeam(args.id)),
  },

  update_team: {
    schema: teamSchema.pick({
      id: true,
      name: true,
      tags: true
    }),
    description: "Update an existing team's details, such as its name and associated tags, by providing the team's ID",
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
    description: "Create a new team with a required name, and optional tags and members",
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
    description: "Delete an existing team by its ID",
    handler: async (args: { teamId: string }) =>
      createToolResponse(teamsService.deleteTeam(args.teamId)),
  },
};
