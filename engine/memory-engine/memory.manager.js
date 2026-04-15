import { registry } from '../../core/registry.js';
import { ShortMemory } from './short.memory.js';

export class MemoryManager {
  constructor() {
    console.log('[MemoryManager] Module mounted.');
    this.shortMemory = new ShortMemory();
  }
  
  async addEntry(taskContext) {
    this.shortMemory.add({
        taskId: taskContext.taskId,
        resultSnippet: typeof taskContext.result === 'string' ? taskContext.result.substring(0, 50) : "No result string"
    });
    
    if (this.shortMemory.isFull()) {
       console.log('[MemoryManager] Short memory is full. Triggering summarization.');
       const summarizer = registry.get('Summarizer'); // assumes it will be registered in kernel
       if (summarizer) {
           await summarizer.summarize(this.shortMemory.get());
       }
       this.shortMemory.clear();
    }
  }
}