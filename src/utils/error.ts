export class ErrorMCP extends Error {
  code: string;
  details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = "ErrorMCP";
    this.code = code;
    this.details = details;
  }
}

export const errorTypes = {
  CONNECTION: 'ConnectionError',
  VALIDATION: 'ValidationError',
  NOT_FOUND: 'NotFoundError',
  INTERNAL: 'InternalError'
};

export function formatClientError(error: unknown): { error: string, message: string, code: string } {
  if (error instanceof ErrorMCP) {
    return {
      error: error.name,
      message: error.message,
      code: error.code
    };
  }

  if (error instanceof Error) {
    return {
      error: errorTypes.INTERNAL,
      message: 'An unexpected error occurred',
      code: 'EUNKNOWN'
    };
  }

  return {
    error: errorTypes.INTERNAL,
    message: 'Unknown error',
    code: 'EUNKNOWN'
  };
}
