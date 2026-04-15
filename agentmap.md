/ai-dev-agent
│
├── /core
│   ├── kernel.js
│   ├── lifecycle.js
│   ├── registry.js
│   └── config.loader.js
│
├── /engine
│   ├── /brain
│   │   ├── llm.js
│   │   ├── prompt.engine.js
│   │   └── model.router.js
│   │
│   ├── /planner
│   │   ├── planner.js
│   │   └── task.breakdown.js
│   │
│   ├── /executor
│   │   ├── executor.js
│   │   ├── parallel.js
│   │   └── dependency.graph.js
│   │
│   ├── /context
│   │   ├── selector.js
│   │   ├── ranker.js
│   │   └── compressor.js
│   │
│   ├── /feedback
│   │   ├── evaluator.js
│   │   ├── validator.js
│   │   └── improver.js
│   │
│   ├── /memory-engine
│   │   ├── short.memory.js
│   │   ├── long.memory.js
│   │   ├── memory.manager.js
│   │   └── context.builder.js
│   │
│   └── /token-control 🔥
│       ├── token.estimator.js
│       ├── token.guard.js
│       ├── task.splitter.js
│       └── result.merger.js
│
├── /features
│   ├── /task-system
│   │   ├── task.reader.js
│   │   ├── task.planner.js
│   │   ├── task.executor.js
│   │   ├── task.writer.js
│   │   └── task.status.js
│   │
│   ├── /summarizer
│   │   ├── summarizer.js
│   │   ├── important.extractor.js
│   │   └── memory.cleaner.js
│   │
│   ├── /optimizer
│   │   ├── token.optimizer.js
│   │   ├── prompt.optimizer.js
│   │   └── cost.analyzer.js
│   │
│   ├── /analyzer
│   │   ├── log.analyzer.js
│   │   ├── token.analyzer.js
│   │   └── suggestion.engine.js
│   │
│   ├── /error-system
│   │   ├── error.logger.js
│   │   ├── error.classifier.js
│   │   ├── error.fixer.js
│   │   └── retry.handler.js
│   │
│   └── /plugin-system
│       ├── plugin.loader.js
│       └── plugin.manager.js
│
├── /skills
│   ├── /core
│   │   └── base.skill.js
│   │
│   ├── /frontend
│   │   ├── ui.skill.js
│   │   ├── component.skill.js
│   │   └── dragdrop.skill.js
│   │
│   ├── /backend
│   │   ├── api.skill.js
│   │   ├── service.skill.js
│   │   └── validation.skill.js
│   │
│   ├── /database
│   │   ├── schema.skill.js
│   │   ├── erd.skill.js
│   │   └── optimization.skill.js
│   │
│   ├── /auth
│   │   ├── jwt.skill.js
│   │   └── rbac.skill.js
│   │
│   ├── /ai
│   │   ├── codegen.skill.js
│   │   ├── refactor.skill.js
│   │   └── review.skill.js
│   │
│   ├── /devops
│   │   ├── docker.skill.js
│   │   └── deploy.skill.js
│   │
│   └── /optimization
│       └── performance.skill.js
│
├── /workspace
│   ├── /tasks
│   │   ├── task_001/
│   │   │   ├── task.md
│   │   │   ├── result.md
│   │   │   ├── status.json
│   │   │   └── log.json
│   │
│   └── /templates
│       ├── task.template.md
│       └── agentmap.md
│
├── /memory
│   ├── important.md
│   ├── context.json
│   ├── errors.json
│   └── token_usage.json
│
├── /logs
│   ├── app.log
│   ├── error.log
│   └── token.log
│
├── /user-space
│   ├── /skills
│   │   └── custom.skill.js 🔥
│   │
│   ├── /plugins
│   │   └── custom.plugin.js
│   │
│   └── user.config.json
│
├── /config
│   ├── env.js
│   ├── constants.js
│   └── model.config.js
│
├── cli.js
├── index.js
└── package.json




#  AI DEV AGENT SYSTEM MAP (PRODUCTION)

---

# 0.  SYSTEM PURPOSE

This system is an **AI-powered development agent platform**.

Its purpose is to:

* Read structured tasks
* Analyze requirements
* Automatically plan execution steps
* Execute using modular skills
* Optimize token usage
* Maintain memory across sessions
* Generate production-ready code

---

# 1.  CORE EXECUTION FLOW

The system MUST follow this pipeline:

Task Input
↓
Task Reader
↓
Task Planner
↓
Token Control (estimate + split if needed)
↓
Execution Strategy (parallel / sequential)
↓
Task Executor
↓
Skill Execution
↓
Feedback Loop (validate / retry)
↓
Result Merger
↓
Task Writer
↓
Memory Update
↓
Summarization (every 5 runs)

---

# 2.  ARCHITECTURE OVERVIEW

## Layers:

1. Core Layer → bootstrapping
2. Engine Layer → intelligence
3. Feature Layer → business logic
4. Skill Layer → execution units
5. Workspace Layer → task interaction
6. Memory Layer → persistence
7. User Layer → customization

---

