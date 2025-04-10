import { Retrospective } from '../../schemas/Retrospective.js';
import { TeamRetroService } from '../../services/TeamRetro.service.js';
import { createSearchParams } from '../../utils/url.js';

export class RetrospectivesService extends TeamRetroService {
  /**
   * Retrieves a paginated list of retrospectives based on the provided parameters.
   *
   * @param params - The parameters for filtering and pagination
   * @param params.offset - The number of items to skip before starting to collect the result set
   * @param params.limit - The maximum number of items to return
   * @param params.teamTags - Comma-separated list of team tags to filter by
   * @param params.teamIds - Comma-separated list of team IDs to filter by
   * @returns A promise that resolves to a paginated list of retrospectives
   */
  async listRetrospectives(params?: {
    offset?: number;
    limit?: number;
    teamTags?: string;
    teamIds?: string;
  }): Promise<ListApiResponse<Retrospective>> {
    const searchParams = createSearchParams({
      offset: { value: params?.offset },
      limit: { value: params?.limit },
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<ListApiResponse<Retrospective>>(`/v1/retrospectives?${searchParams}`);
  }

  /**
   * Get a single retrospective by ID
   * @param id Retrospective ID
   * @returns Retrospective object
   */
  async getRetrospective(id: string): Promise<SingleApiResponse<Retrospective>> {
    return this.get<SingleApiResponse<Retrospective>>(`/v1/retrospectives/${id}`);
  }

  /**
   * Delete a retrospective
   * @param id Retrospective ID
   */
  async deleteRetrospective(id: string): Promise<SingleApiResponse<any>> {
    return this.delete<any>(`/v1/retrospectives/${id}`);
  }
}

export const retrospectivesService = new RetrospectivesService();
