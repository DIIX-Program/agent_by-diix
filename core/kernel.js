import { ConfigLoader } from './config.loader.js';
import { Lifecycle } from './lifecycle.js';
import { registry } from './registry.js';
import { TaskReader } from '../features/task-system/task.reader.js';
import { TaskWriter } from '../features/task-system/task.writer.js';
import { TaskStatus } from '../features/task-system/task.status.js';
import { TaskPlanner } from '../features/task-system/task.planner.js';
import { TaskExecutor } from '../features/task-system/task.executor.js';
import { TokenEstimator } from '../engine/token-control/token.estimator.js';
import { TaskSplitter } from '../engine/token-control/task.splitter.js';
import { Validator } from '../engine/feedback/validator.js';
import { MemoryManager } from '../engine/memory-engine/memory.manager.js';
import { Summarizer } from '../features/summarizer/summarizer.js';
import { LLMClient } from '../engine/brain/llm.js';
export class Kernel {
  constructor() {
    this.configLoader = new ConfigLoader();
    this.lifecycle = new Lifecycle();
  }

  async initialize() {
    console.log("==========================================");
    console.log("🚀 Starting AI Dev Agent Kernel...");
    console.log("==========================================");
    this.configLoader.load();
    
    // Register Core Components
    registry.register('Kernel', this);
    registry.register('TaskReader', new TaskReader());
    registry.register('TaskWriter', new TaskWriter());
    registry.register('TaskStatus', new TaskStatus());
    registry.register('TaskPlanner', new TaskPlanner());
    registry.register('TaskExecutor', new TaskExecutor());
    registry.register('TokenEstimator', new TokenEstimator());
    registry.register('ModelSelector', new ModelSelector());
    registry.register('TaskSplitter', new TaskSplitter());
    registry.register('LLMClient', new LLMClient());
    registry.register('Validator', new Validator());
    registry.register('MemoryManager', new MemoryManager());
    registry.register('Summarizer', new Summarizer());

    await this.lifecycle.boot();
    console.log("✅ Kernel initialized successfully.");
  }

  async runTask(taskId) {
     const status = registry.get('TaskStatus');
     status.update(taskId, 'running');
     
     console.log(`[Kernel] Preparing to run task: ${taskId}`);
     
     try {
       const reader = registry.get('TaskReader');
       const writer = registry.get('TaskWriter');
       const estimator = registry.get('TokenEstimator');
       const planner = registry.get('TaskPlanner');
       const executor = registry.get('TaskExecutor');
       const validator = registry.get('Validator');
       const memoryManager = registry.get('MemoryManager');

       const task = await reader.read(taskId);
       const tokens = estimator.estimate(task.content);
       console.log(`[TokenControl] Task tokens: ${tokens}`);

       let result;
       let isValid = false;
       let retries = 0;
       const MAX_RETRIES = 2;

       while (!isValid && retries <= MAX_RETRIES) {
           if (tokens > 3000) {
             const splitter = registry.get('TaskSplitter');
             const parts = splitter.split(task);
             let splitResults = [];
             
             for (const part of parts) {
               const partPlan = await planner.createPlan(part);
               const partRes = await executor.execute(partPlan);
               splitResults.push(partRes);
             }
             
             result = splitResults.join("\\n");
           } else {
             const plan = await planner.createPlan(task);
             result = await executor.execute(plan);
           }
           
           const validationResult = validator.validate(result);
           isValid = validationResult.valid;
           
           if (!isValid) {
               console.warn(`[Kernel] Validation failed: ${validationResult.error}. Retrying (${retries}/${MAX_RETRIES})...`);
               retries++;
           }
       }
       
       if (!isValid) {
           throw new Error("Validation failed after maximum retries.");
       }

       // Prepare structured context for writing
       const writeContext = {
           result: result,
           status: { state: 'done', updated_at: new Date().toISOString() },
           logs: { events: 'Validation passed. Run completed.' },
           tokenUsage: { estimated: tokens, used: tokens }
       };

       await writer.writeResult(taskId, writeContext);
       
       // Update short memory
       await memoryManager.addEntry({
           taskId: taskId,
           result: result
       });

       status.update(taskId, 'done');
       console.log(`[Kernel] Task ${taskId} finished successfully.`);

     } catch(err) {
       status.update(taskId, 'failed');
       console.error(`Task Failed: ${err.message}`);
     }
  }
}
