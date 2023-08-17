FROM oven/bun:0.7.3 AS deps

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN bun install

FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG IFANDONLYIF_FRONTEND_BUILD_ARGS=empty
RUN echo $IFANDONLYIF_FRONTEND_BUILD_ARGS | base64 -d > .env.local

RUN NODE_OPTIONS=--max_old_space_size=1600 corepack pnpm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV HOSTNAME=0.0.0.0
ENV PORT 3001

CMD [ "node", "server.js" ]
