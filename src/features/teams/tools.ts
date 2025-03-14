import { z } from "zod";
import { createToolResponse } from "../../utils/tools.js";
import { teamsService } from "./service.js";

export const teamTools = {
  list_teams: {
    schema: z.object({
      offset: z.number().int().min(0).default(0).describe("number"),
      limit: z.number().int().min(1).max(1000).default(1000).describe("number"),
      teamTags: z.string().optional().describe("string,string,..."),
      teamIds: z
        .string()
        .regex(/^([a-zA-Z0-9]{22})?(,[a-zA-Z0-9]{22})*$/)
        .optional()
        .describe("string,string,..."),
    }),
    description: "List teams from TeamRetro with filtering and pagination",
    handler: async (args: {
      offset?: number;
      limit?: number;
      teamTags?: string;
      teamIds?: string;
    }) => {
      return createToolResponse(teamsService.listTeams(args));
    },
  },

  detail_team: {
    schema: z.object({
      teamId: z
        .string()
        .regex(/^[a-zA-Z0-9]{22}$/, "Invalid team ID format")
        .describe("string"),
    }),
    description: "Get a single team by ID",
    handler: async (args: { teamId: string }) => {
      return createToolResponse(teamsService.getTeam(args.teamId));
    },
  },

  update_team: {
    schema: z.object({
      teamId: z
        .string()
        .regex(/^[a-zA-Z0-9]{22}$/, "Invalid team ID format")
        .describe("string"),
      name: z.string().min(1).max(64).describe("string"),
      tags: z.array(z.string()).min(0).max(16).optional().describe("string[]"),
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
      name: z.string().min(1).max(64).describe("string"),
      tags: z.array(z.string()).min(0).max(16).optional().describe("string[]"),
      members: z
        .array(
          z.object({
            email: z.string().email(),
            name: z.string().nullable().optional(),
            teamAdmin: z.boolean().default(false),
          })
        )
        .optional()
        .describe("{ email: string, name?: string, teamAdmin?: boolean }[]"),
    }),
    description: "Create a new team with optional members and tags",
    handler: async (args: {
      name: string;
      tags?: string[];
      members?: TeamMember[];
    }) => {
      return createToolResponse(teamsService.createTeam(args));
    },
  },

  delete_team: {
    schema: z.object({
      teamId: z
        .string()
        .regex(/^[a-zA-Z0-9]{22}$/, "Invalid team ID format")
        .describe("string"),
    }),
    description: "Delete an existing team",
    handler: async (args: { teamId: string }) => {
      return createToolResponse(teamsService.deleteTeam(args.teamId));
    },
  },
};
