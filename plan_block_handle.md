# Block-Handle v2 Migration Plan

## 1. Overview

Migrate `packages/web/src/components/block-handle/` from aria-ui v1 to v2. Medium complexity:
10 files with v1 imports, 3 sub-components, overlay positioning, presence, context-based state, drag-and-drop.

### Current v1 Dependencies

| Import Source | Used By | APIs |
|---|---|---|
| `@aria-ui/core` | All setup/types/element files | `createComputed`, `createSignal`, `useAttribute`, `useEffect`, `useEventListener`, `createContext`, `Context`, `ConnectableElement`, `ReadonlySignal`, `Signal`, `SignalState`, `SetupOptions`, `PropDeclarations`, `EventDeclarations`, `defineCustomElement`, `registerCustomElement`, `BaseElementConstructor` |
| `@aria-ui/overlay/elements` | block-handle-popover | `useOverlayPositionerState`, `overlayPositionerProps`, `overlayPositionerEvents`, `OverlayPositionerProps`, `OverlayPositionerEvents` |
| `@aria-ui/presence` | block-handle-popover | `usePresence` |

### v2 Equivalents Available

| v1 API | v2 Equivalent | Notes |
|---|---|---|
| `@aria-ui/core` signals/effects | `@aria-ui-v2/core` | `HostElement` replaces `ConnectableElement`, `Store<Props>` replaces `SignalState<Props>`, `defineProps` replaces `PropDeclarations`, `computed` replaces `createComputed` |
| `@aria-ui/core` context | `@aria-ui-v2/core` context | Same concept; v2 `createContext` takes only key (no default value); consumers get `() => T \| undefined` |
| `@aria-ui/overlay` | `@aria-ui-v2/elements/overlay` | `updatePlacement` replaces `useOverlayPositionerState`; `OverlayPositionerPropsDeclaration` replaces `overlayPositionerProps` |
| `@aria-ui/presence` | `@aria-ui-v2/utils` | `usePresence` (takes getter instead of signal) |
| `useAttribute` | `@aria-ui-v2/utils` | `useAttribute` (takes getter instead of signal) |

---

## 2. Architecture

### Component Hierarchy

```
<prosekit-block-handle-popover>     ← Overlay + presence + context provider
  <prosekit-block-handle-add>       ← Insert block button (consumes context)
  <prosekit-block-handle-draggable> ← Drag handle (consumes context)
```

### Signal Flow

```
block-handle-popover (root):
  ├─ Creates: reference (VirtualElement), context (HoverState), dragging (boolean)
  ├─ Watches: editor prop → creates hover extension
  ├─ On pointer hover → sets reference + context from cursor position
  ├─ On keypress / pointer leave → clears reference + context
  ├─ Provides: blockPopoverContext (HoverState), draggingContext (boolean)
  ├─ Uses: useOverlayPositionerState (positions near hovered block)
  ├─ Uses: usePresence (show/hide with animation)
  └─ Uses: useScrolling (hide during scroll)

block-handle-add (child):
  ├─ Consumes: blockPopoverContext
  └─ On pointerdown → inserts default block after hovered node

block-handle-draggable (child):
  ├─ Consumes: blockPopoverContext, draggingContext
  ├─ On pointerdown → selects node at hover position
  ├─ On dragstart → sets view.dragging, creates drag preview
  ├─ On dragend → clears dragging state
  └─ Sets data-dragging attribute
```

### Shared Files (No v1 Imports)

- `pointer-move.ts` — Defines `defineElementHoverHandler` extension. Pure `@prosekit/core` usage, NO migration needed.
- `block-handle-draggable/set-drag-preview.ts` — DOM utility, NO migration needed.

---

## 3. File-Level Migration Plan

### New File Structure

Per rule 6 from research_aria_migration.md, merge `types.ts` + `setup.ts` + `element.gen.ts` into a single file per component part:

```
block-handle/
  context.ts                     ← MIGRATE (v1 context → v2 context)
  block-handle-popover.ts        ← NEW (merge 3 files + inline overlay positioning)
  block-handle-add.ts            ← NEW (merge 3 files)
  block-handle-draggable.ts      ← NEW (merge 3 files)
  pointer-move.ts                ← NO CHANGE
  set-drag-preview.ts            ← MOVE from block-handle-draggable/ (no change)
  index.ts                       ← NEW (hand-written, replaces index.gen.ts)
```

