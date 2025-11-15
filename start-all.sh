#!/bin/bash

echo "🚀 Starting CyberSec Hackathon Project"
echo "======================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}1. Starting PostgreSQL database...${NC}"
docker-compose up -d postgres
sleep 3

echo -e "${BLUE}2. Pushing database schema...${NC}"
cd services/auth-service
pnpm db:push
cd ../..

echo -e "${BLUE}3. Starting Auth Service (port 3001)...${NC}"
cd services/auth-service
pnpm dev &
AUTH_PID=$!
cd ../..

echo -e "${BLUE}4. Starting AI Service (port 3004)...${NC}"
cd services/ai-service
pnpm dev &
AI_PID=$!
cd ../..

echo -e "${BLUE}5. Starting Frontend (port 3000)...${NC}"
cd apps/web
pnpm dev &
WEB_PID=$!
cd ../..

echo ""
echo -e "${GREEN}✅ All services started!${NC}"
echo ""
echo "📝 Services:"
echo "  - Frontend:     http://localhost:3000"
echo "  - Auth Service: http://localhost:3001"
echo "  - AI Service:   http://localhost:3004"
echo "  - Login Page:   http://localhost:3000/login"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for Ctrl+C
trap "kill $AUTH_PID $AI_PID $WEB_PID; docker-compose down; exit" SIGINT SIGTERM
wait
