import env from 'env-var';
import { fileURLToPath } from 'url';
import * as path from 'path';

function getCurrentDir() {
  return path.dirname(fileURLToPath(import.meta.url));
}

// Create env reader instance
const envVars = env.from(process.env);

export const config: TeamRetroConfig = {
  baseUrl: envVars.get('TEAMRETRO_BASE_URL')
    .default('https://api.teamretro.com')
    .asString(),
  auth: {
    type: envVars.get('TEAMRETRO_AUTH_TYPE')
      .default('apiKey')
      .asEnum(['apiKey', 'basic', 'bearer']) as TeamRetroConfig['auth']['type'],
    apiKey: envVars.get('TEAMRETRO_API_KEY').asString(),
    username: envVars.get('TEAMRETRO_USERNAME').asString(),
    password: envVars.get('TEAMRETRO_PASSWORD').asString(),
    token: envVars.get('TEAMRETRO_TOKEN').asString(),
  },
  responseFormat: envVars.get('TEAMRETRO_RESPONSE_FORMAT')
    .default('simple')
    .asEnum(['simple', 'json']) as ResponseFormat,
  log: {
    enabled: envVars.get('LOG_ENABLED')
      .default('false')
      .asBool(),
    dir: envVars.get('LOG_DIR')
      .default(path.join(getCurrentDir(), '..', 'logs'))
      .asString(),
    level: envVars.get('LOG_LEVEL')
      .default('info')
      .asEnum(['error', 'warn', 'info', 'debug']),
    maxFiles: envVars.get('LOG_MAX_FILES').default(30).asInt()
  }
};

// Validate auth configuration based on type
switch (config.auth.type) {
  case 'apiKey':
    if (!config.auth.apiKey) {
      throw new TeamRetroError('API_KEY_REQUIRED', 'CONFIG_ERROR');
    }
    break;
  case 'basic':
    if (!config.auth.username || !config.auth.password) {
      throw new TeamRetroError('BASIC_AUTH_CREDENTIALS_REQUIRED', 'CONFIG_ERROR');
    }
    break;
  case 'bearer':
    if (!config.auth.token) {
      throw new TeamRetroError('BEARER_TOKEN_REQUIRED', 'CONFIG_ERROR');
    }
    break;
}
