import { z } from 'zod';
import { createToolResponse } from '../../utils/tools.js';
import { teamsService } from './service.js';

export const teamTools = {
  update_team: {
    schema: {
      teamId: z.string().regex(/^[a-zA-Z0-9]{22}$/, 'Invalid team ID format'),
      name: z.string().min(1).max(64).optional(),
      tags: z.array(z.string()).min(0).max(16).optional(),
      members: z.array(z.object({
        email: z.string().email(),
        name: z.string().nullable().optional(),
        teamAdmin: z.boolean().default(false)
      })).optional()
    },
    description: 'Update an existing team',
    handler: async (args: { 
      teamId: string;
      name?: string;
      tags?: string[];
      members?: {
        email: string;
        name?: string | null;
        teamAdmin?: boolean;
      }[];
    }) => {
      const { teamId, ...updateData } = args;
      return createToolResponse(teamsService.updateTeam(teamId, updateData));
    }
  },
  
  list_teams: {
    schema: {
      offset: z.number().int().min(0).default(0),
      limit: z.number().int().min(1).max(1000).default(1000),
      teamTags: z.string().optional(),
      teamIds: z.string().regex(/^([a-zA-Z0-9]{22})?(,[a-zA-Z0-9]{22})*$/).optional()
    },
    description: 'List teams from TeamRetro with filtering and pagination',
    handler: async (args: {
      offset?: number;
      limit?: number;
      teamTags?: string;
      teamIds?: string;
    }) => {
      return createToolResponse(teamsService.listTeams(args));
    }
  },
  
  get_team: {
    schema: {
      teamId: z.string().regex(/^[a-zA-Z0-9]{22}$/, 'Invalid team ID format')
    },
    description: 'Get a single team by ID',
    handler: async (args: { teamId: string }) => {
      return createToolResponse(teamsService.getTeam(args.teamId));
    }
  }
};
