import { BaseSkill } from '../core/base.skill.js';
import { registry } from '../../core/registry.js';

export class CodegenSkill extends BaseSkill {
  async run(input) {
    console.log('[CodegenSkill] Calling specific LLM model for code generation...');
    const llm = registry.get('LLMClient');
    if (!llm) return "[Error] LLMClient not found";
    
    // Hardcoded model specifically optimal for code
    const modelConfig = { provider: 'anthropic', model: 'claude-3-opus' };
    const prompt = `Write production-ready code for the following requirement:\\n${input}`;
    
    const result = await llm.generate(prompt, modelConfig);
    return `Generated Code:\\n${result}`;
  }
}