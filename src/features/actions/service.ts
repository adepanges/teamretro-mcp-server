import { TeamRetroService } from '../../services/TeamRetro.service';
import { createSearchParams } from '../../utils/url';

export class ActionsService extends TeamRetroService {
  /**
   * Retrieves a paginated list of actions based on the provided parameters.
   * 
   * @param params - The parameters for filtering and pagination
   * @param params.offset - The number of items to skip before starting to collect the result set
   * @param params.limit - The maximum number of items to return
   * @param params.teamTags - Comma-separated list of team tags to filter by
   * @param params.teamIds - Comma-separated list of team IDs to filter by
   * @returns A promise that resolves to a paginated list of actions
   */
  async listActions(params?: {
    offset?: number;
    limit?: number;
    teamTags?: string;
    teamIds?: string;
  }): Promise<ListApiResponse<Action>> {
    const searchParams = createSearchParams({
      offset: { value: params?.offset },
      limit: { value: params?.limit },
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<ListApiResponse<Action>>(`/v1/actions?${searchParams}`);
  }
}