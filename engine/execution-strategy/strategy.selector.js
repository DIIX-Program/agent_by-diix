export class StrategySelector {
  getStrategy(tasks) {
     return tasks.length > 2 ? 'parallel' : 'sequential';
  }
}
