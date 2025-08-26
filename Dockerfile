# Use Node.js 22.17.0 as base image
FROM node:22.17.0-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:22.17.0-alpine AS production

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application from build stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/next.config.ts ./
COPY --from=base /app/middleware.ts ./
COPY --from=base /app/navigation.ts ./
COPY --from=base /app/i8n.ts ./
COPY --from=base /app/config.ts ./
COPY --from=base /app/messages ./messages
COPY --from=base /app/i18n ./i18n

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]