# 3.  MODULE RESPONSIBILITY

---

## 3.1 CORE

### kernel.js

* Entry point of system
* MUST NOT call LLM directly
* MUST orchestrate planner + executor

### registry.js

* Dependency Injection container
* Store and retrieve all services

### lifecycle.js

* Manage system lifecycle
* Initialize components in correct order

---

## 3.2 ENGINE

---

### Planner

Responsible for:

* Breaking task into steps
* Mapping steps to skills

OUTPUT:
[
{ step, skill, input }
]

---

### Executor

Responsible for:

* Running steps
* Resolving dependencies
* Handling execution order

---

### Token Control

Responsible for:

* Estimating token size
* Deciding whether to split task

RULE:
IF tokens > threshold → split task

---

### Context System

Responsible for:

* Selecting relevant data
* Ranking importance
* Compressing context

RULE:
Never send full history to LLM

---

### Feedback System

Responsible for:

* Validating output
* Retrying failed steps
* Improving prompt

---

### Memory Engine

Responsible for:

* Short memory (last 5 interactions)
* Long memory (important facts)

---

# 4.  FEATURE SYSTEM

---

## Task System

* Read from /workspace/tasks
* Write results to result.md
* Track status.json

---

## Summarizer

Trigger:
After every 5 executions

Actions:

* Extract important info
* Save to memory/important.md
* Clear short memory

---

## Optimizer

* Reduce token usage
* Optimize prompt structure
* Analyze cost

---

## Analyzer

* Analyze logs
* Track token usage
* Suggest improvements

---

## Error System

* Log errors
* Classify error types
* Retry execution

---

## Plugin System

* Load external modules
* Extend functionality dynamically

---

# 5. SKILL SYSTEM

---

## Definition

A Skill is:

* A modular unit of execution
* Independent
* Reusable

---

## Skill Rules

* MUST have single responsibility
* MUST accept input → return output
* MUST NOT depend on global state

---

## Skill Categories

### Frontend

* UI generation
* Component building
* Drag-drop logic

### Backend

* API generation
* Business logic

### Database

* Schema design
* Optimization

### Auth

* JWT
* RBAC

### AI

* Code generation
* Refactoring

### DevOps

* Docker
* Deployment

---

# 6.  TASK STRUCTURE

Each task must follow:

/workspace/tasks/{task_id}

Files:

task.md → input
result.md → output
status.json → status
log.json → logs

---

# 7. TASK FORMAT

Example:

# TASK

## Type:

web / api / database / fullstack

## Requirement:

Describe clearly

## Output:

* file structure
* code
* explanation

---

# 8.  EXECUTION RULES

---

## Rule 1: NEVER call LLM directly in kernel

---

## Rule 2: ALWAYS use planner → executor

---

## Rule 3: SPLIT large tasks

---

## Rule 4: USE skills for execution

---

## Rule 5: VALIDATE before finishing

---

## Rule 6: LOG everything

---

## Rule 7: OPTIMIZE token usage

---

# 9.  EXECUTION STRATEGY

---

## Sequential

Use when:

* steps depend on each other

---

## Parallel

Use when:

* steps independent

---

# 10.  MEMORY RULES

---

## Short Memory

* Last 5 interactions
* Temporary

---

## Long Memory

* Important data only
* Persistent

---

## Summarization

After 5 interactions:

* Extract key points
* Store in important.md
* Clear old data

---

# 11.  OUTPUT REQUIREMENTS

Each execution MUST produce:

* result.md
* log.json
* status.json
* token_usage.json

---

# 12.  ERROR HANDLING

---

If error occurs:

1. Log error
2. Classify error
3. Retry with improved input
4. If still fail → fallback strategy

---

# 13.  AI BEHAVIOR

---

The AI MUST:

* Think before coding
* Break problem into steps
* Avoid generating large code in one pass
* Prefer modular output

---

# 14.  PERFORMANCE RULES

---

* Minimize token usage
* Avoid redundant calls
* Cache reusable data
* Reuse previous results

---

# 15.  EXTENSIBILITY

---

System MUST support:

* Custom skills (/user-space)
* Custom plugins
* Model switching

---

# 16.  VISUAL BUILDER (ANTIGRAVITY MODE)

---

If task contains UI schema:

* Parse schema
* Map to components
* Generate UI code

---

Example schema:

{
"type": "dashboard",
"components": [
{ "type": "kanban" },
{ "type": "chart" }
]
}

---

# 17.  FINAL GOAL

---

The system should behave like:

* AI Software Engineer
* Capable of building full applications
* Self-optimizing
* Extensible

---

# 18.  THINKING STRATEGY

---

Before execution:

1. Understand task
2. Break into steps
3. Estimate complexity
4. Decide execution strategy

---

# 19.  DO NOT

---

* Do not skip planner
* Do not generate monolithic code
* Do not ignore token limits
* Do not ignore memory system

---

# 20. SUCCESS CRITERIA

---

System is successful when:

* Tasks are completed automatically
* Code is modular
* Token usage is optimized
* Errors are handled automatically

---
