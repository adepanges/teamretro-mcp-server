# LLM Installation Guide for TeamRetro MCP Server

This document provides instructions for LLMs to install and configure the TeamRetro MCP Server using NPX.

## NPX Installation (Recommended)

The simplest way to install is using NPX:

**Environment Configuration:**
```json
{"mcpServers":{"teamretro-mcp-server":{"command":"npx","args":["-y","teamretro-mcp-server"],"env":{"TEAMRETRO_AUTH_TYPE":"apiKey","TEAMRETRO_API_KEY":"your-api-key"}}}}
```

## Required Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| TEAMRETRO_BASE_URL | No | TeamRetro API base URL (default: https://api.teamretro.com) |
| TEAMRETRO_AUTH_TYPE | Yes | Authentication type (apiKey, basic, or bearer) |
| TEAMRETRO_API_KEY | Conditional | Required when TEAMRETRO_AUTH_TYPE=apiKey |
| TEAMRETRO_USERNAME | Conditional | Required when TEAMRETRO_AUTH_TYPE=basic |
| TEAMRETRO_PASSWORD | Conditional | Required when TEAMRETRO_AUTH_TYPE=basic |
| TEAMRETRO_TOKEN | Conditional | Required when TEAMRETRO_AUTH_TYPE=bearer |

## Environment Configuration Tables

### API Key Authentication
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| TEAMRETRO_AUTH_TYPE | Yes | Must be set to `apiKey` | `apiKey` |
| TEAMRETRO_API_KEY | Yes | Your TeamRetro API key | `your-api-key` |

### Logging Configuration
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| TEAMRETRO_LOG_ENABLED | No | Enable logging (default false) | `true` |
| TEAMRETRO_LOG_DIR | No | Log directory path | `/your-directory/logs` |
| TEAMRETRO_LOG_LEVEL | No | Log level (error, warn, info, debug) | `info` |
| TEAMRETRO_LOG_MAX_FILES | No | Maximum log files to keep | `30` |
