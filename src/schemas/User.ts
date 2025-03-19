import { z } from 'zod';

import { baseSchema, booleanSchema, dateStringSchema, hasNameEmail } from './generic.js';

export const userSchema = baseSchema
  .extend({
    organizationAdmin: booleanSchema.optional(),
    created: dateStringSchema.optional(),
    active: booleanSchema.default(true).optional(),
  })
  .merge(hasNameEmail);


export type User = z.infer<typeof userSchema>;