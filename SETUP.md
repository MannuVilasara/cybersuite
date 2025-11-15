# Cybersecurity Platform - Development Setup

## Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- Docker & Docker Compose
- Git

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
# Edit .env and fill in your values
```

### 3. Start Infrastructure Services

```bash
# Start PostgreSQL, Redis, and MinIO
docker-compose up -d

# Verify services are running
docker-compose ps
```

### 4. Run Database Migrations

```bash
# To be added when Prisma is set up
# pnpm run db:migrate
```

### 5. Start Development Servers

```bash
# Start all apps and services
pnpm dev

# Or start specific workspace
pnpm --filter @cybersec/api-gateway dev
pnpm --filter @cybersec/frontend dev
```

## Available Scripts

- `pnpm dev` - Start all development servers
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all code
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run all tests
- `pnpm clean` - Clean build artifacts

## Project Structure

```
.
├── apps/
│   ├── frontend/          # Next.js dashboard
│   ├── api-gateway/       # Central API gateway
│   └── dashboard/         # Analytics dashboard
├── services/
│   ├── auth/             # Authentication service
│   ├── scanner/          # Security scanner
│   ├── vault/            # Secrets vault
│   ├── ai-explainer/     # AI service
│   └── log-monitor/      # Log monitoring
├── packages/
│   ├── ui/               # Shared UI components
│   ├── types/            # Shared TypeScript types
│   ├── utils/            # Shared utilities
│   └── config/           # Shared configs
└── infrastructure/
    ├── docker/           # Dockerfiles
    ├── k8s/              # Kubernetes manifests
    └── terraform/        # Infrastructure as Code
```

## Infrastructure Services

### PostgreSQL

- URL: `postgresql://postgres:postgres@localhost:5432/cybersec_db`
- Port: `5432`

### Redis

- URL: `redis://localhost:6379`
- Port: `6379`

### MinIO

- API: `http://localhost:9000`
- Console: `http://localhost:9001`
- Username: `minioadmin`
- Password: `minioadmin`

## Troubleshooting

### Port Conflicts

If you encounter port conflicts, update ports in `docker-compose.yml` and `.env`

### Database Connection Issues

```bash
# Reset database
docker-compose down -v
docker-compose up -d postgres
```

### Clear Cache

```bash
pnpm clean
rm -rf node_modules
pnpm install
```

## Next Steps

1. Read `.instructions/PROJECT_OVERVIEW.md` for project vision
2. Check `.instructions/TODOS.md` for available tasks
3. Follow `.instructions/WORKFLOW.md` for development process
4. Review `.instructions/CONVENTIONS.md` for coding standards

## Support

For issues, check `.instructions/` documentation or create an issue.
