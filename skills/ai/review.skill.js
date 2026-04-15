import { BaseSkill } from '../core/base.skill.js';

export class ReviewSkill extends BaseSkill {
  async run(input) {
    console.log('[ReviewSkill] Simulating programmatic syntax and quality checking...');
    
    let issues = [];
    if (input.includes('console.log')) {
        issues.push("Warning: console.log detacted. Remove debug statements before production.");
    }
    if (input.includes('var ')) {
        issues.push("Warning: Do not use 'var'. Use 'let' or 'const'.");
    }
    if (input.includes('==')) {
        issues.push("Warning: Use abstract equality '===' instead of '=='.");
    }
    
    if (issues.length === 0) return "Code Review Passed: No basic quality issues detected.";
    
    return `Code Review Failed:\\n- ${issues.join('\\n- ')}`;
  }
}