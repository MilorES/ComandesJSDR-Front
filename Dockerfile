# Multi-stage Dockerfile for building and serving a Vite + React app
# Build stage
FROM node:latest AS builder
WORKDIR /app

# Build argument per la URL de l'API
ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=$VITE_API_URL

# Copy package manifests and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline --no-audit --silent

# Copy source and build
COPY . .
RUN npm run build

# Production stage: use nginx to serve the built files
FROM nginx:stable-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config with one that supports SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
