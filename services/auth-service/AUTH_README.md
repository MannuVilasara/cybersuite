# Auth Service

Complete authentication service with user management, JWT tokens, and OAuth support.

## Features

- ✅ User registration with email validation
- ✅ Login with JWT tokens
- ✅ Token refresh mechanism
- ✅ Password reset flow
- ✅ Email verification
- ✅ Session management
- ✅ API key management
- ✅ Audit logging
- ✅ Role-based access control (USER, ADMIN, DEVELOPER)
- 🔄 GitHub OAuth (placeholder)
- 🔄 Google OAuth (placeholder)

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Database

```bash
# From project root
docker-compose up -d postgres
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update the values (already done in `.env`):

```env
DATABASE_URL="postgresql://cybersec:cybersec123@localhost:5432/cybersec_auth?schema=public"
JWT_SECRET="your-secret-key"
PORT=3001
```

### 4. Run Migrations

```bash
pnpm db:push
# or for migrations
pnpm db:migrate
```

### 5. Start Service

```bash
pnpm dev
```

Service will run on http://localhost:3001

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### OAuth (Placeholder)

- `GET /api/auth/oauth/github` - GitHub OAuth
- `GET /api/auth/oauth/github/callback` - GitHub callback
- `GET /api/auth/oauth/google` - Google OAuth
- `GET /api/auth/oauth/google/callback` - Google callback

### Users

- `GET /api/users` - List users (protected)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### API Keys

- `POST /api/api-keys` - Create API key
- `GET /api/api-keys` - List user's API keys
- `DELETE /api/api-keys/:id` - Delete API key

## Database Schema

### User Model

- Email, username, password
- Email verification status
- Password reset tokens
- OAuth IDs (GitHub, Google)
- Role (USER, ADMIN, DEVELOPER)
- Timestamps

### Session Model

- JWT tokens (access & refresh)
- IP address & user agent
- Expiration tracking

### API Key Model

- API keys for programmatic access
- Usage tracking
- Expiration

### Audit Log Model

- User actions tracking
- IP and user agent logging
- Resource and action details

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token signing and verification
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Request logging
- Audit trail for all actions

## Development Tools

```bash
# Type checking
pnpm check-types

# Database management
pnpm db:studio    # Open Prisma Studio
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema to database
pnpm db:migrate   # Create migration

# Linting
pnpm lint
```

## Logging

All operations are logged with:

- User ID
- Action performed
- IP address
- User agent
- Timestamps

Check audit logs in the database for full history.
