# aria-ui v1 → v2 Migration Research

## Project Overview

**aria-ui** is a web components framework and component library. **prosekit** is a rich text editor framework (React, Preact, Solid, Vue, Svelte) built on ProseMirror. prosekit depends on aria-ui for UI primitives (popover, tooltip, listbox, menu, etc.).

The goal is to rewrite aria-ui as v2 (`@aria-ui-v2/*`, a temporary name) inside `/aria-ui/` within the prosekit monorepo, then migrate all prosekit components from v1 to v2.

## Current Branch Status (`ocavue/aria-ui-v2` vs `origin/master`)

- ~423 files changed, +33,959 / -3,297 lines
- The entire `aria-ui/` directory is new (the v2 implementation)
- **6 of 8 components fully migrated** to v2 (tooltip, popover, resizable, drop-indicator, inline-popover, table-handle)
- **2 components still on v1** (block-handle, autocomplete)

---

## Monorepo Structure

```
prosekit2/
├── aria-ui/                          # NEW: aria-ui v2 source
│   └── packages/
│       ├── core/                     # @aria-ui-v2/core — signals, context, custom element framework
│       ├── elements/                 # @aria-ui-v2/elements — listbox, popover, tooltip
│       │   └── src/generated/        # Auto-generated React/Preact/Solid/Vue/Svelte wrappers
│       ├── integrations/             # @aria-ui-v2/integrations — ReactWrapper, PreactWrapper
│       ├── cli/                      # @aria-ui-v2/cli — code generation tool
│       └── utils/                    # @aria-ui-v2/utils — ARIA helpers, Collection, useHover, usePress
├── packages/
│   ├── web/                          # @prosekit/web — web components (consumes aria-ui)
│   ├── react/                        # @prosekit/react
│   ├── preact/                       # @prosekit/preact
│   ├── solid/                        # @prosekit/solid
│   ├── vue/                          # @prosekit/vue
│   ├── svelte/                       # @prosekit/svelte
│   ├── core/                         # @prosekit/core
│   ├── extensions/                   # @prosekit/extensions
│   └── pm/                           # @prosekit/pm
└── ...
```

UPDATE: aria-ui has been moved out of prosekit repo. It's now a stanalone repo.

---

## aria-ui v2: What's Implemented

### Packages

