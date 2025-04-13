import { HealthModel, healthModelSchema } from 'src/schemas/HealthModel.js';
import { paginationSchema } from 'src/schemas/generic.js';
import { createToolResponse } from 'src/utils/tools.js';

import { healthModelsService } from './service.js';

export const healthModelTools = {
  get_health_model: {
    schema: healthModelSchema.pick({ id: true }),
    description: "Retrieve a single health model by its unique identifier. This will return the health model's details including its name, dimensions, and creation date.",
    handler: async (args: { id: string }) =>
      createToolResponse(healthModelsService.getHealthModel(args.id)),
  },

  list_health_models: {
    schema: paginationSchema,
    description: "List health models from TeamRetro with pagination controls. This allows for retrieving a specific subset of health models based on the provided offset and limit parameters.",
    handler: async (args: {
      offset?: number;
      limit?: number;
    }) => createToolResponse(healthModelsService.listHealthModels(args)),
  },
};
