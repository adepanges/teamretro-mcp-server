import { formatTable, formatItem } from './formatter.js';
import { config } from '../config.js';

/**
 * Type guard to check if response is a list response
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
