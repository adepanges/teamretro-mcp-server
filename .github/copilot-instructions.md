# Copilot Coding Agent Instructions

## Project Overview

This is a **TypeScript MCP (Model Context Protocol) server** that integrates with the [TeamRetro API](https://groupmap.stoplight.io/docs/teamretro/). It acts as a bridge between AI clients and TeamRetro's platform, providing 20+ tools for managing teams, users, actions, retrospectives, agreements, health checks, health models, and reports.

The server communicates over **stdio** using the `@modelcontextprotocol/sdk`.

## Tech Stack

- **Runtime**: Node.js ≥ 18
- **Language**: TypeScript (ES2020 target, ES2022 modules)
- **Package Manager**: pnpm (v9, lockfile version 9.0)
- **Schema Validation**: Zod
- **Build**: `tsc` + `tsc-alias` (for path alias resolution)

## Build & Run Commands

```bash
pnpm install          # Install dependencies (also runs build via "prepare" script)
pnpm run build        # Clean build: rimraf dist && tsc && tsc-alias
pnpm run watch        # Dev mode with auto-rebuild
pnpm run start        # Run the server: node dist/index.js
pnpm run inspector    # Build and launch MCP inspector (requires .env file)
pnpm run clean        # Remove dist/
```

### Build Errors to Watch For

- The `pnpm install` step triggers `prepare` which runs `pnpm run build`. If `pnpm` is not installed globally, install it first: `npm install -g pnpm@9`.
- The `TEAMRETRO_API_KEY` environment variable is **required** at runtime. Without it, the server will throw a `TeamRetroError` with code `CONFIG_ERROR` on startup. For build-only tasks, this is not needed.

## Testing

There is **no test infrastructure** in this project. The `test` script in package.json is: `echo "Error: no test specified" && exit 0`. Do not add test frameworks unless explicitly asked to.

## Project Structure

```
src/
├── index.ts                  # Entry point: TeamRetroMCPServer class, stdio transport
├── config.ts                 # Environment variable loading via env-var
├── tools.ts                  # Tool registry: aggregates all feature tools, creates schemas & handlers
├── features/                 # Feature modules (one per API domain)
│   ├── actions/              # Each feature has: service.ts + tools.ts
│   ├── agreements/
│   ├── health-checks/
│   ├── health-models/
│   ├── reports/
│   ├── retrospectives/
│   ├── team-members/
│   ├── teams/
│   └── users/
├── schemas/                  # Zod schemas for API entities
│   ├── generic.ts            # Shared schemas: pagination, id, name, email, date, tags
│   ├── Action.ts
│   ├── Agreement.ts
│   ├── Base.ts
│   ├── HealthCheck.ts
│   ├── HealthModel.ts
│   ├── Retrospective.ts
│   ├── Team.ts
│   └── User.ts
├── services/
│   └── TeamRetro.service.ts  # Abstract HTTP client base class (get/post/patch/put/delete)
├── types/                    # TypeScript type declarations
│   ├── api.d.ts              # Global API response types (ListApiResponse, SingleApiResponse)
│   ├── config.d.ts           # Global config types (TeamRetroConfig, LogConfig)
│   ├── errors.d.ts           # TeamRetroError class
│   └── tool.ts               # Tool/Tools types
└── utils/
    ├── error.ts              # ErrorMCP class and formatClientError
    ├── formatter.ts          # Markdown table/item formatting for "simple" response mode
    ├── logger.ts             # File-based logger singleton
    ├── tools.ts              # createToolResponse, toolErrorHandlers
    └── url.ts                # URL search params helper
```

## Architecture & Patterns

### Feature Module Pattern

Each domain (actions, teams, users, etc.) follows this pattern:

1. **`service.ts`**: A class extending `TeamRetroService` (the abstract HTTP base class). Contains methods that call the TeamRetro REST API endpoints. Instantiates and exports a singleton service instance.
2. **`tools.ts`**: Exports a `Tools` record mapping tool names to `{ schema, description, handler }`. Schemas are Zod objects. Handlers call the service and wrap results with `createToolResponse()`.

### Adding a New Tool

1. Create or update a Zod schema in `src/schemas/`.
2. Add a service method in the relevant `src/features/<domain>/service.ts`.
3. Add a tool definition in `src/features/<domain>/tools.ts`.
4. Import and spread the new tools object in `src/tools.ts`.

### Key Conventions

- **Path aliases**: `src/*` maps to `./src/*` and `@types/*` maps to `src/types/*` (configured in `tsconfig.json`, resolved at build time by `tsc-alias`). Import paths in source use these aliases (e.g., `import { config } from 'src/config.js'`).
- **`.js` extensions in imports**: All TypeScript imports use `.js` extensions (ESM convention).
- **Global types**: `api.d.ts`, `config.d.ts`, and `errors.d.ts` use `declare global` to make types available without imports (`ListApiResponse`, `SingleApiResponse`, `TeamRetroConfig`, etc.).
- **Error handling**: Use `ErrorMCP` for operational errors. Tool handlers are wrapped by `toolErrorHandlers()` which catches errors and returns MCP-compliant error responses.
- **Response formatting**: Two modes controlled by `TEAMRETRO_RESPONSE_FORMAT` env var — `simple` (markdown tables) or `json` (raw JSON). CSV responses from reports are auto-converted to markdown.
- **Authentication**: Only `apiKey` auth type is currently supported (sent as `X-API-KEY` header).
- **Logging**: File-based logger configured via environment variables. Logs go to stderr (not stdout, since stdout is reserved for MCP stdio transport).

## CI/CD Workflows

- **CodeQL** (`codeql.yaml`): Runs on PRs to `master`/`develop` for JS/TS analysis.
- **DevSkim** (`devskim.yml`): Security linting on push to `master`/`develop` and PRs to `master`.
- **DeepSeek Review** (`deepseek-review.yaml`): AI code review on PRs with `deepseek-review` label.
- **Prerelease** (`1-prerelease-version.yaml`): Creates alpha tags on PR merges to `develop`.
- **Release** (`2-release-version.yaml`): Creates version branches and updates changelog.
- **Publish** (`3-publish-package.yaml`): Publishes to npm (manual dispatch).

## Git Workflow

Follows **GitFlow**:
- `master` — production
- `develop` — integration
- `feature/`, `bugfix/`, `hotfix/`, `doc/`, `misc/` — branch prefixes
- PRs target `develop` (features) or `master` (hotfixes)
- Commit messages: present tense, capitalize first letter (e.g., "Add feature")

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `TEAMRETRO_API_KEY` | Yes (runtime) | — | TeamRetro API key |
| `TEAMRETRO_AUTH_TYPE` | No | `apiKey` | Auth type (only `apiKey` supported) |
| `TEAMRETRO_BASE_URL` | No | `https://api.teamretro.com` | API base URL |
| `TEAMRETRO_RESPONSE_FORMAT` | No | `simple` | `simple` or `json` |
| `TEAMRETRO_LOG_ENABLED` | No | `false` | Enable file logging |
| `TEAMRETRO_LOG_DIR` | No | `./logs` | Log directory path |
| `TEAMRETRO_LOG_LEVEL` | No | `info` | `error`, `warn`, `info`, `debug` |
| `TEAMRETRO_LOG_MAX_FILES` | No | `30` | Max log files to retain |
