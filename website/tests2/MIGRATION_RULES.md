Migration rules from migration playwright to vitest browser

## Workflow

1. Pick a story from `MIGRATION_TODO.md` to migrate.
2. Read the existing test file (playwright) from `website/tests/`
3. Write the new test file (vitest browser) to `website/tests2/`
4. Run `pnpm -w wip_test` to test the migration.
5. If the test passes, update `MIGRATION_TODO.md` to mark the story as migrated and commit the changes, then push to remote.
6. If the test fails after multiple attempts, revert the changes, add a note to `MIGRATION_TODO.md`, and commit the changes
7. Go back to step 1 and repeat the process until all stories are migrated.

## Keep existing comments

When copying tests from `website/tests/` into `website/tests2/`, preserve all inline comments from the original Playwright file unless an update is strictly necessary.

## Update helper.ts

You might want to update `website/tests2/helper.ts` to add new helper functions or update existing ones if utilities can be shared between multiple tests.

## Update MIGRATION_GUIDE.md

Read `MIGRATION_GUIDE.md` to see how to migrate tests from Playwright to vitest browser. If you find new patterns, add them to `MIGRATION_GUIDE.md`.

## Don't use `timeout`

Remove all `timeout` parameters from the `website/tests2/` tests. The default timeout is good enough for most tests.
