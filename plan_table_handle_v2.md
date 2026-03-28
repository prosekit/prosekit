# Table-Handle v2 Migration Plan

## 1. Overview

Migrate `packages/web/src/components/table-handle/` from aria-ui v1 to v2. This is the most complex migration:
33 files, 9 sub-components, drag-and-drop system, menu integration, overlay positioning, and context-based state.

### Current v1 Dependencies

| Import Source | Used By | APIs |
|---|---|---|
| `@aria-ui/core` | All setup files | `createSignal`, `createComputed`, `useEffect`, `useEventListener`, `useAttribute`, `createContext`, `defineEmit`, `ConnectableElement`, `ReadonlySignal`, `Signal`, `SignalState`, `SetupOptions`, `PropDeclarations`, `EventDeclarations`, `TypedEventTarget` |
| `@aria-ui/menu/elements` | row-root, column-root, row-trigger, column-trigger, popover-content, popover-item | `useMenuRoot`, `useMenuTrigger`, `useMenuContent`, `useMenuItem`, `menuRootProps`, `menuRootEvents`, `menuContentProps`, `menuContentEvents`, `menuItemProps`, `menuItemEvents`, `MenuRootProps`, `MenuContentProps`, `MenuItemProps`, `MenuItemEvents`, `MenuContentEvents` |
| `@aria-ui/overlay` | row-root types, column-root types | `overlayPositionerProps`, `overlayPositionerEvents`, `OverlayPositionerProps`, `OverlayPositionerEvents`, `useOverlayPositionerState` |
| `@aria-ui/presence` | row-root, column-root | `usePresence` |

### v2 Equivalents Available

| v1 API | v2 Equivalent | Notes |
|---|---|---|
| `@aria-ui/core` signals/effects | `@aria-ui-v2/core` | API differences: `HostElement` replaces `ConnectableElement`, `Store<Props>` replaces `SignalState<Props>`, `defineProps` replaces `PropDeclarations` |
| `@aria-ui/core` context | `@aria-ui-v2/core` context | Same concept, different `createContext` signature (no default value) |
| `@aria-ui/menu` | `@aria-ui-v2/elements/menu` | NEW: `MenuRootElement`, `MenuTriggerElement`, `MenuPopupElement`, `MenuPositionerElement`, `MenuItemElement` with setup functions |
| `@aria-ui/overlay` | `@aria-ui-v2/elements/overlay` | `setupOverlayPositioner`, `OverlayPositionerPropsDeclaration`, `updatePlacement` |
| `@aria-ui/presence` | `@aria-ui-v2/utils` | `usePresence` |
| `useAttribute` | `@aria-ui-v2/utils` | `useAttribute` |

---

## 2. Architecture Decision: Composition Strategy

### Current v1 Architecture

The row-root and column-root components **compose** v1 hooks in one element:

```
TableHandleRowRoot (single element):
  useOverlayPositionerState()  ← overlay positioning
  usePresence()                ← visibility
  useMenuRoot()                ← menu state management
```

The trigger elements also compose:

```
TableHandleRowTrigger (single element):
  useMenuTrigger()             ← menu trigger behavior
  + custom drag logic
```

### v2 Architecture Decision: Keep as Custom Elements, Use Setup Functions

In v2, menu components are custom elements (`MenuRootElement`, etc.) but they also export
their setup functions (`setupMenuRoot`, etc.) marked `@internal`. Since prosekit can use
`@internal` APIs, we have two options:

**Option A: Wrap v2 custom elements (e.g., extend `MenuRootElement`).**
Problem: Row-root needs to be BOTH an overlay positioner AND a menu root, which can't be
done by extending a single class.

**Option B: Call v2 setup functions directly inside our custom element setup.**
This is what v1 does (calling `useMenuRoot()`, `useOverlayPositionerState()`, etc.).
The v2 setup functions (`setupMenuRoot`, `setupMenuPopup`, etc.) take `(host, props, context)`
and can be composed.

**Decision: Option B** — use setup functions from v2, same compositional approach as v1.
This is also consistent with how the research document says prosekit should consume `@internal` APIs.

However, the v2 menu setup functions are designed for elements that follow the MenuRoot/MenuTrigger/MenuPopup
component tree. Our table-handle elements don't follow that tree. So we need to carefully extract
the logic we need:

