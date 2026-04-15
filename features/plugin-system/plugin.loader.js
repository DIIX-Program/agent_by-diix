import fs from 'fs/promises';
import path from 'path';

export class PluginLoader {
  constructor() {
    this.pluginDir = path.join(process.cwd(), 'user-space', 'plugins');
    console.log('[PluginLoader] Module mounted.');
  }

  async loadAll() {
    let plugins = [];
    try {
        await fs.mkdir(this.pluginDir, { recursive: true });
        const files = await fs.readdir(this.pluginDir);
        
        for (const file of files) {
            if (file.endsWith('.plugin.js') || file.endsWith('.js')) {
                const pluginPath = path.join(this.pluginDir, file);
                try {
                    // Convert to file URI for dynamic import on Windows
                    const fileUri = 'file:///' + pluginPath.replace(/\\\\/g, '/');
                    const module = await import(fileUri);
                    // Assume plugin exports a default or a 'Plugin' class
                    if (module.default || module.Plugin) {
                        const PluginClass = module.default || module.Plugin;
                        plugins.push({ name: file, instance: new PluginClass() });
                        console.log(`[PluginLoader] Loaded plugin: ${file}`);
                    }
                } catch(err) {
                    console.error(`[PluginLoader] Failed to load plugin ${file}:`, err.message);
                }
            }
        }
    } catch(e) {
        console.warn('[PluginLoader] Could not read plugins directory:', e.message);
    }
    
    return plugins;
  }
}