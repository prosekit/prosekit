# Plan: Migrate TypeScript `private` to Native `#private` in Public Packages

## Objective
Migrate all TypeScript `private` class fields and private methods to native JavaScript `#private` equivalents for all **public** packages under `./packages/*`, while explicitly excluding `./website` and `./registry`.

## Scope
In scope:
- `packages/*` where `package.json` has `"private": false`
- Source implementation files only (not test files/directories)

Out of scope:
- `website/**`
- `registry/**`
- `packages/*` where `package.json` has `"private": true`
- `**/*.spec.*`
- `**/testing/**/*`

Public packages confirmed:
1. `packages/basic` (`@prosekit/basic`)
2. `packages/core` (`@prosekit/core`)
3. `packages/extensions` (`@prosekit/extensions`)
4. `packages/lit` (`@prosekit/lit`)
5. `packages/pm` (`@prosekit/pm`)
6. `packages/preact` (`@prosekit/preact`)
7. `packages/prosekit` (`prosekit`)
8. `packages/react` (`@prosekit/react`)
9. `packages/solid` (`@prosekit/solid`)
10. `packages/svelte` (`@prosekit/svelte`)
11. `packages/vue` (`@prosekit/vue`)
12. `packages/web` (`@prosekit/web`)

Only `packages/core` and `packages/extensions` currently contain TypeScript `private` class members in source.

## Concrete Migration Targets
1. `packages/core/src/editor/editor.ts`
- `EditorInstance`
  - Fields: `tree`, `directEditorProps`, `afterMounted`, `dispatch`
  - Methods: `getDoc`, `getProp`, `updateExtension`
- `Editor`
  - Field: `instance`

2. `packages/core/src/extensions/clipboard-serializer.ts`
- `CustomDOMSerializer`
  - Fields: `serializeFragmentWrapper`, `serializeNodeWrapper`

3. `packages/core/src/facets/base-extension.ts`
- `BaseExtension`
  - Field: `trees`

4. `packages/core/src/facets/facet-node.ts`
- `FacetNode`
  - Method: `calcOutput`

5. `packages/core/src/facets/facet.ts`
- `Facet`
  - Field: `reduce`

6. `packages/extensions/src/commit/index.ts`
- `CommitRecorder`
  - Fields: `parent`, `doc`, `steps`

7. `packages/extensions/src/file/file-upload.ts`
- `UploadTask`
  - Field: `subscribers`

## Migration Rules
1. Field declarations:
- `private x` -> `#x`
- `private readonly x` -> `readonly #x` if valid syntax needed by formatter/tooling; otherwise `#x` and preserve runtime behavior.

2. Method declarations:
- `private m(...)` -> `#m(...)`

3. All in-class references:
- `this.x` -> `this.#x`
- `this.m(...)` -> `this.#m(...)`

4. Do not change:
- `public`, `protected`, or unqualified members
- external API signatures
- behavior of method/field initialization order

5. Safety checks during edit:
- no cross-class access to migrated member names
- no static-private conversion needed (none present)
- no constructor private parameter properties in public packages (none present)

## Execution Plan
1. Baseline and guard setup.
- Verify working tree and current baseline.
- Record baseline size/test outputs for comparison.

2. Apply code changes in the 7 files listed above.
- Convert all targeted private fields.
- Convert all targeted private methods.
- Update all call sites and property accesses inside the classes.
- Do not modify files matching `**/*.spec.*` or `**/testing/**/*`.

3. Run formatting/linting fixes.
- Use existing repo commands so style stays consistent.

4. Run correctness verification.
- Type-check full workspace.
- Run tests at least for affected packages.
- Build package artifacts.

5. Run bundle-size verification.
- Run size-limit checks using existing `.size-limit.json`.
- Compare before/after results and confirm no regressions.

6. Enforce scope boundaries.
- Confirm no modified files in `website/**` or `registry/**`.
- Confirm no changes in private internal packages unless strictly required (should be none).
- Confirm no changes in `**/*.spec.*` or `**/testing/**/*`.

## Suggested Command Sequence
1. Baseline:
```bash
git status --short
pnpm run build:package
pnpm exec size-limit
```

2. Validate only target files are changed after migration:
```bash
git status --short
git diff --name-only
git diff --name-only | rg "\\.spec\\.|/testing/"
```

3. Quality gates:
```bash
pnpm run typecheck
pnpm run test:run
pnpm run build:package
pnpm exec size-limit
```

4. Optional focused scans:
```bash
rg -n "\\bprivate\\b" packages/core/src packages/extensions/src
rg -n "\\bprivate\\b" packages/basic/src packages/lit/src packages/pm/src packages/preact/src packages/prosekit/src packages/react/src packages/solid/src packages/svelte/src packages/vue/src packages/web/src
```

Expected final scan result:
- No remaining TypeScript `private` class members in public packages under `packages/*`.

## Risks and Mitigations
1. Risk: behavior change for consumers accessing internals via `(obj as any).x`.
- Mitigation: document as intentional hardening of private internals; this is expected with native `#private`.

2. Risk: missing one `this.member` rewrite causing compile errors.
- Mitigation: strict typecheck + grep scan for legacy member names in touched files.

3. Risk: accidental out-of-scope edits.
- Mitigation: enforce path filter in review (`packages/core`, `packages/extensions` only).

4. Risk: unexpected minification impact if downstream target is downgraded.
- Mitigation: keep package build target modern (already ES2023+), and validate with `size-limit`.

5. Risk: touching test fixtures/spec files unintentionally.
- Mitigation: explicitly block modifications to `**/*.spec.*` and `**/testing/**/*`, and check via `git diff --name-only | rg "\\.spec\\.|/testing/"`.

## Acceptance Criteria
1. All private fields and private methods in public `packages/*` sources are migrated to native `#private`.
2. No files under `website/**` or `registry/**` are changed.
3. No files matching `**/*.spec.*` or `**/testing/**/*` are changed.
4. `pnpm run typecheck`, `pnpm run test:run`, and `pnpm run build:package` pass.
5. `pnpm exec size-limit` passes and reports no regression against baseline.
