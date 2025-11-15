# 🛡️ Unified Cybersecurity Platform

> **🎯 HACKATHON DEMO**: See [HACKATHON.md](./HACKATHON.md) for the AI Service demo!

A modular, scalable cybersecurity platform that provides comprehensive security tooling for developers, startups, and enterprises — all in one place.

## 🚀 Hackathon Quick Start

We've built an **AI-powered vulnerability fixing service** for this hackathon. Get started in 3 steps:

```bash
# 1. Install dependencies
pnpm install

# 2. Configure API key
cd services/ai-service
cp .env.example .env
# Edit .env: Add your OPENAI_API_KEY=sk-...

# 3. Start the service
pnpm dev

# 4. Run demo (in another terminal)
cd ../..
./demo.sh
```

**📖 Complete documentation**: [HACKATHON.md](./HACKATHON.md) | [DEMO.md](./DEMO.md)

---

## 🎯 What We're Building

Instead of relying on multiple separate tools for code security, secret management, vulnerability scanning, DevSecOps, and AI security assistance — our platform provides everything in one unified solution.

### Core Features

- **🔍 Git Repository Security Scanner** - Automated detection of hardcoded secrets, vulnerabilities, unsafe configurations, and dependency risks
- **🔐 Zero-Trust Secrets Vault** - Client-side encrypted vault for API keys, passwords, tokens, and certificates
- **🤖 AI Security Assistant** - AI-powered vulnerability explanations, fix suggestions, and automated PR generation
- **📊 Log Monitoring & Alerts** - Real-time log analysis for errors, attacks, and suspicious behavior
- **📈 Developer Dashboard** - Clean, modern UI for managing security, secrets, logs, and reports

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- Docker & Docker Compose

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start infrastructure (PostgreSQL, Redis, MinIO)
docker-compose up -d

# Start development servers
pnpm dev
```

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 📁 Project Structure

```
.
├── apps/
│   ├── frontend/          # Next.js dashboard application
│   ├── api-gateway/       # Central API gateway
│   └── dashboard/         # Analytics dashboard
├── services/
│   ├── auth/             # Authentication & user management
│   ├── scanner/          # Repository security scanner
│   ├── vault/            # Zero-trust secrets vault
│   ├── ai-explainer/     # AI explanations & auto-fix
│   ├── log-monitor/      # Log monitoring & alerts
│   └── billing/          # Subscription management
├── packages/
│   ├── ui/               # Shared UI component library
│   ├── types/            # Shared TypeScript types
│   ├── utils/            # Shared utility functions
│   └── config/           # Shared configurations
├── infrastructure/
│   ├── docker/           # Dockerfiles
│   ├── k8s/              # Kubernetes manifests
│   └── terraform/        # Infrastructure as Code
└── .instructions/        # Development guidelines & tasks
```

## 🛠️ Technology Stack

- **Monorepo:** Turborepo with pnpm workspaces
- **Frontend:** Next.js 14+, React, Tailwind CSS, shadcn/ui
- **Backend:** Node.js (Fastify), Python (FastAPI)
- **Database:** PostgreSQL, Redis
- **Storage:** MinIO
- **AI:** OpenAI, Anthropic Claude
- **DevOps:** Docker, Kubernetes, GitHub Actions

See [.instructions/TECH_STACK.md](./.instructions/TECH_STACK.md) for complete details.

## 📚 Documentation

### For Developers

- **[SETUP.md](./SETUP.md)** - Development environment setup
- **[.instructions/PROJECT_OVERVIEW.md](./.instructions/PROJECT_OVERVIEW.md)** - Project vision and features
- **[.instructions/ARCHITECTURE.md](./.instructions/ARCHITECTURE.md)** - System design and principles
- **[.instructions/WORKFLOW.md](./.instructions/WORKFLOW.md)** - Development workflow and best practices
- **[.instructions/CONVENTIONS.md](./.instructions/CONVENTIONS.md)** - Coding standards
- **[.instructions/TODOS.md](./.instructions/TODOS.md)** - Project tasks and roadmap

### Architecture Principles

- **Zero-Trust Security** - Never trust, always verify
- **Modularity** - Self-contained, independent services
- **Scalability** - Designed for growth from day one
- **Client-Side Encryption** - User data privacy by design

## 🎯 Development Workflow

1. **Pick ONE task** from [.instructions/TODOS.md](./.instructions/TODOS.md)
2. **Create new files** for new features (avoid editing existing files)
3. **Implement and test** thoroughly
4. **Check off the TODO** immediately after completion
5. **Move to next task** - one at a time to avoid merge conflicts

See [.instructions/WORKFLOW.md](./.instructions/WORKFLOW.md) for complete guidelines.

## 📦 Available Scripts

```bash
# Development
pnpm dev              # Start all services in dev mode
pnpm build            # Build all packages
pnpm lint             # Lint all code
pnpm format           # Format code with Prettier
pnpm test             # Run all tests
pnpm clean            # Clean build artifacts

# Specific workspace
pnpm --filter @cybersec/frontend dev
pnpm --filter @cybersec/api-gateway dev
```

## 🔐 Security Features

### Authentication & Authorization

- OAuth2 (GitHub, Google)
- JWT-based sessions
- Role-based access control (RBAC)
- API key management

### Scanning Capabilities

- Secret detection (API keys, passwords, tokens)
- Vulnerability scanning (Semgrep integration)
- Dependency analysis (npm, pip, go)
- Configuration security checks

### Vault Security

- AES-256 client-side encryption
- PBKDF2 key derivation
- Zero-knowledge architecture
- Comprehensive audit logs

## 🌟 Roadmap

- [x] Project setup and monorepo structure
- [x] Development environment configuration
- [ ] Authentication & user management
- [ ] Git repository security scanner
- [ ] AI explainer & auto-remediation
- [ ] Zero-trust secrets vault
- [ ] Log monitoring & alerts
- [ ] Frontend dashboard
- [ ] Kubernetes deployment
- [ ] Marketplace & plugins

See [.instructions/TODOS.md](./.instructions/TODOS.md) for detailed task breakdown.

## 🤝 Contributing

We follow strict development guidelines to maintain code quality and avoid conflicts:

1. **Work on ONE task at a time**
2. **Always check off TODOs after completion**
3. **Never write documentation after completing tasks**
4. **Create new files instead of modifying existing ones**
5. **Follow the architecture and coding conventions**

Read [.instructions/WORKFLOW.md](./.instructions/WORKFLOW.md) before contributing.

## 📄 License

[To be determined]

## 🔗 Links

- Documentation: [.instructions/](./.instructions/)
- Setup Guide: [SETUP.md](./SETUP.md)
- Issues: [GitHub Issues](https://github.com/your-org/cybersec-platform/issues)

---

**Built with security in mind, designed for developers.**
