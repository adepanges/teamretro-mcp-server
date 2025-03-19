import { Action } from 'src/schemas/Action.js';
import { TeamRetroService } from 'src/services/TeamRetro.service.js';
import { createSearchParams } from 'src/utils/url.js';

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

  /**
   * Create a new action
   * @param data Action data
   * @returns Created action object
   */
  async createAction(data: Action): Promise<SingleApiResponse<Action>> {
    return this.post<SingleApiResponse<Action>>("/v1/actions", data);
  }

  async getAction(actionId: string): Promise<SingleApiResponse<Action>> {
    return this.get<SingleApiResponse<Action>>(`/v1/actions/${actionId}`);
  }

  /**
   * Update an existing action
   * @param actionId Action ID
   * @param data Action data to update
   * @returns Updated action object
   */
  async updateAction(
    actionId: string,
    data: Partial<Action>
  ): Promise<SingleApiResponse<Action>> {
    return this.patch<SingleApiResponse<Action>>(
      `/v1/actions/${actionId}`,
      data
    );
  }

  /**
   * Delete an existing action
   * @param actionId Action ID
   */
  async deleteAction(actionId: string): Promise<SingleApiResponse<any>> {
    return this.delete<any>(`/v1/actions/${actionId}`);
  }
}

export const actionsService = new ActionsService();
