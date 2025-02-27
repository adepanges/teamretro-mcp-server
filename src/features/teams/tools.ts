import { teamsService } from './service.js';
import { createToolResponse } from '../../utils/tools.js';

/**
 * Tool configurations for Teams resource
 */
export const teamTools = [
  {
    name: 'list_teams',
    description: 'List teams from TeamRetro with filtering and pagination',
    inputSchema: {
      type: 'object',
      properties: {
        offset: {
          type: 'integer',
          description: 'Index of the first item to return',
          minimum: 0,
          default: 0
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of items to return',
          minimum: 1,
          maximum: 1000,
          default: 1000
        },
        teamTags: {
          type: 'string',
          description: 'Comma delimited list of team tags to include',
          example: 'Perth,Sydney,Frankfurt'
        },
        teamIds: {
          type: 'string',
          description: 'Comma delimited list of team ids to include',
          pattern: '^([a-zA-Z0-9]{22})?(,[a-zA-Z0-9]{22})*$'
        }
      }
    }
  },
  {
    name: 'get_team',
    description: 'Get a single team by ID',
    inputSchema: {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
          description: 'Existing team ID',
          pattern: '^[a-zA-Z0-9]{22}$'
        }
      },
      required: ['teamId']
    }
  }
];

/**
 * Handle team tool calls
 */
export const handleTeamTool = async (toolName: string, request: any): Promise<any> => {
  switch (toolName) {
    case 'list_teams': {
      return createToolResponse(
        teamsService.listTeams(request?.arguments)
      );
    }
    case 'get_team': {
      return createToolResponse(
        teamsService.getTeam(request?.arguments?.teamId)
      );
    }
    default:
      throw new TeamRetroError('UNKNOWN_TOOL', 'TOOL_ERROR');
  }
};
