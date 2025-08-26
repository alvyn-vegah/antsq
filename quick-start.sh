#!/bin/bash

echo "🚀 Quick Start - HTTPS Deployment"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Generate SSL certificates if they don't exist
if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    echo "📜 Generating SSL certificates..."
    chmod +x generate-ssl.sh
    ./generate-ssl.sh
else
    echo "✅ SSL certificates already exist"
fi

# Make scripts executable
chmod +x deploy.sh
chmod +x setup-letsencrypt.sh

echo ""
echo "🔧 Configuration Required:"
echo "1. Edit compose.yaml and replace 'your-domain.com' with your actual domain"
echo "2. Update environment variables in compose.yaml"
echo ""
echo "📋 Available commands:"
echo "   ./deploy.sh              - Deploy with self-signed SSL"
echo "   ./setup-letsencrypt.sh   - Deploy with Let's Encrypt SSL (production)"
echo "   docker-compose logs -f   - View logs"
echo "   docker-compose down      - Stop services"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎯 Ready to deploy! Run: ./deploy.sh"