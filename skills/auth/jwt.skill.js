import { BaseSkill } from '../core/base.skill.js';

export class JWTSkill extends BaseSkill {
  async run(input) {
    console.log('[JWTSkill] Generating JWT Authentication Middleware...');
    
    const code = `
import jwt from 'jsonwebtoken';

export function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}
`;
    return `JWT Middleware generation complete:\\n\\n\`\`\`javascript\\n${code.trim()}\\n\`\`\``;
  }
}