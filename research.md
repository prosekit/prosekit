# Research: Rewriting TypeScript `private` Members to Native `#` Private Members

## Goal
Improve final app bundle size (after bundling + minification) by migrating TypeScript `private` class members to native JavaScript `#private` members.

## Scope and Method
I did a repository-wide static scan across `packages/`, `registry/`, and `website/` (TS/JS sources), then analyzed:

- all class declarations
- all TypeScript `private` members (fields, methods, constructor parameter properties)
- build targets and bundling pipeline
- minifier behavior (`esbuild`) for `field` vs `#field`
- migration safety risks per class

---

## Key Findings (Executive Summary)

1. There are **no existing native `#private` members** in the repo.
2. TypeScript `private` members are concentrated in a small set of files:
- **17 classes** in **16 files**
- **43 private members** total
- Breakdown:
  - **31 private property declarations**
  - **11 private method declarations**
  - **1 private constructor parameter property**
3. In published runtime packages, private usage is limited:
- `@prosekit/core`: 13 members
- `@prosekit/extensions`: 4 members
- Internal-only/private packages hold the rest (`registry`, `@prosekit/vfs`).
4. Build target is modern (`es2023` + `firefox116`), so native `#private` syntax is compatible with the package build pipeline.
5. `esbuild` minification **does rename** native private names (`#directEditorProps` -> `#s`) but does **not** rename ordinary object/class property names by default.
6. Estimated raw minified char savings from migration:
- **Published packages (`core` + `extensions`)**:
  - **Fields-only migration (your requested scope): ~564 chars**
  - **Fields + private methods: ~637 chars**
- **Whole repo (including internal `registry` and `vfs`)**:
  - **Fields-only: ~998 chars**
  - **Fields + methods: ~1320 chars**

Interpretation: expected gzip/brotli gain is likely modest (sub-kilobyte), but deterministic and safe for modern targets.

---

## Build / Bundle Reality Check

### Package build target
`packages/config-tsdown/src/index.ts` sets:

- `target: ['es2023', 'firefox116']`

This is important because native private fields are supported and can stay as `#x` in emitted JS.

### Affected public bundles
`.size-limit.json` indicates size checks are focused on built `packages/prosekit/dist/*.js` entry files, which aggregate `core`/`extensions` and others.

### Minifier behavior validation
I ran `esbuild --minify` experiments.

#### Case A: normal field
```js
class o{foo=1;bar(){return this.foo+this.foo}}console.log(new o().bar());
```

#### Case B: native private field
```js
class o{#o=1;bar(){return this.#o+this.#o}}console.log(new o().bar());
```

Private version is shorter because minifier can safely rename `#foo`.

I also tested a long name (`directEditorProps`):

- public field minified size: **111 bytes**
- `#private` minified size: **66 bytes**

So long member names are exactly where this strategy pays off.

### Critical caveat (downlevel targets)
When targeting older JS (example `es2018`), `#private` is transformed into WeakMap/helper code and can significantly increase output size.

Conclusion: this optimization is positive only when final app targets modern JS and preserves native private fields through minification.

---

## Inventory of Current `private` Usage

## Published packages (highest relevance to npm consumer app size)

| File | Class | Private fields | Private methods | Constructor private params |
|---|---|---|---|---|
| `packages/core/src/editor/editor.ts` | `EditorInstance` | `tree`, `directEditorProps`, `afterMounted`, `dispatch` | `getDoc`, `getProp`, `updateExtension` | none |
| `packages/core/src/editor/editor.ts` | `Editor` | `instance` | none | none |
| `packages/core/src/extensions/clipboard-serializer.ts` | `CustomDOMSerializer` | `serializeFragmentWrapper`, `serializeNodeWrapper` | none | none |
| `packages/core/src/facets/base-extension.ts` | `BaseExtension` | `trees` | none | none |
| `packages/core/src/facets/facet-node.ts` | `FacetNode` | none | `calcOutput` | none |
| `packages/core/src/facets/facet.ts` | `Facet` | `reduce` | none | none |
| `packages/extensions/src/commit/index.ts` | `CommitRecorder` | `parent`, `doc`, `steps` | none | none |
| `packages/extensions/src/file/file-upload.ts` | `UploadTask` | `subscribers` | none | none |

## Internal/private packages (relevant for website/registry, not npm consumers)

