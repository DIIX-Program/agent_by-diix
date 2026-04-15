export class ErrorFixer {
  constructor() {
    console.log('[ErrorFixer] Module mounted.');
    this.knownErrors = new Map([
        ['EADDRINUSE', 'Port is already in use. Ensure no other processes are running on this port.'],
        ['ENOENT', 'File or directory not found. Check the path and ensure it exists.'],
        ['SyntaxError', 'Syntax error in code. Please check for missing brackets, quotes, or keywords.']
    ]);
  }

  /**
   * Analyzes an error message and attempts to propose a fix
   */
  proposeFix(errorObject) {
    console.log(`[ErrorFixer] Analyzing error: ${errorObject.message || errorObject}`);
    
    let fixProposal = null;
    let confidence = 0;
    const errorMessage = (errorObject.message || errorObject.toString() || '').toLowerCase();

    // Direct mapping heuristics
    for (const [code, suggestion] of this.knownErrors.entries()) {
        if (errorMessage.includes(code.toLowerCase())) {
            fixProposal = suggestion;
            confidence = 0.9;
            break;
        }
    }

    // Generic heuristic fallbacks
    if (!fixProposal) {
        if (errorMessage.includes('undefined is not a function')) {
            fixProposal = 'Check if you are calling a method on an object that has not been initialized or is typed incorrectly.';
            confidence = 0.7;
        } else if (errorMessage.includes('cannot read properties of null')) {
            fixProposal = 'Ensure that the object you are accessing is not null before accessing its properties (use optional chaining ?.).';
            confidence = 0.8;
        } else {
            fixProposal = 'Unknown error signature. Please check stack trace and log files for context.';
            confidence = 0.1;
        }
    }

    return {
        originalError: errorObject.message || errorObject,
        proposal: fixProposal,
        confidence,
        timestamp: Date.now()
    };
  }
}