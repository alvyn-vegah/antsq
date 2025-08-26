# HTTPS Deployment Guide with Nginx

This guide will help you deploy your Next.js application with HTTPS using Nginx as a reverse proxy.

## Prerequisites

- Docker and Docker Compose installed
- A domain name pointing to your VPS
- Root access to your VPS

## Quick Start

### 1. Generate SSL Certificates

For development/testing (self-signed):

```bash
chmod +x generate-ssl.sh
./generate-ssl.sh
```

For production (Let's Encrypt):

```bash
# Edit setup-letsencrypt.sh with your domain and email
nano setup-letsencrypt.sh
chmod +x setup-letsencrypt.sh
./setup-letsencrypt.sh
```

### 2. Update Environment Variables

Edit `compose.yaml` and replace `your-domain.com` with your actual domain:

```yaml
environment:
  - NEXTAUTH_URL=https://your-actual-domain.com
  - NEXT_PUBLIC_API_BASE_URL=https://your-actual-domain.com/api
```

### 3. Deploy

```bash
chmod +x deploy.sh
./deploy.sh
```

## Manual Deployment Steps

### 1. Build and Start Services

```bash
# Stop existing services
docker-compose -f compose.yaml down

# Build images
docker-compose -f compose.yaml build --no-cache

# Start services
docker-compose -f compose.yaml up -d
```

### 2. Check Service Status

```bash
docker-compose -f compose.yaml ps
```

### 3. View Logs

```bash
# All services
docker-compose -f compose.yaml logs -f

# Specific service
docker-compose -f compose.yaml logs -f app
docker-compose -f compose.yaml logs -f nginx
```

## SSL Certificate Management

### Let's Encrypt (Recommended for Production)

1. **Initial Setup**:

   ```bash
   ./setup-letsencrypt.sh
   ```

2. **Auto-renewal** (add to crontab):

   ```bash
   crontab -e
   # Add this line:
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

3. **Manual renewal**:
   ```bash
   sudo certbot renew
   ```

### Self-Signed Certificates (Development)

```bash
./generate-ssl.sh
```

## Configuration Files

### Nginx Configuration (`nginx.conf`)

- HTTPS redirect
- Security headers
- Rate limiting
- Gzip compression
- Static file caching

### Docker Compose (`compose.yaml`)

- App service (Next.js)
- Nginx service (reverse proxy)
- MongoDB service
- SSL certificate mounting

## Security Features

1. **HTTPS Enforcement**: All HTTP traffic redirects to HTTPS
2. **Security Headers**: XSS protection, content type options, etc.
3. **Rate Limiting**: API and login endpoints protected
4. **SSL/TLS**: Modern cipher suites and protocols
5. **Content Security Policy**: XSS and injection protection

## Monitoring

### Health Check

```bash
curl https://your-domain.com/health
```

### SSL Certificate Status

```bash
sudo certbot certificates
```

### Service Logs

```bash
docker-compose -f compose.yaml logs -f
```

## Troubleshooting

### Common Issues

1. **SSL Certificate Errors**:

   - Check certificate files exist: `ls -la ssl/`
   - Verify permissions: `chmod 600 ssl/key.pem`

2. **Nginx Not Starting**:

   - Check nginx logs: `docker-compose logs nginx`
   - Verify nginx.conf syntax

3. **App Not Accessible**:

   - Check app logs: `docker-compose logs app`
   - Verify port mappings

4. **Domain Not Resolving**:
   - Check DNS settings
   - Verify firewall rules (ports 80, 443)

### Useful Commands

```bash
# Restart specific service
docker-compose -f compose.yaml restart nginx

# Rebuild and restart
docker-compose -f compose.yaml down
docker-compose -f compose.yaml up -d --build

# Check container status
docker ps

# Access container shell
docker-compose -f compose.yaml exec app sh
docker-compose -f compose.yaml exec nginx sh
```

## Production Checklist

- [ ] Domain name configured
- [ ] SSL certificates obtained
- [ ] Environment variables updated
- [ ] Firewall configured (ports 80, 443)
- [ ] SSL auto-renewal configured
- [ ] Monitoring/logging set up
- [ ] Backup strategy implemented

## Performance Optimization

1. **Enable HTTP/2**: Already configured in nginx.conf
2. **Gzip Compression**: Enabled for text files
3. **Static File Caching**: 1-year cache for assets
4. **Rate Limiting**: Protects against abuse

## Security Best Practices

1. **Regular Updates**: Keep Docker images updated
2. **SSL Renewal**: Automated with Let's Encrypt
3. **Security Headers**: Comprehensive CSP and other headers
4. **Rate Limiting**: Prevents brute force attacks
5. **Log Monitoring**: Monitor access and error logs
