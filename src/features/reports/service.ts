import { TeamRetroService } from 'src/services/TeamRetro.service.js';
import { createSearchParams } from 'src/utils/url.js';

export class ReportsService extends TeamRetroService {
  async teamActivityReport(params?: {
    teamTags?: string;
    teamIds?: string;
  }): Promise<any> {
    const searchParams = createSearchParams({
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<any>(`/v1/reports/team-activity?${searchParams}`, {
      headers: {
        Accept: 'text/csv',
      },
    });
  }
}

export const reportsService = new ReportsService();
