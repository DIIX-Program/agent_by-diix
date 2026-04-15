export class TaskStatus {
  constructor() {
    this.statusMap = new Map();
  }
  update(taskId, status) {
    this.statusMap.set(taskId, status);
    console.log(`[TaskStatus] Task ${taskId} -> ${status}`);
  }
  get(taskId) {
    return this.statusMap.get(taskId) || 'unknown';
  }
}
