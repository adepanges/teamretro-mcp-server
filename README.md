[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/adepanges-teamretro-mcp-server-badge.png)](https://mseep.ai/app/adepanges-teamretro-mcp-server)

# [TeamRetro](https://www.teamretro.com?utm_source=teamretro-mcp-server&utm_medium=github&utm_campaign=readme) MCP Server

A Model Context Protocol (MCP) server that provides AI-powered integration with [TeamRetro](https://www.teamretro.com?utm_source=teamretro-mcp-server&utm_medium=github&utm_campaign=readme)'s platform. This server acts as a bridge between AI clients and [TeamRetro's official API](https://groupmap.stoplight.io/docs/teamretro/), enabling seamless interaction with team management, retrospectives, health checks, and other [TeamRetro](https://www.teamretro.com?utm_source=teamretro-mcp-server&utm_medium=github&utm_campaign=readme) features through standardized MCP tools.

Key features:
- Complete TeamRetro API coverage with 20+ tools for managing teams, users, actions, and more
- Simplified AI client integration through standardized MCP interfaces
- Built-in pagination and filtering support for efficient data handling
- Secure API authentication handling and environment configuration
- Comprehensive documentation and easy setup options

Whether you're building AI-powered team analytics, automated retrospective management, or integrating [TeamRetro](https://www.teamretro.com?utm_source=teamretro-mcp-server&utm_medium=github&utm_campaign=readme) into your AI workflow, this MCP server provides the foundation you need.

<a href="https://smithery.ai/server/@adepanges/teamretro-mcp-server"><img alt="Smithery Badge" src="https://smithery.ai/badge/@adepanges/teamretro-mcp-server"></a>

<a href="https://glama.ai/mcp/servers/@adepanges/teamretro-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@adepanges/teamretro-mcp-server/badge" />
</a>

## Important Notes

### Unofficial MCP Server
This MCP server is an unofficial community-developed interface to [TeamRetro](https://www.teamretro.com?utm_source=teamretro-mcp-server&utm_medium=github&utm_campaign=readme)'s services. While not developed or endorsed by [TeamRetro](https://www.teamretro.com?utm_source=teamretro-mcp-server&utm_medium=github&utm_campaign=readme), it provides standardized access to their platform.

### Official API Integration
The server connects directly to [TeamRetro](https://www.teamretro.com?utm_source=teamretro-mcp-server&utm_medium=github&utm_campaign=readme)'s official public API:
- Uses documented endpoints from [TeamRetro](https://www.teamretro.com?utm_source=teamretro-mcp-server&utm_medium=github&utm_campaign=readme)'s API specifications
- Maintains full API compliance and version tracking
- Implements all required authentication methods
- Preserves original API responses without modification

### API Documentation Source
All API endpoints and functionality are based on [TeamRetro](https://www.teamretro.com?utm_source=teamretro-mcp-server&utm_medium=github&utm_campaign=readme)'s official documentation:

- API Help Article: https://help.teamretro.com/article/320-teamretro-api
- API Specifications: https://groupmap.stoplight.io/docs/teamretro/
- Implementation strictly follows the public API specifications
- Any changes to the TeamRetro API may affect this MCP server's functionality

## How to Use

### NPX (Recommended, Easy Setup)

```json
{
  "mcpServers": {
    "teamretro-mcp-server": {
      "command": "npx",
      "args": ["-y", "teamretro-mcp-server"],
      "env": {
        "TEAMRETRO_AUTH_TYPE": "apiKey",
        "TEAMRETRO_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Installing via Smithery

To install TeamRetro MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@adepanges/teamretro-mcp-server):

```bash
npx -y @smithery/cli install @adepanges/teamretro-mcp-server --client claude
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

### Base URL

The base URL for the [TeamRetro](https://www.teamretro.com?utm_source=teamretro-mcp-server&utm_medium=github&utm_campaign=readme) API can be set using the `TEAMRETRO_BASE_URL` environment variable. By default, it is set to `https://api.teamretro.com`.

```json
{
  "env": {
    "TEAMRETRO_BASE_URL": "https://api.teamretro.com"
  }
}
```

#### API Key Authentication
```json
{
  "env": {
    "TEAMRETRO_AUTH_TYPE": "apiKey",
    "TEAMRETRO_API_KEY": "your-api-key"
  }
}
```

## Available Tools

The server provides the following tools:

### Users
- `list_users`: List users with pagination using offset and limit parameters to control the number of results returned
- `add_user`: Add a new user or update an existing user's information by their email address, specifying optional name and emailAddress
- `update_user`: Update an existing user's details, such as their name and emailAddress, by providing their current email
- `delete_user`: Delete a user by their email address
- `get_user`: Retrieve detailed information about a single user by their email address

### Teams
- `list_teams`: List teams from TeamRetro with filtering by tags and IDs, and pagination using offset and limit parameters
- `detail_team`: Retrieve detailed information about a single team by its unique ID
- `update_team`: Update an existing team's details, such as its name and associated tags, by providing the team's ID
- `create_team`: Create a new team with a required name, and optional tags and members
- `delete_team`: Delete an existing team by its ID

### Team Members
- `list_team_members`: Retrieve a list of team members for a specified team ID with pagination controls for offset and limit
- `get_team_member`: Fetch a team member by their email address within a specified team
- `update_team_member`: Update a team member's details, such as their name or team admin status, by their email address within a specified team
- `remove_team_member`: Remove a team member from a team by their email address
- `add_team_member`: Add a new team member to a team by their email address, with optional specification of team admin status

### Actions
- `list_actions`: Retrieve a list of actions from TeamRetro with optional filtering by team tags and team IDs, and pagination controls for offset and limit
- `create_action`: Create a new action in TeamRetro with required details such as team ID, title, due date, completion status, and assigned user
- `get_action`: Fetch a single action by its unique ID from TeamRetro
- `update_action`: Update an existing action in TeamRetro with new details such as title, due date, completion status, priority, and assigned user
- `delete_action`: Delete an existing action from TeamRetro by its action ID

### Agreements
- `list_agreements`: List agreements from TeamRetro with optional filtering by team tags and team IDs, as well as pagination controls
- `create_agreement`: Create a new agreement in TeamRetro by specifying the team it belongs to and its title
- `get_agreement`: Retrieve a single agreement by its unique identifier
- `update_agreement`: Update an existing agreement's details such as its title or associated team
- `delete_agreement`: Delete an existing agreement by specifying its unique identifier

### Health Checks
- `list_health_checks`: List health checks from TeamRetro with optional filtering by health model IDs, team tags, and team IDs, as well as pagination controls
- `get_health_check`: Retrieve a single health check by its unique identifier with optional attributes to include
- `delete_health_check`: Delete an existing health check by specifying its unique identifier

### Health Models
- `list_health_models`: List health models from TeamRetro with pagination controls
- `get_health_model`: Retrieve a single health model by its unique identifier

### Retrospectives
- `list_retrospectives`: List retrospectives from TeamRetro with filtering by team tags and IDs, and pagination using offset and limit parameters
- `get_retrospective`: Retrieve detailed information about a single retrospective by its unique ID
- `delete_retrospective`: Delete an existing retrospective by its ID

## Changelog

For a detailed list of changes and updates, see [CHANGELOG.md](CHANGELOG.md).
