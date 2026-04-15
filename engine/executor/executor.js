export class Executor {
  constructor(dependencyGraph) {
    console.log('[Executor] Module mounted.');
    this.graph = dependencyGraph || null;
  }

  async executePlan(plan) {
    if (!plan || !plan.tasks) {
        throw new Error('Invalid plan provided to executor.');
    }

    console.log(`[Executor] Executing plan with ${plan.tasks.length} tasks...`);
    const results = {};

    // If we have a dependency graph, we could build it here and use topological sort
    // For simplicity, we execute sequentially or mock dependent execution
    for (const task of plan.tasks) {
        task.status = 'running';
        console.log(`[Executor] Running task: ${task.id} - ${task.description}`);
        
        try {
            // Mock execution delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const result = {
                taskId: task.id,
                success: true,
                output: `Simulated successful execution of ${task.id}`,
                timestamp: Date.now()
            };
            results[task.id] = result;
            task.status = 'completed';
        } catch (error) {
            task.status = 'failed';
            results[task.id] = { taskId: task.id, success: false, error: error.message };
            console.error(`[Executor] Task failed: ${task.id}`);
            // Break execution on failure as basic strategy
            break;
        }
    }

    return results;
  }
}