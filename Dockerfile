FROM node:26-slim AS builder
COPY --from=oven/bun:1.3.14-slim /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts
COPY . .

ENV CI=true
RUN bun run fumadocs-mdx
RUN bun run build

FROM node:26-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs --shell /bin/false appuser

COPY --from=builder --chown=appuser:nodejs /app/.next/standalone ./
COPY --from=builder --chown=appuser:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:nodejs /app/public ./public

USER appuser
EXPOSE ${PORT}

CMD ["node", "server.js"]
