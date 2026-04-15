import fs from 'fs/promises';
import path from 'path';

export class WorkspaceManager {
  constructor(basePath = process.cwd()) {
    console.log('[WorkspaceManager] Module mounted.');
    this.basePath = path.resolve(basePath, 'workspace');
  }

  async ensureWorkspace() {
    try {
        await fs.mkdir(this.basePath, { recursive: true });
        console.log(`[WorkspaceManager] Verified workspace at ${this.basePath}`);
    } catch (e) {
        console.error('[WorkspaceManager] Failed to create workspace directory constraints:', e);
    }
  }

  /**
   * Reads a file securely within the workspace bounds
   */
  async readFile(relativePath) {
    const target = path.resolve(this.basePath, relativePath);
    if (!target.startsWith(this.basePath)) {
        throw new Error('Workspace boundary violation detected.');
    }
    return await fs.readFile(target, 'utf8');
  }

  /**
   * Writes a file securely to the workspace
   */
  async writeFile(relativePath, content) {
    const target = path.resolve(this.basePath, relativePath);
    if (!target.startsWith(this.basePath)) {
        throw new Error('Workspace boundary violation detected.');
    }
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content, 'utf8');
    return target;
  }
}
