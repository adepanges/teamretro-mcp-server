import { HealthModel } from 'src/schemas/HealthModel.js';
import { TeamRetroService } from 'src/services/TeamRetro.service.js';
import { createSearchParams } from 'src/utils/url.js';

export class HealthModelsService extends TeamRetroService {
  /**
   * Get a single health model by ID
   * @param healthModelId Health Model ID
   * @returns Health Model object
   */
  async getHealthModel(healthModelId: string): Promise<SingleApiResponse<HealthModel>> {
    return this.get<SingleApiResponse<HealthModel>>(`/v1/health-models/${healthModelId}`);
  }

  /**
   * List health models with pagination
   * @param params Pagination parameters
   * @param params.offset Index of the first item to return
   * @param params.limit Maximum number of items to return
   * @returns Paginated list of health models
   */
  async listHealthModels(params?: {
    offset?: number;
    limit?: number;
  }): Promise<ListApiResponse<HealthModel>> {
    const searchParams = createSearchParams({
      offset: { value: params?.offset },
      limit: { value: params?.limit },
    });

    return this.get<ListApiResponse<HealthModel>>(`/v1/health-models?${searchParams}`);
  }
}

export const healthModelsService = new HealthModelsService();
