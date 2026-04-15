export class ContextSelector {
  constructor() {
    console.log('[ContextSelector] Module mounted.');
  }

  select(rankedItems, maxItems = 5, topThresholdScore = 0) {
    if (!Array.isArray(rankedItems)) return [];
    
    // Filter out items that do not meet the minimum score (if using scoring)
    // rankedItems should be an array of { item, score }
    const validItems = rankedItems.filter(entry => {
        if (entry && typeof entry.score !== 'undefined') {
            return entry.score >= topThresholdScore;
        }
        return true; 
    });
    
    // Pick the top maxItems
    const selected = validItems.slice(0, maxItems);
    
    // Return just the original items stripping the score metadata
    return selected.map(entry => entry.item !== undefined ? entry.item : entry);
  }
}
