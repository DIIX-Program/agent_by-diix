export class ShortTermMemory {
  constructor(maxItems = 100) {
    console.log('[ShortTermMemory] Module mounted.');
    this.buffer = [];
    this.maxItems = maxItems;
  }

  /**
   * Adds a new interaction or thought to the short-term buffer
   */
  add(role, content, metadata = {}) {
    const entry = {
        role,
        content,
        timestamp: Date.now(),
        ...metadata
    };

    this.buffer.push(entry);

    if (this.buffer.length > this.maxItems) {
        // Remove oldest to stay within capacity
        this.buffer.shift();
    }
  }

  /**
   * Retrieves recent interaction history
   */
  getRecent(limit = 10) {
    return this.buffer.slice(-limit);
  }

  /**
   * Formats the memory buffer for LLM context inclusion
   */
  formatForContext() {
    return this.buffer.map(entry => `[${new Date(entry.timestamp).toISOString()}] ${entry.role}: ${entry.content}`).join('\\n');
  }

  /**
   * Clears the current buffer (e.g. on new task start)
   */
  clear() {
    this.buffer = [];
  }
}