| File | Class | Private fields | Private methods | Constructor private params |
|---|---|---|---|---|
| `packages/vfs/src/virtual-file-system.ts` | `VirtualFileSystem` | `files` | `ensureFile` | none |
| `packages/vfs/src/virtual-file.ts` | `VirtualFile` | none | `getAbsPath` | `rootDir` |
| `registry/src/vanilla/renderer.ts` | `VanillaRendererElement` | `component` | `load`, `render` | none |
| `registry/src/lit/examples/minimal/editor.ts` | `LitEditor` | `editor`, `ref` | none | none |
| `registry/src/lit/examples/slash-menu/editor.ts` | `LitEditor` | `editor`, `ref` | none | none |
| `registry/src/lit/examples/toolbar/editor.ts` | `LitEditor` | `editor`, `ref` | none | none |
| `registry/src/lit/ui/button/button.ts` | `LitButton` | `handleMouseDown` | none | none |
| `registry/src/lit/ui/image-upload-popover/image-upload-popover.ts` | `LitImageUploadPopover` | `open`, `url`, `file`, `ariaId`, `handleOpenChange`, `handleFileChange`, `handleUrlChange`, `handleSubmit` | `deferResetState` | none |
| `registry/src/lit/ui/toolbar/toolbar.ts` | `LitToolbar` | `removeUpdateExtension` | `attachEditorListener`, `detachEditorListener` | none |

---

## Impact Analysis (Where the bytes are)

### Top files by estimated savings (fields-only)

| File | Estimated raw minified char saving | Notes |
|---|---:|---|
| `packages/core/src/editor/editor.ts` | ~335 | Dominant contributor in published code |
| `registry/src/lit/ui/image-upload-popover/image-upload-popover.ts` | ~170 | Internal registry/UI |
| `packages/core/src/extensions/clipboard-serializer.ts` | ~120 | Published |
| `registry/src/lit/ui/toolbar/toolbar.ts` | ~76 | Internal registry/UI |
| `packages/extensions/src/file/file-upload.ts` | ~45 | Published |
| `packages/extensions/src/commit/index.ts` | ~42 | Published |

### Top individual members
Largest single opportunities are long private names with many `this.member` accesses, notably:

- `directEditorProps` (`EditorInstance`)
- `instance` (`Editor`)
- `serializeFragmentWrapper` / `serializeNodeWrapper` (`CustomDOMSerializer`)
- `removeUpdateExtension` (`LitToolbar`)

### Why savings are bounded
- only 13 private fields in published packages
- this repo already uses tree-shakeable ESM patterns
- repeated identifiers compress well under gzip/brotli

So this is a real but limited-size optimization.

---

## Migration Complexity and Risk

## Safe/mechanical cases
Most private fields in `@prosekit/core` and `@prosekit/extensions` are straightforward:

- `private foo` -> `#foo`
- `this.foo` -> `this.#foo`

No decorators, no static private fields, no existing native private fields to conflict with.

## Non-mechanical edge case
`packages/vfs/src/virtual-file.ts` uses a **private constructor parameter property**:

- `constructor(private readonly rootDir: string, ...)`

This cannot be directly replaced by `#rootDir` without restructuring constructor/field declarations.

## Behavioral/API caveat
TypeScript `private` is compile-time only; runtime still has `obj.member`. Native `#private` removes runtime access.

Potentially breaking for consumers who rely on internals via JS escapes such as:

- `(obj as any).instance`
- `obj['instance']`
- reflection-based inspection

This is especially relevant for exported classes (`Editor`, `UploadTask`, `CommitRecorder`) even though internals are intentionally private.

## Framework caveat (registry/Lit)
Several registry Lit components mark `editor` in `static properties`. Converting those specific members to `#` is possible, but should be reviewed carefully because Lit reactivity semantics depend on property definitions.

---

## What This Means for Your Objective

If your objective is npm package bundle size in consumer apps, prioritize published packages first:

1. `@prosekit/core`
2. `@prosekit/extensions`

This captures most relevant gains while avoiding internal-only churn.

If your objective also includes website/playground artifacts, include `registry` migration too.

---

## Recommended Rollout Plan

1. **Phase 1 (low risk, high signal):**
- migrate private fields in `packages/core` + `packages/extensions` only
- leave private methods unchanged initially (your requested scope is fields)

2. **Phase 2 (optional incremental gain):**
- migrate private methods in same files (`getDoc`, `getProp`, `updateExtension`, `calcOutput`)

3. **Phase 3 (internal apps):**
- migrate `registry` and `vfs` with Lit/property-model review

4. **Guardrails:**
- run full test suite + typecheck
- run size measurement (`size-limit`/bundle analyzer) before/after
- verify consumer build target remains modern (no downlevel `#private` transform)

---

## Bottom Line

The migration is technically valid for this monorepo and aligned with modern targets. It should yield measurable minified-size wins, with strongest impact in `packages/core/src/editor/editor.ts`, but total gain in published bundles is likely modest (roughly hundreds of raw characters, not multiple KB). The main non-size risk is runtime-internal access compatibility for users who bypass TypeScript privacy.
