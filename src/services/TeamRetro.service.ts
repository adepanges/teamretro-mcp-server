import { TeamRetroError } from '../types/errors.js';
import { config } from '../config.js';

export abstract class TeamRetroService {
  protected getAuthHeaders(): Record<string, string> {
    switch (config.auth.type) {
      case 'apiKey':
        if (!config.auth.apiKey) {
          throw new TeamRetroError('API_KEY_REQUIRED', 'AUTH_ERROR');
        }
        return { 'X-API-KEY': config.auth.apiKey };

      case 'basic':
        if (!config.auth.username || !config.auth.password) {
          throw new TeamRetroError('AUTH_CREDENTIALS_REQUIRED', 'AUTH_ERROR');
        }
        const basicAuth = Buffer.from(`${config.auth.username}:${config.auth.password}`).toString('base64');
        return { 'Authorization': `Basic ${basicAuth}` };

      case 'bearer':
        if (!config.auth.token) {
          throw new TeamRetroError('TOKEN_REQUIRED', 'AUTH_ERROR');
        }
        return { 'Authorization': `Bearer ${config.auth.token}` };

      default:
        throw new TeamRetroError('INVALID_AUTH_TYPE', 'AUTH_ERROR');
    }
  }

  /**
   * Base HTTP GET request handler
   * @param endpoint API endpoint
   * @param options Fetch options
   * @returns Parsed response data
   * @throws TeamRetroError on request failure
   */
  protected async get<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${config.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders(),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new TeamRetroError(
          'API_REQUEST_FAILED',
          response.status.toString()
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof TeamRetroError) {
        throw error;
      }
      throw new TeamRetroError(
        'REQUEST_FAILED',
        'REQUEST_ERROR'
      );
    }
  }
}
