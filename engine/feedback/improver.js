export class Improver {
  constructor() {
    console.log('[Improver] Module mounted.');
  }

  /**
   * Generates improved prompts or constraints based on failed evaluations
   */
  generateImprovementStrategy(failedTask, evaluation) {
    console.log(`[Improver] Generating improvement strategy for task ${failedTask.id}`);
    
    const strategy = {
      action: 'retry',
      adjustments: []
    };

    if (evaluation && evaluation.feedback) {
        if (evaluation.feedback.some(f => f.includes('error messages'))) {
            strategy.adjustments.push('Add strict constraint: Code must compile/run without runtime errors.');
            strategy.action = 'debug_and_retry';
        }
        
        const missing = evaluation.feedback.find(f => f.includes('Missing expected'));
        if (missing) {
            strategy.adjustments.push(`Explicitly enforce requirement: ${missing}`);
        }
    }

    return strategy;
  }
}