- **Row/column root** = overlay positioner + presence + menu context provider
- **Row/column trigger** = menu trigger behavior + drag initiation
- **Popover content** = menu popup behavior (keyboard nav, ARIA)
- **Popover item** = menu item behavior

Since v2 menu stores its state in `MenuStore` via `MenuStoreContext`, and the setup functions
consume/provide this context, we can create the `MenuStore` ourselves and provide it, then
let menu child components consume it naturally.

Actually, looking more closely at the v2 menu API:

- `setupMenuRoot` creates a `MenuStore` and provides `MenuStoreContext`
- `setupMenuPopup` consumes `MenuStoreContext`
- `setupMenuItem` consumes `MenuStoreContext`

So the cleanest approach for row-root/column-root is to:
1. Create a `MenuStore` manually (same as `setupMenuRoot` does internally)
2. Provide it via `MenuStoreContext`
3. Handle overlay positioning ourselves (using `updatePlacement` from v2)
4. Handle presence ourselves (using `usePresence` from v2)

Then popover-content can call `setupMenuPopup` which consumes `MenuStoreContext`.
And popover-item can call `setupMenuItem` which consumes `MenuStoreContext`.

For triggers, `setupMenuTrigger` just calls `usePress` + sets ARIA attributes. We don't
need the full trigger setup because our triggers also do drag-and-drop. We'll replicate
the minimal trigger behavior (toggle menu) inline.

---

## 3. File-Level Migration Plan

### New File Structure

The v2 pattern (from `aria-ui/AGENTS.md` rule 6) merges types.ts + setup.ts + element.gen.ts
into a single file per component part. Since `index.gen.ts` references types/setup/element
separately, we need to replace it with a hand-written `index.ts`.

```
table-handle/
  context.ts                    ← MIGRATE (v1 context → v2 context)
  utils.ts                      ← NO CHANGE (pure utility)
  dnd.ts                        ← MIGRATE (v1 signals → v2 signals)
  table-handle-root.ts          ← NEW (merge types + setup + element)
  table-handle-row-root.ts      ← NEW (merge types + setup + element)
  table-handle-column-root.ts   ← NEW (merge types + setup + element)
  table-handle-row-trigger.ts   ← NEW (merge types + setup + element)
  table-handle-column-trigger.ts ← NEW (merge types + setup + element)
  table-handle-popover-positioner.ts ← NEW (positioning via floating-ui)
  table-handle-popover-popup.ts ← NEW (menu popup behavior: keyboard nav, ARIA)
  table-handle-popover-item.ts  ← NEW (merge types + setup + element)
  table-handle-drag-preview.ts  ← NEW (merge types + setup + element)
  table-handle-drop-indicator.ts ← NEW (merge types + setup + element)
  render-preview.ts             ← MOVE from drag-preview/ (NO CHANGE, pure DOM)
  calc-drag-over.ts             ← MOVE from drop-indicator/ (NO CHANGE, pure utility)
  use-drop.ts                   ← MOVE from hooks/ (MIGRATE v1 → v2)
  use-empty-image.ts            ← MOVE from hooks/ (MIGRATE v1 → v2)
  index.ts                      ← NEW (hand-written, replaces index.gen.ts)
```

### Files to DELETE (after migration)

All old subdirectories and their contents:
- `table-handle-root/` (types.ts, setup.ts, element.gen.ts)
- `table-handle-row-root/` (types.ts, setup.ts, element.gen.ts)
- `table-handle-column-root/` (types.ts, setup.ts, element.gen.ts)
- `table-handle-row-trigger/` (types.ts, setup.ts, element.gen.ts)
- `table-handle-column-trigger/` (types.ts, setup.ts, element.gen.ts)
- `table-handle-popover-content/` (types.ts, setup.ts, element.gen.ts) → replaced by positioner + popup
- `table-handle-popover-item/` (types.ts, setup.ts, element.gen.ts)
- `table-handle-drag-preview/` (types.ts, setup.ts, element.gen.ts, render-preview.ts, updater.ts)
- `table-handle-drop-indicator/` (types.ts, setup.ts, element.gen.ts, calc-drag-over.ts, updater.ts)
- `hooks/` (use-drop.ts, use-empty-image.ts)
- `index.gen.ts`


---

## 4. Shared Hooks to Create

Two v1 hooks need v2 copies before migration:

