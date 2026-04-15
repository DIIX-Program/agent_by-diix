import { BaseSkill } from '../core/base.skill.js';

export class OptimizationSkill extends BaseSkill {
  async run(input) {
    console.log('[DatabaseOptimizationSkill] Generating Query Indexes...');
    
    const optimizationLogic = `
// MongoDB Index Optimization
DynamicSchema.index({ "metadata.tenantId": 1, createdAt: -1 });
DynamicSchema.index({ "email": 1 }, { unique: true, sparse: true });
`;
    
    return `Database indexes logic proposed:\\n\\n\`\`\`javascript\\n${optimizationLogic.trim()}\\n\`\`\``;
  }
}