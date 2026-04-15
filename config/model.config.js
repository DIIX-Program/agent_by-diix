import { ENV } from './env.js';

export const ModelConfig = {
  GEMINI: {
    apiKey: ENV.GEMINI_API_KEY,
    models: {
      default: "gemini-1.5-flash",
      reasoning: "gemini-1.5-pro"
    }
  },
  OPENAI: {
    apiKey: ENV.OPENAI_API_KEY,
    models: {
      default: "gpt-3.5-turbo",
      reasoning: "gpt-4o"
    }
  }
};
