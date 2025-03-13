
import { config } from '../config.js';
import { ErrorMCP } from '../utils/error.js';

export abstract class TeamRetroService {
  /**
   * Get authentication headers based on the auth type
   * @returns Authentication headers
   * @throws ErrorMCP on invalid auth type or missing credentials
   */
  protected getAuthHeaders(): Record<string, string> {
    switch (config.auth.type) {
      case 'apiKey':
        if (!config.auth.apiKey) {
          throw new ErrorMCP('API_KEY_REQUIRED', 'AUTH_ERROR');
        }
        return { 'X-API-KEY': config.auth.apiKey };

      case 'basic':
        if (!config.auth.username || !config.auth.password) {
          throw new ErrorMCP('AUTH_CREDENTIALS_REQUIRED', 'AUTH_ERROR');
        }
        const basicAuth = Buffer.from(`${config.auth.username}:${config.auth.password}`).toString('base64');
        return { 'Authorization': `Basic ${basicAuth}` };

      case 'bearer':
        if (!config.auth.token) {
          throw new ErrorMCP('TOKEN_REQUIRED', 'AUTH_ERROR');
        }
        return { 'Authorization': `Bearer ${config.auth.token}` };

      default:
        throw new ErrorMCP('INVALID_AUTH_TYPE', 'AUTH_ERROR');
    }
  }

  /**
   * Base HTTP GET request handler
   * @param endpoint API endpoint
   * @param options Fetch options
   * @returns Parsed response data
   * @throws ErrorMCP on request failure
   */
  protected async get<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, options);
  }

  /**
   * Base HTTP PUT request handler
   * @param endpoint API endpoint
   * @param body Request body
   * @param options Fetch options
   * @returns Parsed response data
   * @throws ErrorMCP on request failure
   */
  protected async put<T>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  /**
   * Base HTTP PATCH request handler
   * @param endpoint API endpoint
   * @param body Request body
   * @param options Fetch options
   * @returns Parsed response data
   * @throws ErrorMCP on request failure
   */
  protected async patch<T>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  }

  /**
   * Base HTTP POST request handler
   * @param endpoint API endpoint
   * @param body Request body
   * @param options Fetch options
   * @returns Parsed response data
   * @throws ErrorMCP on request failure
   */
  protected async post<T>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  /**
   * Base HTTP DELETE request handler
   * @param endpoint API endpoint
   * @param options Fetch options
   * @returns Parsed response data
   * @throws ErrorMCP on request failure
   */
  protected async delete<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE'
    });
  }

  /**
   * Base HTTP request handler
   * @param endpoint API endpoint
   * @param options Fetch options
   * @returns Parsed response data
   * @throws ErrorMCP on request failure
   */
  private async request<T>(
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
        throw new ErrorMCP(
          'API_REQUEST_FAILED',
          response.status.toString()
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ErrorMCP) {
        throw error;
      }
      throw new ErrorMCP(
        'REQUEST_FAILED',
        'REQUEST_ERROR'
      );
    }
  }
}
