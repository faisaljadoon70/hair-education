import { ColorPlugin, PluginRegistry, ColorBrand, ColorProduct, ColorFormula, ValidationResult } from '@/types/plugins';

class PluginManager {
  private static instance: PluginManager;
  private plugins: PluginRegistry = {};
  private activePlugin: ColorPlugin | null = null;

  private constructor() {}

  static getInstance(): PluginManager {
    if (!PluginManager.instance) {
      PluginManager.instance = new PluginManager();
    }
    return PluginManager.instance;
  }

  registerPlugin(plugin: ColorPlugin): void {
    // Validate plugin structure
    if (!this.validatePlugin(plugin)) {
      throw new Error(`Invalid plugin structure for plugin ${plugin.name}`);
    }

    // Add plugin to registry
    this.plugins[plugin.id] = plugin;
    console.log(`Plugin ${plugin.name} (v${plugin.version}) registered successfully`);
  }

  setActivePlugin(pluginId: string): void {
    if (!this.plugins[pluginId]) {
      throw new Error(`Plugin ${pluginId} not found`);
    }
    this.activePlugin = this.plugins[pluginId];
  }

  getActivePlugin(): ColorPlugin | null {
    return this.activePlugin;
  }

  getAllPlugins(): ColorPlugin[] {
    return Object.values(this.plugins);
  }

  getBrands(): ColorBrand[] {
    return Object.values(this.plugins).map(plugin => plugin.brand);
  }

  getProductsByBrand(brandId: string): ColorProduct[] {
    const plugin = Object.values(this.plugins).find(p => p.brand.id === brandId);
    return plugin ? plugin.brand.products : [];
  }

  calculateColorResult(params: any): any {
    if (!this.activePlugin) {
      throw new Error('No active plugin selected');
    }
    return this.activePlugin.calculateResult(params);
  }

  getMixingRules(color1: ColorProduct, color2: ColorProduct): any {
    if (!this.activePlugin) {
      throw new Error('No active plugin selected');
    }
    return this.activePlugin.getMixingRules(color1, color2);
  }

  validateFormula(formula: ColorFormula): ValidationResult {
    if (!this.activePlugin) {
      throw new Error('No active plugin selected');
    }
    return this.activePlugin.validateFormula(formula);
  }

  private validatePlugin(plugin: ColorPlugin): boolean {
    // Basic validation of required plugin properties and methods
    return !!(
      plugin.id &&
      plugin.name &&
      plugin.version &&
      plugin.brand &&
      typeof plugin.calculateResult === 'function' &&
      typeof plugin.getMixingRules === 'function' &&
      typeof plugin.validateFormula === 'function'
    );
  }
}

export const pluginManager = PluginManager.getInstance();