### 4.1 `use-editor-typing-v2.ts`

```typescript
// TODO: Rename to use-editor-typing.ts after all components are migrated to v2
import { createSignal, type HostElement } from '@aria-ui-v2/core'
import { defineDOMEventHandler, union, type Editor } from '@prosekit/core'

import { useEditorExtension } from './use-editor-extension-v2.ts'

export function useEditorTyping(
  host: HostElement,
  getEditor: () => Editor | null,
): () => boolean {
  const typing = createSignal(false)

  const extension = union(
    defineDOMEventHandler('keypress', () => { typing.set(true) }),
    defineDOMEventHandler('pointermove', () => { typing.set(false) }),
  )

  useEditorExtension(host, getEditor, extension)

  return typing.get
}
```

Key changes from v1:
- `ConnectableElement` → `HostElement`
- `ReadonlySignal<Editor | null>` → `() => Editor | null`
- Returns `() => boolean` instead of `ReadonlySignal<boolean>`

### 4.2 `use-selecting-v2.ts`

```typescript
// TODO: Rename to use-selecting.ts after all components are migrated to v2
import { createSignal, useEffect, type HostElement } from '@aria-ui-v2/core'
import type { Editor } from '@prosekit/core'

import { getSafeEditorView } from '../utils/get-safe-editor-view.ts'

export function useSelecting(
  host: HostElement,
  getEditor: () => Editor | null,
  getEnabled: () => boolean,
): () => boolean {
  const selecting = createSignal(false)
  const isPointerDown = createSignal(false)

  useEffect(host, () => {
    if (!getEnabled()) return

    const view = getSafeEditorView(getEditor())
    if (!view) return

    const { dom, root } = view
    if (!root) return

    const handlePointerDown = () => {
      selecting.set(true)
      isPointerDown.set(true)
    }
    const handlePointerUp = () => {
      isPointerDown.set(false)
    }
    const handleMouseMove = () => {
      if (!isPointerDown.get()) {
        selecting.set(false)
      }
    }

    dom.addEventListener('pointerdown', handlePointerDown)
    root.addEventListener('pointerup', handlePointerUp)
    root.addEventListener('pointermove', handleMouseMove)

    return () => {
      dom.removeEventListener('pointerdown', handlePointerDown)
      root.removeEventListener('pointerup', handlePointerUp)
      root.removeEventListener('pointermove', handleMouseMove)
    }
  })

  return selecting.get
}
```

Key changes from v1:
- `ConnectableElement` → `HostElement`
- `ReadonlySignal<Editor | null>` → `() => Editor | null`
- `ReadonlySignal<boolean>` → `() => boolean`
- `editor.peek()` → `getEditor()` (no signal peek needed)
- Returns `() => boolean` getter instead of signal

---

## 5. Component-by-Component Migration

### 5.1 `context.ts`

v1 `createContext` takes `(key, defaultValue)`.
v2 `createContext` takes `(key)` only — no default value.

Contexts are consumed as `() => T | undefined` in v2 (getter function).
In v1 they're consumed as `ReadonlySignal<T>`.

The table-handle root provides a `Signal<HoveringCellInfo | null>` and consumers read it
via `.get()`. In v2, context provides a value directly; consumers get `() => T | undefined`.

**Migration approach:** Instead of providing a `Signal` via context, provide a plain object
or use a wrapper. Looking at the v2 pattern (e.g., `MenuStore`), stores are classes with
signal fields. The context provides the store instance; consumers access its signals.

For table-handle, define a single `TableHandleStore` class (following the `MenuStore` pattern)
and provide it via one context. Both hovering cell info and DnD state live in the same store
since they're provided by the same element and many consumers need both.

```typescript
import { createContext, createSignal, type Signal } from '@aria-ui-v2/core'
import type { DndInfo, HoveringCellInfo } from './utils.ts'

export const defaultDndInfo: DndInfo = {
  dragging: false,
  direction: 'row',
  draggingIndex: -1,
  droppingIndex: -1,
  x: -1,
  y: -1,
  startX: -1,
  startY: -1,
}

export class TableHandleStore {
  readonly dnd = createSignal<DndInfo>(defaultDndInfo)

  constructor(
    /** Getter for the currently visible hovering cell (null when hidden). */
    public readonly getHoveringCell: () => HoveringCellInfo | null,
  ) {}
}

export const tableHandleStoreContext = createContext<TableHandleStore>('prosekit-table-handle-store')
```

