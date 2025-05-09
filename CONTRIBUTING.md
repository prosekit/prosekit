# Contributing to ProseKit

Thanks for your interest in contributing to ProseKit! This guide will help you get started.

## Setup

1. Install [Node.js](https://nodejs.org/) v20.11.0 or later
2. Install [pnpm](https://pnpm.io/)
3. Clone the ProseKit repository
4. Run `pnpm install` in the repository root directory

## Project Structure

ProseKit is a monorepo using pnpm workspaces:

- `packages/` - All packages published to npm:
  - `core/` - Core editor functionality
  - `extensions/` - Editor features (bold, italic, tables, etc.)
  - `web/` - Web components
  - `react/`, `vue/`, `preact/`, `svelte/`, `solid/` - Framework integrations
  - `basic/` - Simple starter kit
  - `prosekit/` - Main umbrella package that re-exports functionality
- `website/` - Documentation and examples
  - `src/content/` - Documentation markdown
  - `src/examples/` - Live demos.
  - `tests/` - Integration tests

## Development

Run `pnpm run dev` to start the development server:

- Website: https://localhost:4321
- Playground: https://localhost:4321/astrobook

## Common Commands

- Build: `pnpm run build` (all) or `pnpm run build:package` (packages only)
- Lint: `pnpm run lint`
- Fix issues: `pnpm run fix` (runs code generation, linting, and formatting)
- Type check: `pnpm run typecheck`

## Code Style

- TypeScript: No semicolons, single quotes (double in JSX)
- Naming: PascalCase for types/classes, camelCase for variables/functions
- Line width: 200 characters
- No console statements (except warn, error, assert)

## Testing

ProseKit has unit and integration tests.

Before running the tests, you need to install Playwright with the following command:

```bash
pnpm run test:install
```

### Unit Tests

- Run all: `pnpm run test`
- Run specific test: `pnpm run test [test-file-path]`
- Files: Located in `packages/` with `.spec.ts` suffix

### Integration Tests

- Run all: `pnpm run test:e2e`
- Run specific test: `pnpm run test:e2e [test-file-name]`
- Files: Located in `website/tests/` with `.test.ts` suffix

## Pull Requests

1. Use [Conventional Commits](https://www.conventionalcommits.org/) style for PR titles
2. After making changes, run `pnpm run change` to create a changeset
3. Make sure all tests pass before submitting
