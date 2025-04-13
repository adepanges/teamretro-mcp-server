import { z } from 'zod';
import { baseSchema, dateStringSchema, titleSchema } from './generic.js';
import { teamSchema } from './Team.js';

export const agreementSchema = baseSchema.extend({
  title: titleSchema,
  created: dateStringSchema,
  team: teamSchema.pick({ id: true, name: true, tags: true }),
});

export type Agreement = z.infer<typeof agreementSchema>;
