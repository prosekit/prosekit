# Contributing to ProseKit

Thanks for your interest in contributing to ProseKit! This guide will help you get started.

## Setup

1. Install [Node.js](https://nodejs.org/) v22.0.0 or later
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
- `registry/` - Framework examples and shared UI components
  - `src/` - Examples and components
  - `test/` - Tests

## Development

Run `pnpm run dev` to start the development server:

- Website: https://localhost:4321
- Playground: https://localhost:4321/playground

## Common Commands

- Build: `pnpm run build` (all) or `pnpm run build:package` (packages only)
- Lint: `pnpm run lint`
- Fix issues: `pnpm run fix` (runs code generation, linting, and formatting)
- Type check: `pnpm run typecheck`

## Testing

- Run all: `pnpm run test:run`
- Run specific test: `pnpm run test [test-file-path]`
- Run with coverage report: `pnpm run test:coverage`
- Files: Unit tests located in `packages/` with `.spec.ts` suffix, and integration tests in `registry/test/` with `.test.ts` suffix
- Coverage report: `coverage/` directory

## Pull Requests

1. Use [Conventional Commits](https://www.conventionalcommits.org/) style for PR titles and Git commit messages.
2. If your changes need to be published, run `pnpm run change` to start an interactive session to create a changeset. Alternatively, you can manually create a changeset file in the `.changeset/` directory.
3. Run `pnpm run fix` to fix linting and formatting issues.
4. Run `pnpm run typecheck` to check for type errors.
5. Make sure all tests pass before submitting a PR.

## Community

Join our Discord server for help and to discuss development: [ProseKit Discord](https://prosekit.dev/chat)
