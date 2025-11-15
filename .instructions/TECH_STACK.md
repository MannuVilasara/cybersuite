# Technology Stack Reference

## 📚 Complete Technology Stack for Unified Cybersecurity Platform

> **Note:** This document lists all technologies, libraries, and tools used across the platform. Reference this when making technology choices.

---

## 🏗️ Core Infrastructure

### Monorepo Management

- **Turborepo** - Fast build system for monorepos
  - Alternative: **Nx** - Extensible build framework
- **pnpm** - Fast, disk space efficient package manager
  - Alternatives: yarn workspaces, npm workspaces

### Version Control

- **Git** - Source control
- **GitHub** - Repository hosting, CI/CD, issue tracking

---

## 🔙 Backend Technologies

### API Gateway

- **Node.js 20+** - JavaScript runtime
- **Fastify** - Fast and low overhead web framework
  - Plugins: `@fastify/cors`, `@fastify/helmet`, `@fastify/rate-limit`
- **TypeScript 5+** - Type safety

### Microservices Frameworks

**Node.js Services:**

- **Fastify** - High-performance framework
- **Express** - Alternative if needed

**Python Services:**

- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Communication Protocols

- **REST** - Standard HTTP APIs
- **gRPC** - High-performance RPC framework
  - `@grpc/grpc-js` - Node.js gRPC implementation
  - `grpcio` - Python gRPC library
- **WebSockets** - Real-time communication
  - `ws` library for Node.js

### Event Bus & Messaging

- **Redis** - In-memory data store
  - Use cases: Pub/Sub, caching, rate limiting
- **NATS** - Cloud-native messaging system
  - Alternative to Redis for event streaming
- **BullMQ** - Redis-based job queue (Node.js)
- **RQ** (Redis Queue) - Python task queue

---

## 💾 Databases & Storage

### Primary Database

- **PostgreSQL 16+** - Relational database
  - Extensions: `pgcrypto`, `uuid-ossp`

### ORM/Database Tools

**Node.js:**

- **Prisma** - Next-generation ORM (recommended)
  - Auto-generated types
  - Migration system
  - Prisma Studio for data browsing
- **Sequelize** - Alternative ORM

**Python:**

- **SQLAlchemy** - SQL toolkit and ORM
- **Alembic** - Database migration tool

### Caching & In-Memory Store

- **Redis 7+** - Caching, sessions, rate limiting
  - `ioredis` - Node.js Redis client
  - `redis-py` - Python Redis client

### Object Storage

- **MinIO** - S3-compatible object storage
  - For: scan artifacts, reports, logs, file uploads
  - Client: `minio` npm package / Python SDK

---

## 🎨 Frontend Technologies

### Framework & Runtime

- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Node.js 20+** - Build and runtime

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
  - Built on Radix UI primitives
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Icon library
- **clsx** / **tailwind-merge** - Conditional class merging

### State Management

- **Zustand** - Lightweight state management
  - Alternative: **Redux Toolkit** for complex state
- **React Context** - Built-in state sharing

### Data Fetching & Caching

- **TanStack Query (React Query)** - Server state management
  - Caching, revalidation, background updates
- **Axios** - HTTP client
  - Alternative: native `fetch` with wrapper
- **SWR** - Alternative to React Query

### Forms & Validation

- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **Yup** - Alternative schema validation

### Charts & Visualization

- **Chart.js** - Simple charts
- **Recharts** - React chart library
- **D3.js** - Advanced data visualization (if needed)
- **React Flow** - Node-based graphs (for architecture diagrams)

### Code Display

- **Prism.js** / **highlight.js** - Syntax highlighting
- **Monaco Editor** - VS Code-like code editor
- **react-diff-viewer** - Code diff visualization

---

## 🔐 Security & Authentication

### Authentication & Authorization

- **jsonwebtoken** / **jose** - JWT handling
- **Passport.js** - Authentication middleware
  - `passport-google-oauth20` - Google OAuth
  - `passport-github2` - GitHub OAuth
- **bcrypt** / **argon2** - Password hashing
- **nanoid** / **uuid** - Unique ID generation

### Encryption

- **Web Crypto API** - Browser-based crypto (vault)
- **crypto** (Node.js built-in) - Server-side crypto
- **libsodium** / **tweetnacl** - Advanced encryption
- **helmet** - Security headers for Express/Fastify

### Secret Management

- **dotenv** - Environment variables
- **@t3-oss/env-nextjs** - Type-safe environment variables

---

## 🔍 Security Scanning Tools

### Static Analysis

- **Semgrep** - Static code analysis
  - Custom rule creation
  - Multi-language support
- **ESLint** - JavaScript/TypeScript linting
  - `eslint-plugin-security` - Security rules
- **Bandit** - Python security linter

### Secret Scanning

- **Trufflehog** - Secret detection
- **gitleaks** - Git secret scanner
- **detect-secrets** - Yelp's secret scanner

### Dependency Scanning

- **npm audit** - Node.js dependency scanner
- **yarn audit** - Yarn dependency scanner
- **pip-audit** - Python dependency scanner
- **Snyk** - Multi-language dependency scanner
- **OWASP Dependency-Check** - Dependency analyzer

### Vulnerability Databases

- **CVE Database** - Common vulnerabilities
- **GitHub Advisory Database** - Security advisories
- **OSV** (Open Source Vulnerabilities) - Vulnerability DB

---

## 🤖 AI & Machine Learning

### AI/LLM Integration

- **OpenAI API** - GPT models
  - `openai` npm package / Python SDK
- **Anthropic Claude** - Alternative LLM
- **Google Gemini** - Alternative LLM
- **Ollama** - Local LLM deployment
- **LangChain** - LLM orchestration framework

