export class Evaluator {
  constructor() {
    console.log('[Evaluator] Module mounted.');
  }

  /**
   * Evaluates the outcome of a task execution
   */
  async evaluateResult(taskId, output, expectedCriteria) {
    console.log(`[Evaluator] Assessing result for task ${taskId}...`);
    
    let score = 0;
    const feedback = [];

    if (!output) {
      return { score: 0, passed: false, feedback: ['No output provided'] };
    }

    // Heuristics based evaluation
    if (typeof output === 'string' && output.toLowerCase().includes('error')) {
        score -= 50;
        feedback.push('Output contains error messages.');
    } else {
        score += 50;
        feedback.push('Output executes without immediate errors.');
    }

    // Check criteria match if provided
    if (expectedCriteria && expectedCriteria.length > 0) {
        const metCriteria = expectedCriteria.filter(c => output.includes(c));
        const missingCriteria = expectedCriteria.filter(c => !output.includes(c));
        
        score += (metCriteria.length / expectedCriteria.length) * 50;
        
        if (missingCriteria.length > 0) {
            feedback.push(`Missing expected keywords/behaviors: ${missingCriteria.join(', ')}`);
        } else {
            feedback.push('All expected criteria met.');
        }
    } else {
        // No criteria, assume partial pass
        score += 25; 
    }

    const passed = score >= 70;
    return {
        score,
        passed,
        feedback
    };
  }
}