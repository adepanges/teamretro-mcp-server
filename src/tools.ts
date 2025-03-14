import { zodToJsonSchema } from "zod-to-json-schema";

import { teamTools } from "./features/teams/tools.js";
import { userTools } from "./features/users/tools.js";
import { teamMembersTools } from "./features/team-members/tools.js";

const tools = {
  ...teamTools,
  ...userTools,
  ...teamMembersTools,
};

const toolSchema = Object.entries(tools).map(([name, tool]) => ({
  name,
  description: tool.description,
  inputSchema: zodToJsonSchema(tool.schema),
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
