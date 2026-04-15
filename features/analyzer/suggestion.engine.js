export class SuggestionEngine {
  constructor(registry) {
    this.tokenAnalyzer = registry ? registry.get('TokenAnalyzer') : null;
    this.logAnalyzer = registry ? registry.get('LogAnalyzer') : null;
    console.log('[SuggestionEngine] Module mounted.');
  }

  async generateSystemSuggestions() {
    let suggestions = [];
    
    // Evaluate memory and tokens
    if (this.tokenAnalyzer) {
        const metrics = this.tokenAnalyzer.getMetrics();
        if (metrics.averageUsage > 2500) {
            suggestions.push("Token usage is high. Consider enabling stricter Context Compression or switching to a cheaper model for intermediate steps.");
        }
    }
    
    // Evaluate error logs
    if (this.logAnalyzer) {
        const logMetrics = await this.logAnalyzer.analyzeCommonErrors();
        if (logMetrics && logMetrics.commonKeywords && logMetrics.commonKeywords['validation'] > 3) {
            suggestions.push("Frequent Validation Errors detected. Consider improving the core Prompts to be more rigid about output schema.");
        }
        if (logMetrics && logMetrics.commonKeywords && logMetrics.commonKeywords['timeout'] > 3) {
            suggestions.push("Frequent Timeouts detected. Your HTTP client might need a longer base timeout config or aggressive Retry settings.");
        }
    }
    
    return suggestions.length > 0 ? suggestions : ["System operating normally. No immediate optimizations suggested."];
  }
}