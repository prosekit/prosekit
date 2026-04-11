# Contributing to ProseKit

## Setup

1. Install [Node.js](https://nodejs.org/) v24.0.0 or later and [pnpm](https://pnpm.io/)
2. Clone the repository and run `pnpm install`

## Project Structure

- `packages/` — npm packages (`core`, `extensions`, `web`, `react`, `vue`, `preact`, `svelte`, `solid`, `basic`, `prosekit`)
- `registry/` — Framework examples and shared UI components (see [`registry/CONTRIBUTING.md`](registry/CONTRIBUTING.md) for guidelines)
- `website/` — Documentation site (`src/content/` for Markdown)

## Development

Start the dev server with `pnpm run dev`:

- Website: https://localhost:4321
- Playground: https://localhost:4321/playground

Useful commands:

- `pnpm run build` — Build all packages (or `pnpm run build:package` for packages only)
- `pnpm run fix` — Run code generation, linting, and formatting
- `pnpm run lint` — Lint without auto-fixing
- `pnpm run typecheck` — Type check
- `pnpm run test:run` — Run all tests
- `pnpm run test [path]` — Run a specific test
- `pnpm run test:coverage` — Run tests with coverage report

Unit tests are in `packages/` (`*.spec.ts`). Integration tests are in `registry/test/` (`*.test.ts`).

## Pull Requests

1. Use [Conventional Commits](https://www.conventionalcommits.org/) for PR titles and commit messages.
2. Run `pnpm run fix` and `pnpm run typecheck`.
3. Make sure all tests pass.
4. If publishing changes, run `pnpm run change` to create a changeset.

## Community

Join the [ProseKit Discord](https://prosekit.dev/chat) for help and discussion.
