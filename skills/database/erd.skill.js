import { BaseSkill } from '../core/base.skill.js';

export class ERDSkill extends BaseSkill {
  async run(input) {
    console.log('[ERDSkill] Generating Entity Relationship Diagram representation...');
    
    const mermaidCode = `
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
    `;
    
    return `Mermaid ERD Generated:\\n\\n\`\`\`mermaid\\n${mermaidCode.trim()}\\n\`\`\``;
  }
}