#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError
} from '@modelcontextprotocol/sdk/types.js';

import { toolHandlers, toolSchema } from './tools.js';
import { formatClientError } from './utils/error.js';
import { logger } from './utils/logger.js';

class TeamRetroMCPServer {
  private server: Server;

  constructor() {
    // Initialize MCP server
    this.server = new Server(
      {
        name: "teamretro-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupTools();

    this.server.onerror = (error) => logger.error(error, { source: "MCP Server" });

    // Error handling
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupTools(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: toolSchema,
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args = {} } = request.params;
      let response;

      const func = toolHandlers[name];

      if (!func) {
        throw new McpError(ErrorCode.MethodNotFound, `Tool not found: ${name}`);
      }

      try {
        response = await func(args);
      } catch (error: any) {
        logger.error(error, { tool: name, arguments: args });
        const clientError = formatClientError(error);
        response = {
          isError: true,
          content: [
            {
              type: "text",
              text: clientError.message,
            },
          ],
        };
      }

      logger.info(`${name} Tool response:\n${JSON.stringify(response, null, 2)}`)

      return response;
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("TeamRetro MCP server running on stdio");
  }
}

const server = new TeamRetroMCPServer();
server.run().catch((error) => {
  logger.error(error, { context: "Server Startup" });
  const clientError = formatClientError(error);
  console.error(JSON.stringify(clientError));
});
