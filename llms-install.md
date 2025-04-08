# LLM Installation Guide for TeamRetro MCP Server

This document provides instructions for LLMs to install and configure the TeamRetro MCP Server using NPX.

## NPX Installation (Recommended)

The simplest way to install is using NPX:

```json
{
  "mcpServers": {
    "teamretro-mcp-server": {
      "command": "npx",
      "args": ["-y", "teamretro-mcp-server"],
      "env": {
        "TEAMRETRO_BASE_URL": "https://api.teamretro.com",
        "TEAMRETRO_AUTH_TYPE": "apiKey",
        "TEAMRETRO_API_KEY": "your-api-key"
      }
    }
  }
}
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

## Authentication Configuration Examples

### API Key Authentication (Default)
```json
{
  "env": {
    "TEAMRETRO_BASE_URL": "https://api.teamretro.com",
    "TEAMRETRO_AUTH_TYPE": "apiKey",
    "TEAMRETRO_API_KEY": "your-api-key"
  }
}
```

### Basic Authentication
```json
{
  "env": {
    "TEAMRETRO_BASE_URL": "https://api.teamretro.com",
    "TEAMRETRO_AUTH_TYPE": "basic",
    "TEAMRETRO_USERNAME": "your-username",
    "TEAMRETRO_PASSWORD": "your-password"
  }
}
```

### Bearer Token Authentication
```json
{
  "env": {
    "TEAMRETRO_BASE_URL": "https://api.teamretro.com",
    "TEAMRETRO_AUTH_TYPE": "bearer",
    "TEAMRETRO_TOKEN": "your-bearer-token"
  }
}
```

## Logging Configuration (Optional)

```json
{
  "env": {
    "LOG_ENABLED": true,
    "LOG_DIR": "/your-directory/logs",
    "LOG_LEVEL": "info",
    "LOG_MAX_FILES": 30
  }
}
```

## Notes
- This is an unofficial integration with TeamRetro.com
- All API calls are made directly to TeamRetro's public API endpoints
- For API documentation: https://groupmap.stoplight.io/docs/teamretro/
