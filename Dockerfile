# Install dependencies only when needed
FROM node:18.10-bullseye AS builder

WORKDIR /app
COPY . .

ARG IFANDONLYIF_FRONTEND_BUILD_ARGS=empty
RUN echo $IFANDONLYIF_FRONTEND_BUILD_ARGS | base64 -d > .env.local
RUN cat .env.local

RUN if [ "$(uname -m)" = "x86_64" ] ; \
    then LINUX_ARCH=x64 ; \
    else LINUX_ARCH=arm64 ; fi;\
    wget https://github.com/pnpm/pnpm/releases/download/v7.25.0/pnpm-linuxstatic-$LINUX_ARCH \
    -O /bin/pnpm && chmod +x /bin/pnpm


RUN npm cache clean --force
RUN NODE_OPTIONS=--max_old_space_size=800 pnpm i
RUN NODE_OPTIONS=--max_old_space_size=800 pnpm run build

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

