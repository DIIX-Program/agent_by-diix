export class ErrorClassifier {
  constructor() {
    console.log('[ErrorClassifier] Module mounted.');
  }

  classify(error) {
    const errorMsg = (error instanceof Error ? error.message : String(error)).toLowerCase();
    
    if (errorMsg.includes('network') || errorMsg.includes('timeout') || errorMsg.includes('econnrefused')) {
        return { type: 'NETWORK_ERROR', severity: 'HIGH', retryable: true };
    }
    if (errorMsg.includes('syntax') || errorMsg.includes('parse')) {
        return { type: 'SYNTAX_ERROR', severity: 'MEDIUM', retryable: false }; // usually needs code fix
    }
    if (errorMsg.includes('token') || errorMsg.includes('limit') || errorMsg.includes('429')) {
        return { type: 'QUOTA_ERROR', severity: 'CRITICAL', retryable: true };
    }
    if (errorMsg.includes('validation')) {
        return { type: 'VALIDATION_ERROR', severity: 'MEDIUM', retryable: true };
    }
    
    return { type: 'UNKNOWN_ERROR', severity: 'LOW', retryable: true };
  }
}