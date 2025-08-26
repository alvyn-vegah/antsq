FROM nginx:alpine

# Install openssl for certificate generation
RUN apk add --no-cache openssl

# # Copy nginx configuration
# COPY nginx.conf /etc/nginx/nginx.conf

# # Create SSL directory
# RUN mkdir -p /etc/nginx/ssl

# SSL directory not needed for HTTP-only setup
# RUN mkdir -p /etc/nginx/ssl

# Expose ports
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
