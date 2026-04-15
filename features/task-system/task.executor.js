import { registry } from '../../core/registry.js';

/**
 * Auto-generated module for TaskExecutor
 * Module: features/task-system/task.executor.js
 */
export class TaskExecutor {
  constructor() {
    console.log('[TaskExecutor] Module mounted.');
  }
  
  async execute(plan) {
    const results = [];

    for (const step of plan) {
      const skill = registry.get(step.skill);
      if (skill) {
        const res = await skill.run(step.input);
        results.push(res);
      } else {
        results.push(`[Error] Skill ${step.skill} not found`);
      }
    }

    return results.join("\n");
  }
}