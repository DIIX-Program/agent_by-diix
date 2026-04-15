import { registry } from '../../core/registry.js';

export class ModelSelector {
  select(taskRequirements) {
    const config = registry.get('Config');
    if(taskRequirements.complexity === 'high') {
       return { provider: 'OPENAI', model: config.MODELS.OPENAI.models.reasoning };
    }
    return { provider: 'GEMINI', model: config.MODELS.GEMINI.models.default };
  }
}
