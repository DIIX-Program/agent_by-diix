import fs from 'fs/promises';
import path from 'path';

export class LongMemory {
  constructor() {
    console.log('[LongMemory] Module mounted.');
    this.memoryPath = path.join(process.cwd(), 'memory', 'important.md');
  }

  async readMemory() {
    try {
        const content = await fs.readFile(this.memoryPath, 'utf8');
        return content;
    } catch (e) {
        if (e.code === 'ENOENT') {
            return ''; // no memory file yet
        }
        throw e;
    }
  }

  async search(query) {
    const content = await this.readMemory();
    if (!content) return [];
    
    // Very simple text split search (In real life, this would use embeddings)
    const blocks = content.split('## Summary').filter(b => b.trim().length > 0);
    const lowercaseQuery = query.toLowerCase();
    
    const relevantBlocks = blocks.filter(b => b.toLowerCase().includes(lowercaseQuery));
    return relevantBlocks;
  }
}