# Authentication Service

Microservice responsible for user authentication, authorization, and session management.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control (RBAC)
- OAuth integration (GitHub, Google)
- Session management with Redis
- API key management
- Multi-factor authentication (MFA)
- Password reset functionality

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/verify-email` - Verify email address

### OAuth

- `GET /api/auth/oauth/github` - GitHub OAuth login
- `GET /api/auth/oauth/github/callback` - GitHub OAuth callback
- `GET /api/auth/oauth/google` - Google OAuth login
- `GET /api/auth/oauth/google/callback` - Google OAuth callback

### Password Management

- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### User Management

- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `POST /api/users/change-password` - Change password

### API Keys

- `GET /api/api-keys` - List user API keys
- `POST /api/api-keys` - Create new API key
- `DELETE /api/api-keys/:id` - Revoke API key

## Environment Variables

See `.env.example` for required environment variables.

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test
```

## Tech Stack

- **Framework**: Express.js
- **Database**: PostgreSQL (via Prisma)
- **Cache**: Redis
- **Authentication**: JWT, OAuth 2.0
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
