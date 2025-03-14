# TeamRetro MCP Server - Cline Context

## Architecture and Code Structure

The project follows a modular architecture with clear separation of concerns:

```
teamretro-mcp-server/
├── src/
│   ├── config.ts                 # Configuration management
│   ├── index.ts                  # Main entry point and server setup
│   ├── tools.ts                  # Tool registration and handling
│   ├── features/                 # Feature modules
│   │   ├── [feature name]/       # Feature directory
│   │   │   ├── service.ts        # Feature API service
│   │   │   └── tools.ts          # Feature tools definition
│   ├── services/
│   │   └── TeamRetro.service.ts  # Base service for API communication
│   ├── types/                    # Type definitions
│   │   ├── api.d.ts              # API response types
│   │   ├── config.d.ts           # Configuration types
│   │   ├── [feature name].d.ts   # feature-related types
│   └── utils/                    # Utility functions
│       ├── error.ts              # Error handling
│       ├── formatter.ts          # Response formatting
│       ├── tools.ts              # Tool utilities
│       └── url.ts                # URL parameter handling
```

### Key Components

1. **Main Server (index.ts)**: Sets up the MCP server, registers tools and resources, and handles requests.

2. **Feature Modules**: Each feature (teams, users) has its own module with:
   - **Service**: Handles API communication for the feature
   - **Tools**: Defines the tools exposed to the AI assistant

3. **Base Service (TeamRetro.service.ts)**: Abstract class that handles authentication and HTTP requests to the TeamRetro API.

4. **Configuration (config.ts)**: Manages environment variables and server configuration.

5. **Utilities**: Helper functions for formatting responses, handling errors, and more.

## Important Considerations for AI Assistants

1. **Authentication Requirements**: Before using any tools, ensure that the proper authentication environment variables are set. The server will throw an error if the required credentials are missing.

2. **Error Handling**: The server uses a custom ErrorMCP class for error handling. Be prepared to handle errors related to authentication, API requests, and validation.

3. **Response Formatting**: The server can return responses in two formats:
   - **simple**: Human-readable formatted tables or items (default)
   - **json**: Raw JSON data

4. **API Limitations**: As this is a pass-through to TeamRetro's API, be aware of any rate limits or restrictions that may apply.

5. **ID Format**: TeamRetro uses a specific format for IDs (22 characters, alphanumeric). Validation is in place to ensure IDs match this format.

6. **Pagination**: List operations support pagination with offset and limit parameters. Default limit is 1000 items.
