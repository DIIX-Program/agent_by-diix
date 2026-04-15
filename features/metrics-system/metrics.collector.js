export class MetricsCollector {
  constructor() {
    this.metrics = [];
  }
  
  record(metricName, value, tags = {}) {
    this.metrics.push({
      metricName,
      value,
      tags,
      timestamp: Date.now()
    });
  }

  getMetrics(metricName) {
    return this.metrics.filter(m => m.metricName === metricName);
  }
}\n