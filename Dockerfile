FROM oven/bun:1.4.0-slim AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .

ENV CI=true
RUN bun run build
RUN bun install --production --frozen-lockfile

FROM node:24-slim AS runner
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=80
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 80
CMD ["node", "./dist/server/entry.mjs"]
