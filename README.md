# AI DEV AGENT SYSTEM (FULL ARCHITECTURE GUIDE)

---

# 1. SYSTEM IDEA

. This system is an AI-powered development agent

. It works like a software engineer:
. Read task
. Analyze
. Plan
. Execute
. Validate
. Improve

. The system is NOT a simple LLM wrapper
. It is a modular AI system using skills

---

# 2. FOLDER STRUCTURE

---

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
│   └── /token-control
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
│   ├── /core/base.skill.js
│   ├── /frontend
│   ├── /backend
│   ├── /database
│   ├── /auth
│   ├── /ai
│   ├── /devops
│   └── /optimization
│
├── /workspace
│   ├── /tasks
│   └── /templates
│
├── /memory
├── /logs
├── /user-space
├── /config
├── cli.js
├── index.js
└── package.json

---

# 3. SYSTEM FLOW (LOGIC)

---

## MAIN FLOW

Task Input
↓
Task Reader
↓
Planner
↓
Token Control
↓
Executor
↓
Skill Execution
↓
Feedback
↓
Result Writer
↓
Memory Update

---

## DETAILED FLOW

---

### Step 1: Read Task

. Read file task.md
. Extract requirement

---

### Step 2: Plan

. Break task into steps

Example:

[
{ step: "database", skill: "schema.skill" },
{ step: "backend", skill: "api.skill" },
{ step: "frontend", skill: "ui.skill" }
]

---

### Step 3: Token Check

. Estimate token

IF token > threshold
→ Split task

---

### Step 4: Execute

. Run each step

Sequential if dependent
Parallel if independent

---

### Step 5: Skill Execution

. Each step calls 1 skill

---

### Step 6: Validate

. Check output correctness
. Retry if fail

---

### Step 7: Save Result

. Write result.md
. Update status.json

---

### Step 8: Memory

. Save important info
. Summarize after 5 runs

---

# 4. SKILL USAGE

---

## FRONTEND

. ui.skill
. Build UI layout

. component.skill
. Create components

. dragdrop.skill
. Build drag-drop UI

---

## BACKEND

. api.skill
. Create API

. service.skill
. Business logic

. validation.skill
. Validate input

---

## DATABASE

. schema.skill
. Design DB

. erd.skill
. Relationship

. optimization.skill
. Performance

---

## AUTH

. jwt.skill
. Authentication

. rbac.skill
. Authorization

---

## AI

. codegen.skill
. Generate code

. refactor.skill
. Improve code

. review.skill
. Analyze code

---

## DEVOPS

. docker.skill
. Container

. deploy.skill
. Deploy

---

## OPTIMIZATION

. performance.skill
. Improve speed

---

# 5. EXECUTION RULES

---

. Must use planner → executor
. Must not call LLM directly
. Must split large task
. Must validate output
. Must log everything

---

# 6. TASK FORMAT

---

# TASK

## Type:

web / api / database

## Requirement:

Describe clearly

## Output:

. code
. structure

---

# 7. SYSTEM GOAL

---

. Fully automated coding
. Modular architecture
. Scalable
. Extendable

---

# 8. FINAL RESULT

---

. result.md
. status.json
. log.json
. token_usage.json

---
