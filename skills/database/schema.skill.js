import { BaseSkill } from '../core/base.skill.js';
import fs from 'fs/promises';
import path from 'path';

export class SchemaSkill extends BaseSkill {
  async run(input) {
    console.log('[SchemaSkill] Generating Database Schema...');
    
    const code = `
import mongoose from 'mongoose';

const DynamicSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    metadata: { type: Map, of: String }
}, { strict: false }); // dynamic schema

export const DynamicModel = mongoose.model('DynamicEntity', DynamicSchema);
`;
    // Output directly
    const outputPath = path.join(process.cwd(), 'workspace', 'generated_api', 'models', 'dynamic.model.js');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, code.trim(), 'utf8');

    return `Mongoose Schema injected at ${outputPath}`;
  }
}