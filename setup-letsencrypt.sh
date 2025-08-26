#!/bin/bash

# Let's Encrypt SSL setup script
# Replace 'your-domain.com' with your actual domain

DOMAIN="antsq.com"
EMAIL="alvin@vegah.com"

echo "🔐 Setting up Let's Encrypt SSL certificates for $DOMAIN..."

# Install certbot if not installed
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing certbot..."
    sudo apt update
    sudo apt install -y certbot
fi

# Create SSL directory
mkdir -p ssl

# Stop nginx temporarily
echo "⏸️ Stopping nginx temporarily..."
docker-compose -f compose.yaml stop nginx

# Get SSL certificate
echo "📜 Obtaining SSL certificate from Let's Encrypt..."
sudo certbot certonly --standalone \
    -d $DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --non-interactive

# Copy certificates to project directory
echo "📋 Copying certificates..."
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/key.pem

# Set proper permissions
sudo chmod 644 ssl/cert.pem
sudo chmod 600 ssl/key.pem
sudo chown $USER:$USER ssl/cert.pem ssl/key.pem

# Update nginx configuration with domain
sed -i "s/antsq.com/$DOMAIN/g" compose.yaml

# Start services
echo "🚀 Starting services with SSL..."
docker-compose -f compose.yaml up -d

echo "✅ SSL setup completed!"
echo "🌐 Your application is now running with HTTPS at: https://$DOMAIN"
echo ""
echo "📅 Certificate will auto-renew. To renew manually:"
echo "   sudo certbot renew"
echo ""
echo "📋 To check certificate status:"
echo "   sudo certbot certificates"
