import { BaseSkill } from '../core/base.skill.js';
import fs from 'fs/promises';
import path from 'path';

export class ComponentSkill extends BaseSkill {
  async run(input) {
    console.log('[ComponentSkill] Building reusable component:', input);
    
    // Simple heuristic to name component
    const match = input.match(/build a (\w+) component/i);
    const compName = match ? match[1] : 'DynamicComponent';
    
    const reactComponent = `
import React from 'react';

export const ${compName} = (props) => {
    return (
        <div className="${compName.toLowerCase()}-wrapper">
            <h2>${compName}</h2>
            <div>{props.children || 'Component Content Here'}</div>
        </div>
    );
};
export default ${compName};`;

    const outputPath = path.join(process.cwd(), 'workspace', 'generated_ui', 'components', `${compName}.jsx`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, reactComponent.trim(), 'utf8');

    return `Successfully generated component ${compName}.jsx at ${outputPath}`;
  }
}