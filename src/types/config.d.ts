declare global {
  /**
   * Response format configuration
   * - json: Raw JSON response
   * - simple: Formatted table/item view
   */
  type ResponseFormat = 'json' | 'simple';

  interface LogConfig {
    dir: string;
    level: 'error' | 'warn' | 'info' | 'debug';
    maxFiles?: number;
    enabled: boolean;
  }

  // Service Configuration type
  interface TeamRetroConfig {
    baseUrl: string;
    auth: {
      type: 'apiKey' | 'basic' | 'bearer';
      // For API Key auth
      apiKey?: string;
      // For Basic auth
      username?: string;
      password?: string;
      // For Bearer auth
      token?: string;
    };
    responseFormat: ResponseFormat;
    log: LogConfig;
  }
}

// This export is needed to make this file a module
export {};
