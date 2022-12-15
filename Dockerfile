# Install dependencies only when needed
FROM node:16.18-bullseye-slim AS builder

WORKDIR /app
COPY . .

RUN apt update && apt install unzip curl -y
ADD https://bun.sh/install /bin/install-bun
RUN chmod +x /bin/install-bun && BUN_INSTALL=/usr install-bun

RUN bun i
RUN bun run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

ENV PORT 3001

CMD ["node", "server.js"]
