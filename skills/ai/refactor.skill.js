import { BaseSkill } from '../core/base.skill.js';
import { registry } from '../../core/registry.js';

export class RefactorSkill extends BaseSkill {
  async run(input) {
    console.log('[RefactorSkill] Analyzing code for refactoring requirements...');
    const llm = registry.get('LLMClient');
    
    const prompt = `Refactor the following code to improve performance and readability, following SOLID principles.\\nCODE:\\n${input}`;
    const result = await llm.generate(prompt, { provider: 'openai', model: 'gpt-4o' });
    
    return `Refactoring Output:\\n${result}`;
  }
}