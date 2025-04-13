import { HealthCheck } from 'src/schemas/HealthCheck.js';
import { TeamRetroService } from 'src/services/TeamRetro.service.js';
import { createSearchParams } from 'src/utils/url.js';

export class HealthChecksService extends TeamRetroService {
  /**
   * Get a single health check by ID
   * @param healthCheckId Health Check ID
   * @param include Comma delimited list of attributes to include (comments, ratings)
   * @returns Health Check object
   */
  async getHealthCheck(healthCheckId: string, include?: string): Promise<SingleApiResponse<HealthCheck>> {
    const searchParams = createSearchParams({
      include: { value: include },
    });

    return this.get<SingleApiResponse<HealthCheck>>(`/v1/health-checks/${healthCheckId}?${searchParams}`);
  }

  /**
   * Delete an existing health check
   * @param healthCheckId Health Check ID
   */
  async deleteHealthCheck(healthCheckId: string): Promise<SingleApiResponse<any>> {
    return this.delete<any>(`/v1/health-checks/${healthCheckId}`);
  }

  /**
   * List health checks with filtering and pagination
   * @param params Filtering and pagination parameters
   * @param params.healthModelIds Comma delimited list of health model IDs to include
   * @param params.include Comma delimited list of attributes to include (comments, ratings)
   * @param params.offset Index of the first item to return
   * @param params.limit Maximum number of items to return
   * @param params.teamTags Comma delimited list of team tags to include
   * @param params.teamIds Comma delimited list of team IDs to include
   * @returns Paginated list of health checks
   */
  async listHealthChecks(params?: {
    healthModelIds?: string;
    include?: string;
    offset?: number;
    limit?: number;
    teamTags?: string;
    teamIds?: string;
  }): Promise<ListApiResponse<HealthCheck>> {
    const searchParams = createSearchParams({
      healthModelIds: { value: params?.healthModelIds },
      include: { value: params?.include },
      offset: { value: params?.offset },
      limit: { value: params?.limit },
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<ListApiResponse<HealthCheck>>(`/v1/health-checks?${searchParams}`);
  }
}

export const healthChecksService = new HealthChecksService();
