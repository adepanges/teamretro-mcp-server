import { z } from 'zod';

import { baseSchema, dateStringSchema, idSchema, titleSchema } from './generic.js';
import { teamSchema } from './Team.js';

export const retrospectiveIdSchema = z.object({
  retrospectiveId: idSchema,
});

export const topicSchema = z.object({
  title: titleSchema,
  description: z.string().min(1).max(1000),
});

export const retrospectiveSchema = baseSchema.extend({
  title: titleSchema,
  date: dateStringSchema,
  status: z.enum(["open", "closed", "archived"]).default("open"),
  team: teamSchema.pick({ id: true, name: true, tags: true }),
  teamId: idSchema,
  topics: z.array(topicSchema).min(1).max(20),
  created: dateStringSchema.optional(),
}).merge(retrospectiveIdSchema);

export type Retrospective = z.infer<typeof retrospectiveSchema>;
export type Topic = z.infer<typeof topicSchema>;
