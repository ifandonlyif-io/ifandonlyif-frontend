# IF AND ONLY IF

## Getting Started

### Install

```bash
pnpm install
```

### Install and run

Copy `.env.local.example` to `.env.local` and update the variables.

```bash
cp .env.local.example .env.local
```

Serve with hot reload at http://localhost:3001.

```bash
pnpm run dev
```

### Lint

```bash
pnpm run lint
```

### Build

```bash
pnpm run build
```

### Test

Copy `.env.local.example` to `.env.test.local` and update the variables.

```bash
cp .env.local.example .env.test.local
```

Run tests:

```bash
pnpm test
```

### Build Docker container

```bash
docker build -t nextjs-docker .
```

### Run Docker container

```bash
docker run -p 3001:3001 nextjs-docker
```

Server is available at http://localhost:3001/.

## License

This project is licensed under the MIT License.
