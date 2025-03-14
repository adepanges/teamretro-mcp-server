declare global {
  /**
   * TeamRetro custom error class
   */
  class TeamRetroError extends Error {
    code: string;
    name: 'TeamRetroError';
    constructor(message: string, code: string);
  }
}

// For backward compatibility until all imports are removed
export class TeamRetroError extends Error {
  constructor(message: string, code: string) {
    super(message);
    this.name = 'TeamRetroError';
    this.code = code;
  }
}

// This export is needed to make this file a module
export {};
