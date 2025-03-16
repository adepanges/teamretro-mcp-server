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
  },
  get_team_member: {
    schema: z.object({
      teamId: z.string().regex(/^[a-zA-Z0-9]{22}$/, "Invalid team ID format").describe("string"),
      email: z.string().email().describe("string")
    }),
    description: "Get a team member by email",
    handler: async (args: {
      teamId: string;
      email: string;
    }) => {
      return createToolResponse(teamMembersService.getTeamMember(args));
    },
  },
  update_team_member: {
    schema: z.object({
      teamId: z.string().regex(/^[a-zA-Z0-9]{22}$/, "Invalid team ID format").describe("string"),
      email: z.string().email().describe("string"),
      name: z.string().nullable().optional().describe("string"),
      teamAdmin: z.boolean().optional().describe("boolean"),
    }),
    description: "Update a team member by email",
    handler: async (args: {
      teamId: string;
      email: string;
      name?: string | null;
      teamAdmin?: boolean;
    }) => {
      const { teamId, email } = args;
      const body: { name?: string | null; teamAdmin?: boolean } = {};
      if (args.name !== undefined) {
        body.name = args.name;
      }
      if (args.teamAdmin !== undefined) {
        body.teamAdmin = args.teamAdmin;
      }
      return createToolResponse(teamMembersService.updateTeamMember({ teamId, email }, body));
    },
  },
  remove_team_member: {
    schema: z.object({
      teamId: z.string().regex(/^[a-zA-Z0-9]{22}$/, "Invalid team ID format").describe("string"),
      email: z.string().email().describe("string"),
    }),
    description: "Remove a team member by email",
    handler: async (args: {
      teamId: string;
      email: string;
    }) => {
      return createToolResponse(teamMembersService.removeTeamMember(args));
    },
  },
  add_team_member: {
    schema: z.object({
      teamId: z.string().regex(/^[a-zA-Z0-9]{22}$/, "Invalid team ID format").describe("string"),
      email: z.string().email().describe("string"),
      name: z.string().nullable().optional().describe("string"),
      teamAdmin: z.boolean().optional().describe("boolean"),
    }),
    description: "Add a team member by email",
    handler: async (args: {
      teamId: string;
      email: string;
      name?: string | null;
      teamAdmin?: boolean;
    }) => {
      const { teamId, email } = args;
      const body: { name?: string | null; teamAdmin?: boolean } = {};
      if (args.name !== undefined) {
        body.name = args.name;
      }
      if (args.teamAdmin !== undefined) {
        body.teamAdmin = args.teamAdmin;
      }
      return createToolResponse(teamMembersService.addTeamMember({ teamId, email }, body));
    },
  }
};
