import { zodToJsonSchema } from 'zod-to-json-schema';

import { actionTools } from './features/actions/tools.js';
import { agreementTools } from './features/agreements/tools.js';
import { healthCheckTools } from './features/health-checks/tools.js';
import { healthModelTools } from './features/health-models/tools.js';
import { reportTools } from './features/reports/tools.js';
import { retrospectiveTools } from './features/retrospectives/tools.js';
import { teamMembersTools } from './features/team-members/tools.js';
import { teamTools } from './features/teams/tools.js';
import { userTools } from './features/users/tools.js';

const tools = {
  ...userTools,
  ...teamTools,
  ...teamMembersTools,
  ...actionTools,
  ...retrospectiveTools,
  ...agreementTools,
  ...healthModelTools,
  ...healthCheckTools,
  ...reportTools,
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
  toolHandlers[name] = async (args) => {
    return tool.handler(args);
  };
});

export { toolSchema, toolHandlers };
