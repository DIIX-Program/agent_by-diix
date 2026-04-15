import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  WORKSPACE_PATH: process.env.WORKSPACE_PATH || 'd:/agent_by_diix/workspace',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
