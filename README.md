# TeamRetro MCP Server

Model Context Protocol (MCP) server for TeamRetro integration.

## Important Notes

### Unofficial Integration
This is an unofficial integration with TeamRetro.com. This MCP server is a community-developed tool and is not affiliated with, endorsed by, or officially connected to TeamRetro.com or its parent company.

### API Integration Approach
This MCP server operates as a direct pass-through to TeamRetro's public API endpoints:
- All API calls are made directly to TeamRetro's public API endpoints
- No request interception or modification is performed
- Responses are passed through as received from TeamRetro's API
- Authentication is handled using your provided credentials

### API Documentation Source
All API endpoints and functionality are based on TeamRetro's official API documentation:
- Source: https://groupmap.stoplight.io/docs/teamretro/
- Implementation strictly follows the public API specifications
- Any changes to the TeamRetro API may affect this MCP server's functionality

## Available Tools

For a complete list of available MCP tools and their usage, see [TOOLS.md](TOOLS.md).

## Installation

```bash
git clone https://github.com/adepanges/teamretro-mcp-server.git
cd teamretro-mcp-server
npm install
npm run build
```

## Claude Integration

Add to your Claude MCP settings (`cline_mcp_settings.json`):

### Local Development
```json
{
  "mcpServers": {
    "teamretro-mcp-server": {
      "command": "node",
      "args": ["/path/to/teamretro-mcp-server/dist/index.js"],
      "env": {
        "TEAMRETRO_BASE_URL": "https://api.teamretro.com",
        "TEAMRETRO_AUTH_TYPE": "apiKey",
        "TEAMRETRO_API_KEY": "your-api-key"
      }
    }
  }
}
```

### NPM Package
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

### Environment Variables Examples

#### Logging Configuration
```json
{
  "env": {
    "LOG_DIR": "/your-directory/logs",  // Custom log directory path
    "LOG_LEVEL": "info",  // error, warn, info, debug
    "LOG_MAX_FILES": 30   // Maximum number of log files to keep
  }
}
```

#### API Key Authentication (Default)
```json
{
  "env": {
    "TEAMRETRO_BASE_URL": "https://api.teamretro.com",
    "TEAMRETRO_AUTH_TYPE": "apiKey",
    "TEAMRETRO_API_KEY": "your-api-key"
  }
}
```

#### Basic Authentication
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

#### Bearer Token Authentication
```json
{
  "env": {
    "TEAMRETRO_BASE_URL": "https://api.teamretro.com",
    "TEAMRETRO_AUTH_TYPE": "bearer",
    "TEAMRETRO_TOKEN": "your-bearer-token"
  }
}
```


## Changelog

### [v0.2.21](changelog/v0.2.21.md)
### [v0.2.23](changelog/v0.2.23.md)