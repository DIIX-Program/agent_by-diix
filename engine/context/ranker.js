export class ContextRanker {
  constructor() {
    console.log('[ContextRanker] Module mounted.');
  }

  rank(contextItems, keywords = []) {
    if (!Array.isArray(contextItems)) return [];
    if (keywords.length === 0) return contextItems.map(item => ({ item, score: 1 }));
    
    const lowercaseKeywords = keywords.map(k => k.toLowerCase());
    
    const scoredContexts = contextItems.map(item => {
        let score = 0;
        const textContent = (typeof item === 'string' ? item : JSON.stringify(item)).toLowerCase();
        
        lowercaseKeywords.forEach(keyword => {
            // Count occurrences of keyword in text
            const occurrences = textContent.split(keyword).length - 1;
            score += occurrences;
        });
        
        // Add recency/metadata scoring if available
        if (item.timestamp) {
            // slightly boost recent items (mock logic)
            score += 0.5;
        }
        
        return { item, score };
    });
    
    // Sort descending by score
    return scoredContexts.sort((a, b) => b.score - a.score);
  }
}