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

### NPM Package (After Publishing)
```json
{
  "mcpServers": {
    "teamretro-mcp-server": {
      "command": "npx",
      "args": ["-y", "@adepanges/teamretro-mcp-server"],
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

## Available Tools

### list_teams
Get list teams from TeamRetro.

### get_team
Get team details from TeamRetro.
