export class Validator {
  constructor() {
    console.log('[Validator] Module mounted.');
  }

  /**
   * Validates if the execution output conforms to system requirements
   * (e.g. valid JSON, compiles, correct structure)
   */
  validate(output, expectedFormat = 'text') {
    if (!output) {
      return { valid: false, error: 'Output is empty' };
    }

    if (expectedFormat === 'json') {
      try {
        const parsed = JSON.parse(output);
        return { valid: true, parsed };
      } catch (e) {
        return { valid: false, error: 'Output is not valid JSON' };
      }
    }
    
    if (expectedFormat === 'code') {
      // Basic heuristic for JS syntax (can be expanded)
      const hasSyntaxError = /SyntaxError:/i.test(output);
      if (hasSyntaxError) {
          return { valid: false, error: 'Output contains syntax errors' };
      }
    }

    return { valid: true, data: output };
  }
}