### Files to DELETE (after migration)

- `block-handle-popover/` directory (types.ts, setup.ts, element.gen.ts, pointer-move.ts)
- `block-handle-add/` directory (types.ts, setup.ts, element.gen.ts)
- `block-handle-draggable/` directory (types.ts, setup.ts, element.gen.ts, set-drag-preview.ts)
- `index.gen.ts`

---

## 4. Component-by-Component Migration

### 4.1 `context.ts`

v1 `createContext` takes `(key, defaultValue)`.
v2 `createContext` takes `(key)` only — no default value.

v1 context consumers get `ReadonlySignal<T>` (call `.get()`).
v2 context consumers get `() => T | undefined` (call as getter function).

In v1, block-handle-popover provides a `Signal<BlockPopoverContext>` — the signal itself is the context value, and consumers call `.get()` and even `.set()` on it. In v2, context provides a plain value, not a signal. To preserve the ability for children to mutate the hover state (block-handle-add calls `context.set(null)` to hide the popover), we provide the signal itself:

```typescript
import { createContext, createSignal, type Signal } from '@aria-ui-v2/core'

export const blockPopoverContext = createContext<Signal<BlockPopoverContext>>(
  'prosekit-block-popover-context',
)

export const draggingContext = createContext<Signal<boolean>>(
  'prosekit-block-handle-dragging-context',
)
```

The popover creates signals and provides them. Consumers call `getContext()` to get the signal, then `getContext()?.get()` / `getContext()?.set()`.

### 4.2 `block-handle-popover.ts`

**Merges:** `block-handle-popover/{types.ts, setup.ts, element.gen.ts}`

**Reference implementation:** `inline-popover/inline-popover/inline-popover.ts` (same overlay + presence pattern)

#### Props

```typescript
export interface BlockHandlePopoverProps extends OverlayPositionerProps {
  editor: Editor | null                        // @default null
  placement: OverlayPositionerProps['placement'] // @default "left"
  hoist: OverlayPositionerProps['hoist']        // @default false
  flip: OverlayPositionerProps['flip']          // @default false
  shift: OverlayPositionerProps['shift']        // @default false
  hide: OverlayPositionerProps['hide']          // @default true
}

export const BlockHandlePopoverPropsDeclaration = defineProps<BlockHandlePopoverProps>({
  ...OverlayPositionerPropsDeclaration,
  editor: { default: null, attribute: false, type: 'json' },
  placement: { default: 'left', attribute: 'placement', type: 'string' },
  hoist: { default: false, attribute: 'hoist', type: 'boolean' },
  flip: { default: false, attribute: 'flip', type: 'boolean' },
  shift: { default: false, attribute: 'shift', type: 'boolean' },
  hide: { default: true, attribute: 'hide', type: 'boolean' },
})
```

#### Events

```typescript
export interface BlockHandlePopoverEvents {
  stateChange: CustomEvent<{ node: ProseMirrorNode; pos: number } | null>
}
```

Note: In v2, events are NOT declared via `EventDeclarations`. Instead, dispatch directly:
```typescript
host.dispatchEvent(new CustomEvent('stateChange', { detail: ... }))
```

#### Setup Function

Key changes from v1:

| v1 | v2 |
|----|-----|
| `useOverlayPositionerState(host, overlayState, { reference })` | `updatePlacement(host, reference, overlayProps)` inside `useEffect` |
| `usePresence(host, open)` where `open` is signal | `usePresence(host, getOpen)` where `getOpen` is getter |
| `useAttribute(host, 'data-state', () => ...)` | Same API from `@aria-ui-v2/utils` |
| `useEditorExtension(host, editor, ext)` | `useEditorExtension(host, props.editor.get, ext)` |
| `useScrolling(host)` returns `ReadonlySignal<boolean>` | `useScrolling(host)` returns `() => boolean` |
| `createComputed(() => ...)` | `computed(() => ...)` |
| `ConnectableElement` | `HostElement` |
| `{ state, emit }` destructure | `Store<Props>` (access as `props.editor.get()`) |
| `emit('stateChange', detail)` | `host.dispatchEvent(new CustomEvent('stateChange', { detail }))` |

