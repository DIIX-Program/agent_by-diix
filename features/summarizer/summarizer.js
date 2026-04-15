import fs from 'fs/promises';
import path from 'path';

export class Summarizer {
  constructor() {
    console.log('[Summarizer] Module mounted.');
  }
  
  async summarize(shortMemoryEntries) {
    console.log('[Summarizer] Summarizing 5 past interactions...');
    // Simple extraction mock logic
    const summary = shortMemoryEntries.map((m) => `- Task ${m.taskId}: ${m.resultSnippet}`).join('\n');
    
    // Append to memory/important.md
    const memoryPath = path.join(process.cwd(), 'memory', 'important.md');
    try {
      await fs.mkdir(path.dirname(memoryPath), { recursive: true });
    } catch(e) {}
    
    await fs.appendFile(memoryPath, `\n## Summary [${new Date().toISOString()}]\n${summary}\n`, 'utf8');
    console.log(`[Summarizer] Saved summary to ${memoryPath}`);
  }
}