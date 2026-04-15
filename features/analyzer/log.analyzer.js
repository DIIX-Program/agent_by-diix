export class LogAnalyzer {
  constructor() {
    console.log('[LogAnalyzer] Module mounted.');
  }

  /**
   * Scans a batch of raw logs and identifies critical anomalies
   */
  analyze(logsArray) {
    console.log(`[LogAnalyzer] Analyzing list of ${logsArray.length} log entries...`);
    
    const analysis = {
        total: logsArray.length,
        errors: [],
        warnings: [],
        suspiciousPatterns: 0
    };

    logsArray.forEach((logLine, index) => {
        const text = (typeof logLine === 'string' ? logLine : JSON.stringify(logLine)).toLowerCase();
        
        if (text.includes('error') || text.includes('exception') || text.includes('fail')) {
            analysis.errors.push({ line: index + 1, content: logLine });
        } else if (text.includes('warn')) {
            analysis.warnings.push({ line: index + 1, content: logLine });
        }

        // Detect suspicious anomalies like memory leak signs or timeout loops
        if (text.includes('timeout') || text.includes('out of memory') || text.includes('econnrefused')) {
            analysis.suspiciousPatterns += 1;
        }
    });

    // Provide a neat summary judgment
    if (analysis.errors.length > 0) {
        analysis.healthStatus = 'Unhealthy';
    } else if (analysis.warnings.length > 5 || analysis.suspiciousPatterns > 0) {
        analysis.healthStatus = 'Degraded';
    } else {
        analysis.healthStatus = 'Healthy';
    }

    return analysis;
  }
}