The root creates the store and provides it via context. Consumers do:
```typescript
const getStore = tableHandleStoreContext.consume(host)
// later in effect:
const store = getStore()
if (store) {
  const cell = store.getHoveringCell()
  const dnd = store.dnd.get()
  store.dnd.set({ ...dnd, dragging: true })
}
```

This follows the same pattern as `MenuStore` — context provides a store instance,
consumers access its strictly defined fields.

### 5.2 `table-handle-root.ts`

Merges `table-handle-root/{types.ts, setup.ts, element.gen.ts}`.

```typescript
// Props: just editor
interface TableHandleRootProps {
  editor: Editor | null  // @default null
}

// Setup:
function setupTableHandleRoot(host: HostElement, props: Store<TableHandleRootProps>) {
  const getEditor = props.editor.get

  const getHoveringCell = useHoveringCell(host, getEditor)  // returns () => HoveringCellInfo | null
  const getTyping = useEditorTyping(host, getEditor)
  const getIsInTable = computed(() => !!getHoveringCell())
  const getSelecting = useSelecting(host, getEditor, getIsInTable)
  const getScrolling = useScrolling(host)

  const getCanShow = computed(() => !getTyping() && !getSelecting() && !getScrolling())
  const getVisibleCell = computed(() => getCanShow() ? getHoveringCell() : null)

  const store = new TableHandleStore(getVisibleCell)
  tableHandleStoreContext.provide(host, store)

  useDrop(host, getEditor, store)
}
```

### 5.3 `table-handle-row-root.ts` / `table-handle-column-root.ts`

These are the most complex. They combine:
1. Overlay positioning (float near the hovered cell)
2. Presence (show/hide with animation)
3. Menu root (provide MenuStoreContext for popup/items)

In v2, we use:
- `updatePlacement` from `@aria-ui-v2/elements/overlay` for positioning
- `usePresence` from `@aria-ui-v2/utils` for presence
- `MenuStore` + `MenuStoreContext` from `@aria-ui-v2/elements/menu` for menu state

```typescript
function setupTableHandleRowRoot(host: HostElement, props: Store<TableHandleRowRootProps>) {
  const getEditor = props.editor.get
  const getStore = tableHandleStoreContext.consume(host)

  const getRowFirstCellPos = () => getStore()?.getHoveringCell()?.rowFirstCellPos

  const getReferenceCell = () => {
    const pos = getRowFirstCellPos()
    const view = getSafeEditorView(getEditor())
    if (!pos || !view) return null
    return view.nodeDOM(pos) as HTMLElement | null
  }

  const contentOpen = createSignal(false)

  // Close menu when hovering cell changes
  useEffect(host, () => {
    getRowFirstCellPos()
    contentOpen.set(false)
  })

  // Overlay positioning
  useEffect(host, () => {
    const ref = getReferenceCell()
    if (!ref) return

    return updatePlacement(host, ref, {
      strategy: props.strategy.get(),
      placement: props.placement.get(),
      hoist: props.hoist.get(),
      flip: props.flip.get(),
      shift: props.shift.get(),
      hide: props.hide.get(),
      // ... other overlay props
    })
  })

  // Presence
  const getPresence = () => !!getReferenceCell()
  useAttribute(host, 'data-state', () => getPresence() ? 'open' : 'closed')
  usePresence(host, getPresence)

  // Menu store — create and provide
  const getOpen = () => contentOpen.get()
  const emitOpenChange = (open: boolean) => {
    const event = new OpenChangeEvent(open)
    host.dispatchEvent(event)
    if (event.defaultPrevented) return
    contentOpen.set(open)
  }
  const menuStore = new MenuStore(getOpen, emitOpenChange)
  MenuStoreContext.provide(host, menuStore)
}
```

Column-root is identical but reads `colFirstCellPos` and defaults placement to `'top'`.

### 5.4 `table-handle-row-trigger.ts` / `table-handle-column-trigger.ts`

Replace `useMenuTrigger(host)` with manual toggle behavior.
In v1, `useMenuTrigger` was a single function call. In v2, we need:
- Consume `MenuStoreContext` to toggle the menu
- Set `anchorElement` on the store
- Handle ARIA attributes

