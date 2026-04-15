import { ENV } from '../config/env.js';
import { SYSTEM_CONSTANTS } from '../config/constants.js';
import { ModelConfig } from '../config/model.config.js';
import { registry } from './registry.js';

export class ConfigLoader {
  load() {
    console.log("[ConfigLoader] Loading configurations...");
    registry.register('Config', {
      ENV,
      CONSTANTS: SYSTEM_CONSTANTS,
      MODELS: ModelConfig
    });
    return registry.get('Config');
  }
}
