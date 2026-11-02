FROM node:24-slim

# Prisma's schema engine needs OpenSSL.
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Dev dependencies stay in the image: `prisma` and `tsx` run migrations and seed on start.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3005

# Applies migrations, seeds the database and starts the server.
CMD ["npm", "run", "start:prod"]
