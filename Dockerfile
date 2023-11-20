################################################################################
# BASE
# This is the stage that the other stages in this file are based on.
# - defines the Node version
# - set global configuration
# - set default work dir
################################################################################
FROM docker.io/node:lts-alpine AS base

FROM base as builder


RUN corepack enable
RUN corepack prepare pnpm@8.10.5 --activate
RUN apk add --update --no-cache git python3 make g++

# Create app directory
WORKDIR /app

# Copy package.json and the lock file
COPY package.json pnpm-lock.yaml ./

# Install app dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build apps
RUN yarn build

WORKDIR /app/dist/pubkey-resolver

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

FROM base AS production
# Expose default port
EXPOSE 3000

# Create app directory
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=3000

# Copy from base stage /app/dist/pubkey-resolver to /app
COPY --from=builder /app/dist/pubkey-resolver /app

# Create pubkey user
RUN addgroup --system pubkey && adduser --system -G pubkey pubkey
# Change ownership of /app to pubkey
RUN chown -R pubkey:pubkey .

# Start server
CMD ["node", "main"]
