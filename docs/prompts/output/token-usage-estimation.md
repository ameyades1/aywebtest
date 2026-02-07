# Token Usage Estimation and Optimization Guide

## 1. Estimation Techniques

### Quick Estimation Rules
- **Simple operations** (read 1 file, single edit): 2-5k tokens
- **Medium tasks** (explore codebase, multi-file edits): 8-15k tokens
- **Complex tasks** (planning, multi-agent work, research): 20-50k tokens
- **Context reading**: ~1k tokens per 2000 lines of code

### Before Starting, Ask Yourself
- How many files will I need to read?
- Will I need to use Task agents (adds 3-5k overhead each)?
- How complex is the logic I'm explaining?
- Does this need a plan first?

**Quick math**: Files to read × 1k tokens ≈ baseline

---

## 2. Strategies to Save Tokens

### A. Use Task Agents Strategically

Instead of you researching (expensive), delegate to subagents:
```
Large codebase exploration → Use Task with Explore agent
Code search → Use Glob/Grep tools directly (cheaper than agent)
Web research → Task with general-purpose agent
```

**Token savings**: ~10-20k if you delegate instead of doing research yourself

### B. Leverage Your Auto Memory

Update `/home/adeswand/.claude/projects/-home-adeswand-repo/memory/MEMORY.md` after each session:
- Common patterns in this codebase
- Lessons learned
- File locations and structure
- Gotchas you discovered

**Token savings**: ~5-10k by avoiding relearning the same codebase

### C. Use Task Lists Early

```
TaskCreate → TaskList → TaskGet → Work methodically
```

This prevents context thrashing and keeps you focused.

**Token savings**: ~5k by avoiding redundant exploration

### D. Be Specific in Tool Calls

Instead of:
```
"Read the entire backend folder" → massive token cost
```

Do:
```
Glob for specific patterns → Grep for keywords → Read only needed files
```

**Token savings**: 30-50% reduction in read operations

---

## 3. Prefix Prompt Strategy (Using Memory)

Create a "task template" in your memory:

**File: `/home/adeswand/.claude/projects/-home-adeswand-repo/memory/TASK_TEMPLATES.md`**

```markdown
# Task Templates for Efficient Prompts

## Code Review Template
When reviewing code, start with:
1. Glob for files matching pattern
2. Grep for specific keywords
3. Read only changed sections
4. Ask focused questions

## Feature Implementation Template
When adding features:
1. Read docs/CONTRIBUTING.md for guidelines
2. Check memory for similar patterns
3. Plan with EnterPlanMode
4. Implement in focused commits

## Bug Fix Template
When fixing bugs:
1. Reproduce with minimal test case
2. Grep for related code
3. Trace execution path
4. Implement minimal fix (no refactoring)
```

Then reference it:
> "Follow CODE_REVIEW template from memory"

**Token savings**: ~3-5k by being systematic

---

## 4. Chunking Large Tasks

```bash
# INSTEAD OF:
"Build entire feature and connect everything"  # 50k tokens

# DO THIS:
# Task 1: Plan the feature (ExitPlanMode)
# Task 2: Implement backend
# Task 3: Implement frontend
# Task 4: Connect and test
```

Run each task separately, let context compress between tasks.

**Token savings**: 20-30% by not keeping entire codebase in context

---

## 5. Smart Tool Selection

| Task | Best Tool | Token Cost |
|------|-----------|------------|
| Find a class | Glob | 0.5k |
| Find all usages | Grep | 1k |
| Read single file | Read | 2-5k |
| Explore codebase | Glob + Grep | 2-3k |
| Deep exploration | Task/Explore | 5-8k |
| Planning | EnterPlanMode | 3-5k |

**Token savings**: Using right tool saves 50-70% vs generic agent

---

## 6. Project-Specific Memory Setup

Create a custom context file for your project:

**Memory file: `/home/adeswand/.claude/projects/-home-adeswand-repo/memory/AYWEBTEST_CONTEXT.md`**

```markdown
# AntarYog Website Project Context

## Project Structure
- docs/prompts/input/ → Raw prompt requests
- docs/prompts/output/ → Generated outputs
- frontend/ → Next.js (Not yet implemented)
- backend/ → Express.js (Not yet implemented)

## Established Guidelines
- Commit format: Conventional Commits (feat/fix/docs/etc)
- No emojis in commits
- Singular folder names (input, output, not inputs/outputs)

## Common Patterns
- Environment variables in .env.local (not committed)
- Backend runs on :5000, Frontend on :3000
- JWT for authentication
- MongoDB for database (TBD)

## File Locations
- Commit guidelines: docs/CONTRIBUTING.md
- Role definition: docs/prompts/output/ROLE_DEFINITION.md
- README: /home/adeswand/repo/aywebtest/README.md
```

Then use: "Using AYWEBTEST_CONTEXT from memory, [task]"

**Token savings**: 8-15k per session by pre-loading context

---

## 7. Pre-Plan for Big Tasks

Before large implementation:
```
Ask: "Can you create a plan without implementing?"
Use EnterPlanMode → Get approval → Then implement
```

**Token savings**: Prevents false starts (10-20k)

---

## 8. Monitor Token Usage

Use `/context` before starting:
- Current: 33k/200k (16%)
- If approaching 50%, use Task agents
- If approaching 75%, commit work and start fresh session

---

## Practical Workflow for Next Phase

When ready to implement frontend/backend:

```
1. Session Start
   - Use /context → Check remaining tokens

2. Check Memory
   - Read AYWEBTEST_CONTEXT
   - Review established guidelines and patterns

3. Plan Phase
   - Use EnterPlanMode (5k tokens, clear direction)
   - Get user approval before proceeding

4. Execute Phase
   - Task 1: Backend scaffolding (20k)
   - Compress context / new session
   - Task 2: Frontend scaffolding (20k)
   - Compress context / new session
   - Task 3: Connect them (15k)

5. Update Memory
   - Add lessons learned
   - Document new patterns discovered
```

This approach keeps each session under 30k and maximizes output.

---

## Quick Reference Summary

### Estimation
- Simple: 2-5k tokens
- Medium: 8-15k tokens
- Complex: 20-50k tokens

### Savings Checklist
- [ ] Using Glob/Grep instead of agents for search
- [ ] Memory files created and referenced
- [ ] Task lists used for organization
- [ ] Specific tool selections (not generic)
- [ ] Large tasks chunked into phases
- [ ] Planning done before implementation
- [ ] Token usage monitored with `/context`

### Memory Files to Create
1. `AYWEBTEST_CONTEXT.md` - Project-specific context
2. `TASK_TEMPLATES.md` - Reusable task templates
3. `DEBUGGING.md` - Common debugging patterns
4. `PATTERNS.md` - Code patterns discovered

---

## Key Takeaways

1. **Tools are cheaper than agents**: Glob/Grep < Task agents
2. **Memory is your friend**: Reuse patterns without re-reading
3. **Chunk work into tasks**: Prevents context bloat
4. **Be specific**: Read what you need, not everything
5. **Monitor context**: Use `/context` before big work
6. **Plan before implementing**: Prevents wasted tokens
7. **Use task lists**: Keeps work organized and focused

---

**Generated**: February 2026
**For Project**: AntarYog Foundation Website
**Model**: Claude Haiku 4.5