But looking at v1's `useMenuTrigger` source, it just makes the element toggle the menu on
click. Our triggers already have custom `pointerdown` and `dragstart` handlers. The menu
open/close is managed by the row-root's `contentOpen` signal. The trigger just needs to:
1. Consume the menu store context (from parent row-root/column-root)
2. Set itself as the anchor element (for positioning the popover-content)
3. Toggle open on click

Actually, looking at the v1 code more carefully, the `useMenuTrigger(host)` in v1 makes
the host dispatch a click event that the menu root intercepts. The menu open state is
managed by the root's `contentOpen` signal. The trigger's main job for menu behavior is
just to be the click target that toggles.

In v2, we do it explicitly:

```typescript
function setupTableHandleRowTrigger(host: HostElement, props: Store<TableHandleRowTriggerProps>) {
  const getEditor = props.editor.get
  const getStore = tableHandleStoreContext.consume(host)
  const getMenuStore = MenuStoreContext.consume(host)

  // Set anchor for menu positioning
  useEffect(host, () => {
    const store = getMenuStore()
    if (store) store.anchorElement.set(host)
  })

  // Toggle menu on click (replacing useMenuTrigger)
  useEventListener(host, 'click', () => {
    const store = getMenuStore()
    if (!store) return
    store.emitOpenChange(!store.getOpen())
  })

  // Select row on pointerdown
  useEventListener(host, 'pointerdown', () => {
    const editor = getEditor()
    const cellPos = getStore()?.getHoveringCell()?.cellPos
    if (!editor || !cellPos) return
    editor.exec(selectTableRow({ head: cellPos }))
  })

  // Drag behavior
  onMount(host, () => { host.draggable = true })
  const getEmptyImage = useEmptyImage(host)

  useEventListener(host, 'dragstart', (event: DragEvent) => {
    // ... same drag logic, but using v2 signal access
  })
}
```

### 5.5 `table-handle-popover-positioner.ts`

The v1 `popover-content` combined positioning AND menu behavior. In v2, following the
`MenuPositioner` / `MenuPopup` split, we separate these into two components.

The positioner handles floating-ui positioning. It extends `OverlayPositionerProps` with
custom defaults matching the v1 behavior:

```typescript
interface TableHandlePopoverPositionerProps extends Omit<OverlayPositionerProps, 'placement' | 'offset'> {
  placement: Placement   // @default 'right-start'
  offset: OffsetOptions  // @default { mainAxis: -4, crossAxis: 4 }
}

function setupTableHandlePopoverPositioner(
  host: HostElement,
  props: Store<TableHandlePopoverPositionerProps>,
) {
  // Delegate to overlay positioner with MenuStoreContext (same as MenuPositioner does)
  setupOverlayPositioner(host, props, MenuStoreContext)
}
```

The positioner consumes `MenuStoreContext` (provided by row-root/column-root) to know
when the menu is open, and positions itself relative to the anchor element (the trigger).

### 5.5b `table-handle-popover-popup.ts`

The popup handles menu interaction behavior: keyboard navigation, ARIA attributes,
focus management, typeahead. It extends `MenuPopupProps`.

The v1 popover-content created a custom `keyDownTarget` (document-level keydown listener)
because the popup element itself doesn't have focus in the normal sense — keyboard events
come from the document. In v2, `MenuPopupProps.eventTarget` supports this directly.

```typescript
interface TableHandlePopoverPopupProps extends MenuPopupProps {}

function setupTableHandlePopoverPopup(
  host: HostElement,
  props: Store<TableHandlePopoverPopupProps>,
) {
  const getStore = tableHandleStoreContext.consume(host)
  const getOpen = () => !!getStore()?.getHoveringCell()
  const keyDownTarget = useKeyDownTarget(host, getOpen)

  props.eventTarget.set(keyDownTarget)
  setupMenuPopup(host, props)
}
```

`setupMenuPopup` consumes `MenuStoreContext` (provided by row-root) for menu state.
The DOM hierarchy is: `row-root > popover-positioner > popover-popup > popover-item`.

### 5.6 `table-handle-popover-item.ts`

Simply delegates to `setupMenuItem`:

```typescript
function setupTableHandlePopoverItem(host: HostElement, props: Store<TableHandlePopoverItemProps>) {
  setupMenuItem(host, props)
}
```

