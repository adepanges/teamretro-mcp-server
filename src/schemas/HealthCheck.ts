import { z } from 'zod';
import { baseSchema, dateStringSchema, titleSchema } from './generic.js';
import { teamSchema } from './Team.js';
import { healthModelSchema } from './HealthModel.js';

export const healthCheckSchema = baseSchema.extend({
  title: titleSchema,
  date: dateStringSchema,
  team: teamSchema.pick({ id: true, name: true, tags: true }),
  healthModel: healthModelSchema.pick({ id: true, name: true }),
  status: z.string(),
});

export type HealthCheck = z.infer<typeof healthCheckSchema>;
