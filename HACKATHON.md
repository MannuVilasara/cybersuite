# 🔐 CyberSec Platform - AI-Powered Security Automation

> **Hackathon Submission**: AI Service for Automated Vulnerability Fixing

## 🎯 Project Overview

An AI-powered security service that automatically analyzes code vulnerabilities, generates secure fixes, and creates pull requests - demonstrating the future of automated security remediation.

## ✨ Key Features

### 1. **AI Vulnerability Analysis** 🧠

- Uses GPT-4 to explain security vulnerabilities in plain language
- Provides impact assessment and security recommendations
- Returns confidence scores for AI analysis

### 2. **Automated Code Fixing** ⚡

- Generates production-ready secure code replacements
- Creates detailed diffs showing all changes
- Includes optional test cases for verification
- Uses specialized AI parameters for deterministic, secure code

### 3. **Pull Request Automation** 🚀

- Combines multiple fixes into cohesive PRs
- Generates comprehensive PR descriptions
- Tracks all changes (files, lines added/removed)
- Ready for GitHub integration

## 🏗️ Architecture

```
Monorepo Structure (Turborepo + pnpm)
├── services/
│   └── ai-service/          # 🎯 Main hackathon demo
│       ├── src/
│       │   ├── index.ts              # Express server
│       │   ├── controllers/          # API endpoints
│       │   ├── services/             # AI logic (OpenAI + GitHub)
│       │   ├── routes/               # API routes
│       │   └── middleware/           # Error handling & logging
│       └── package.json
│
├── packages/
│   ├── types/               # TypeScript type definitions
│   ├── config/              # Environment & configuration
│   └── utils/               # Shared utilities (validation, errors, logging)
│
└── apps/
    └── web/                 # Next.js frontend (future)
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.22.0
- OpenAI API key

### Installation

```bash
# Clone and install
git clone <your-repo>
cd gndec
pnpm install

# Set up environment
cd services/ai-service
cp .env.example .env
# Add your OPENAI_API_KEY to .env

# Start the service
pnpm dev
```

The service will run on **http://localhost:3004**

### Running the Demo

```bash
# Make sure the service is running, then:
./demo.sh
```

This will demonstrate:

1. Vulnerability explanation
2. Code fix generation
3. PR creation

## 📡 API Endpoints

### Health Check

```bash
GET /health
```

### Explain Vulnerability

```bash
POST /api/ai/explain
{
  "vulnerabilityId": "vuln-001",
  "context": {
    "code": "SELECT * FROM users WHERE id = ' + userId",
    "language": "sql",
    "severity": "high",
    "type": "sql-injection"
  }
}
```

### Generate Fix

```bash
POST /api/ai/fix
{
  "vulnerabilityId": "vuln-001",
  "includeTests": true
}
```

### Create Pull Request

```bash
POST /api/ai/generate-pr
{
  "vulnerabilityIds": ["vuln-001", "vuln-002"],
  "title": "Security fixes",
  "description": "Automated fixes by AI"
}
```

## 🛠️ Tech Stack

- **Runtime**: Node.js 20 + TypeScript 5.3
- **Framework**: Express.js with security middleware (Helmet, CORS, rate limiting)
- **AI**: OpenAI GPT-4 API
- **GitHub**: Octokit for PR automation
- **Validation**: Zod for runtime type safety
- **Build**: Turborepo + pnpm workspaces
- **Dev Tools**: TSX for hot reload, TSup for building

## 📦 Shared Packages

### `@cybersec/types`

Complete TypeScript type definitions for:

- Users, Organizations, API Keys
- Vulnerabilities, Scans, Secrets
- AI Explanations, Fixes, and PRs
- Logs and Security Alerts

### `@cybersec/utils`

Production-ready utilities:

- **Error Handling**: 12+ custom error classes
- **Logging**: Structured JSON logging with 6 levels
- **Validation**: Zod schemas for all API endpoints
- **Crypto**: Encryption, hashing, token generation
- **HTTP**: API clients, retry logic, pagination

### `@cybersec/config`

Type-safe configuration management:

- Zod-based environment validation
- Service port allocation
- Feature flags
- Constants and limits

## 🎨 Code Highlights

### Type-Safe API Client

```typescript
// Pre-configured service clients
const aiClient = createAIServiceClient(authToken);
const fix = await aiClient.post("/api/ai/fix", { vulnerabilityId });
```

### Comprehensive Validation

```typescript
// Zod schemas with Express middleware
router.post(
  "/fix",
  validateBody(aiFixSchema), // Runtime validation
  generateFix // Type-safe controller
);
```

### Smart Error Handling

```typescript
// Custom error classes with proper HTTP codes
throw new ServiceUnavailableError("AI service temporarily unavailable");
// → Auto-formatted JSON response with 503 status
```

## 🧪 Demo Workflow

```
User Submits Code
      ↓
AI Service Receives Vulnerability
      ↓
OpenAI Analyzes Code (GPT-4)
      ↓
Generate Explanation + Recommendations
      ↓
User Requests Fix
      ↓
AI Generates Secure Code + Tests
      ↓
Create Pull Request
      ↓
GitHub PR Ready for Review
```

## 🏆 What Makes This Special

### 1. **Production Architecture**

Not just a hack - built with scalability in mind:

- Monorepo structure for code sharing
- Comprehensive type safety (TypeScript + Zod)
- Proper error handling and logging
- Security middleware (Helmet, CORS, rate limiting)

### 2. **AI Integration**

Sophisticated AI usage:

- Context-aware prompts for vulnerability analysis
- Temperature tuning (0.7 for analysis, 0.3 for code)
- Confidence scoring
- Structured output parsing

### 3. **Developer Experience**

- Fast development with hot reload
- Type checking across all packages
- Shared utilities prevent code duplication
- Clear separation of concerns

## 🔮 Future Enhancements

- [ ] Real GitHub integration for live PR creation
- [ ] Integration with scanner service for vulnerability detection
- [ ] Support for Python, Java, Go, etc.
- [ ] Custom AI models trained on security patterns
- [ ] Automated fix testing and verification
- [ ] Dashboard for tracking fixes and PRs
- [ ] Multi-language support
- [ ] CI/CD integration

## 📝 Environment Variables

```bash
# Server
PORT=3004
NODE_ENV=development

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2000
AI_TEMPERATURE=0.7

# GitHub
GITHUB_TOKEN=ghp_...
GITHUB_REPO_OWNER=your-org
GITHUB_REPO_NAME=your-repo

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🐛 Troubleshooting

### Service won't start

- Check `OPENAI_API_KEY` is set in `.env`
- Verify port 3004 is not in use
- Run `pnpm install` to ensure dependencies are installed

### TypeScript errors

```bash
pnpm run check-types --filter=@cybersec/ai-service
```

### API returns 500

- Check service logs for detailed error messages
- Verify OpenAI API key is valid and has credits
- Check network connectivity

## 📚 Documentation

- [DEMO.md](./DEMO.md) - Detailed demo instructions
- [SETUP.md](./SETUP.md) - Development environment setup
- [services/ai-service/README.md](./services/ai-service/README.md) - AI Service details

## 👥 Team

Built for [Your Hackathon Name] by [Your Team/Name]

## 📄 License

MIT

---

**Built with ❤️ using TypeScript, AI, and lots of ☕**
