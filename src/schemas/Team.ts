import { z } from 'zod';

import {
    baseSchema, booleanSchema, hasName, hasNameEmail, idSchema, tagsSchema
} from './generic.js';

export const teamIdSchema = z.object({
  teamId: idSchema,
});

export const teamMemberSchema = baseSchema
  .extend({
    teamAdmin: booleanSchema,
  })
  .merge(hasNameEmail).merge(teamIdSchema);

export const teamSchema = baseSchema
  .extend({
    tags: tagsSchema.optional(),
    members: z.array(
      teamMemberSchema
        .pick({
          email: true,
          name: true,
          teamAdmin: true,
        })
    ).optional().describe('{ email: email, name?: string, teamAdmin: boolean }[]'),
  })
  .merge(hasName).merge(teamIdSchema);

export type Team = z.infer<typeof teamSchema>;

export type TeamMember = z.infer<typeof teamMemberSchema>;