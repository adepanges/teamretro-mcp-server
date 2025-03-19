import { paginationSchema } from 'src/schemas/generic.js';
import { teamIdSchema, teamMemberSchema } from 'src/schemas/Team.js';
import { createToolResponse } from 'src/utils/tools.js';

import { teamMembersService } from './service.js';

export const teamMembersTools = {
  list_team_members: {
    schema: paginationSchema.merge(teamIdSchema),
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
    schema: teamMemberSchema.pick({ teamId: true, email: true }),
    description: "Get a team member by email",
    handler: async (args: { teamId: string; email: string }) => {
      return createToolResponse(teamMembersService.getTeamMember(args));
    },
  },

  update_team_member: {
    schema: teamMemberSchema.pick({
      teamId: true,
      email: true,
      teamAdmin: true,
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
      return createToolResponse(
        teamMembersService.updateTeamMember({ teamId, email }, body)
      );
    },
  },

  remove_team_member: {
    schema: teamMemberSchema.pick({ teamId: true, email: true }),
    description: "Remove a team member by email",
    handler: async (args: { teamId: string; email: string }) => {
      return createToolResponse(teamMembersService.removeTeamMember(args));
    },
  },

  add_team_member: {
    schema: teamMemberSchema.pick({
      teamId: true,
      email: true,
      teamAdmin: true,
    }),
    description: "Add a team member by email",
    handler: async (args: {
      teamId: string;
      email: string;
      teamAdmin?: boolean;
    }) => {
      const { teamId, email } = args;
      const body: { name?: string | null; teamAdmin?: boolean } = {};
      if (args.teamAdmin !== undefined) {
        body.teamAdmin = args.teamAdmin;
      }
      return createToolResponse(
        teamMembersService.addTeamMember({ teamId, email }, body)
      );
    },
  },
};
