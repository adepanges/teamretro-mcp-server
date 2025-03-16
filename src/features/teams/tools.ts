import { createToolResponse } from "../../utils/tools.js";
import { teamsService } from "./service.js";
import {
  createTeamSchema,
  deleteTeamSchema,
  detailTeamSchema,
  listTeamsSchema,
  updateTeamSchema,
} from "../../utils/schema.js";

/**
 * Team management tools for TeamRetro API
 */
export const teamTools = {
  /**
   * List teams with filtering and pagination
   * @example
   * {
   *   offset: 0,
   *   limit: 10,
   *   teamTags: "Engineering",
   *   teamIds: "abc123,def456"
   * }
   */
  list_teams: {
    schema: listTeamsSchema,
    description: "List teams from TeamRetro with filtering and pagination",
    handler: async (args: {
      offset?: number;
      limit?: number;
      teamTags?: string;
      teamIds?: string;
    }) => createToolResponse(teamsService.listTeams(args)),
  },

  /**
   * Get details of a specific team
   * @example
   * {
   *   teamId: "abc123"
   * }
   */
  detail_team: {
    schema: detailTeamSchema,
    description: "Get a single team by ID",
    handler: async (args: { teamId: string }) => 
      createToolResponse(teamsService.getTeam(args.teamId)),
  },

  /**
   * Update team information
   * @example
   * {
   *   teamId: "abc123",
   *   name: "New Team Name",
   *   tags: ["Engineering"]
   * }
   */
  update_team: {
    schema: updateTeamSchema,
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

  /**
   * Create a new team
   * @example
   * {
   *   name: "New Team",
   *   tags: ["Engineering"],
   *   members: [{
   *     email: "user@example.com",
   *     name: "John Doe",
   *     teamAdmin: true
   *   }]
   * }
   */
  create_team: {
    schema: createTeamSchema,
    description: "Create a new team with optional members and tags",
    handler: async (args: {
      name: string;
      tags?: string[];
      members?: TeamMember[];
    }) => createToolResponse(teamsService.createTeam(args)),
  },

  /**
   * Delete a team
   * @example
   * {
   *   teamId: "abc123"
   * }
   */
  delete_team: {
    schema: deleteTeamSchema,
    description: "Delete an existing team",
    handler: async (args: { teamId: string }) => 
      createToolResponse(teamsService.deleteTeam(args.teamId)),
  },
};
