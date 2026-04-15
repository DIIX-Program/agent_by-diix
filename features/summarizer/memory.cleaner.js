import fs from 'fs/promises';
import path from 'path';

export class MemoryCleaner {
  constructor() {
    this.memoryDir = path.join(process.cwd(), 'memory');
    console.log('[MemoryCleaner] Module mounted.');
  }

  async cleanOldTempData() {
     // A script to wipe out old 'context.json' or temp files if they pile up
     try {
         const files = await fs.readdir(this.memoryDir);
         let deletedCount = 0;
         
         const now = Date.now();
         const staleThreshold = 7 * 24 * 60 * 60 * 1000; // 7 days
         
         for (const file of files) {
             if (file.startsWith('temp_') || file === 'context.json') {
                 const filePath = path.join(this.memoryDir, file);
                 const stats = await fs.stat(filePath);
                 if (now - stats.mtimeMs > staleThreshold) {
                     await fs.unlink(filePath);
                     deletedCount++;
                 }
             }
         }
         return { success: true, deletedCount };
     } catch(e) {
         return { success: false, error: e.message };
     }
  }
}