import { BaseSkill } from '../core/base.skill.js';
import fs from 'fs/promises';
import path from 'path';

export class UISkill extends BaseSkill {
  async run(input) {
    console.log('[UISkill] Generating UI layout based on schema:', input);
    // Parse input assuming it's JSON or has a structure
    let schema = {};
    try {
        schema = JSON.parse(input);
    } catch(e) {
        schema = { type: 'generic_page', name: 'Layout' }; // fallback map
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${schema.name || 'Generated UI'}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div id="app" class="container mt-5">
        <h1>${schema.name || 'Generated System UI'}</h1>
        <p>This is an auto-generated wireframe layout.</p>
        <!-- Components payload would mount here -->
    </div>
</body>
</html>`;

    // Persist to workspace
    const outputPath = path.join(process.cwd(), 'workspace', 'generated_ui', 'index.html');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, htmlContent.trim(), 'utf8');

    return `Generated base UI layout at ${outputPath}`;
  }
}