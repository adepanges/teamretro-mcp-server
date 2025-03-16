import { createSearchParams } from '../../utils/url.js';
import { TeamRetroService } from '../../services/TeamRetro.service.js';

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
  }): Promise<ListApiResponse<TeamMember>> {
    const searchString = createSearchParams({
      offset: { value: params?.offset },
      limit: { value: params?.limit },
    });
    return this.get<ListApiResponse<TeamMember>>(
      `/v1/teams/${params?.teamId}/members?${searchString}`
    );
  }

  /**
   * Get a team member by email
   * @param teamId The ID of the team
   * @param email The email of the team member
   * @returns The team member
   */
  async getTeamMember(params: {
    teamId: string;
    email: string;
  }): Promise<SingleApiResponse<TeamMember>> {
    return this.get<SingleApiResponse<TeamMember>>(
      `/v1/teams/${params.teamId}/members/${params.email}`
    );
  }

  /**
   * Update a team member by email
   * @param teamId The ID of the team
   * @param email The email of the team member
   * @param body The body of the request
   * @returns The updated team member
   */
  async updateTeamMember(
    params: {
      teamId: string;
      email: string;
    },
    body: {
      name?: string | null;
      teamAdmin?: boolean;
    }
  ): Promise<SingleApiResponse<TeamMember>> {
    return this.patch<SingleApiResponse<TeamMember>>(
      `/v1/teams/${params.teamId}/members/${params.email}`,
      body
    );
  }

  /**
   * Remove a team member by email
   * @param teamId The ID of the team
   * @param email The email of the team member
   * @returns The removed team member
   */
  async removeTeamMember(params: {
    teamId: string;
    email: string;
  }): Promise<SingleApiResponse<TeamMember>> {
    return this.delete<SingleApiResponse<TeamMember>>(
      `/v1/teams/${params.teamId}/members/${params.email}`
    );
  }

  /**
   * Add a team member by email
   * @param teamId The ID of the team
   * @param email The email of the team member
   * @param body The body of the request
   * @returns The added team member
   */
  async addTeamMember(
    params: {
      teamId: string;
      email: string;
    },
    body: {
      name?: string | null;
      teamAdmin?: boolean;
    }
  ): Promise<SingleApiResponse<TeamMember>> {
    return this.put<SingleApiResponse<TeamMember>>(
      `/v1/teams/${params.teamId}/members/${params.email}`,
      body
    );
  }
}

export const teamMembersService = new TeamMembersService();
