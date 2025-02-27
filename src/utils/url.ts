type ParamValue = string | number | boolean | undefined | null;

interface ParamsMapping {
  [key: string]: {
    value: ParamValue;
    paramName?: string; // Optional URL param name if different from key
  };
}

/**
 * Converts an object of parameters into URLSearchParams string
 * Only includes defined values
 * Allows mapping different object keys to URL parameter names
 * 
 * @example
 * // Regular usage
 * createSearchParams({
 *   offset: { value: 0 },
 *   limit: { value: 10 }
 * }) // "?offset=0&limit=10"
 * 
 * @example
 * // With parameter name mapping
 * createSearchParams({
 *   start: { value: 0, paramName: 'offset' },
 *   size: { value: 10, paramName: 'limit' }
 * }) // "?offset=0&limit=10"
 * 
 * @example
 * // With undefined values
 * createSearchParams({
 *   offset: { value: undefined },
 *   limit: { value: 10 }
 * }) // "?limit=10"
 */
export const createSearchParams = (mapping: ParamsMapping): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(mapping).forEach(([key, { value, paramName }]) => {
    const paramValue = value?.toString();
    if (paramValue) {
      searchParams.set(paramName || key, paramValue);
    }
  });
  
  const searchString = searchParams.toString();
  return searchString ? searchString : "";
};
