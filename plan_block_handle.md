# Block-Handle Migration Plan: v1 → v2

## Overview

Migrate `packages/web/src/components/block-handle/` from `@aria-ui/` (v1) to `@aria-ui-v2/` (v2). The component has 3 sub-components across 10 files with v1 imports. All v2 equivalents are available — no blockers.

## Architecture

block-handle is a floating popover that appears when hovering over editor blocks, providing:
- **block-handle-popover**: The overlay container — tracks pointer position, manages virtual reference element, controls visibility via presence
- **block-handle-add**: Button to insert a new block
- **block-handle-draggable**: Drag handle for reordering blocks

Shared state flows via two contexts: `blockPopoverContext` (hover state) and `draggingContext` (boolean).

## File-by-file migration

### Rule 6: Merge into single files per ComponentPart

Currently each sub-component has 3 files: `types.ts`, `setup.ts`, `element.gen.ts`. Per rule 6 from research_aria_migration.md, merge into one file each:

- `block-handle-popover/types.ts` + `setup.ts` + `element.gen.ts` → `block-handle-popover.ts`
- `block-handle-add/types.ts` + `setup.ts` + `element.gen.ts` → `block-handle-add.ts`
- `block-handle-draggable/types.ts` + `setup.ts` + `element.gen.ts` → `block-handle-draggable.ts`

Keep `context.ts` and `pointer-move.ts` and `block-handle-draggable/set-drag-preview.ts` as separate shared files.

### Step 1: `context.ts`

**Current v1:**
```typescript
import { createContext, type Context } from '@aria-ui/core'
```

**Target v2:**
```typescript
import { createContext, type Context } from '@aria-ui-v2/core'
```

Straightforward — same API, different import path.

### Step 2: `block-handle-popover.ts` (merged from 3 files)

**Current v1 imports (across types.ts, setup.ts, element.gen.ts):**
- `@aria-ui/core`: `createComputed`, `createSignal`, `useAttribute`, `ConnectableElement`, `ReadonlySignal`, `SetupOptions`, `EventDeclarations`, `PropDeclarations`, `defineCustomElement`, `registerCustomElement`, `BaseElementConstructor`
- `@aria-ui/overlay/elements`: `useOverlayPositionerState`, `overlayPositionerProps`, `overlayPositionerEvents`, `OverlayPositionerProps`, `OverlayPositionerEvents`
- `@aria-ui/presence`: `usePresence`

**Target v2 imports:**
- `@aria-ui-v2/core`: `computed`, `createSignal`, `defineCustomElement`, `defineProps`, `registerCustomElement`, `useEffect`, `HostElement`, `HostElementConstructor`, `Store`
- `@aria-ui-v2/elements/overlay`: `setupOverlayPositioner`, `OverlayPositionerPropsDeclaration`, `OverlayPositionerProps`, `OpenChangeEvent`
- `@aria-ui-v2/utils`: `useAttribute`, `usePresence`
- `@ocavue/utils`: `once`

**Key API changes:**
| v1 | v2 |
|----|-----|
| `createComputed(() => ...)` | `computed(() => ...)` |
| `ReadonlySignal<T>` | `() => T` (getter function) |
| `ConnectableElement` | `HostElement` |
| `SetupOptions<Props>` → `{ state, emit }` | `Store<Props>` → `props.propName.get()` / `props.propName.set()` |
| `useOverlayPositionerState(host, { ... })` | `setupOverlayPositioner(host, { ... })` (check inline-popover for reference) |
| `usePresence(host, signal)` | `usePresence(host, getter)` |
| `useAttribute(host, "data-state", signal)` | `useAttribute(host, "data-state", getter)` |
| `defineCustomElement({ props, events, setup })` | `defineCustomElement(setupFn, PropsDeclaration)` |
| Direct `registerCustomElement(tag, Ctor)` | `once(() => registerCustomElement(tag, Ctor))` |
| `PropDeclarations` / `EventDeclarations` | `defineProps<Props>({ ... })` |

