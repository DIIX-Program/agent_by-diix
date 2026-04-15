import { Command } from 'commander';
import { Kernel } from './core/kernel.js';

const program = new Command();
const kernel = new Kernel();

program
  .name('ai-dev-agent')
  .description('CLI for AI Developer Agent Platform')
  .version('1.0.0');

program.command('run')
  .description('Run a specific task')
  .argument('<taskId>', 'ID of the task to execute')
  .option('-v, --verbose', 'Print verbose logs')
  .action(async (taskId, options) => {
    if (options.verbose) {
       process.env.LOG_LEVEL = 'verbose';
       console.log(`Verbose mode enabled for task: ${taskId}`);
    }
    
    try {
        await kernel.initialize();
        await kernel.runTask(taskId);
    } catch (err) {
        console.error("Critical System Error:", err);
        process.exit(1);
    }
  });

program.command('stats')
  .description('Show token usage and system stats')
  .action(() => {
     console.log("📊 System Stats: [Not Implemented Yet]");
  });

program.command('logs')
  .description('Tail system logs')
  .action(() => {
     console.log("📜 Logs Context: [Not Implemented Yet]");
  });

program.parse();
