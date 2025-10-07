# Task: Implement Missing Framework Examples

## Background

This project contains example implementations for various frameworks (React, Vue, Preact, Svelte, Solid) in `website/src/examples/`.

- **Story**: A feature/example that can be implemented across multiple frameworks
- **Example**: A specific implementation of a story in ONE framework
- **Goal**: Ensure all stories are implemented for all frameworks

The file `TODO.md` tracks which story/framework combinations are missing (unchecked checkboxes).

## Setup

1. Run `pnpm install`
2. Run `pnpm -w run build`

## Implementation Loop

For each unchecked checkbox in TODO.md, follow these steps:

1. Run `git fetch --all && git merge origin/ocavue/examples`. If there are new
   updates, you should read prompt.md again to get the latest instructions.

2. **Implement ONE example** (one story + one framework combination)

   - Pick only ONE framework for ONE story at a time
   - Look at existing implementations in `website/src/examples/` for reference
   - Reuse shared components/utilities from `website/src/shared/` when possible

3. **Update TODO.md** to check off the completed checkbox

4. **Run validation commands** (must all pass):

   ```bash
   pnpm -w gen                                             # Generate symlinks and update metadata
   pnpm -w fix:dprint                                      # Format code
   pnpm -w typecheck                                       # Type check
   pnpm -w run test:e2e website/tests/<story_name>.test.ts # Run e2e test (replace <story_name>)
   ```

5. **Commit and push** if all commands pass

6. **Repeat** until all checkboxes in TODO.md are checked

## Handling Failures

If you encounter persistent issues with a specific example after multiple attempts:

- Add a comment in TODO.md to skip that example
- Move on to the next unchecked item
- Continue until all viable examples are complete

## Key Files

- `website/src/examples/` - Example implementations organized by story and framework
- `website/src/shared/` - Shared utilities/components usable across examples
- `website/example.meta.json` - Example metadata (auto-updated by `pnpm -w gen`)
- `packages/dev/src/gen-example-symlinks.ts` - Script that generates symlinks (run via `pnpm -w gen`)
- `TODO.md` - Progress tracking checklist
- `website/tests/` - E2E tests for examples

## Important Notes

- **One at a time**: Only implement ONE framework for ONE story per iteration
- **Don't stop**: Continue until all checkboxes in TODO.md are checked or explicitly skipped
- **Test before commit**: All validation commands must pass before committing