### 5.7 `dnd.ts` — Migrate signals

Replace `@aria-ui/core` imports with `@aria-ui-v2/core`. The function signatures change:
- `ConnectableElement` → `HostElement`
- `ReadonlySignal<Editor | null>` → `() => Editor | null`
- Context consumption: `tableHandleDndContext.consume(host)` returns `() => Signal<DndInfo> | undefined`

### 5.8 `table-handle-drag-preview.ts` and `table-handle-drop-indicator.ts`

Same signal migration pattern as dnd.ts. The updater logic moves inline into the
single-file component.

### 5.9 `use-drop.ts` and `use-empty-image.ts`

Migrate to v2 signal/effect patterns.

---

## 6. Context Flow (v2)

```
TableHandleRoot
  ├─ provides: tableHandleStoreContext (TableHandleStore)
  │
  ├─ TableHandleRowRoot
  │    ├─ consumes: tableHandleStoreContext
  │    ├─ provides: MenuStoreContext (MenuStore)
  │    │
  │    ├─ TableHandleRowTrigger
  │    │    ├─ consumes: tableHandleStoreContext, MenuStoreContext
  │    │    └─ toggles menu, initiates row drag
  │    │
  │    └─ TableHandlePopoverPositioner
  │         ├─ consumes: MenuStoreContext (via setupOverlayPositioner)
  │         └─ TableHandlePopoverPopup
  │              ├─ consumes: MenuStoreContext (via setupMenuPopup), tableHandleStoreContext
  │              └─ TableHandlePopoverItem (multiple)
  │                   └─ consumes: MenuStoreContext (via setupMenuItem)
  │
  ├─ TableHandleColumnRoot (symmetric to RowRoot)
  │    ├─ provides: MenuStoreContext (separate instance)
  │    └─ ... (trigger, positioner, popup, items)
  │
  ├─ TableHandleDragPreview
  │    └─ consumes: tableHandleStoreContext
  │
  └─ TableHandleDropIndicator
       └─ consumes: tableHandleStoreContext
```

---

## 7. Build Configuration

Add `table-handle` to `packages/web/build.mjs`:

```javascript
const components = ['tooltip', 'popover', 'resizable', 'drop-indicator', 'inline-popover', 'table-handle']
```

This generates framework wrappers (React, Preact, Solid, Vue, Svelte) with the editor prop
fallback.

---

## 8. Detailed TODO List

### Phase 1: Create Missing v2 Hooks

- [ ] **1.1** Create `packages/web/src/hooks/use-editor-typing-v2.ts`
  - [ ] `HostElement` instead of `ConnectableElement`
  - [ ] `getEditor: () => Editor | null` instead of signal
  - [ ] Returns `() => boolean` instead of `ReadonlySignal<boolean>`
  - [ ] Uses `useEditorExtension` from v2 hook
  - [ ] Add `// TODO: Rename to use-editor-typing.ts after all components are migrated to v2`

- [ ] **1.2** Create `packages/web/src/hooks/use-selecting-v2.ts`
  - [ ] Same parameter pattern as v2 hooks
  - [ ] Returns `() => boolean`
  - [ ] Add TODO comment

### Phase 2: Migrate Shared Files

- [ ] **2.1** Migrate `context.ts`
  - [ ] `createContext` from `@aria-ui-v2/core` (no default value)
  - [ ] Define single `TableHandleStore` class with `getHoveringCell` getter and `dnd` signal field
  - [ ] Single `tableHandleStoreContext` (merges old root + dnd contexts)
  - [ ] Export `defaultDndInfo` constant

- [ ] **2.2** Migrate `dnd.ts`
  - [ ] `HostElement` replaces `ConnectableElement`
  - [ ] `getEditor: () => Editor | null` replaces `ReadonlySignal`
  - [ ] v2 signal/computed/effect imports
  - [ ] Consume `tableHandleStoreContext` (single context instead of separate root + dnd)

- [ ] **2.3** Migrate `hooks/use-drop.ts` → `use-drop.ts` (move to component root)
  - [ ] v2 types and imports
  - [ ] Signal access pattern change

- [ ] **2.4** Migrate `hooks/use-empty-image.ts` → `use-empty-image.ts` (move to component root)
  - [ ] `HostElement` replaces `ConnectableElement`
  - [ ] v2 `useEffect` import

