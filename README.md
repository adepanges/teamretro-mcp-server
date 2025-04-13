# TeamRetro MCP Server

Model Context Protocol (MCP) server for TeamRetro integration.

<a href="https://glama.ai/mcp/servers/@adepanges/teamretro-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@adepanges/teamretro-mcp-server/badge" />
</a>

## Important Notes

### Unofficial MCP Server
This MCP server is an unofficial community-developed interface to TeamRetro's services. While not developed or endorsed by TeamRetro, it provides standardized access to their platform.

### Official API Integration
The server connects directly to TeamRetro's official public API:
- Uses documented endpoints from TeamRetro's API specifications
- Maintains full API compliance and version tracking
- Implements all required authentication methods
- Preserves original API responses without modification

Key points:
✅ MCP server: Unofficial community project  
✅ API connection: Direct to TeamRetro's official endpoints  
✅ Implementation: Follows published API specifications  

### API Documentation Source
All API endpoints and functionality are based on TeamRetro's official API documentation:
- Source: https://groupmap.stoplight.io/docs/teamretro/
- Implementation strictly follows the public API specifications
- Any changes to the TeamRetro API may affect this MCP server's functionality

## Available Tools

For a complete list of available MCP tools and their usage, see [TOOLS.md](TOOLS.md).

## Changelog

For a detailed list of changes and updates, see [CHANGELOG.md](CHANGELOG.md).

## How to Use

### NPX (Recommended, Easy Setup)

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

### From Source Code

1. Clone the repository, install dependencies, and build the project:
```bash
git clone https://github.com/adepanges/teamretro-mcp-server.git
cd teamretro-mcp-server
npm install
npm run build
```

#### Running in AI Client

1. Configure the AI client with the following settings:
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

#### Running with Inspector

1. Configure the environment variables by copying `.env.example` to `.env` and modifying it according to your needs.
2. Run the server with inspector:
```bash
npm run inspector
```

### Environment Variables Examples

#### Logging Configuration
```json
{
  "env": {
    "TEAMRETRO_LOG_ENABLED": true,
    "TEAMRETRO_LOG_DIR": "/your-directory/logs",
    "TEAMRETRO_LOG_LEVEL": "info",
    "TEAMRETRO_LOG_MAX_FILES": 30
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
