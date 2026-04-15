import { BaseSkill } from '../core/base.skill.js';
import fs from 'fs/promises';
import path from 'path';

export class DockerSkill extends BaseSkill {
  async run(input) {
    console.log('[DockerSkill] Architecting Dockerfile and compose structure...');
    
    const dockerfile = `
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
`;

    const dockerCompose = `
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
  db:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
`;
    const workspacePaths = {
        dockerFile: path.join(process.cwd(), 'workspace', 'generated_api', 'Dockerfile'),
        composeFile: path.join(process.cwd(), 'workspace', 'generated_api', 'docker-compose.yml')
    };

    await fs.mkdir(path.dirname(workspacePaths.dockerFile), { recursive: true });
    await fs.writeFile(workspacePaths.dockerFile, dockerfile.trim(), 'utf8');
    await fs.writeFile(workspacePaths.composeFile, dockerCompose.trim(), 'utf8');

    return `Docker config generated at ${workspacePaths.dockerFile} and ${workspacePaths.composeFile}`;
  }
}