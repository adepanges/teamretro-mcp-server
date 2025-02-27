#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema, ErrorCode, ListResourcesRequestSchema,
    ListResourceTemplatesRequestSchema, ListToolsRequestSchema, McpError, ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js';

import { handleTeamTool, teamTools } from './features/index.js';
import { ErrorMCP } from './utils/error.js';

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
          resources: {},
          tools: {},
        },
      }
    );

    this.setupResourceHandlers();
    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupResourceHandlers(): void {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [],
    }));

    // List resource templates
    this.server.setRequestHandler(
      ListResourceTemplatesRequestSchema,
      async () => ({
        resourceTemplates: [],
      })
    );

    // Handle resource requests
    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request) => {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Resource not found: ${request.params.uri}`
        );
      }
    );
  }

  private setupToolHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        ...teamTools
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        return await handleTeamTool(request.params.name, request);
      } catch (error) {
        if (error instanceof ErrorMCP) {
          throw new McpError(ErrorCode.InternalError, error.message);
        }
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Tool not found: ${request.params.name}`
        );
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('TeamRetro MCP server running on stdio');
  }
}

const server = new TeamRetroMCPServer();
server.run().catch(console.error);
