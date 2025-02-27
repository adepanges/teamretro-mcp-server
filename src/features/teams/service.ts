import { TeamRetroService } from '../../services/TeamRetro.service.js';
import { createSearchParams } from '../../utils/url.js';

class TeamsService extends TeamRetroService {
  /**
   * List teams with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   * @returns List of teams with pagination info
   */
  async listTeams(params?: {
    offset?: number;
    limit?: number;
    teamTags?: string;
    teamIds?: string;
  }): Promise<ListApiResponse<Team>> {
    const searchString = createSearchParams({
      offset: { value: params?.offset },
      limit: { value: params?.limit },
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds }
    });

    return this.get<ListApiResponse<Team>>(
      `/v1/teams?${searchString}`,
      { method: 'GET' }
    );
  }

  /**
   * Get a single team by ID
   * @param teamId The ID of the team to retrieve
   * @returns Single team object
   * @throws ErrorMCP if team not found
   */
  async getTeam(teamId: string): Promise<SingleApiResponse<Team>> {
    return this.get<SingleApiResponse<Team>>(
      `/v1/teams/${teamId}`,
      { method: 'GET' }
    );
  }

  /**
   * Update an existing team
   * @param teamId The ID of the team to update
   * @param data Team data to update
   * @returns Updated team object
   * @throws ErrorMCP if team not found or validation fails
   */
  async updateTeam(
    teamId: string,
    data: Partial<Pick<Team, 'name' | 'tags' | 'members'>>
  ): Promise<SingleApiResponse<Team>> {
    return this.patch<SingleApiResponse<Team>>(
      `/v1/teams/${teamId}`,
      data
    );
  }
}

export const teamsService = new TeamsService();
