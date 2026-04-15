import { BaseSkill } from '../core/base.skill.js';
import fs from 'fs/promises';
import path from 'path';

export class ImportantSkill extends BaseSkill {
  async execute(context) {
    const { registry, priority, content } = context;
    if (!content) throw new Error('Content is required to flag as important');
    
    const config = registry ? registry.get('Config') : null;
    const dest = config ? path.join(config.ENV.WORKSPACE_PATH, '../memory/important.md') : path.resolve('memory/important.md');
    
    const block = `\n\n### Priority: ${priority || 'medium'}\nDate: ${new Date().toISOString()}\n${content}\n---\n`;
    
    try {
       await fs.mkdir(path.dirname(dest), { recursive: true });
       await fs.appendFile(dest, block, 'utf8');
       return { success: true, recorded: true, priority };
    } catch (err) {
       return { success: false, error: err.message };
    }
  }
}\n