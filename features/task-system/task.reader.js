import fs from 'fs/promises';
import path from 'path';
import { registry } from '../../core/registry.js';

export class TaskReader {
  async read(taskId) {
    const config = registry.get('Config');
    const taskPath = path.join(config.ENV.WORKSPACE_PATH, 'tasks', taskId, 'task.md');
    try {
      const content = await fs.readFile(taskPath, 'utf8');
      return { id: taskId, content };
    } catch(err) {
      throw new Error(`Task not found: ${taskId}`);
    }
  }
}
