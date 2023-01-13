# Install dependencies only when needed
FROM node:18.10-bullseye AS builder

WORKDIR /app
COPY . .

ARG NEXT_PUBLIC_API_URL=http://127.0.0.1:8080
ARG NEXT_PUBLIC_INFURA_API_KEY=test
ARG NEXT_PUBLIC_ALCHEMY_API_KEY==test
ARG NEXT_PUBLIC_CHAIN_ID=test
ARG NEXT_PUBLIC_IFFNFT_CONTRACT_ADDRESS=test
RUN printf "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}\nNEXT_PUBLIC_INFURA_API_KEY=${NEXT_PUBLIC_INFURA_API_KEY}\nNEXT_PUBLIC_CHAIN_ID=${NEXT_PUBLIC_CHAIN_ID}\nNEXT_PUBLIC_IFFNFT_CONTRACT_ADDRESS=${NEXT_PUBLIC_IFFNFT_CONTRACT_ADDRESS}" > .env.local

ADD https://bun.sh/install /bin/install-bun
RUN chmod +x /bin/install-bun && BUN_INSTALL=/usr install-bun

RUN npm cache clean --force
RUN bun i --loglevel verbose
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
