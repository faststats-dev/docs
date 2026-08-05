FROM oven/bun:1.3.14-slim AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .

ENV CI=true
RUN bun run build

FROM node:22-slim AS runner
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=80
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist

EXPOSE 80
CMD ["node", "./dist/server/entry.mjs"]
