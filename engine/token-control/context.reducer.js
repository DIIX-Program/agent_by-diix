import { TokenEstimator } from './token.estimator.js';

export class ContextReducer {
  constructor() {
    this.estimator = new TokenEstimator();
  }
  reduce(context, maxTokens) {
    let currentTokens = this.estimator.estimate(context);
    if(currentTokens <= maxTokens) return context;
    console.log(`[ContextReducer] Reducing context from ${currentTokens} to ${maxTokens} tokens...`);
    return context.substring(0, maxTokens * 4) + '... [TRUNCATED]';
  }
}
