export class ResultMerger {
  constructor() {
    console.log('[ResultMerger] Module mounted.');
  }
  
  merge(results) {
    if (!Array.isArray(results) || results.length === 0) {
        return { mergedText: '', metadata: { count: 0 } };
    }
    
    let mergedText = "# Execution Results\\n\\n";
    let totalLength = 0;
    
    results.forEach((result, index) => {
        mergedText += `## Part ${index + 1}\\n\\n`;
        const content = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
        mergedText += `${content}\\n\\n---\\n`;
        totalLength += content.length;
    });
    
    return {
        mergedText,
        metadata: {
            count: results.length,
            totalLength: totalLength,
            timestamp: new Date().toISOString()
        }
    };
  }
}