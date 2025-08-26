#!/bin/bash

# Production deployment script with HTTPS setup

echo "🚀 Starting production deployment with HTTPS..."

# Check if SSL certificates exist
if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    echo "📜 Generating SSL certificates..."
    chmod +x generate-ssl.sh
    ./generate-ssl.sh
fi

# Build and start services
echo "🔨 Building and starting services..."
docker-compose -f compose.yaml down
docker-compose -f compose.yaml build --no-cache
docker-compose -f compose.yaml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose -f compose.yaml ps

echo "✅ Deployment completed!"
echo "🌐 Your application is now running with HTTPS at:"
echo "   - HTTP: http://antsq.com (redirects to HTTPS)"
echo "   - HTTPS: https://antsq.com"
echo ""
echo "📋 Health check: https://antsq.com/health"
echo ""
echo "📝 To view logs: docker-compose -f compose.yaml logs -f"
echo "🛑 To stop: docker-compose -f compose.yaml down"
