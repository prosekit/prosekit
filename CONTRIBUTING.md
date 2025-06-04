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

## Testing

ProseKit has unit and integration tests.

### Unit Tests

- Run all: `pnpm run test`
- Run specific test: `pnpm run test [test-file-path]`
- Run with coverage report: `pnpm run test:coverage`
- Files: Located in `packages/` with `.spec.ts` suffix
- Coverage report: `coverage/` directory

### Integration Tests

- Run all: `pnpm run test:e2e`
- Run specific test: `pnpm run test:e2e [test-file-name]`
- Files: Located in `website/tests/` with `.test.ts` suffix

## Pull Requests

1. Use [Conventional Commits](https://www.conventionalcommits.org/) style for PR titles and Git commit messages.
2. If your changes need to be published, run `pnpm run change` to start an interactive session to create a changeset. Alternatively, you can manually create a changeset file in the `.changeset/` directory.
3. Run `pnpm run fix` to fix linting and formatting issues.
4. Run `pnpm run typecheck` to check for type errors.
5. Make sure all tests pass before submitting a PR.
