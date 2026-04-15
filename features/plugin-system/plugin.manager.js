import { PluginLoader } from './plugin.loader.js';

export class PluginManager {
  constructor(registry) {
    console.log('[PluginManager] Module mounted.');
    this.registry = registry;
    this.loader = new PluginLoader();
    this.plugins = [];
  }

  async initializePlugins() {
    this.plugins = await this.loader.loadAll();
    
    // Lifecycle hook for plugins
    for (const plugin of this.plugins) {
        try {
            if (typeof plugin.instance.onLoad === 'function') {
                await plugin.instance.onLoad(this.registry);
            }
        } catch(e) {
            console.error(`[PluginManager] Error initializing plugin ${plugin.name}:`, e.message);
        }
    }
  }
  
  async broadcastEvent(eventName, payload) {
      for (const plugin of this.plugins) {
          if (typeof plugin.instance.onEvent === 'function') {
              try {
                  await plugin.instance.onEvent(eventName, payload);
              } catch(e) {
                 // isolated fail
              }
          }
      }
  }
}