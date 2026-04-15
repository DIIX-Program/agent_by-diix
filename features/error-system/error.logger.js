import fs from 'fs/promises';
import path from 'path';

export class ErrorLogger {
  constructor() {
    this.logPath = path.join(process.cwd(), 'logs', 'error.log');
    console.log('[ErrorLogger] Module mounted.');
  }

  async log(error, context = {}) {
    try {
      await fs.mkdir(path.dirname(this.logPath), { recursive: true });
    } catch(e) {}
    
    const timestamp = new Date().toISOString();
    const errorMessage = error instanceof Error ? error.stack || error.message : error;
    
    const logEntry = `[${timestamp}] ERROR:\\n${errorMessage}\\nCONTEXT: ${JSON.stringify(context)}\\n---\\n`;
    
    try {
      await fs.appendFile(this.logPath, logEntry, 'utf8');
      console.error(`[ErrorLogger] Logged error to ${this.logPath}`);
    } catch(e) {
      console.error('[ErrorLogger] Failed to write to error log:', e);
    }
  }
}
