export class TokenAnalyzer {
  constructor() {
    console.log('[TokenAnalyzer] Module mounted.');
    this.history = []; // Ideally loaded from token_usage.json logs
  }

  recordUsage(tokenMetrics) {
    this.history.push({
        timestamp: Date.now(),
        ...tokenMetrics // { estimated, used, cost }
    });
  }

  getMetrics() {
    if (this.history.length === 0) return { averageUsage: 0, highest: 0, total: 0 };
    
    let total = 0;
    let highest = 0;
    
    this.history.forEach(tx => {
        let amt = tx.used || 0;
        total += amt;
        if (amt > highest) highest = amt;
    });
    
    return {
        total: total,
        averageUsage: total / this.history.length,
        highest: highest,
        txCount: this.history.length
    };
  }
}