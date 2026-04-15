import { BaseSkill } from '../core/base.skill.js';
import fs from 'fs/promises';
import path from 'path';

export class ServiceSkill extends BaseSkill {
  async run(input) {
    console.log('[ServiceSkill] Generating Service Layer Business logic...');
    
    // Generates a stateless business logic class
    const code = `
export class BusinessService {
    async processEntity(entityData) {
        if (!entityData) throw new Error("Missing data");
        // Business logic execution
        return { ...entityData, processedAt: new Date().toISOString(), status: 'VERIFIED' };
    }
}
`;
    const outputPath = path.join(process.cwd(), 'workspace', 'generated_api', 'services', 'business.service.js');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, code.trim(), 'utf8');

    return `Service logic layer mounted at ${outputPath}`;
  }
}