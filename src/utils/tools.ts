import { config } from '../config.js';
import { formatClientError } from './error.js';
import { formatItem, formatTable } from './formatter.js';
import { logger } from './logger.js';

/**
 * Type guard function to check if an API response is a list response.
 * 
 * A list response contains pagination information such as total items, offset, and count.
 * 
 * @template T - The type of data contained in the response
 * @param response - The API response object to check
 * @returns {boolean} - Returns true if the response is a list response, false otherwise
 */
function isListResponse<T>(
  response: ApiResponse<T>
): response is ListApiResponse<T> {
  return 'total' in response && 'offset' in response && 'count' in response;
}

/**
 * Creates a standardized tool response from an API response
 * Handles both list and single item responses with proper formatting
 * 
 * @example
 * // In tool handler:
 * return createToolResponse(
 *   teamsService.listTeams(request?.arguments)
 * );
 * 
 * @param promise Promise that resolves to an API response
 * @returns Tool response with formatted content
 */
export async function createToolResponse<T extends Record<string, any>>(
  promise: Promise<ApiResponse<T>>
): Promise<ToolResponse> {
  const response = await promise;
  let text = "";

  if (config.responseFormat === 'json') {
    text = JSON.stringify(response.data, null, 2);
  } else if (config.responseFormat === 'simple') {
    if (Array.isArray(response.data) && isListResponse(response)) {
      text = formatTable(response.data, {
        total: response.total,
        offset: response.offset,
        count: response.count
      });
    }
    else {
      text = formatItem(response.data);
    }
  }

  return {
    content: [{
      type: 'text',
      text
    }]
  };
}


/**
 * Handles errors that occur during tool execution by catching exceptions and formatting them into a consistent response structure.
 *
 * @param handler - The async function to execute which may throw errors
 * @param args - Arguments to pass to the handler function
 * @returns A Promise resolving to either the original handler response or an error response object
 *          with the structure: { isError: true, content: [{ type: "text", text: "error message" }] }
 *
 * @throws Never - All errors are caught and formatted into the response structure
 *
 * @example
 * ```typescript
 * const result = await toolErrorHandlers(
 *   async (args) => { return await someToolFunction(args) },
 *   { param1: "value1" }
 * );
 * ```
 */
export async function toolErrorHandlers(
  handler: (args: any) => Promise<any>,
  args: any
): Promise<any> {
  let response: any;
  try {
    response = await handler(args);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error(err, { tool: name, args });
    const clientError = formatClientError(err);
    response = {
      isError: true,
      content: [
        {
          type: "text",
          text: clientError.message,
        },
      ],
    };
  }
  return response;
}
