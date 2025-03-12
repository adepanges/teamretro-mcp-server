import { extractSchemaRequirements } from "./utils/tools.js";
import { teamTools } from "./features/teams/tools.js";
import { userTools } from "./features/users/tools.js";

const tools = {
  ...teamTools,
  ...userTools,
};

const toolSchema = Object.entries(tools).map(([name, tool]) => ({
  name,
  description: tool.description,
  inputSchema: {
    type: "object",
    properties: tool.schema,
    required: extractSchemaRequirements(tool.schema).required,
  },
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
