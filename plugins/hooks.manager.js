export class PluginHooks {
  constructor() {
    this.hooks = new Map();
  }

  registerHook(eventName, callback) {
    if (!this.hooks.has(eventName)) {
        this.hooks.set(eventName, []);
    }
    this.hooks.get(eventName).push(callback);
  }

  async trigger(eventName, payload) {
    const callbacks = this.hooks.get(eventName) || [];
    let currentPayload = payload;
    for (const callback of callbacks) {
        try {
            currentPayload = await callback(currentPayload) || currentPayload;
        } catch(e) {
            console.error(`[PluginHooks] Hook error on event "${eventName}":`, e);
        }
    }
    return currentPayload;
  }
}
