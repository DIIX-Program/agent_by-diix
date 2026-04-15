import { BaseSkill } from '../core/base.skill.js';
import fs from 'fs/promises';
import path from 'path';

export class WriteSkill extends BaseSkill {
  async execute(context) {
    const { filePath, content, append = false } = context;
    if (!filePath || content === undefined) throw new Error('filePath and content are required');
    
    try {
      const absPath = path.resolve(filePath);
      await fs.mkdir(path.dirname(absPath), { recursive: true });
      if (append) {
        await fs.appendFile(absPath, content, 'utf8');
      } else {
        await fs.writeFile(absPath, content, 'utf8');
      }
      return { success: true, filePath: absPath };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}\n