import { z } from 'zod';
import { createToolResponse } from '../../utils/tools.js';
import { teamMembersService } from "./service.js";
import { idSchema, emailSchema, paginationSchema, nameSchema, booleanSchema } from "../../utils/schema.js";

export const teamMembersTools = {

  list_team_members: {
    schema: z.object({
      teamId: idSchema,
      ...paginationSchema,
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
      teamId: idSchema,
      email: emailSchema,
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
      teamId: idSchema,
      email: emailSchema,
      name: nameSchema.nullable().optional(),
      teamAdmin: booleanSchema.optional(),
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
      teamId: idSchema,
      email: emailSchema,
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
      teamId: idSchema,
      email: emailSchema,
      name: nameSchema.nullable().optional(),
      teamAdmin: booleanSchema.optional(),
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
