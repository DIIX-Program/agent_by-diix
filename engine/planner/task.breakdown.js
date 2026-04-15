export class TaskBreakdown {
  constructor() {
    console.log('[TaskBreakdown] Module mounted.');
  }
  
  /**
   * Explodes a single complex task into micro-tasks
   */
  breakdownTask(task, granularity = 'medium') {
    if (!task || !task.description) return [];
    
    const microTasks = [];
    let count = granularity === 'fine' ? 5 : 3;

    for (let i = 1; i <= count; i++) {
        microTasks.push({
            id: `${task.id}_sub_${i}`,
            parentId: task.id,
            description: `Micro-task ${i} for: ${task.description.split(' ')[0]}...`,
            status: 'pending'
        });
    }

    return microTasks;
  }
}