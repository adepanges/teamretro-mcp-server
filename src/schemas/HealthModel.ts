import { z } from 'zod';
import { baseSchema } from './generic.js';

export const dimensionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const healthModelSchema = baseSchema.extend({
  name: z.string(),
  dimensions: z.array(dimensionSchema),
});

export type HealthModel = z.infer<typeof healthModelSchema>;
