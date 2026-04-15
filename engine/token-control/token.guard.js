export class TokenGuard {
  constructor(maxContextTokens = 128000, overflowStrategy = 'truncate') {
    console.log('[TokenGuard] Module mounted.');
    this.maxTokens = maxContextTokens;
    this.strategy = overflowStrategy; // truncate, summarize, or strict_reject
  }

  /**
   * Estimates tokens purely via simple heuristic (1 token ~ 4 characters)
   * A full implementation would use tiktoken or similar.
   */
  estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  }

  /**
   * Ensures the payload is within the context window limit bounds before sending to an LLM
   */
  enforceLimits(payload) {
    console.log('[TokenGuard] Validating token boundaries...');
    let textContent = typeof payload === 'string' ? payload : JSON.stringify(payload);
    
    const estimated = this.estimateTokens(textContent);
    
    if (estimated <= this.maxTokens) {
        return { valid: true, payload, estimatedTokens: estimated };
    }

    console.warn(`[TokenGuard] Context overflow detected! Estimated: ${estimated}, Max: ${this.maxTokens}`);

    if (this.strategy === 'strict_reject') {
        throw new Error(`Context window exceeded. Required ${estimated} tokens but max is ${this.maxTokens}.`);
    }

    if (this.strategy === 'truncate') {
        // truncate to safe limits roughly
        const charLimit = this.maxTokens * 3; // safe bound of 3 chars per token
        if (typeof payload === 'string') {
            return {
                valid: true, 
                payload: payload.substring(0, charLimit) + '\\n...[TRUNCATED BY TOKEN GUARD]',
                estimatedTokens: this.maxTokens,
                truncated: true
            };
        } else {
             // For object structure, truncation is more complex. Simple naive slice:
             const truncStr = textContent.substring(0, charLimit) + '\\n...[TRUNCATED BY TOKEN GUARD]';
             return { valid: true, payload: truncStr, estimatedTokens: this.maxTokens, truncated: true };
        }
    }

    return { valid: true, payload, warning: 'Overflow ignored due to unhandled strategy.' };
  }
}