**v1 hooks → v2 hooks:**
| v1 | v2 |
|----|-----|
| `useEditorExtension(host, editor, ext)` where editor is `ReadonlySignal` | `useEditorExtension(host, props.editor.get, ext)` where second arg is getter |
| `useScrolling(host)` returns `ReadonlySignal<boolean>` | `useScrolling(host)` returns `() => boolean` |
| `useEditorUpdateEvent(host, editor, handler)` | `useEditorUpdateEvent(host, props.editor.get, handler)` |
| `useEditorFocusChangeEvent(host, editor, handler)` | `useEditorFocusChangeEvent(host, props.editor.get, handler)` |

**Hook import paths:**
| v1 | v2 |
|----|-----|
| `../../hooks/use-editor-extension.ts` | `../../hooks/use-editor-extension-v2.ts` |
| `../../hooks/use-scrolling.ts` | `../../hooks/use-scrolling-v2.ts` |
| `../../hooks/use-editor-update-event.ts` | `../../hooks/use-editor-update-event-v2.ts` |
| `../../hooks/use-editor-focus-event.ts` | `../../hooks/use-editor-focus-event-v2.ts` |

**Reference implementation:** `packages/web/src/components/inline-popover/inline-popover/inline-popover.ts` — uses overlay positioning, presence, editor hooks in v2 pattern.

### Step 3: `block-handle-add.ts` (merged from 3 files)

**Current v1 imports:**
- `@aria-ui/core`: `useEventListener`, `ConnectableElement`, `SignalState`, `EventDeclarations`, `PropDeclarations`, `defineCustomElement`, `registerCustomElement`, `BaseElementConstructor`

**Target v2 imports:**
- `@aria-ui-v2/core`: `defineCustomElement`, `defineProps`, `registerCustomElement`, `useEventListener`, `HostElement`, `HostElementConstructor`, `Store`
- `@ocavue/utils`: `once`

**Key changes:**
- `SignalState<Props>` → `Store<Props>`
- `state.editor` (signal) → `props.editor.get` (getter)
- Context consumption: `blockPopoverContext.consume(host)` → same API in v2

### Step 4: `block-handle-draggable.ts` (merged from 3 files)

**Current v1 imports:**
- `@aria-ui/core`: `useAttribute`, `useEffect`, `useEventListener`, `ConnectableElement`, `ReadonlySignal`, `SignalState`, `EventDeclarations`, `PropDeclarations`, `defineCustomElement`, `registerCustomElement`, `BaseElementConstructor`

**Target v2 imports:**
- `@aria-ui-v2/core`: `defineCustomElement`, `defineProps`, `registerCustomElement`, `useEffect`, `useEventListener`, `HostElement`, `HostElementConstructor`, `Store`
- `@aria-ui-v2/utils`: `useAttribute`
- `@ocavue/utils`: `once`

**Key changes:**
- Same signal → getter migration as above
- Context consumption unchanged in API shape
- `set-drag-preview.ts` has NO v1 imports — keep as-is

### Step 5: `pointer-move.ts`

Has NO v1 imports (uses `@prosekit/core` only). Keep as-is.

### Step 6: `index.gen.ts`

This is a generated barrel file. Will be regenerated by `pnpm -w run build:package`. After merging files, the exports need to point to the new single files instead of subdirectories.

**Check:** Update `packages/web/src/components/block-handle/index.ts` (the hand-written index) to re-export from the new file locations.

## Execution order

1. Migrate `context.ts` (trivial, just change import path)
2. Create `block-handle-popover.ts` (most complex — overlay positioning, presence, pointer tracking)
3. Create `block-handle-add.ts` (simple — event listener, context consumption)
4. Create `block-handle-draggable.ts` (medium — drag state, attribute syncing)
5. Update `index.ts` exports to point to new files
6. Delete old subdirectory files (`types.ts`, `setup.ts`, `element.gen.ts` in each subdirectory)
7. Run `pnpm -w run build:package` → `pnpm -w run fix` → `pnpm -w run lint`

## Verification

After migration, confirm:
- `grep -r "@aria-ui/" packages/web/src/components/block-handle/` returns no matches
- All exports from `packages/web/src/components/block-handle/index.ts` resolve correctly
- Build succeeds for all framework packages (react, preact, solid, vue, svelte)
- The block-handle playground/example still works (manual test)
