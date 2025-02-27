export class ErrorMCP extends Error {
  code: string;
  
  constructor(message: string, code: string) {
    super(message);
    this.name = "ErrorMCP";
    this.code = code;
  }
}