```typescript
function setupBlockHandlePopover(
  host: HostElement,
  props: Store<BlockHandlePopoverProps>,
): void {
  const reference = createSignal<VirtualElement | null>(null)

  // Context: create signals and provide them
  const context = createSignal<BlockPopoverContext>(null)
  blockPopoverContext.provide(host, context)

  const dragging = createSignal(false)
  draggingContext.provide(host, dragging)

  // Scrolling detection
  const getScrolling = useScrolling(host)
  const getOpen = computed(() => !!context.get() && !getScrolling())

  // Hover extension
  useHoverExtension(host, props.editor.get, (ref, hoverState) => {
    reference.set(ref)
    context.set(hoverState)
    const detail = hoverState ? { node: hoverState.node, pos: hoverState.pos } : null
    host.dispatchEvent(new CustomEvent('stateChange', { detail }))
  })

  // Overlay positioning (replaces useOverlayPositionerState)
  useEffect(host, () => {
    const ref = reference.get()
    if (!ref) return

    return updatePlacement(host, ref, {
      strategy: props.strategy.get(),
      placement: props.placement.get(),
      offset: props.offset.get(),
      hoist: props.hoist.get(),
      flip: props.flip.get(),
      shift: props.shift.get(),
      hide: props.hide.get(),
      // ... remaining overlay props from store
    })
  })

  // Presence + attribute
  useAttribute(host, 'data-state', () => (getOpen() ? 'open' : 'closed'))
  usePresence(host, getOpen)
}
```

#### useHoverExtension helper

```typescript
function useHoverExtension(
  host: HostElement,
  getEditor: () => Editor | null,
  handler: ElementHoverHandler,
) {
  let prevHoverState: HoverState | null = null

  const extension = defineElementHoverHandler((reference, hoverState) => {
    if (isHoverStateEqual(prevHoverState, hoverState)) return
    prevHoverState = hoverState
    handler(reference, hoverState)
  })

  useEditorExtension(host, getEditor, extension)
}
```

### 4.3 `block-handle-add.ts`

**Merges:** `block-handle-add/{types.ts, setup.ts, element.gen.ts}`

Simple component — only consumes context and handles pointerdown.

```typescript
export interface BlockHandleAddProps {
  editor: Editor | null  // @default null
}

export const BlockHandleAddPropsDeclaration = defineProps<BlockHandleAddProps>({
  editor: { default: null, attribute: false, type: 'json' },
})

function setupBlockHandleAdd(
  host: HostElement,
  props: Store<BlockHandleAddProps>,
): void {
  const getContext = blockPopoverContext.consume(host)

  useEventListener(host, 'pointerdown', (event) => {
    event.preventDefault()

    const editor = props.editor.get()
    const contextSignal = getContext()
    const hoverState = contextSignal?.get()
    if (!editor || !hoverState) return

    const { node, pos } = hoverState
    editor.exec(insertDefaultBlock({ pos: pos + node.nodeSize }))
    editor.focus()

    // Hide the drag handle
    contextSignal.set(null)
  })
}
```

Key change: v1 `context.get()` / `context.set(null)` becomes v2 `getContext()?.get()` / `getContext()?.set(null)`.

### 4.4 `block-handle-draggable.ts`

**Merges:** `block-handle-draggable/{types.ts, setup.ts, element.gen.ts}`

```typescript
export interface BlockHandleDraggableProps {
  editor: Editor | null  // @default null
}

export const BlockHandleDraggablePropsDeclaration = defineProps<BlockHandleDraggableProps>({
  editor: { default: null, attribute: false, type: 'json' },
})

function setupBlockHandleDraggable(
  host: HostElement,
  props: Store<BlockHandleDraggableProps>,
): void {
  const getContext = blockPopoverContext.consume(host)
  const getDragging = draggingContext.consume(host)

  useEffect(host, () => { host.draggable = true })

  usePointerDownHandler(host, getContext, props.editor.get)

  useEventListener(host, 'dragstart', (event) => {
    getDragging()?.set(true)

    const view = getSafeEditorView(props.editor.get())
    const hoverState = getContext()?.get()

    if (view && hoverState) {
      view.dom.classList.add(DRAGGING_CLASS_NAME)
      createDraggingPreview(view, hoverState, event)
      setViewDragging(view, hoverState)
    }
  })

  useEventListener(host, 'dragend', () => {
    getDragging()?.set(false)

    const view = getSafeEditorView(props.editor.get())
    if (view) {
      view.dom.classList.remove(DRAGGING_CLASS_NAME)
    }
  })

  useAttribute(host, 'data-dragging', () => (getDragging()?.get() ? '' : undefined))
}
```

