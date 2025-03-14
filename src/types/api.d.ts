declare global {
  // API Response types
  interface ListApiResponse<T> {
    success: boolean;
    data: T[];
    total: number;
    offset: number;
    count: number;
    error?: string;
  }

  interface SingleApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
  }

  // Generic Response type for internal use
  type ApiResponse<T> = ListApiResponse<T> | SingleApiResponse<T>;

  // Tool Input/Output types
  interface ToolContent {
    type: string;
    text: string;
  }

  interface ToolResponse<T = unknown> {
    content: ToolContent[];
    isError?: boolean;
  }
}

// This export is needed to make this file a module
export {};
