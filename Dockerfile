FROM oven/bun:1.3.14-slim AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts
COPY . .

ENV CI=true
RUN bun run fumadocs-mdx
RUN bun run build

FROM oven/bun:1.3.14-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

RUN useradd --system --uid 1001 --gid bun --shell /bin/false appuser

COPY --from=builder --chown=appuser:bun /app/.next/standalone ./
COPY --from=builder --chown=appuser:bun /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:bun /app/public ./public

USER appuser
EXPOSE ${PORT}

CMD ["bun", "server.js"]
