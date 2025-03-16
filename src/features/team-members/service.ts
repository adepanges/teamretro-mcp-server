import { TeamMember } from 'src/utils/schema/Team.js';

import { TeamRetroService } from 'src/services/TeamRetro.service.js';
import { createSearchParams } from 'src/utils/url.js';

export class TeamMembersService extends TeamRetroService {
  /**
   * List team members with optional pagination
   * @param teamId The ID of the team
   * @param params Optional parameters for pagination
   * @returns List of team members with pagination info
   */
  async listTeamMembers(params?: {
      teamId: string;
      offset?: number;
      limit?: number;
  }): Promise<SingleApiResponse<TeamMember>> {
    const searchString = createSearchParams({
      offset: { value: params?.offset },
      limit: { value: params?.limit },
    });
    return this.get<SingleApiResponse<TeamMember>>(
      `/v1/teams/${params?.teamId}/members?${searchString}`
    );
  }
}

export const teamMembersService = new TeamMembersService();
