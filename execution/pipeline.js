export class Pipeline {
  constructor() {
    console.log('[Pipeline] Module mounted.');
    this.steps = [];
  }

  /**
   * Add a step to the pipeline
   * @param {string} name 
   * @param {Function} handler async function to process data
   */
  use(name, handler) {
    this.steps.push({ name, handler });
    return this;
  }

  /**
   * Execute the pipeline sequentially
   * @param {Object} initialData 
   */
  async execute(initialData) {
    let currentData = initialData;
    
    console.log(`[Pipeline] Starting execution of ${this.steps.length} steps.`);
    
    for (const step of this.steps) {
        console.log(`[Pipeline] Executing step: ${step.name}`);
        try {
            currentData = await step.handler(currentData);
        } catch (error) {
            console.error(`[Pipeline] Step "${step.name}" failed: ${error.message}`);
            throw error; // halt pipeline
        }
    }

    console.log('[Pipeline] Execution completed.');
    return currentData;
  }
}