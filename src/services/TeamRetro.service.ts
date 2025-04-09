import { config } from '../config.js';
import { ErrorMCP } from '../utils/error.js';
import { logger } from '../utils/logger.js';

export abstract class TeamRetroService {
  /**
   * Get authentication headers based on the auth type
   * @returns Authentication headers
   * @throws ErrorMCP on invalid auth type or missing credentials
   */
  protected getAuthHeaders(): Record<string, string> {
    switch (config.auth.type) {
      case "apiKey":
        if (!config.auth.apiKey) {
          throw new ErrorMCP("API key is required for authentication. Please configure the 'apiKey' in your config.", "AUTH_ERROR");
        }
        return { "X-API-KEY": config.auth.apiKey };

      case "basic":
        if (!config.auth.username || !config.auth.password) {
          throw new ErrorMCP("Basic auth requires both username and password. Please configure both in your config.", "AUTH_ERROR");
        }
        const basicAuth = Buffer.from(
          `${config.auth.username}:${config.auth.password}`
        ).toString("base64");
        return { Authorization: `Basic ${basicAuth}` };

      case "bearer":
        if (!config.auth.token) {
          throw new ErrorMCP("Bearer token is required for authentication. Please configure the 'token' in your config.", "AUTH_ERROR");
        }
        return { Authorization: `Bearer ${config.auth.token}` };

      default:
        throw new ErrorMCP("Invalid authentication type configured. Supported types: 'apiKey', 'basic', 'bearer'.", "AUTH_ERROR");
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
      method: "PATCH",
      body: JSON.stringify(body),
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
      method: "POST",
      body: JSON.stringify(body),
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
      method: "DELETE",
    });
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
      method: "PUT",
      body: JSON.stringify(body),
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
      "Content-Type": "application/json",
      "User-Agent": `TeamRetro MCP Server v${config.version}`,
      ...this.getAuthHeaders(),
      ...options.headers,
    };

    const startTime = Date.now();
    const method = options.method || 'GET';
    const fullUrl = `${config.baseUrl}${endpoint}`;
    logger.info(`${method} ${fullUrl} - Request started`);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const duration = Date.now() - startTime;
      logger.info(`${method} ${fullUrl} - ${response.status} (${duration}ms)`);

      if (!response.ok) {
        const errorContext = {
          url: fullUrl,
          method,
          status: response.status,
          duration: Date.now() - startTime,
        };
        logger.error(`API request failed`, errorContext);
        throw new ErrorMCP(
          `API request failed with status ${response.status}. Check your request parameters and try again.`, 
          "API_REQUEST_FAILED", 
          { ...errorContext, body: response.body }
        );
      }

      return response.json();
    } catch (error) {
      const errorContext = {
        url: fullUrl,
        method,
        duration: Date.now() - startTime,
      };
      logger.error("Network request failed", errorContext);
      
      if (error instanceof ErrorMCP) {
        throw error;
      }
      throw new ErrorMCP(
        "Network request failed. Check your connection and try again.", 
        "REQUEST_ERROR",
        errorContext
      );
    }
  }
}