### Phase 3: Migrate Component Parts (single-file pattern)

Each migration merges `types.ts` + `setup.ts` + `element.gen.ts` into one file with:
Props interface, PropsDeclaration, setup function, Element class, register function.

- [ ] **3.1** `table-handle-root.ts`
  - [ ] Props: `editor: Editor | null`
  - [ ] PropsDeclaration via `defineProps`
  - [ ] Setup: `useHoveringCell` returns getter; use `computed` for `getIsInTable`, `getCanShow`, `getVisibleCell`; create `TableHandleRootStore` + `TableHandleDndStore` and provide via context
  - [ ] Element via `defineCustomElement`
  - [ ] Register as `prosekit-table-handle-root`

- [ ] **3.2** `table-handle-row-root.ts`
  - [ ] Props: extends `OverlayPositionerProps` (with overrides for placement, hoist, flip, shift, hide) + `editor`
  - [ ] Setup: consume root context, overlay positioning via `updatePlacement`, presence via `usePresence`, create `MenuStore` + provide `MenuStoreContext`
  - [ ] Register as `prosekit-table-handle-row-root`

- [ ] **3.3** `table-handle-column-root.ts`
  - [ ] Same as row-root but reads `colFirstCellPos`, default placement `'top'`
  - [ ] Register as `prosekit-table-handle-column-root`

- [ ] **3.4** `table-handle-row-trigger.ts`
  - [ ] Props: `editor: Editor<TableCommandsExtension> | null`
  - [ ] Setup: consume MenuStoreContext + root + dnd contexts, toggle menu on click, select row on pointerdown, drag behavior
  - [ ] Register as `prosekit-table-handle-row-trigger`

- [ ] **3.5** `table-handle-column-trigger.ts`
  - [ ] Same as row-trigger but `selectTableColumn`, direction `'col'`
  - [ ] Register as `prosekit-table-handle-column-trigger`

- [ ] **3.6** `table-handle-popover-positioner.ts`
  - [ ] Props: extends `OverlayPositionerProps` with overrides: `placement: 'right-start'`, `offset: { mainAxis: -4, crossAxis: 4 }`
  - [ ] Setup: delegate to `setupOverlayPositioner(host, props, MenuStoreContext)`
  - [ ] Register as `prosekit-table-handle-popover-positioner`

- [ ] **3.7** `table-handle-popover-popup.ts`
  - [ ] Props: extends `MenuPopupProps` (just `eventTarget`)
  - [ ] Setup: consume `tableHandleRootContext` for open state, create custom `keyDownTarget`, set `eventTarget`, delegate to `setupMenuPopup`
  - [ ] Register as `prosekit-table-handle-popover-popup`

- [ ] **3.8** `table-handle-popover-item.ts`
  - [ ] Props: extends `MenuItemProps`
  - [ ] Setup: delegate to `setupMenuItem`
  - [ ] Register as `prosekit-table-handle-popover-item`

- [ ] **3.9** `table-handle-drag-preview.ts`
  - [ ] Props: `editor: Editor | null`
  - [ ] Setup: absolute positioning, init preview DOM, update position during drag
  - [ ] Inline the updater logic
  - [ ] Register as `prosekit-table-handle-drag-preview`

- [ ] **3.10** `table-handle-drop-indicator.ts`
  - [ ] Props: `editor: Editor<TableCommandsExtension> | null`
  - [ ] Setup: absolute positioning, init indicator, update position during drag
  - [ ] Inline the updater logic
  - [ ] Register as `prosekit-table-handle-drop-indicator`

- [ ] **3.11** Move pure utility files
  - [ ] `render-preview.ts` → move from `table-handle-drag-preview/` to component root
  - [ ] `calc-drag-over.ts` → move from `table-handle-drop-indicator/` to component root

### Phase 4: Index & Exports

- [ ] **4.1** Create new `index.ts` (replaces `index.gen.ts`)
  - [ ] Export all Props interfaces, PropsDeclaration constants, setup functions, Element classes, register functions
  - [ ] Export `OpenChangeEvent` from menu and `MenuItemSelectEvent` from menu item
  - [ ] Export both positioner and popup (replacing old popover-content)
  - [ ] Follow alphabetical ordering

