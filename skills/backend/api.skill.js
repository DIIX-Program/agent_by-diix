import { BaseSkill } from '../core/base.skill.js';
import fs from 'fs/promises';
import path from 'path';

export class APISkill extends BaseSkill {
  async run(input) {
    console.log('[APISkill] Generating RESTful API routes...');
    
    // Stub an Express API route dynamically
    const code = `
import { Router } from 'express';
const router = Router();

// Auto-generated GET route
router.get('/', (req, res) => {
    res.json({ message: "Data fetched successfully", status: 200 });
});

// Auto-generated POST route
router.post('/', (req, res) => {
    const payload = req.body;
    res.status(201).json({ message: "Created", data: payload });
});

export default router;
`;
    const outputPath = path.join(process.cwd(), 'workspace', 'generated_api', 'routes', 'dynamic.routes.js');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, code.trim(), 'utf8');

    return `API Routes generated correctly inside ${outputPath}`;
  }
}