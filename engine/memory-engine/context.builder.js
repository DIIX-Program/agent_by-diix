import { LongMemory } from './long.memory.js';
import { ShortMemory } from './short.memory.js';

export class ContextBuilder {
  constructor(registry) {
    console.log('[ContextBuilder] Module mounted.');
    // Assume MemoryManager holds the active ShortMemory instance
    this.memoryManager = registry ? registry.get('MemoryManager') : null;
    this.longMemory = new LongMemory();
  }

  async buildContext(taskContext) {
     let contextString = "### AGENT CONTEXT:\\n\\n";
     
     // 1. Get relevant long-term memory info if needed (basic fetch)
     const longContextData = await this.longMemory.search(taskContext.type || "general");
     if (longContextData && longContextData.length > 0) {
         contextString += "#### Past Important Knowledge:\\n";
         contextString += longContextData.slice(0, 2).join("\\n") + "\\n\\n"; // just top 2 matches
     }
     
     // 2. Add short-term / recent interactions
     if (this.memoryManager && this.memoryManager.shortMemory) {
         const recent = this.memoryManager.shortMemory.get();
         if (recent.length > 0) {
             contextString += "#### Recent Actions:\\n";
             recent.forEach((item, index) => {
                 contextString += `${index + 1}. Task ${item.taskId}\\n`;
             });
             contextString += "\\n";
         }
     }
     
     contextString += "### TASK REQUIREMENTS:\\n";
     contextString += taskContext.content + "\\n";
     
     return contextString;
  }
}