import { z } from 'zod';
import { healthCheckSchema } from 'src/schemas/HealthCheck.js';
import { idFilterSchema, paginationSchema, tagFilterSchema } from 'src/schemas/generic.js';
import { createToolResponse } from 'src/utils/tools.js';

import { healthChecksService } from './service.js';

export const healthCheckTools = {
  delete_health_check: {
    schema: healthCheckSchema.pick({ id: true }),
    description: "Delete an existing health check by specifying its unique identifier.",
    handler: async (args: { id: string }) =>
      createToolResponse(healthChecksService.deleteHealthCheck(args.id)),
  },

  get_health_check: {
    schema: healthCheckSchema.pick({ id: true }).extend({
      include: z.string().optional().describe("Comma delimited list of attributes to include (comments, ratings)"),
    }),
    description: "Retrieve a single health check by its unique identifier with optional attributes to include. This will return the health check's details including its title, date, team, health model, and status.",
    handler: async (args: { id: string; include?: string }) =>
      createToolResponse(healthChecksService.getHealthCheck(args.id, args.include)),
  },

  list_health_checks: {
    schema: paginationSchema.extend({
      healthModelIds: idFilterSchema,
      include: z.string().optional().describe("Comma delimited list of attributes to include (comments, ratings)"),
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "List health checks from TeamRetro with optional filtering by health model IDs, team tags, and team IDs, as well as pagination controls. This allows for retrieving a specific subset of health checks based on the provided criteria.",
    handler: async (args: {
      healthModelIds?: string;
      include?: string;
      offset?: number;
      limit?: number;
      teamTags?: string;
      teamIds?: string;
    }) => createToolResponse(healthChecksService.listHealthChecks(args)),
  },
};
