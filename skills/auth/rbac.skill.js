import { BaseSkill } from '../core/base.skill.js';

export class RBACSkill extends BaseSkill {
  async run(input) {
    console.log('[RBACSkill] Generating Role-Based Access Control logic...');
    
    const code = `
export const roles = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
};

export function requireRole(role) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
        
        if (req.user.role === role || req.user.role === roles.ADMIN) {
            next();
        } else {
            res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
        }
    };
}
`;
    return `RBAC Implementation code:\\n\\n\`\`\`javascript\\n${code.trim()}\\n\`\`\``;
  }
}