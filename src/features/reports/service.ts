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

  async teamActionsActivityReport(params?: {
    teamTags?: string;
    teamIds?: string;
  }): Promise<any> {
    const searchParams = createSearchParams({
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<any>(`/v1/reports/team-action-activity?${searchParams}`, {
      headers: {
        Accept: 'text/csv',
      },
    });
  }

  async retrospectiveActivityReport(params: {
    periodStart: string;
    periodEnd: string;
    teamTags?: string;
    teamIds?: string;
  }): Promise<any> {
    const searchParams = createSearchParams({
      periodStart: { value: params.periodStart },
      periodEnd: { value: params.periodEnd },
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<any>(`/v1/reports/retrospective-activity?${searchParams}`, {
      headers: {
        Accept: 'text/csv',
      },
    });
  }

  async healthCheckActivityReport(params: {
    periodStart: string;
    periodEnd: string;
    teamTags?: string;
    teamIds?: string;
  }): Promise<any> {
    const searchParams = createSearchParams({
      periodStart: { value: params.periodStart },
      periodEnd: { value: params.periodEnd },
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<any>(`/v1/reports/health-check-activity?${searchParams}`, {
      headers: {
        Accept: 'text/csv',
      },
    });
  }

  async teamHealthLatestReport(params: {
    healthModelId: string;
    periodStart?: string;
    periodEnd?: string;
    teamTags?: string;
    teamIds?: string;
  }): Promise<any> {
    const searchParams = createSearchParams({
      periodStart: { value: params?.periodStart },
      periodEnd: { value: params?.periodEnd },
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<any>(`/v1/reports/health/${params.healthModelId}/team-health-latest?${searchParams}`, {
      headers: {
        Accept: 'text/csv',
      },
    });
  }

  async teamHealthHistoricalReport(params: {
    healthModelId: string;
    periodStart?: string;
    periodEnd?: string;
    teamTags?: string;
    teamIds?: string;
  }): Promise<any> {
    const searchParams = createSearchParams({
      periodStart: { value: params?.periodStart },
      periodEnd: { value: params?.periodEnd },
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<any>(`/v1/reports/health/${params.healthModelId}/team-health-historical?${searchParams}`, {
      headers: {
        Accept: 'text/csv',
      },
    });
  }

  async usersReport(params?: {
    teamTags?: string;
    teamIds?: string;
  }): Promise<any> {
    const searchParams = createSearchParams({
      teamTags: { value: params?.teamTags },
      teamIds: { value: params?.teamIds },
    });

    return this.get<any>(`/v1/reports/users?${searchParams}`, {
      headers: {
        Accept: 'text/csv',
      },
    });
  }
}

export const reportsService = new ReportsService();
