import { z } from "zod";

import { createToolResponse } from "../../utils/tools.js";
import { teamsService } from "./service.js";
import {
  idSchema,
  idsRegex,
  memberSchema,
  nameSchema,
  paginationSchema,
  tagsSchema,
} from "../../utils/schema.js";

export const teamTools = {
  list_teams: {
    schema: z.object({
      ...paginationSchema,
      teamTags: z.string().optional().describe("string,string,..."),
      teamIds: z
        .string()
        .regex(idsRegex)
        .optional()
        .describe("string,string,..."),
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
    schema: z.object({
      teamId: idSchema,
    }),
    description: "Get a single team by ID",
    handler: async (args: { teamId: string }) =>
      createToolResponse(teamsService.getTeam(args.teamId)),
  },

  update_team: {
    schema: z.object({
      teamId: idSchema,
      name: nameSchema,
      tags: tagsSchema.optional(),
    }),
    description: "Update an existing team",
    handler: async (args: {
      teamId: string;
      name?: string;
      tags?: string[];
    }) => {
      const { teamId, ...updateData } = args;
      return createToolResponse(teamsService.updateTeam(teamId, updateData));
    },
  },

  create_team: {
    schema: z.object({
      name: nameSchema,
      tags: tagsSchema.optional(),
      members: z
        .array(memberSchema)
        .optional()
        .describe("{ email: string, name?: string, teamAdmin?: boolean }[]"),
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