Key changes:
- v1: `context.get()` → v2: `getContext()?.get()`
- v1: `dragging.set(true)` → v2: `getDragging()?.set(true)`
- v1: `ReadonlySignal<BlockPopoverContext>` → v2: `() => Signal<BlockPopoverContext> | undefined`
- `usePointerDownHandler` parameters change from signals to getters

```typescript
function usePointerDownHandler(
  host: HostElement,
  getContext: () => Signal<BlockPopoverContext> | undefined,
  getEditor: () => Editor | null,
) {
  useEventListener(host, 'pointerdown', () => {
    const { pos } = getContext()?.get() ?? {}
    const { view } = getEditor() ?? {}

    if (pos == null || view == null) return

    view.dispatch(
      view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)),
    )

    requestAnimationFrame(() => { view.focus() })
  })
}
```

---

## 5. Index & Exports

### 5.1 Create new `index.ts` (replaces `index.gen.ts`)

```typescript
export { BlockHandleAddElement, BlockHandleAddPropsDeclaration, registerBlockHandleAddElement, setupBlockHandleAdd, type BlockHandleAddProps } from './block-handle-add.ts'
export { BlockHandleDraggableElement, BlockHandleDraggablePropsDeclaration, registerBlockHandleDraggableElement, setupBlockHandleDraggable, type BlockHandleDraggableProps } from './block-handle-draggable.ts'
export { BlockHandlePopoverElement, BlockHandlePopoverPropsDeclaration, registerBlockHandlePopoverElement, setupBlockHandlePopover, type BlockHandlePopoverEvents, type BlockHandlePopoverProps } from './block-handle-popover.ts'
```

Note: No `Events` type for add/draggable since they have no custom events.

---

## 6. Detailed TODO List

### Phase 1: Shared Files

- [ ] **1.1** Migrate `context.ts`
  - [ ] `createContext` from `@aria-ui-v2/core` (key only, no default)
  - [ ] Context type wraps `Signal<T>` since children need to mutate
  - [ ] Keep `HoverState` and `BlockPopoverContext` types unchanged

### Phase 2: Component Parts (single-file pattern)

Each file contains: Props interface, PropsDeclaration, Events interface (if any), setup function, Element class, register function.

- [ ] **2.1** Create `block-handle-popover.ts`
  - [ ] Props: extends `OverlayPositionerProps` with overrides for placement/hoist/flip/shift/hide + editor
  - [ ] PropsDeclaration: spread `OverlayPositionerPropsDeclaration` + custom defaults
  - [ ] Events: `stateChange: CustomEvent<{ node, pos } | null>`
  - [ ] Setup: overlay positioning via `updatePlacement` in `useEffect`, presence via `usePresence`, context provision, hover extension, scrolling detection
  - [ ] Import `useEditorExtension` from v2 hook, `useScrolling` from v2 hook
  - [ ] Element via `defineCustomElement(setupBlockHandlePopover, BlockHandlePopoverPropsDeclaration)`
  - [ ] Register as `prosekit-block-handle-popover` with `once()` wrapper

- [ ] **2.2** Create `block-handle-add.ts`
  - [ ] Props: just `editor: Editor | null`
  - [ ] No events
  - [ ] Setup: consume `blockPopoverContext`, handle pointerdown → insert block
  - [ ] Context access: `getContext()?.get()` / `getContext()?.set(null)`
  - [ ] Register as `prosekit-block-handle-add`

- [ ] **2.3** Create `block-handle-draggable.ts`
  - [ ] Props: just `editor: Editor | null`
  - [ ] No events
  - [ ] Setup: consume both contexts, pointerdown → select node, dragstart/dragend handlers, data-dragging attribute
  - [ ] Context access via getter functions
  - [ ] Register as `prosekit-block-handle-draggable`

- [ ] **2.4** Move `set-drag-preview.ts` from `block-handle-draggable/` to component root

- [ ] **2.5** Move `pointer-move.ts` from `block-handle-popover/` to component root

### Phase 3: Index & Cleanup

