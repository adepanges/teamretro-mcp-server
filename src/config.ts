import { ErrorMCP } from './utils/error.js';

export const config: TeamRetroConfig = {
  baseUrl: process.env.TEAMRETRO_BASE_URL ?? "",
  auth: {
    type: (process.env.TEAMRETRO_AUTH_TYPE as TeamRetroConfig['auth']['type']) ?? "apiKey",
    apiKey: process.env.TEAMRETRO_API_KEY,
    username: process.env.TEAMRETRO_USERNAME,
    password: process.env.TEAMRETRO_PASSWORD,
    token: process.env.TEAMRETRO_TOKEN,
  },
  responseFormat: (process.env.TEAMRETRO_RESPONSE_FORMAT as ResponseFormat) ?? 'simple'
};

// Validate configuration
if (!config.baseUrl) {
  throw new ErrorMCP('BASE_URL_REQUIRED', 'CONFIG_ERROR');
}

// Validate auth configuration based on type
switch (config.auth.type) {
  case 'apiKey':
    if (!config.auth.apiKey) {
      throw new ErrorMCP('API_KEY_REQUIRED', 'CONFIG_ERROR');
    }
    break;
  case 'basic':
    if (!config.auth.username || !config.auth.password) {
      throw new ErrorMCP('BASIC_AUTH_CREDENTIALS_REQUIRED', 'CONFIG_ERROR');
    }
    break;
  case 'bearer':
    if (!config.auth.token) {
      throw new ErrorMCP('BEARER_TOKEN_REQUIRED', 'CONFIG_ERROR');
    }
    break;
  default:
    throw new ErrorMCP('INVALID_AUTH_TYPE', 'CONFIG_ERROR');
}
