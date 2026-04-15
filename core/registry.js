/**
 * Simple Dependency Injection Registry
 */
class Registry {
  constructor() {
    this.services = new Map();
  }

  register(name, instance) {
    if (this.services.has(name)) {
        throw new Error(`Service [${name}] is already registered.`);
    }
    this.services.set(name, instance);
    console.log(`[Registry] Registered service: ${name}`);
  }

  get(name) {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service [${name}] not found in registry.`);
    }
    return service;
  }
}

export const registry = new Registry();
