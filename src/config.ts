import env from 'env-var';
import fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

function getCurrentDir() {
  return path.dirname(fileURLToPath(import.meta.url));
}

const packageJsonPath = path.join(getCurrentDir(), '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Create env reader instance
const envVars = env.from(process.env);

export const config: TeamRetroConfig = {
  version: "v" + packageJson.version,
  baseUrl: envVars.get('TEAMRETRO_BASE_URL')
    .default('https://api.teamretro.com')
    .asString(),
  auth: {
    type: envVars.get('TEAMRETRO_AUTH_TYPE')
      .default('apiKey')
      .asEnum(['apiKey']) as TeamRetroConfig['auth']['type'],
    apiKey: envVars.get('TEAMRETRO_API_KEY').asString(),
    username: envVars.get('TEAMRETRO_USERNAME').asString(),
    password: envVars.get('TEAMRETRO_PASSWORD').asString(),
    token: envVars.get('TEAMRETRO_TOKEN').asString(),
  },
  responseFormat: envVars.get('TEAMRETRO_RESPONSE_FORMAT')
    .default('simple')
    .asEnum(['simple', 'json']) as ResponseFormat,
  log: {
    enabled: envVars.get('TEAMRETRO_LOG_ENABLED')
      .default('false')
      .asBool(),
    dir: envVars.get('TEAMRETRO_LOG_DIR')
      .default(path.join(getCurrentDir(), '..', 'logs'))
      .asString(),
    level: envVars.get('TEAMRETRO_LOG_LEVEL')
      .default('info')
      .asEnum(['error', 'warn', 'info', 'debug']),
    maxFiles: envVars.get('TEAMRETRO_LOG_MAX_FILES').default(30).asInt()
  }
};

// Validate auth configuration based on type
switch (config.auth.type) {
  case 'apiKey':
    if (!config.auth.apiKey) {
      throw new TeamRetroError('API_KEY_REQUIRED', 'CONFIG_ERROR');
    }
    break;
}