### Prompt Management

- **Promptable** - Prompt versioning
- Custom template system in codebase

---

## 🧪 Testing

### Unit & Integration Testing

**JavaScript/TypeScript:**

- **Vitest** - Fast unit test framework (recommended)
- **Jest** - Popular testing framework
- **tsx** - TypeScript test runner

**Python:**

- **PyTest** - Testing framework
- **unittest** - Built-in testing

### End-to-End Testing

- **Playwright** - Modern E2E testing (recommended)
- **Cypress** - Alternative E2E framework

### API Testing

- **Supertest** - HTTP assertion library
- **Postman** / **Insomnia** - Manual API testing

### Code Coverage

- **c8** / **nyc** - JavaScript code coverage
- **coverage.py** - Python code coverage

### Mocking

- **MSW** (Mock Service Worker) - API mocking
- **Vitest mocks** - Built-in mocking
- **unittest.mock** - Python mocking

---

## 📦 DevOps & Deployment

### Containerization

- **Docker** - Container runtime
- **Docker Compose** - Multi-container orchestration

### Orchestration

- **Kubernetes (K8s)** - Container orchestration
  - **Helm** - Kubernetes package manager
  - **kubectl** - Kubernetes CLI
- **k9s** - Terminal-based K8s UI

### CI/CD

- **GitHub Actions** - Automation workflows
  - Workflow files in `.github/workflows/`
- **Docker Hub** / **GHCR** - Container registry

### Infrastructure as Code

- **Terraform** - Multi-cloud IaC
  - Provider: AWS, GCP, Azure
- **Pulumi** - Alternative IaC (TypeScript-based)

### Cloud Platforms (Deployment Options)

- **AWS** - EC2, ECS, EKS, RDS, S3
- **Google Cloud** - GKE, Cloud Run, Cloud SQL
- **Azure** - AKS, App Service
- **DigitalOcean** - App Platform, Kubernetes
- **Railway** / **Render** - Simplified deployment

---

## 📊 Observability & Monitoring

### Metrics

- **Prometheus** - Metrics collection
  - `prom-client` - Node.js Prometheus client
  - `prometheus_client` - Python client
- **Grafana** - Metrics visualization
  - Pre-built dashboards

### Logging

- **Pino** - Fast Node.js logger
- **Winston** - Alternative Node.js logger
- **Loguru** - Python logging library
- **Loki** - Log aggregation system

### Error Tracking

- **Sentry** - Error monitoring
  - `@sentry/node` - Backend SDK
  - `@sentry/nextjs` - Frontend SDK

### APM (Application Performance Monitoring)

- **OpenTelemetry** - Observability framework
- **Jaeger** - Distributed tracing
- **New Relic** - Commercial APM
- **Datadog** - Commercial observability

### Uptime Monitoring

- **UptimeRobot** - Free uptime monitoring
- **Better Uptime** - Status pages
- **Pingdom** - Website monitoring

---

## 🔧 Development Tools

### Code Quality

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Ruff** - Fast Python linter
- **Black** - Python code formatter
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

### API Documentation

- **Swagger / OpenAPI** - API specification
  - `@fastify/swagger` - Fastify integration
- **Stoplight** - API design platform
- **Redoc** - OpenAPI documentation UI

### Code Generation

- **Prisma Client** - Auto-generated DB client
- **GraphQL Codegen** - GraphQL type generation (if using GraphQL)

### Development Servers

- **nodemon** - Auto-restart Node.js apps
- **tsx watch** - TypeScript watch mode
- **vite** - Frontend dev server (Next.js built-in)

---

## 🌐 Networking & Communication

### Reverse Proxy

- **NGINX** - Reverse proxy, load balancer
- **Traefik** - Cloud-native proxy (K8s)

### SSL/TLS

- **Let's Encrypt** - Free SSL certificates
- **cert-manager** - K8s certificate management

### DNS & CDN

- **Cloudflare** - CDN, DNS, DDoS protection
- **AWS CloudFront** - CDN

---

## 📱 Additional Libraries

### Utilities

**JavaScript/TypeScript:**

- **date-fns** - Date manipulation
- **lodash** - Utility functions
- **zod** - Schema validation
- **dotenv** - Environment variables
- **cross-env** - Cross-platform env vars

**Python:**

- **python-dotenv** - Environment variables
- **python-dateutil** - Date utilities
- **requests** - HTTP library

### File Processing

- **multer** - File upload handling (Node.js)
- **archiver** - Create archives
- **unzipper** - Extract archives

### Email

- **Nodemailer** - Email sending (Node.js)
- **SendGrid** / **Mailgun** - Email services
- **React Email** - Email templates in React

### Webhooks

- **svix** - Webhook infrastructure
- Custom webhook implementation

---

## 📋 Project Management Tools

### Documentation

- **Markdown** - Documentation format
- **Docusaurus** - Documentation site (if needed)
- **Notion** / **Confluence** - Team docs

### Communication

- **Slack** - Team communication
- **Discord** - Developer community

---

## 🔄 Version Control

### Semantic Versioning

- **standard-version** - Automated versioning
- **semantic-release** - Fully automated releases

### Changelog

- **conventional-changelog** - Generate changelog
- **commitlint** - Enforce commit conventions

---

## 📝 Environment Variables

### Required Environment Variables Template

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cybersec_db

# Redis
REDIS_URL=redis://localhost:6379

# MinIO
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# OAuth
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx

# AI Services
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx

# Sentry
SENTRY_DSN=https://xxx@sentry.io/xxx

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=user@gmail.com
SMTP_PASS=password

# App
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:4000
```

---

_This tech stack is optimized for scalability, security, and developer experience._
