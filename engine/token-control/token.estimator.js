export class TokenEstimator {
  constructor() {
    console.log('[TokenEstimator] Module mounted.');
  }
  
  estimate(text) {
    if (!text || typeof text !== 'string') return 0;
    // Approximating 1 token = 4 characters or ~0.75 words.
    // Using a more robust splitting logic for code & natural language
    const words = text.split(/[\s\t\n\r]+/).filter(w => w.length > 0);
    // Add additional token cost for symbols and structure common in code
    const symbolCount = (text.match(/[\{\}\[\]\(\)\.\,\;\'\"\`\:\=\+\-\*\/\?\!]/g) || []).length;
    
    // Roughly standard token equivalence: 1 word ~ 1.3 tokens, 1 symbol ~ 1 token
    const estimated = Math.ceil(words.length * 1.3) + symbolCount;
    return estimated;
  }
}
