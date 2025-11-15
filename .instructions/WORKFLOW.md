# Workflow Guidelines

## 🔄 How to Work on This Project

### Task Execution Process

1. **Read the Task**
   - Go to `TODOS.md` and find an unchecked task `[ ]`
   - Read the complete task description
   - Understand what needs to be done

2. **Plan Your Approach**
   - Identify which files need to be created/modified
   - Think about how to minimize changes to existing files
   - Consider creating new files for new functionality

3. **Execute the Task**
   - Work on **ONE task at a time** - no parallelism
   - Create new files whenever possible instead of editing existing ones
   - Write clean, readable, and maintainable code
   - Add comments for complex logic

4. **Verify Your Work**
   - Test the functionality
   - Check for errors or warnings
   - Ensure code follows conventions in `CONVENTIONS.md`

5. **Mark Complete**
   - Update `TODOS.md` and change `[ ]` to `[x]`
   - Do NOT write documentation about what you did
   - Move to the next task

### ⛔ What NOT to Do

- ❌ **Do NOT work on multiple tasks simultaneously**
- ❌ **Do NOT create summary/documentation files after completing tasks**
- ❌ **Do NOT modify existing files if you can create new ones**
- ❌ **Do NOT skip TODOs or work out of order**
- ❌ **Do NOT leave tasks partially complete**

### ✅ What TO Do

- ✅ **Complete one task fully before starting another**
- ✅ **Check off TODOs immediately after completion**
- ✅ **Create new files for new features**
- ✅ **Keep code modular and well-organized**
- ✅ **Follow the established architecture**
- ✅ **Write self-documenting code with clear naming**

## 🔀 Avoiding Merge Conflicts

### Strategy

- **Sequential work** - One task, one AI, one time
- **New files first** - Create instead of modify when possible
- **Small changes** - Incremental updates are safer
- **Check status** - Always know what's been modified

### File Creation Best Practices

```
Good: Creating `src/utils/newHelper.js` for new utility functions
Bad:  Adding 10 new functions to `src/utils/helpers.js`

Good: Creating `src/components/NewFeature/index.js`
Bad:  Modifying `src/components/App.js` to add new feature
```

## 📊 Progress Tracking

- Use `TODOS.md` as the single source of truth
- Check off items as `[x]` when complete
- Never uncheck completed items
- If a task needs revision, create a new TODO entry

## 🎯 Focus Areas

1. **Scalability** - Design for growth
2. **Maintainability** - Code should be easy to understand
3. **Modularity** - Keep components independent
4. **Clarity** - Clear naming and structure

---

_Follow this workflow strictly to ensure smooth collaboration and high-quality output._