- [ ] **4.2** Delete old files
  - [ ] All subdirectories: `table-handle-root/`, `table-handle-row-root/`, etc.
  - [ ] `hooks/` subdirectory
  - [ ] `index.gen.ts`

### Phase 5: Build Configuration

- [ ] **5.1** Add `'table-handle'` to `components` array in `packages/web/build.mjs`

### Phase 6: Build & Verify

- [ ] **6.1** Run `pnpm -w run build:package`
- [ ] **6.2** Run `pnpm -w fix`
- [ ] **6.3** Run `pnpm -w typecheck`
- [ ] **6.4** Run `pnpm -w lint`
- [ ] **6.5** Verify no remaining `@aria-ui/` v1 imports in `table-handle/` files
- [ ] **6.6** Verify framework wrappers generated for table-handle (check react/preact/solid/vue/svelte)
- [ ] **6.7** Run `pnpm -w test run registry/test/table.test.ts` and fix failures

### Phase 7: Review

- [ ] **7.1** Verify all `@public` / `@internal` JSDoc tags
- [ ] **7.2** Verify all props have `@default` tags
- [ ] **7.3** Verify no `any`/`unknown` types
- [ ] **7.4** Verify no unnecessary comments/JSDoc added
- [ ] **7.5** Verify existing JSDoc/comments preserved
- [ ] **7.6** Verify `null` used instead of `undefined` for prop defaults

---

## 9. Risk Areas & Edge Cases

### Menu Context Compatibility

The v2 `setupMenuPopup` consumes `MenuStoreContext` and expects a `MenuStore` instance.
We create `MenuStore` manually in row-root/column-root. The `MenuStore` constructor
takes `(getOpen, emitOpenChange)`. This should work seamlessly since `MenuStoreContext`
uses the same context key.

### TypedEventTarget in Popover Content

The custom `useKeyDownTarget` creates a `TypedEventTarget<'keydown'>` that forwards
document-level keydowns into the menu popup. In v2, `MenuPopupProps.eventTarget` accepts
exactly this type. The pattern remains the same.

### Context Timing

In v2, `context.consume(host)` returns `() => T | undefined`. The returned getter
initially returns `undefined` until the element connects to the DOM and the context
event fires. All effects that use the getter must handle `undefined` gracefully.

### Overlay Positioning

v1 uses `useOverlayPositionerState(host, overlayState, { reference })`.
v2 uses `updatePlacement(host, reference, options)` which returns a cleanup function.
The positioning options are similar but we need to map them correctly.

### Signal Access Pattern Change

v1: `state.editor.get()`, `state.editor.peek()`, `dndContext.set({...})`
v2: `props.editor.get()` (same), but context signals: `getSignal()?.get()`, `getSignal()?.set()`

The extra `?.` is needed because context getters can return `undefined` before connection.

### Drag-and-Drop Event Flow

The DnD system uses document-level events. The `useDrop` hook attaches to `ownerDocument`.
This doesn't change between v1 and v2 — it's just DOM event handling. The main difference
is the signal access pattern.

### Build Configuration

Adding table-handle to build.mjs should work if the new `index.ts` exports follow the
same pattern as other migrated components. The CLI reads the exports and generates framework
wrappers automatically.

---

## 10. Migration Verification Checklist

After migration, verify:

- [ ] No `@aria-ui/core` imports remain in table-handle files
- [ ] No `@aria-ui/menu` imports remain
- [ ] No `@aria-ui/overlay` imports remain
- [ ] No `@aria-ui/presence` imports remain
- [ ] All imports are from `@aria-ui-v2/core`, `@aria-ui-v2/elements/*`, `@aria-ui-v2/utils`
- [ ] No `ConnectableElement` type usage (should be `HostElement`)
- [ ] No `ReadonlySignal` / `Signal` from v1 (should use v2 equivalents)
- [ ] No `SignalState` / `SetupOptions` / `PropDeclarations` / `EventDeclarations` from v1
- [ ] No `BaseElementConstructor` from v1 (should use `defineCustomElement` from v2)
- [ ] No `defineEmit` from v1
- [ ] No `getStateWithDefaults` utility usage
- [ ] Framework wrappers generated correctly for all 10 sub-components (root, row-root, column-root, row-trigger, column-trigger, popover-positioner, popover-popup, popover-item, drag-preview, drop-indicator)
- [ ] Table-handle renders and functions in the prosekit playground
