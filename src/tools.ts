import { zodToJsonSchema } from 'zod-to-json-schema';

import { actionTools } from './features/actions/tools.js';
import { agreementTools } from './features/agreements/tools.js';
import { healthCheckTools } from './features/health-checks/tools.js';
import { healthModelTools } from './features/health-models/tools.js';
import { retrospectiveTools } from './features/retrospectives/tools.js';
import { teamMembersTools } from './features/team-members/tools.js';
import { teamTools } from './features/teams/tools.js';
import { userTools } from './features/users/tools.js';
import { formatClientError } from './utils/error.js';
import { logger } from './utils/logger.js';

const tools = {
  ...userTools,
  ...teamTools,
  ...teamMembersTools,
  ...actionTools,
  ...retrospectiveTools,
  ...agreementTools,
  ...healthModelTools,
  ...healthCheckTools,
};

const toolSchema = Object.entries(tools).map(([name, tool]) => ({
  name,
  description: tool.description,
  inputSchema: zodToJsonSchema(tool.schema, {
    $refStrategy: "none",
  }),
}));

const toolHandlers: {
  [name: string]: (args: any) => Promise<any>;
} = {};

Object.entries(tools).forEach(([name, tool]) => {
  toolHandlers[name] = (args: any) => toolErrorHandlers(tool.handler, args);
});

export { toolSchema, toolHandlers };

async function toolErrorHandlers(handler: (args: any) => Promise<any>, args: any): Promise<any> {
  let response: any;
  try {
    response = await handler(args);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error(err, { tool: name, args });
    const clientError = formatClientError(err);
    response = {
      isError: true,
      content: [{
        type: "text",
        text: clientError.message
      }]
    };
  }
  return response;
}