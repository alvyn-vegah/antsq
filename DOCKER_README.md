# Docker Setup with MongoDB and pnpm

This project is configured to run with Docker Compose, including MongoDB database and the Next.js application using pnpm.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Start services in detached mode:**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

## Services

### Application (Next.js)
- **Port:** 3000
- **URL:** http://localhost:3000
- **Package Manager:** pnpm
- **Environment:** Development

### MongoDB
- **Port:** 27017
- **Database:** antsq
- **Username:** admin
- **Password:** password
- **Connection String:** mongodb://admin:password@localhost:27017/antsq

### Mongo Express (Database Admin UI)
- **Port:** 8081
- **URL:** http://localhost:8081
- **Username:** admin
- **Password:** password

## Environment Variables

The following environment variables are configured in the compose file:

- `NODE_ENV=development`
- `MONGODB_URI=mongodb://mongodb:27017/antsq`
- `NEXTAUTH_URL=http://localhost:3000`
- `NEXTAUTH_SECRET=your-secret-key-here`

## Database Initialization

The MongoDB container automatically initializes the database with:
- Database name: `antsq`
- Collections: users, products, cart, contactForms, subscriptions, payments, customForms
- Indexes for better performance

## Development Workflow

1. **First time setup:**
   ```bash
   docker-compose up --build
   ```

2. **For development with hot reload:**
   ```bash
   docker-compose up
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f app
   ```

4. **Access MongoDB shell:**
   ```bash
   docker-compose exec mongodb mongosh -u admin -p password
   ```

5. **Access application container:**
   ```bash
   docker-compose exec app sh
   ```

## Production Build

To build for production:

```bash
docker build -t antsq-app .
```

## Troubleshooting

1. **Port conflicts:** Make sure ports 3000, 27017, and 8081 are available
2. **Permission issues:** Run `docker-compose down -v` to remove volumes and start fresh
3. **Database connection:** Ensure MongoDB is fully started before the app tries to connect

## Data Persistence

MongoDB data is persisted in a Docker volume named `mongodb_data`. To completely reset:

```bash
docker-compose down -v
docker-compose up --build
```

## Network

All services are connected through a custom bridge network `app-network` for secure communication. 