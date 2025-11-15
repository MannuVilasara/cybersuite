# Coding Conventions & Standards

## 📖 General Principles

### Code Quality Standards

- **Readability First** - Code is read more than written
- **Consistency** - Follow established patterns
- **Simplicity** - Simple solutions over clever ones
- **Maintainability** - Think about future developers

---

## 📝 Naming Conventions

### Variables

- Use **descriptive names** that explain purpose
- Avoid single-letter names except for loops/lambdas
- Use camelCase for most languages (adjust per language)

```javascript
// ✅ GOOD
const userAuthentication = true;
const maxRetryAttempts = 3;
const currentUserProfile = {};

// ❌ BAD
const ua = true;
const x = 3;
const data = {};
```

### Functions

- Use **verb-noun** format
- Name describes what the function does
- Keep functions focused on single task

```javascript
// ✅ GOOD
function getUserProfile() {}
function validateEmailAddress() {}
function calculateTotalPrice() {}

// ❌ BAD
function user() {}
function check() {}
function process() {}
```

### Files

- Match file name to primary export/class
- Use kebab-case or PascalCase consistently
- Group related files in folders

```
✅ GOOD:
user-authentication.js
UserProfile.js
calculate-price.js

❌ BAD:
file1.js
helper.js
utils2.js
```

### Classes/Components

- Use PascalCase
- Descriptive, noun-based names
- Indicate purpose clearly

```javascript
// ✅ GOOD
class UserAuthentication {}
class PaymentProcessor {}
class DataValidator {}

// ❌ BAD
class User1 {}
class Helper {}
class Manager {}
```

---

## 🏗️ Code Structure

### File Organization

```javascript
// 1. Imports (grouped logically)
import externalDeps from "library";
import { helper } from "./utils/helper";

// 2. Constants
const MAX_ATTEMPTS = 3;
const API_ENDPOINT = "/api/v1";

// 3. Type definitions (if applicable)
// interface, types, etc.

// 4. Main implementation
function mainFunction() {
  // implementation
}

// 5. Helper functions (if small and related)
function helperFunction() {
  // implementation
}

// 6. Exports
export { mainFunction };
export default mainFunction;
```

### Function Structure

- **Keep functions small** (< 50 lines ideally)
- **Single responsibility** - one job per function
- **Early returns** for clarity
- **Extract complex logic** to helper functions

```javascript
// ✅ GOOD
function processUserData(user) {
  if (!user) return null;
  if (!user.isValid) return null;

  return transformUserData(user);
}

// ❌ BAD
function processUserData(user) {
  if (user) {
    if (user.isValid) {
      // 50 lines of nested code
    }
  }
}
```

---

## 💬 Comments

### When to Comment

**DO Comment:**

- Complex algorithms or business logic
- Non-obvious decisions or workarounds
- Public API/interface documentation
- TODOs and FIXMEs with context

```javascript
// ✅ GOOD
// Using binary search for O(log n) performance on sorted array
function findUser(users, id) {
  // implementation
}

// Workaround for API rate limiting issue (see ticket #123)
await delay(100);
```

**DON'T Comment:**

- Obvious code
- Redundant information
- Instead of good naming

```javascript
// ❌ BAD
// Increment counter by 1
counter++;

// Get the user
const user = getUser();
```

### Comment Style

- Use clear, concise language
- Keep comments up-to-date with code
- Remove commented-out code (use version control)

---

## 🎯 Best Practices

### Error Handling

- Always handle errors explicitly
- Provide meaningful error messages
- Use try-catch appropriately
- Log errors with context

```javascript
// ✅ GOOD
try {
  const data = await fetchUserData(userId);
  return processData(data);
} catch (error) {
  console.error(`Failed to fetch user ${userId}:`, error);
  throw new Error(`User data unavailable: ${error.message}`);
}
```

### Constants

- Extract magic numbers and strings
- Use meaningful constant names
- Group related constants

```javascript
// ✅ GOOD
const DEFAULT_TIMEOUT_MS = 5000;
const API_BASE_URL = "https://api.example.com";
const MAX_RETRY_ATTEMPTS = 3;

// ❌ BAD
setTimeout(() => {}, 5000);
fetch("https://api.example.com/users");
```

### DRY Principle

- Don't repeat code logic
- Extract common patterns
- Create reusable utilities

### SOLID Principles (for OOP)

- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

---

## 🧪 Testing Conventions

### Test Files

- Co-locate with source or in `tests/` directory
- Use `.test.js` or `.spec.js` suffix
- Mirror source file structure

### Test Naming

- Describe what is being tested
- Use "should" or "it" format
- Be specific and clear

```javascript
// ✅ GOOD
describe("UserAuthentication", () => {
  it("should return true for valid credentials", () => {});
  it("should throw error for invalid email format", () => {});
});
```

---

## 📦 Module/Package Organization

### Exports

- Export only what's needed (encapsulation)
- Use named exports for multiple items
- Use default export for primary item

```javascript
// ✅ GOOD
export function helperA() {}
export function helperB() {}
export default MainClass;

// In consumer
import MainClass, { helperA, helperB } from "./module";
```

### Imports

- Group and order logically
- External dependencies first
- Internal modules after
- Avoid circular dependencies

---

## ✨ Language-Specific Conventions

### JavaScript/TypeScript

- Use `const` by default, `let` when needed, avoid `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Prefer async/await over promises chains

### Python

- Follow PEP 8 style guide
- Use snake_case for functions/variables
- Use type hints where beneficial

### Java

- Follow Oracle naming conventions
- Use meaningful package names
- Follow JavaBeans conventions

_(Adjust this section based on your actual tech stack)_

---

## 🔍 Code Review Checklist

Before marking a task complete:

- [ ] Code follows naming conventions
- [ ] Functions are small and focused
- [ ] No duplicate code
- [ ] Comments explain "why" not "what"
- [ ] Error handling is appropriate
- [ ] Code is readable and maintainable
- [ ] No console.logs or debug code left behind
- [ ] Follows established patterns in codebase

---

_These conventions ensure consistency and quality across the entire project._
