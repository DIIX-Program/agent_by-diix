import { BaseSkill } from '../core/base.skill.js';

export class ValidationSkill extends BaseSkill {
  async run(input) {
    console.log('[ValidationSkill] Generating Server-side validations...');
    
    const code = `
import Joi from 'joi';

export const genericSchemaValidator = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email(),
    payload: Joi.object().unknown(true)
});

export function validateMiddleware(req, res, next) {
    const { error } = genericSchemaValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
`;
    return `Validation definitions generated:\\n\\n\`\`\`javascript\\n${code.trim()}\\n\`\`\``;
  }
}