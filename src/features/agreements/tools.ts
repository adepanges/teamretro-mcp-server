import { Agreement, agreementSchema } from 'src/schemas/Agreement.js';
import { idFilterSchema, paginationSchema, tagFilterSchema } from 'src/schemas/generic.js';
import { createToolResponse } from 'src/utils/tools.js';

import { agreementsService } from './service.js';

export const agreementTools = {
  delete_agreement: {
    schema: agreementSchema.pick({ id: true }),
    description: "Delete an existing agreement by specifying its unique identifier",
    handler: async (args: { id: string }) =>
      createToolResponse(agreementsService.deleteAgreement(args.id)),
  },

  update_agreement: {
    schema: agreementSchema.pick({
      id: true,
      team: true,
      title: true,
    }),
    description: "Update an existing agreement's details such as its title or associated team. Provide the agreement ID and the fields you wish to update.",
    handler: async (args: { id: string; team?: { id: string }; title?: string }) => {
      let { id, ...data } = args;
      return createToolResponse(agreementsService.updateAgreement(id, data));
    },
  },

  get_agreement: {
    schema: agreementSchema.pick({ id: true }),
    description: "Retrieve a single agreement by its unique identifier. This will return the agreement's details including its title, associated team, and creation date.",
    handler: async (args: { id: string }) =>
      createToolResponse(agreementsService.getAgreement(args.id)),
  },

  create_agreement: {
    schema: agreementSchema.pick({
      team: true,
      title: true,
    }),
    description: "Create a new agreement in TeamRetro by specifying the team it belongs to and its title. This will return the newly created agreement with its unique identifier and other details.",
    handler: async (args: { team: { id: string }; title: string }) =>
      createToolResponse(agreementsService.createAgreement(args)),
  },

  list_agreements: {
    schema: paginationSchema.extend({
      teamTags: tagFilterSchema,
      teamIds: idFilterSchema,
    }),
    description: "List agreements from TeamRetro with optional filtering by team tags and team IDs, as well as pagination controls. This allows for retrieving a specific subset of agreements based on the provided criteria.",
    handler: async (args: {
      offset?: number;
      limit?: number;
      teamTags?: string;
      teamIds?: string;
    }) => createToolResponse(agreementsService.listAgreements(args)),
  },
};
