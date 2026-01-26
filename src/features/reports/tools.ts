import { z } from 'zod';
import { dateSchema, idFilterSchema, idSchema, tagFilterSchema } from 'src/schemas/generic.js';

import { reportsService } from './service.js';
import { createToolResponse } from 'src/utils/tools.js';

export const reportTools = {
  team_activity_report: {
    schema: z.object({
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "Generate a team activity report from TeamRetro with filtering by team tags and team IDs",
    handler: async (args: {
      teamTags?: string;
      teamIds?: string;
    }) => {
      return createToolResponse(
         reportsService.teamActivityReport(args)
       );
    }
  },

  team_actions_activity_report: {
    schema: z.object({
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "Generate a team actions activity report from TeamRetro with filtering by team tags and team IDs. Returns CSV data with action statistics including open, completed, and overdue action counts grouped by age ranges.",
    handler: async (args: {
      teamTags?: string;
      teamIds?: string;
    }) => {
      return createToolResponse(
         reportsService.teamActionsActivityReport(args)
       );
    }
  },

  retrospective_activity_report: {
    schema: z.object({
      periodStart: dateSchema,
      periodEnd: dateSchema,
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "Generate a retrospective activity report from TeamRetro with filtering by date range, team tags and team IDs. Returns CSV data with retrospective statistics including participation rate, idea count, comment count, action count, and agreement count.",
    handler: async (args: {
      periodStart: string;
      periodEnd: string;
      teamTags?: string;
      teamIds?: string;
    }) => {
      return createToolResponse(
         reportsService.retrospectiveActivityReport(args)
       );
    }
  },

  health_check_activity_report: {
    schema: z.object({
      periodStart: dateSchema,
      periodEnd: dateSchema,
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "Generate a health check activity report from TeamRetro with filtering by date range, team tags and team IDs. Returns CSV data with health check statistics including participation rate, comment count, action count, and agreement count.",
    handler: async (args: {
      periodStart: string;
      periodEnd: string;
      teamTags?: string;
      teamIds?: string;
    }) => {
      return createToolResponse(
         reportsService.healthCheckActivityReport(args)
       );
    }
  },

  team_health_latest_report: {
    schema: z.object({
      healthModelId: idSchema,
      periodStart: dateSchema.optional(),
      periodEnd: dateSchema.optional(),
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "Generate a team health (latest) report from TeamRetro for a specific health model with filtering by date range, team tags and team IDs. Returns CSV data with latest team health scores including health dimensions.",
    handler: async (args: {
      healthModelId: string;
      periodStart?: string;
      periodEnd?: string;
      teamTags?: string;
      teamIds?: string;
    }) => {
      return createToolResponse(
         reportsService.teamHealthLatestReport(args)
       );
    }
  },

  team_health_historical_report: {
    schema: z.object({
      healthModelId: idSchema,
      periodStart: dateSchema.optional(),
      periodEnd: dateSchema.optional(),
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "Generate a team health (historical) report from TeamRetro for a specific health model with filtering by date range, team tags and team IDs. Returns CSV data with historical team health scores including health dimensions.",
    handler: async (args: {
      healthModelId: string;
      periodStart?: string;
      periodEnd?: string;
      teamTags?: string;
      teamIds?: string;
    }) => {
      return createToolResponse(
         reportsService.teamHealthHistoricalReport(args)
       );
    }
  },

  users_report: {
    schema: z.object({
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "Generate a users report from TeamRetro with filtering by team tags and team IDs. Returns CSV data with user information including account roles, team memberships, and activity statistics.",
    handler: async (args: {
      teamTags?: string;
      teamIds?: string;
    }) => {
      return createToolResponse(
         reportsService.usersReport(args)
       );
    }
  },
};
