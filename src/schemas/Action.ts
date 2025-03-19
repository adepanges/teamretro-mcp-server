import { z } from 'zod';

import {
  baseSchema, dateStringSchema, hasEmail, idSchema,
  titleSchema
} from './generic.js';
import { teamSchema } from './Team.js';

export const actionSchema = baseSchema.extend({
  title: titleSchema,
  priority: z.enum(["low", "medium", "high"]).optional(),
  due: dateStringSchema.nullable().optional(),
  completed: dateStringSchema.nullable().optional(),
  complete: dateStringSchema.optional(),
  team: teamSchema.pick({ id: true, name: true, tags: true }),
  teamId: idSchema,
  assignedTo: z
    .array(hasEmail)
    .max(16)
    .default([])
    .optional()
    .describe("{ email: string }[]"),
});

export type Action = z.infer<typeof actionSchema>;
