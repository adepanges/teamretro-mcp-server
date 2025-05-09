import { Agreement } from 'src/schemas/Agreement.js';
import { TeamRetroService } from 'src/services/TeamRetro.service.js';
import { createSearchParams } from 'src/utils/url.js';

export class AgreementsService extends TeamRetroService {
  /**
   * Create a new agreement
   * @param data Agreement data
   * @returns Created agreement object
   */
  async createAgreement(data: {
    team: { id: string };
    title: string;
  }): Promise<SingleApiResponse<Agreement>> {
    return this.post<SingleApiResponse<Agreement>>("/v1/agreements", data);
  }

  /**
   * Get a single agreement by ID
   * @param agreementId Agreement ID
   * @returns Agreement object
   */
  async getAgreement(agreementId: string): Promise<SingleApiResponse<Agreement>> {
    return this.get<SingleApiResponse<Agreement>>(`/v1/agreements/${agreementId}`);
  }

  /**
   * Update an existing agreement
   * @param agreementId Agreement ID
   * @param data Agreement data to update
   * @returns Updated agreement object
   */
  async updateAgreement(
    agreementId: string,
    data: {
      team?: { id: string };
      title?: string;
    }
  ): Promise<SingleApiResponse<Agreement>> {
    return this.patch<SingleApiResponse<Agreement>>(
      `/v1/agreements/${agreementId}`,
      data
    );
  }

  /**
   * Delete an existing agreement
   * @param agreementId Agreement ID
   */
  async deleteAgreement(agreementId: string): Promise<SingleApiResponse<any>> {
    return this.delete<any>(`/v1/agreements/${agreementId}`);
  }

  /**
   * Lists agreements with optional pagination and filtering.
   *
   * @param params - Optional parameters for filtering and pagination
   * @param params.offset - Number of records to skip (for pagination)
   * @param params.limit - Maximum number of records to return (for pagination)
   * @param params.teamTags - Comma-separated list of team tags to filter by
   * @param params.teamIds - Comma-separated list of team IDs to filter by
   * @returns Promise resolving to a paginated response containing Agreement objects
   */
  async listAgreements(params?: {
    offset?: number;
    limit?: number;
    teamTags?: string;
    teamIds?: string;
  }): Promise<ListApiResponse<Agreement>> {
    const searchParams = createSearchParams({
      offset: { value: params?.offset },
      limit: { value: params?.limit },
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<ListApiResponse<Agreement>>(`/v1/agreements?${searchParams}`);
  }
}

export const agreementsService = new AgreementsService();
