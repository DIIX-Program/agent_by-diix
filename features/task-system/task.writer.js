import fs from 'fs/promises';
import path from 'path';
import { registry } from '../../core/registry.js';

export class TaskWriter {
  async writeResult(taskId, context) {
    const config = registry.get('Config');
    // Ensure task directory is resolved correctly. Assuming workspace root is ENV.WORKSPACE_PATH
    const taskDir = config?.ENV?.WORKSPACE_PATH ? path.join(config.ENV.WORKSPACE_PATH, 'tasks', taskId) : path.join(process.cwd(), 'workspace', 'tasks', taskId);
    
    try {
      await fs.mkdir(taskDir, { recursive: true });
    } catch(e) {} // ignore if exists

    if (context.result) {
      await fs.writeFile(path.join(taskDir, 'result.md'), context.result, 'utf8');
    }
    
    if (context.status) {
      await fs.writeFile(path.join(taskDir, 'status.json'), JSON.stringify(context.status, null, 2), 'utf8');
    }
    
    if (context.logs) {
      await fs.writeFile(path.join(taskDir, 'log.json'), JSON.stringify(context.logs, null, 2), 'utf8');
    }

    if (context.tokenUsage) {
      await fs.writeFile(path.join(taskDir, 'token_usage.json'), JSON.stringify(context.tokenUsage, null, 2), 'utf8');
    }

    console.log(`[TaskWriter] All task outputs saved to ${taskDir}`);
  }
}