- [ ] **3.1** Create new `index.ts` replacing `index.gen.ts`
  - [ ] Export all Props interfaces, PropsDeclaration constants, setup functions, Element classes, register functions
  - [ ] Export `BlockHandlePopoverEvents` type

- [ ] **3.2** Delete old files
  - [ ] `block-handle-popover/` directory
  - [ ] `block-handle-add/` directory
  - [ ] `block-handle-draggable/` directory
  - [ ] `index.gen.ts`

### Phase 4: Build & Verify

- [ ] **4.1** Run `pnpm -w run build:package`
- [ ] **4.2** Run `pnpm -w run fix`
- [ ] **4.3** Run `pnpm -w run typecheck`
- [ ] **4.4** Run `pnpm -w run lint`
- [ ] **4.5** Verify no remaining `@aria-ui/` v1 imports: `grep -r "@aria-ui/" packages/web/src/components/block-handle/`
- [ ] **4.6** Verify framework wrappers generated for block-handle (check react/preact/solid/vue/svelte)

### Phase 5: Review

- [ ] **5.1** Verify all `@public` / `@internal` JSDoc tags
- [ ] **5.2** Verify all props have `@default` tags
- [ ] **5.3** Verify existing JSDoc/comments preserved
- [ ] **5.4** Verify `null` used instead of `undefined` for prop defaults

---

## 7. Risk Areas & Edge Cases

### Context Mutation Pattern

v1 provides `Signal<T>` as context value — children can call `.get()` and `.set()` directly.
v2 context provides a plain value. To preserve mutation, we provide the `Signal` itself as the context value. Consumers call `getContext()` to get the signal, then `.get()` / `.set()` on it.

The `?.` operator is needed because `getContext()` returns `undefined` before the element connects to the DOM. All effects using context must handle this.

### Overlay Positioning API Change

v1 uses `useOverlayPositionerState(host, overlayState, { reference })` which takes all overlay props as signals.

v2 uses `updatePlacement(host, reference, options)` which returns a cleanup function. It must be called inside `useEffect` and all reactive props must be read inside the effect for proper tracking:

```typescript
useEffect(host, () => {
  const ref = reference.get()
  if (!ref) return
  return updatePlacement(host, ref, {
    placement: props.placement.get(),
    // ... read all overlay props here for reactive tracking
  })
})
```

### Signal Access Pattern Change

| v1 Pattern | v2 Pattern |
|---|---|
| `state.editor.get()` | `props.editor.get()` |
| `context.get()` (context is signal) | `getContext()?.get()` (context is getter → signal) |
| `context.set(null)` | `getContext()?.set(null)` |
| `scrolling.get()` (ReadonlySignal) | `getScrolling()` (getter function) |
| `open.get()` (computed signal) | `getOpen()` (computed getter) |
| `emit('stateChange', detail)` | `host.dispatchEvent(new CustomEvent('stateChange', { detail }))` |

### Event Emissions

v1 uses `emit('stateChange', detail)` which creates a `CustomEvent` automatically.
v2 has no emit helper — dispatch events manually:

```typescript
host.dispatchEvent(new CustomEvent('stateChange', { detail, bubbles: true }))
```

Check: the `stateChange` event needs `bubbles: true` if parent components listen for it (verify in the actual usage).

### Build Configuration

`block-handle` is NOT yet in the `components` array in `packages/web/build.mjs`. It needs to be added for framework wrapper generation. Currently it uses the old `createComponent` pattern — after migration, the CLI generates wrappers instead.

---

## 8. Migration Verification Checklist

After migration, verify:

- [ ] No `@aria-ui/core` imports remain in block-handle files
- [ ] No `@aria-ui/overlay` imports remain
- [ ] No `@aria-ui/presence` imports remain
- [ ] All imports are from `@aria-ui-v2/core`, `@aria-ui-v2/elements/overlay`, `@aria-ui-v2/utils`
- [ ] No `ConnectableElement` type usage (should be `HostElement`)
- [ ] No `ReadonlySignal` / `Signal` from v1 (should use v2 equivalents)
- [ ] No `SignalState` / `SetupOptions` / `PropDeclarations` / `EventDeclarations` from v1
- [ ] No `BaseElementConstructor` from v1
- [ ] Framework wrappers generated correctly for all 3 sub-components
- [ ] Block-handle renders and functions in the prosekit playground
