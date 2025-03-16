import { z } from "zod";

import {
  baseSchema,
  booleanSchema,
  hasName,
  hasNameEmail,
  tagsSchema,
} from "./generic.js";
import { autoDescribe } from "./helpers.js";

// ----------------------
// --- Entity Schemas ---
// ----------------------

export const teamMemberSchema = baseSchema
  .extend({
    teamAdmin: booleanSchema,
  })
  .merge(hasNameEmail);

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
    ).optional(),
  })
  .merge(hasName);

export type Team = z.infer<typeof teamSchema>;

export type TeamMember = z.infer<typeof teamMemberSchema>;