| Package | Status | Description |
|---------|--------|-------------|
| `@aria-ui-v2/core` | Done | Signal reactivity, context, custom element definition, effects, event listeners |
| `@aria-ui-v2/elements` | Partial | Listbox, Popover, Tooltip implemented; Menu missing |
| `@aria-ui-v2/integrations` | Done | React and Preact wrappers (used by aria-ui's own element wrappers, not by prosekit) |
| `@aria-ui-v2/cli` | Done | Generates framework wrappers (React, Preact, Solid, Vue, Svelte) |
| `@aria-ui-v2/utils` | Done | ARIA helpers, Collection, DelayedToggle, useHover, usePress, usePresence |

### Components in v2

| Component | Elements | Tests | Generated Wrappers |
|-----------|----------|-------|--------------------|
| **Listbox** | ListboxRoot, ListboxItem, ListboxEmpty | Yes | React, Preact, Solid, Vue, Svelte |
| **Popover** | PopoverRoot, PopoverTrigger, PopoverPopup, PopoverPositioner | Yes | React, Preact, Solid, Vue, Svelte |
| **Tooltip** | TooltipRoot, TooltipTrigger, TooltipPopup, TooltipPositioner | Yes | React, Preact, Solid, Vue, Svelte |

### Key Architectural Differences: v1 → v2

| Aspect | v1 | v2 |
|--------|----|----|
| **Component Model** | Hook functions (`usePopoverRoot()`) applied to host elements | Custom element classes with setup functions |
| **Reactivity** | Custom signal implementation | `alien-signals` library |
| **Context** | `createContext()` with `.provide()` / `.consume()` | Similar API, but event-based bubbling |
| **Props** | `PropDeclarations` + `SignalState<Props>` | `defineProps()` + `Store<Props>` |
| **Overlay Positioning** | `useOverlayPositionerState()` hook | `setupOverlayPositioner()` internal function, composed into `PopoverPositionerElement` / `TooltipPositionerElement` |
| **Presence/Animation** | `usePresence()` hook | Done — `usePresence()` in `@aria-ui-v2/utils` |
| **Menu** | Full menu component (`useMenuRoot`, etc.) | **Not implemented yet** |
| **Framework Wrappers** | Manual per-framework packages | Auto-generated via CLI |

> **Note:** aria-ui exports many APIs marked `@internal`. These are intended for prosekit's use — both projects are maintained by the same author. External consumers of aria-ui should not rely on `@internal` APIs, but prosekit can freely use them. This means APIs like `setupOverlayPositioner()` are already available to prosekit without needing to be made public.

---

## prosekit Components: Migration Status

### Already Migrated to v2

| Component | Notes |
|-----------|-------|
| **tooltip** | Fully migrated. Uses `TooltipRootElement`, `TooltipTriggerElement`, `TooltipPopupElement`, `TooltipPositionerElement` from v2. Registered as `prosekit-tooltip-*`. Framework wrappers auto-generated via `@aria-ui-v2/cli`. |
| **popover** | Fully migrated. Uses `PopoverRootElement`, `PopoverTriggerElement`, `PopoverPopupElement`, `PopoverPositionerElement` from v2. No v1 imports remain. |
| **resizable** | Fully migrated. Uses `@aria-ui-v2/core` (signals, context, effects) and `@aria-ui-v2/utils` (useAttribute). No v1 imports remain. |
| **drop-indicator** | Fully migrated. Uses `@aria-ui-v2/core` and `@aria-ui-v2/utils` (usePresence). No v1 imports remain. |
| **inline-popover** | Fully migrated. Uses `@aria-ui-v2/core`, `@aria-ui-v2/elements/overlay` (OpenChangeEvent, updatePlacement), and `@aria-ui-v2/utils` (useAttribute, usePresence). No v1 imports remain. |
| **table-handle** | Fully migrated. Uses `@aria-ui-v2/core`, `@aria-ui-v2/elements/overlay`, `@aria-ui-v2/utils`. No v1 imports remain. Framework wrappers auto-generated via `@aria-ui-v2/cli`. |

### Not Yet Migrated (Still Using v1)

| Component | v1 Files | v1 Dependencies | Migration Complexity | Blocking Issues |
|-----------|----------|----------------|---------------------|-----------------|
| **block-handle** | 10 files | `@aria-ui/core`, `@aria-ui/overlay`, `@aria-ui/presence` | **Medium** | None — all v2 equivalents available (core, overlay positioner, presence). |
| **autocomplete** | 13 files | `@aria-ui/core`, `@aria-ui/listbox`, `@aria-ui/overlay`, `@aria-ui/presence` | **High** | None — all v2 dependencies available (listbox setup functions, overlay positioner, presence). Complex keyboard event forwarding + context state sync. |

---

## Shared Hooks Migration Status

V2 copies have been created for 5 of 8 v1 hooks. The v1 originals are kept until all consumers are migrated.

| Hook | v1 | v2 | Used by (v1 consumers) |
|------|----|----|------------------------|
| `use-editor-extension` | `use-editor-extension.ts` | `use-editor-extension-v2.ts` | block-handle, autocomplete, table-handle |
| `use-editor-focus-event` | `use-editor-focus-event.ts` | `use-editor-focus-event-v2.ts` | block-handle, autocomplete, table-handle |
| `use-editor-update-event` | `use-editor-update-event.ts` | `use-editor-update-event-v2.ts` | block-handle, autocomplete, table-handle |
| `use-keymap` | `use-keymap.ts` | `use-keymap-v2.ts` | autocomplete |
| `use-scrolling` | `use-scrolling.ts` | `use-scrolling-v2.ts` | block-handle |
| `use-selecting` | `use-selecting.ts` | `use-selecting-v2.ts` | table-handle |
| `use-editor-typing` | `use-editor-typing.ts` | `use-editor-typing-v2.ts` | table-handle |
| `use-first-rendering` | `use-first-rendering.ts` | — (no v2 yet) | autocomplete |

---

## Framework Wrapper Generation Patterns

Two generation patterns coexist:

| Pattern | Used by | Generator |
|---------|---------|-----------|
| **New** (aria-ui CLI) | tooltip, popover, resizable, drop-indicator, inline-popover, table-handle | `aria-ui/packages/cli/src/generate.ts` |
| **Old** (`createComponent`) | autocomplete, block-handle | `packages/web/build.mjs` |

The old `createComponent` pattern will be removed once all components are migrated to v2.

### New pattern (aria-ui CLI)

All 5 frameworks (React, Preact, Vue, Solid, Svelte) use a unified approach:

1. **Props**: Set via `Object.assign(element, { ... })` inside a reactive effect (`useLayoutEffect` / `watchEffect` / `createEffect` / `$effect.pre`). This ensures element properties update reactively when component props change.
2. **Events**: A `handlers` array is updated in the props effect. A separate mount-only effect sets up `addEventListener` with `AbortController` — listeners read handlers by index, avoiding re-subscription on handler changes.
3. **Extensions**: All frameworks share a single `reactPropOverrides` mechanism (e.g., `editor: p5 ?? p5Fallback` for context fallback). Extension variables use `p{N}Fallback` naming (where N is the sorted prop index).

Vue uses `shallowRef` + `computed` (via `splittedProps`) + `watchEffect`. Solid uses `createSignal` + `splitProps` + `createEffect`. Svelte uses `$effect.pre` + `bind:this`. React/Preact use `useRef` + `useLayoutEffect`.

---

## Missing v2 Capabilities (Blockers)

### ~~1. Menu Component~~ — No longer a blocker

Table-handle has been fully migrated to v2 without needing a standalone Menu component.

### ~~2. Presence/Animation~~ — DONE

Implemented as `usePresence()` in `@aria-ui-v2/utils`.

### 3. Overlay Positioner as Hook — **Not a blocker**

`setupOverlayPositioner()` exists in `aria-ui/packages/elements/src/overlay/overlay-positioner.ts` (marked `@internal`). Already usable by prosekit.

### ~~4. Hook-style API for Listbox~~ — **Not a blocker**

v2 exports setup functions from `@aria-ui-v2/elements/listbox`: `setupListboxRoot`, `setupListboxItem`, `setupListboxEmpty`.

### 5. Missing v2 Hooks — Needed for remaining components

One v1 hook has no v2 equivalent yet:
- `use-first-rendering` — used by autocomplete

---

## v1 API Usage Map

Every v1 import from `@aria-ui/*` still in `packages/web/src/`:

### `@aria-ui/core` (used by block-handle, autocomplete)
- `createSignal`, `createComputed` — reactive primitives
- `useEffect`, `useAnimationFrame` — side effects
- `useAttribute` — data attribute syncing
- `useEventListener` — DOM event binding
- `createContext`, `Context` — component communication
- `ConnectableElement`, `SetupOptions`, `SignalState`, `PropDeclarations`, `EventDeclarations` — types
- `ReadonlySignal`, `Signal` — signal types
- `TypedEventTarget` — typed event target
- `defineEmit` — event emitter

### `@aria-ui/listbox` (used by autocomplete)
- `useListbox`, `useListboxItem`, `useListboxEmpty` — hooks
- `listboxProps`, `listboxEvents`, `listboxItemEvents` — prop/event declarations
- `ListboxProps`, `ListboxEvents`, `ListboxItemEvents` — types

### `@aria-ui/overlay` (used by autocomplete, block-handle)
- `useOverlayPositionerState` — floating-ui positioning hook
- `overlayPositionerProps` — prop declarations
- `OverlayPositionerProps`, `OverlayPositionerEvents` — types

### `@aria-ui/presence` (used by autocomplete, block-handle)
- `usePresence` — visibility/animation hook

### ~~`@aria-ui/popover`~~ — **No longer imported** (migrated to v2)

### ~~`@aria-ui/menu`~~ — **No longer imported** (table-handle migrated to v2)

### ~~`@aria-ui/tooltip`~~ — **No longer imported** (migrated to v2)

---

## Suggested Migration Plan

### ~~Phase 1: Core Infrastructure~~ — DONE

- ~~Setup functions exported from v2~~ — Done
- ~~Implement presence utility~~ — Done (`usePresence()` in `@aria-ui-v2/utils`)
- ~~Overlay positioner setup~~ — Already available (`setupOverlayPositioner()`)

### ~~Phase 2: Easy Migrations~~ — DONE

- ~~Migrate `popover`~~ — Done
- ~~Migrate `resizable`~~ — Done
- ~~Migrate `drop-indicator`~~ — Done

### ~~Phase 3: Medium Migrations~~ — PARTIALLY DONE

- ~~Migrate `inline-popover`~~ — Done
- **Migrate `block-handle`** — **Not started** (10 files with v1 imports, no blockers)

### Phase 4: Remaining Migrations

**4.1 Migrate `block-handle`** — Medium complexity
- All v2 dependencies available: core, overlay positioner, presence
- Key challenge: virtual reference element from hover position, drag state management

**4.2 Create missing v2 hook**
- `use-first-rendering-v2.ts` — needed by autocomplete

**4.3 Migrate `autocomplete`** — High complexity
- All v2 dependencies available: listbox setup functions, overlay positioner, presence
- Key challenges: keyboard event forwarding to editor, context-based query/submit state, filtering

### Phase 5: Cleanup

**5.1 Remove all `@aria-ui/` v1 dependencies from `packages/web/package.json`**
**5.2 Remove old `createComponent` Vue wrapper pattern** and `create-component.ts`
**5.3 Remove v1 shared hooks** in `packages/web/src/hooks/` (the non-`-v2` versions) and rename v2 hooks to remove the `-v2` suffix
**5.4 Remove `packages/web/src/utils/get-default-state.ts`** (v1 dependency)

---

## File Counts for Reference

Files still importing from `@aria-ui/` (v1) in `packages/web/src/`:

| Directory | Files with v1 imports |
|-----------|-----------------------|
| `hooks/` | 8 files |
| `utils/` | 2 files |
| `components/autocomplete/` | 13 files |
| `components/block-handle/` | 10 files |
| **Total** | **~33 files** |

Files already using v2 (`@aria-ui-v2/`) in `packages/web/src/`:

| Directory | Files with v2 imports |
|-----------|-----------------------|
| `hooks/` | 7 files (v2 copies) |
| `components/tooltip/` | 1 file |
| `components/popover/` | 1 file |
| `components/resizable/` | 3 files |
| `components/drop-indicator/` | 1 file |
| `components/inline-popover/` | 2 files |
| `components/table-handle/` | 14 files |
| **Total** | **29 files** |

## Important rules!

1. Do not edit `*.gen.ts` directly. Update `packages/web/build.mjs` instead and run `pnpm -w run build:package`, which will call scripts like packages/web/build.mjs to regenerate framework wrappers.
2. If a file used to be `*.gen.ts` but it's not generated anymore after the migration, remove the `.gen` from the file name.
3. Verification command order: `pnpm -w run build:package` → `pnpm -w fix` → `pnpm -w typecheck` → `pnpm -w lint`. Always follow this exact order.
4. Do not add useless JSDoc and comment, unless there are part of the public API, in which case JSDoc is acceptable. Do not remove existing JSDoc and comment.
5. Read aria-ui/AGENTS.md to know how to write a component in aria-ui-v2 pattern.
6. Follow the single-file-per-ComponentPart pattern from `aria-ui/AGENTS.md`: merge Props, PropsDeclaration, setup function, Element class, and register function into one file (e.g., `drop-indicator.ts`). Do not keep separate `types.ts` + `setup.ts` + `element.ts` files.
7. For shared hooks in `packages/web/src/hooks/` that are used by both migrated and non-migrated components: create v2 copies alongside v1 originals (e.g., `use-editor-extension-v2.ts`). Add `// TODO: Rename to <original-name>.ts after all components are migrated to v2` at the top. Do NOT modify the original v1 hooks until all consumers are migrated.
