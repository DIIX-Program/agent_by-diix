import { Planner } from '../engine/planner/planner.js';
import { Executor } from '../engine/executor/executor.js';
import { Validator } from '../engine/feedback/validator.js';

export class Orchestrator {
  constructor() {
    console.log('[Orchestrator] Module mounted.');
    this.planner = new Planner();
    this.executor = new Executor();
    // Assuming Validator is mocked or exists
    this.validator = null; 
  }

  async runWorkflow(goal, context = {}) {
    console.log(`[Orchestrator] Starting workflow for: "${goal}"`);
    try {
        // 1. Planning
        const plan = await this.planner.createPlan(goal, context);
        console.log(`[Orchestrator] Plan created with ${plan.tasks.length} tasks.`);

        // 2. Execution
        const executionResults = await this.executor.executePlan(plan);
        console.log('[Orchestrator] Execution finished.');

        // 3. Evaluation/Validation (simplified)
        let isValid = true;
        for (const taskId in executionResults) {
            if (!executionResults[taskId].success) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            console.log('[Orchestrator] Workflow completed successfully.');
            return { status: 'success', data: executionResults };
        } else {
            console.warn('[Orchestrator] Workflow completed with errors.');
            return { status: 'partial_success', data: executionResults };
        }

    } catch (e) {
        console.error('[Orchestrator] FATAL Workflow Error:', e);
        return { status: 'error', error: e.message };
    }
  }
}