import { BaseSkill } from '../core/base.skill.js';
import fs from 'fs/promises';
import path from 'path';

export class ReadSkill extends BaseSkill {
  async execute(context) {
    const { filePath } = context;
    if (!filePath) throw new Error('filePath is required for ReadSkill');
    
    try {
      const content = await fs.readFile(path.resolve(filePath), 'utf8');
      return { success: true, content, size: content.length };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}\n