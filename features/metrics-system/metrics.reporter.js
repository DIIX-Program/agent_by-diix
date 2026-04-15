export class MetricsReporter {
  constructor(registry) {
    this.collector = registry ? registry.get('MetricsCollector') : null;
  }

  generateReport() {
    const all = this.collector?.metrics || [];
    const report = {
        totalEvents: all.length,
        summary: {}
    };
    for(const m of all) {
       if(!report.summary[m.metricName]) report.summary[m.metricName] = { count: 0, sum: 0 };
       report.summary[m.metricName].count++;
       report.summary[m.metricName].sum += m.value;
    }
    return report;
  }
}\n