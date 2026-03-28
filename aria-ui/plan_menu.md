# Menu Component Implementation Plan (aria-ui v2)

## 1. Design Goals & Constraints

### Primary Consumer: `table-handle`

The v2 menu's first (and currently only) consumer is `@prosekit/web`'s `table-handle` component, which uses
the v1 menu as a context menu for row/column operations. The API must support:

- **Click-based trigger** (button opens/closes menu)
- **Keyboard navigation** (Arrow Up/Down, Home, End, Enter, Space, Escape)
- **Typeahead** (typing characters jumps to matching items)
- **Menu items that fire a `select` event** on activation
- **Custom `eventTarget`** (table-handle delegates document-level keydown events into the menu)
- **Overlay positioning** (menu content is positioned relative to a trigger/anchor via Floating UI)
- **Close on item select** (menu closes after an item is activated)
- **Close on Escape**
- **Close on outside click**
- **Submenus** (nested menus opened from a parent menu item)

### What We Do NOT Need (for now)

These Base UI features are not needed by any current consumer and add significant complexity.
They can be added later without breaking changes:

- **CheckboxItem / RadioItem / RadioGroup** - table-handle items are plain actions
- **LinkItem** - not needed
- **Separator** - can be done with plain HTML/CSS between items
- **GroupLabel** - not needed
- **Arrow** - not needed (can be added to positioner later)
- **Portal** - web components don't use React portals; `hoist` on positioner serves the same purpose
- **Modal mode** - table-handle menus are non-modal
- **Hover-to-open trigger** - table-handle uses click only (submenus use hover)
- **Viewport** (for content transitions) - not needed
- **`payload` / render function children** - React-only pattern

### Design Decisions

**Decision 1: Build on top of Popover + Listbox patterns, not composition**

The menu is conceptually a "popover that contains a listbox-like list of actionable items."
Rather than literally composing `PopoverRoot` + `ListboxRoot` at runtime (which would create
deep nesting and confusing context interactions), we reuse the **shared primitives**:

- `setupOverlayPositioner()` — for Floating UI positioning (same as popover)
- `Collection` — for ordered item traversal with keyboard nav (same as listbox)
- `OpenChangeEvent` — shared event class

This matches exactly how Popover and Tooltip are built: they compose `overlay-*` setup functions.

**Decision 2: Menu has its own store, extending OverlayStore**

The menu needs more state than `OverlayStore` provides (active item tracking, collection, parent
store reference for submenus). We create a `MenuStore` that **extends** `OverlayStore`:

```typescript
class MenuStore extends OverlayStore {
  readonly activeValue: Signal<string | null>
  readonly collection: Signal<Collection>
  parentStore: MenuStore | null  // null for root menu, set for submenus
}
```

This way, `setupOverlayPositioner()` and `setupOverlayPopup()` still work because they accept
`Context<OverlayStore>`, and method-style declarations in TypeScript's `Context<T>` interface are
bivariant, so `Context<MenuStore>` is assignable to `Context<OverlayStore>`.

**Decision 3: Seven component parts**

```
MenuRoot             — manages open/close state, provides MenuStoreContext
MenuTrigger          — button that toggles the menu
MenuPositioner       — Floating UI positioning layer (default placement: bottom-start)
MenuPopup            — the popup container with role="menu", keyboard navigation
MenuItem             — individual menu item with role="menuitem"
MenuSubmenuRoot      — submenu open/close state, provides child MenuStoreContext
MenuSubmenuTrigger   — menuitem in parent that opens a child menu
```

Why separate `MenuPopup` from `MenuPositioner`? This matches the existing Popover pattern
(PopoverPopup vs PopoverPositioner). The positioner handles CSS positioning; the popup
handles ARIA roles, keyboard navigation, and focus management. This separation is important
because:

- The positioner needs `popover="manual"` for the Popover API
- The popup needs `role="menu"` and handles keyboard events
- They have completely different props

**Decision 4: `MenuPopup` owns keyboard navigation (not `MenuRoot`)**

In Listbox, the root owns keyboard navigation because the listbox itself is focusable.
In Menu, the popup is what receives focus when the menu opens, so keyboard
navigation lives in `MenuPopup`. This also makes the `eventTarget` override natural:
it's a prop on `MenuPopup`, matching the v1 API that table-handle already uses.

**Decision 5: Close behaviors**

- **Escape**: closes the current menu level (not parent), returns highlight to parent trigger
- **Click on item**: activates item, closes entire menu tree
- **Click outside**: closes entire menu tree (handled by overlay positioner / popover API)
- **Tab**: closes entire menu tree (focus leaves)

**Decision 6: Typeahead**

Typeahead allows users to type characters to jump to matching items. This is a standard
menu pattern (WAI-ARIA Menu Pattern). Implementation:

- Track typed characters with a debounce timer (500ms)
- On each character, find the first item whose text content starts with the accumulated string
- Clear the buffer after the timeout
- Typeahead scope is the current menu level only (not parent/child)

This is implemented inside `setupMenuPopup` as part of the keydown handler.

**Decision 7: Submenu context isolation via same-context shadowing**

Each menu level (root or submenu) provides `MenuStoreContext`. A submenu shadows the parent's
context for its descendants. This works because the aria-ui context system's `handleRequest`
checks `element === consumer` — an element that both provides and consumes the same context
key will correctly consume from its ancestor and provide to its descendants.

`MenuSubmenuRoot`:
1. Consumes `MenuStoreContext` → gets parent store (from ancestor provider)
2. Creates child `MenuStore` with `parentStore` reference
3. Provides `MenuStoreContext` with child store → shadows parent for descendants

`MenuSubmenuTrigger`:
1. Consumes `MenuStoreContext` → gets child store (from `MenuSubmenuRoot`)
2. Accesses parent store via `childStore.parentStore`
3. Registers in parent's collection, tracks parent's `activeValue`

**Decision 8: Level-scoped collection via DOM query filtering**

Each `MenuPopup` owns a `Collection` of its direct items (excluding nested submenu items).
Items rebuild the collection by querying the nearest `aria-ui-menu-popup` ancestor:

```typescript
const popup = host.closest('aria-ui-menu-popup')
const allItems = popup.querySelectorAll('aria-ui-menu-item, aria-ui-menu-submenu-trigger')
const levelItems = [...allItems].filter(el => el.closest('aria-ui-menu-popup') === popup)
```

The filter ensures items whose nearest popup is a NESTED popup are excluded. This works because
`MenuSubmenuTrigger` lives inside `MenuSubmenuRoot` which is inside the parent popup — its nearest
popup ancestor is the parent popup, so it's correctly included. Items inside a nested popup have
the nested popup as their nearest ancestor, so they're excluded.

**Decision 9: Closing the entire menu tree**

When a regular `MenuItem` is activated (click or Enter/Space), the entire menu tree closes.
Implementation: walk up the `parentStore` chain to find the root store, then close it.
The cascade effect in each `MenuSubmenuRoot` watches the parent's open state and closes
the child when the parent closes.

```typescript
function closeMenuTree(store: MenuStore) {
  let current: MenuStore | null = store
  while (current?.parentStore) {
    current = current.parentStore
  }
  current?.emitOpenChange(false)
}
```

---

## 2. Component Architecture

### File Structure

```
aria-ui/packages/elements/src/menu/
  menu-store.ts              — MenuStore class + MenuStoreContext
  menu-root.ts               — MenuRootElement (open/close, context provider)
  menu-trigger.ts            — MenuTriggerElement (click to toggle)
  menu-positioner.ts         — MenuPositionerElement (Floating UI wrapper)
  menu-popup.ts              — MenuPopupElement (role=menu, keyboard nav, typeahead)
  menu-item.ts               — MenuItemElement (role=menuitem, activation)
  menu-submenu-root.ts       — MenuSubmenuRootElement (submenu context provider)
  menu-submenu-trigger.ts    — MenuSubmenuTriggerElement (menuitem + submenu opener)
  menu.test.ts               — Tests
```

### Component Tree (HTML) — Flat Menu

```html
<aria-ui-menu-root>
  <aria-ui-menu-trigger tabindex="0">
    Open Menu
  </aria-ui-menu-trigger>
  <aria-ui-menu-positioner>
    <aria-ui-menu-popup>
      <aria-ui-menu-item value="cut">Cut</aria-ui-menu-item>
      <aria-ui-menu-item value="copy">Copy</aria-ui-menu-item>
      <aria-ui-menu-item value="paste">Paste</aria-ui-menu-item>
    </aria-ui-menu-popup>
  </aria-ui-menu-positioner>
</aria-ui-menu-root>
```

### Component Tree (HTML) — With Submenu

```html
<aria-ui-menu-root>
  <aria-ui-menu-trigger tabindex="0">Open Menu</aria-ui-menu-trigger>
  <aria-ui-menu-positioner>
    <aria-ui-menu-popup>
      <aria-ui-menu-item value="cut">Cut</aria-ui-menu-item>

      <aria-ui-menu-submenu-root>
        <aria-ui-menu-submenu-trigger value="share">Share ></aria-ui-menu-submenu-trigger>
        <aria-ui-menu-positioner placement="right-start">
          <aria-ui-menu-popup>
            <aria-ui-menu-item value="email">Email</aria-ui-menu-item>
            <aria-ui-menu-item value="slack">Slack</aria-ui-menu-item>
          </aria-ui-menu-popup>
        </aria-ui-menu-positioner>
      </aria-ui-menu-submenu-root>

      <aria-ui-menu-item value="delete">Delete</aria-ui-menu-item>
    </aria-ui-menu-popup>
  </aria-ui-menu-positioner>
</aria-ui-menu-root>
```

### Context Flow — Flat Menu

```
MenuRoot
  ├─ provides: MenuStoreContext (storeA)
  │
  ├─ MenuTrigger
  │    └─ consumes: MenuStoreContext → storeA
  │
  ├─ MenuPositioner
  │    └─ consumes: MenuStoreContext → storeA (as OverlayStore)
  │
  └─ MenuPopup
       ├─ consumes: MenuStoreContext → storeA
       │
       └─ MenuItem (multiple)
            └─ consumes: MenuStoreContext → storeA
```

### Context Flow — With Submenu

```
MenuRoot
  ├─ provides: MenuStoreContext (storeA)
  │
  ├─ MenuTrigger
  │    └─ consumes: MenuStoreContext → storeA
  │
  └─ MenuPopup
       ├─ consumes: MenuStoreContext → storeA
       │
       ├─ MenuItem
       │    └─ consumes: MenuStoreContext → storeA
       │
       ├─ MenuSubmenuRoot
       │    ├─ consumes: MenuStoreContext → storeA (parent store, via same-element skip)
       │    ├─ provides: MenuStoreContext (storeB, shadows storeA for descendants)
       │    │
       │    ├─ MenuSubmenuTrigger
       │    │    └─ consumes: MenuStoreContext → storeB
       │    │         → accesses storeA via storeB.parentStore
       │    │
       │    └─ MenuPositioner
       │         └─ consumes: MenuStoreContext → storeB
       │              └─ MenuPopup
       │                   ├─ consumes: MenuStoreContext → storeB
       │                   └─ MenuItem
       │                        └─ consumes: MenuStoreContext → storeB
       │
       └─ MenuItem
            └─ consumes: MenuStoreContext → storeA
```

---

## 3. Detailed API Design

### 3.1 `menu-store.ts`

```typescript
import { createContext, createSignal, type Context, type Signal } from '@aria-ui-v2/core'
import { Collection } from '@aria-ui-v2/utils'

import { OverlayStore } from '../overlay/overlay-store.ts'

/**
 * @internal
 */
export class MenuStore extends OverlayStore {
  /** The value of the currently highlighted/active item */
  readonly activeValue: Signal<string | null>

  /** Ordered collection of menu items for keyboard traversal */
  readonly collection: Signal<Collection>

  /** Reference to parent menu's store (null for root menu) */
  parentStore: MenuStore | null

  constructor(
    getOpen: () => boolean,
    emitOpenChange: (open: boolean) => void,
  ) {
    super(getOpen, emitOpenChange)
    this.activeValue = createSignal<string | null>(null)
    this.collection = createSignal(new Collection([]))
    this.parentStore = null
  }
}

/**
 * @internal
 */
export const MenuStoreContext: Context<MenuStore> =
  createContext<MenuStore>('MenuStoreContext')

/**
 * Walk up the parentStore chain to find the root store, then close it.
 * Cascade effects in each MenuSubmenuRoot will close child stores.
 *
 * @internal
 */
export function closeMenuTree(store: MenuStore): void {
  let current: MenuStore | null = store
  while (current?.parentStore) {
    current = current.parentStore
  }
  current?.emitOpenChange(false)
}
```

### 3.2 `menu-root.ts`

We cannot use `setupOverlayRoot()` directly because it creates `new OverlayStore(...)`,
not `new MenuStore(...)`. We inline the logic (10 lines of duplication, acceptable):

```typescript
/**
 * @public
 */
export interface MenuRootProps extends OverlayRootProps {}

/**
 * @internal
 */
export const MenuRootPropsDeclaration = defineProps<MenuRootProps>({
  ...OverlayRootPropsDeclaration,
})

/**
 * @public
 */
export interface MenuRootEvents {
  /**
   * Emitted when the menu is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupMenuRoot(
  host: HostElement,
  props: Store<MenuRootProps>,
) {
  const getOpen = computed(() => {
    const open = props.open.get()
    const defaultOpen = props.defaultOpen.get()
    return open ?? defaultOpen
  })

  const getDisabled = computed(() => props.disabled.get())

  const emitOpenChange = (open: boolean) => {
    if (getDisabled()) return
    const event = new OpenChangeEvent(open)
    host.dispatchEvent(event)
    if (event.defaultPrevented) return
    props.open.set(open)
  }

  const store = new MenuStore(getOpen, emitOpenChange)
  // store.parentStore remains null — this is the root
  useAriaDisabled(host, getDisabled)
  MenuStoreContext.provide(host, store)
}
```

### 3.3 `menu-trigger.ts`

```typescript
/**
 * @public
 */
export interface MenuTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   *
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const MenuTriggerPropsDeclaration = defineProps<MenuTriggerProps>({
  disabled: {
    default: false,
    attribute: 'disabled',
    type: 'boolean',
  },
})

/**
 * @public
 */
export interface MenuTriggerEvents {
  /**
   * Emitted when the menu is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupMenuTrigger(
  host: HostElement,
  props: Store<MenuTriggerProps>,
) {
  const getDisabled = props.disabled.get
  const getStore = MenuStoreContext.consume(host)
  const getOpen = computed(() => getStore()?.getOpen())
  const getPopupId = computed(() => getStore()?.getPopupId())

  // Click/Enter/Space toggles the menu
  usePress(host, () => {
    const store = getStore()
    if (!store) return
    if (!getDisabled()) store.emitOpenChange(!store.getOpen())
  })

  // Set this element as the anchor for positioning
  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.anchorElement.set(host)
  })

  // ARIA attributes
  useAriaExpanded(host, getOpen)
  useAriaDisabled(host, getDisabled)

  const getAriaControls = computed(() =>
    getOpen() ? getPopupId() : undefined,
  )
  useAriaControls(host, getAriaControls)

  // aria-haspopup="menu" indicates this trigger opens a menu
  onMount(host, () => {
    host.setAttribute('aria-haspopup', 'menu')
  })
}
```

### 3.4 `menu-positioner.ts`

```typescript
/**
 * @public
 */
export interface MenuPositionerProps extends OverlayPositionerProps {
  /**
   * The initial placement of the floating element
   *
   * @default "bottom-start"
   */
  placement: Placement
}

/**
 * @internal
 */
export const MenuPositionerPropsDeclaration = defineProps<MenuPositionerProps>({
  ...OverlayPositionerPropsDeclaration,
  placement: { default: 'bottom-start', attribute: 'placement', type: 'string' },
})

/**
 * @internal
 */
export function setupMenuPositioner(
  host: HostElement,
  props: Store<MenuPositionerProps>,
) {
  setupOverlayPositioner(host, props, MenuStoreContext)
}
```

The default placement is overridden to `'bottom-start'` (menus conventionally open
below-left of the trigger, not above).

### 3.5 `menu-popup.ts`

This is the most complex component. It handles:
1. ARIA role setup (`role="menu"`)
2. Keyboard navigation (arrows, Home, End)
3. Item activation (Enter, Space)
4. Typeahead
5. Escape to close (current level only for submenus)
6. ArrowRight to open submenu
7. ArrowLeft to close submenu and return to parent
8. Focus management (focus popup on open, return focus to trigger on close)

```typescript
/**
 * @public
 */
export interface MenuPopupProps {
  /**
   * By default, the MenuPopup element will listen for keydown events.
   * You can pass a different element to listen for keydown events.
   *
   * @default null
   */
  eventTarget: HTMLElement | TypedEventTarget<'keydown'> | null
}

/**
 * @internal
 */
export const MenuPopupPropsDeclaration = defineProps<MenuPopupProps>({
  eventTarget: { default: null, attribute: false, type: 'json' },
})

/**
 * @internal
 */
export function setupMenuPopup(
  host: HostElement,
  props: Store<MenuPopupProps>,
) {
  const getStore = MenuStoreContext.consume(host)
  const id = useElementId(host)

  // Register popup ID in store
  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.setPopupId(id)
  })

  // Set role and data-state
  onMount(host, () => {
    host.role = 'menu'
    host.tabIndex = 0
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    host.dataset.state = store.getOpen() ? 'open' : 'closed'
  })

  // aria-activedescendant: points to the currently active item
  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const activeValue = store.activeValue.get()
    if (activeValue == null) {
      host.removeAttribute('aria-activedescendant')
      return
    }
    const element = store.collection.get().getElement(activeValue)
    if (element?.id) {
      host.setAttribute('aria-activedescendant', element.id)
    } else {
      host.removeAttribute('aria-activedescendant')
    }
  })

  // Focus management: focus popup when menu opens, restore focus on close
  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const open = store.getOpen()

    if (open) {
      requestAnimationFrame(() => {
        host.focus()
        const collection = store.collection.get()
        store.activeValue.set(collection.first())
      })
    } else {
      store.activeValue.set(null)
    }
  })

  // Keyboard navigation handler
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.isComposing || event.defaultPrevented) return

    const store = getStore()
    if (!store) return
    if (!store.getOpen()) return

    const collection = store.collection.get()
    if (collection.size() === 0) return

    const currentValue = store.activeValue.get()
    let nextValue: string | null = null

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        nextValue = collection.next(currentValue)
        break

      case 'ArrowUp':
        event.preventDefault()
        nextValue = collection.prev(currentValue)
        break

      case 'Home':
        event.preventDefault()
        nextValue = collection.first()
        break

      case 'End':
        event.preventDefault()
        nextValue = collection.last()
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        if (currentValue != null) {
          const activeEl = collection.getElement(currentValue)
          if (activeEl?.tagName.toLowerCase() === 'aria-ui-menu-submenu-trigger') {
            // ArrowRight-like: open submenu
            activeEl.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
          } else {
            activateItem(store, currentValue)
          }
        }
        return

      case 'ArrowRight': {
        // If active item is a submenu trigger, open the submenu
        if (currentValue != null) {
          const activeEl = collection.getElement(currentValue)
          if (activeEl?.tagName.toLowerCase() === 'aria-ui-menu-submenu-trigger') {
            event.preventDefault()
            activeEl.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
          }
        }
        return
      }

      case 'ArrowLeft': {
        // If this is a submenu, close it and return to parent
        if (store.parentStore) {
          event.preventDefault()
          store.emitOpenChange(false)
        }
        return
      }

      case 'Escape':
        event.preventDefault()
        store.emitOpenChange(false)
        // If this is a submenu, parent stays open and parent's trigger is re-highlighted
        // If this is root, the root closes
        // Focus return is handled by the trigger/submenu-trigger
        return

      default:
        // Typeahead: printable single characters
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          handleTypeahead(event.key, store)
        }
        return
    }

    if (nextValue != null) {
      store.activeValue.set(nextValue)
    }
  }

  // Bind keyboard handler to eventTarget or host
  useEffect(host, () => {
    const target: HTMLElement | TypedEventTarget<'keydown'> =
      props.eventTarget.get() || host

    target.addEventListener('keydown', handleKeydown as EventListener)
    return () => {
      target.removeEventListener('keydown', handleKeydown as EventListener)
    }
  })

  // Close on focus leaving the menu tree
  useEventListener(host, 'focusout', (event: FocusEvent) => {
    const store = getStore()
    if (!store) return
    if (!store.getOpen()) return

    const relatedTarget = event.relatedTarget as Node | null
    const menuRoot = host.closest('aria-ui-menu-root')
    if (menuRoot && relatedTarget && menuRoot.contains(relatedTarget)) return

    closeMenuTree(store)
  })
}

// --- Typeahead ---

let typeaheadBuffer = ''
let typeaheadTimer: ReturnType<typeof setTimeout> | null = null
const TYPEAHEAD_TIMEOUT = 500

function handleTypeahead(char: string, store: MenuStore) {
  if (typeaheadTimer) clearTimeout(typeaheadTimer)

  typeaheadBuffer += char.toLowerCase()
  typeaheadTimer = setTimeout(() => {
    typeaheadBuffer = ''
  }, TYPEAHEAD_TIMEOUT)

  const collection = store.collection.get()
  const values = collection.getValues()

  for (const value of values) {
    if (value.toLowerCase().startsWith(typeaheadBuffer)) {
      store.activeValue.set(value)
      break
    }
  }
}

// --- Item activation ---

function activateItem(store: MenuStore, value: string) {
  const element = store.collection.get().getElement(value)
  if (!element) return

  const selectEvent = new MenuItemSelectEvent()
  element.dispatchEvent(selectEvent)

  if (!selectEvent.defaultPrevented) {
    closeMenuTree(store)
  }
}
```

**Key design choices:**

1. **`eventTarget` prop** — Critical for table-handle, which creates a custom
   `TypedEventTarget<'keydown'>` that forwards document-level keydowns into the menu.

2. **Typeahead** — Module-scoped buffer. Safe because only one menu popup can be
   interactive at a time.

3. **ArrowRight / ArrowLeft** — The popup's keydown handler checks if the active
   element is a `MenuSubmenuTrigger` (by tag name) for ArrowRight. For ArrowLeft,
   it checks `store.parentStore` to determine if this is a submenu.

4. **Enter/Space on submenu trigger** — Opens the submenu (same as ArrowRight),
   rather than trying to "activate" it as a regular item.

5. **`aria-activedescendant`** — The popup element stays focused; screen readers
   track the active item via this attribute. Each `MenuItem` and `MenuSubmenuTrigger`
   must have an ID (via `useElementId`).

6. **`closeMenuTree`** — When focus leaves the entire menu tree (focusout handler),
   closes the whole tree, not just the current level.

### 3.6 `menu-item.ts`

```typescript
/**
 * @public
 */
export class MenuItemSelectEvent extends Event {
  constructor() {
    super('select', { bubbles: true, cancelable: true })
  }
}

/**
 * @public
 */
export interface MenuItemProps {
  /**
   * The unique value for this menu item.
   *
   * @default ""
   */
  value: string

  /**
   * Whether this menu item is disabled.
   *
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const MenuItemPropsDeclaration = defineProps<MenuItemProps>({
  value: { default: '', attribute: 'value', type: 'string' },
  disabled: { default: false, attribute: 'disabled', type: 'boolean' },
})

/**
 * @public
 */
export interface MenuItemEvents {
  /**
   * Fired when the item is selected.
   */
  select: MenuItemSelectEvent
}

/**
 * @internal
 */
export function setupMenuItem(
  host: HostElement,
  props: Store<MenuItemProps>,
) {
  onMount(host, () => {
    host.role = 'menuitem'
  })

  // Auto-generate ID for aria-activedescendant
  useElementId(host)

  const getStore = MenuStoreContext.consume(host)

  useEffect(host, () => {
    host.dataset.value = props.value.get()
  })

  useAriaDisabled(host, () => props.disabled.get())

  // Track active state via data-active attribute
  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const value = props.value.get()
    const isActive = store.activeValue.get() === value
    if (isActive) {
      host.setAttribute('data-active', '')
    } else {
      host.removeAttribute('data-active')
    }
  })

  // Rebuild collection when items mount/unmount or change
  // Scoped to the nearest aria-ui-menu-popup (excludes nested submenus)
  const rebuildCollection = () => {
    const store = getStore()
    if (!store) return
    const popup = host.closest('aria-ui-menu-popup')
    if (!popup) return
    const allItems = popup.querySelectorAll<HTMLElement>(
      'aria-ui-menu-item, aria-ui-menu-submenu-trigger',
    )
    const levelItems = [...allItems].filter(
      (el) => el.closest('aria-ui-menu-popup') === popup,
    )
    store.collection.set(new Collection(levelItems))
  }

  onMount(host, () => {
    rebuildCollection()
    return () => rebuildCollection()
  })

  useEffect(host, () => {
    props.value.get()
    props.disabled.get()
    rebuildCollection()
  })

  // Highlight on mouse enter
  useEventListener(host, 'mouseenter', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return
    store.activeValue.set(props.value.get())
  })

  // Activate on click
  useEventListener(host, 'click', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return

    store.activeValue.set(props.value.get())

    const selectEvent = new MenuItemSelectEvent()
    host.dispatchEvent(selectEvent)

    if (!selectEvent.defaultPrevented) {
      closeMenuTree(store)
    }
  })
}
```

### 3.7 `menu-submenu-root.ts`

```typescript
/**
 * @public
 */
export interface MenuSubmenuRootProps {}

/**
 * @internal
 */
export const MenuSubmenuRootPropsDeclaration = defineProps<MenuSubmenuRootProps>({})

/**
 * @public
 */
export interface MenuSubmenuRootEvents {
  /**
   * Emitted when the submenu is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupMenuSubmenuRoot(
  host: HostElement,
  _props: Store<MenuSubmenuRootProps>,
) {
  // 1. Consume parent's MenuStoreContext (before providing our own).
  //    The context system's same-element skip ensures this gets the ancestor's store.
  const getParentStore = MenuStoreContext.consume(host)

  // 2. Create child store with internal open state
  const open = createSignal(false)
  const getOpen = () => open.get()

  const emitOpenChange = (newOpen: boolean) => {
    const event = new OpenChangeEvent(newOpen)
    host.dispatchEvent(event)
    if (event.defaultPrevented) return
    open.set(newOpen)
  }

  const childStore = new MenuStore(getOpen, emitOpenChange)

  // 3. Provide child store (shadows parent for descendants)
  MenuStoreContext.provide(host, childStore)

  // 4. Link parent store (reactive — may not be available immediately)
  useEffect(host, () => {
    const parentStore = getParentStore()
    if (parentStore) {
      childStore.parentStore = parentStore
    }
  })

  // 5. Cascade close: when parent closes, close this submenu
  useEffect(host, () => {
    const parentStore = getParentStore()
    if (!parentStore) return
    if (!parentStore.getOpen()) {
      open.set(false)
    }
  })

  // 6. When submenu closes, re-focus parent popup
  useEffect(host, () => {
    if (open.get()) return  // Only act on close

    const parentStore = getParentStore()
    if (!parentStore) return

    // Find parent popup and re-focus it
    const parentPopup = host.closest('aria-ui-menu-popup')
    if (parentPopup instanceof HTMLElement) {
      requestAnimationFrame(() => {
        parentPopup.focus()
      })
    }
  })
}
```

**Key behaviors:**

- Does NOT have `open`/`defaultOpen`/`disabled` props — the submenu's open state is
  entirely managed internally (opened by hover/arrow on trigger, closed by escape/arrow/outside).
- The cascade close effect ensures that closing a parent menu closes all descendant submenus.
- When the submenu closes, focus returns to the parent popup element. The parent popup's
  `activeValue` still points to the submenu trigger, so keyboard navigation continues
  from where it left off.

### 3.8 `menu-submenu-trigger.ts`

```typescript
/**
 * @public
 */
export interface MenuSubmenuTriggerProps {
  /**
   * The unique value for this submenu trigger in the parent menu.
   *
   * @default ""
   */
  value: string

  /**
   * Whether this submenu trigger is disabled.
   *
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const MenuSubmenuTriggerPropsDeclaration = defineProps<MenuSubmenuTriggerProps>({
  value: { default: '', attribute: 'value', type: 'string' },
  disabled: { default: false, attribute: 'disabled', type: 'boolean' },
})

/**
 * @internal
 */
export function setupMenuSubmenuTrigger(
  host: HostElement,
  props: Store<MenuSubmenuTriggerProps>,
) {
  onMount(host, () => {
    host.role = 'menuitem'
    host.setAttribute('aria-haspopup', 'menu')
  })

  useElementId(host)

  // Get child store (from MenuSubmenuRoot)
  const getStore = MenuStoreContext.consume(host)

  // Helper: get parent store via child store's parentStore reference
  const getParentStore = () => getStore()?.parentStore ?? null

  // Set this element as anchor for child menu positioning
  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.anchorElement.set(host)
  })

  // ARIA: aria-expanded tracks child menu open state
  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const open = store.getOpen()
    host.setAttribute('aria-expanded', String(open))
  })

  useAriaDisabled(host, () => props.disabled.get())

  useEffect(host, () => {
    host.dataset.value = props.value.get()
  })

  // Track data-active from PARENT store's activeValue
  useEffect(host, () => {
    const parentStore = getParentStore()
    if (!parentStore) return
    const value = props.value.get()
    const isActive = parentStore.activeValue.get() === value
    if (isActive) {
      host.setAttribute('data-active', '')
    } else {
      host.removeAttribute('data-active')
    }
  })

  // Rebuild PARENT collection (same logic as MenuItem)
  const rebuildCollection = () => {
    const parentStore = getParentStore()
    if (!parentStore) return
    const popup = host.closest('aria-ui-menu-popup')
    if (!popup) return
    const allItems = popup.querySelectorAll<HTMLElement>(
      'aria-ui-menu-item, aria-ui-menu-submenu-trigger',
    )
    const levelItems = [...allItems].filter(
      (el) => el.closest('aria-ui-menu-popup') === popup,
    )
    parentStore.collection.set(new Collection(levelItems))
  }

  onMount(host, () => {
    rebuildCollection()
    return () => rebuildCollection()
  })

  useEffect(host, () => {
    props.value.get()
    props.disabled.get()
    rebuildCollection()
  })

  // --- Hover interaction ---

  let openTimer: ReturnType<typeof setTimeout> | null = null
  let closeTimer: ReturnType<typeof setTimeout> | null = null

  const OPEN_DELAY = 200
  const CLOSE_DELAY = 150

  const clearTimers = () => {
    if (openTimer) { clearTimeout(openTimer); openTimer = null }
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
  }

  // Mouse enter: highlight in parent + start open timer
  useEventListener(host, 'mouseenter', () => {
    if (props.disabled.get()) return
    clearTimers()

    const parentStore = getParentStore()
    if (parentStore) {
      parentStore.activeValue.set(props.value.get())
    }

    const store = getStore()
    if (store && !store.getOpen()) {
      openTimer = setTimeout(() => {
        store.emitOpenChange(true)
      }, OPEN_DELAY)
    }
  })

  // Mouse leave: start close timer (cancelled if mouse enters submenu popup)
  useEventListener(host, 'mouseleave', (event: MouseEvent) => {
    clearTimers()

    const store = getStore()
    if (!store || !store.getOpen()) return

    // Check if mouse moved to the submenu popup
    const relatedTarget = event.relatedTarget as HTMLElement | null
    const submenuRoot = host.closest('aria-ui-menu-submenu-root')
    if (submenuRoot && relatedTarget && submenuRoot.contains(relatedTarget)) return

    closeTimer = setTimeout(() => {
      store.emitOpenChange(false)
    }, CLOSE_DELAY)
  })

  // Close submenu when parent's activeValue moves away from this trigger
  useEffect(host, () => {
    const parentStore = getParentStore()
    if (!parentStore) return
    const store = getStore()
    if (!store) return

    const parentActive = parentStore.activeValue.get()
    const myValue = props.value.get()

    if (parentActive !== myValue && store.getOpen()) {
      const timer = setTimeout(() => store.emitOpenChange(false), CLOSE_DELAY)
      return () => clearTimeout(timer)
    }
  })

  // Handle 'aria-ui:open-submenu' event from parent popup's keydown handler
  useEventListener(host, 'aria-ui:open-submenu' as any, () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return
    store.emitOpenChange(true)
  })

  // Click should open submenu (not activate as a regular item)
  useEventListener(host, 'click', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return
    store.emitOpenChange(!store.getOpen())
  })

  // Cleanup timers on unmount
  onMount(host, () => {
    return () => clearTimers()
  })
}
```

**Key behaviors:**

1. **Dual identity** — It's a `menuitem` in the parent (participates in parent's
   collection, tracks parent's `activeValue`) AND a trigger for the child menu
   (sets anchor, toggles child open state).

2. **Hover with delays** — Open delay (200ms) prevents accidental submenu opening
   when sweeping past. Close delay (150ms) gives user time to move from trigger
   to submenu popup.

3. **Close on parent highlight change** — When the parent highlights a different
   item (e.g., ArrowDown past this trigger), the submenu closes after a delay.
   This handles the "only one submenu at a time" behavior.

4. **`aria-ui:open-submenu` event** — The parent popup dispatches this when
   Enter/Space/ArrowRight is pressed on the active submenu trigger. This avoids
   the parent needing to know the child store.

5. **Collection rebuilds register in PARENT's store** — not the child store.
   The child store's collection is managed by items inside the submenu's popup.

---

## 4. ARIA Attributes Summary

| Element | Role | ARIA Attributes |
|---------|------|----------------|
| MenuRoot | (none) | `aria-disabled` |
| MenuTrigger | (none) | `aria-expanded`, `aria-haspopup="menu"`, `aria-controls`, `aria-disabled` |
| MenuPositioner | (none) | (none — purely positional) |
| MenuPopup | `menu` | `aria-activedescendant`, `data-state` |
| MenuItem | `menuitem` | `aria-disabled`, `data-active`, `data-value`, auto `id` |
| MenuSubmenuRoot | (none) | (none) |
| MenuSubmenuTrigger | `menuitem` | `aria-haspopup="menu"`, `aria-expanded`, `aria-disabled`, `data-active`, `data-value`, auto `id` |

---

## 5. Keyboard Interaction Spec

### Top-level menu

| Key | Behavior | Handled In |
|-----|----------|-----------|
| Enter/Space on trigger | Toggle menu open/close | MenuTrigger (`usePress`) |
| ArrowDown | Move to next item | MenuPopup keydown handler |
| ArrowUp | Move to previous item | MenuPopup keydown handler |
| Home | Move to first item | MenuPopup keydown handler |
| End | Move to last item | MenuPopup keydown handler |
| Enter/Space on item | Activate current item, close tree | MenuPopup keydown handler |
| Enter/Space on submenu trigger | Open submenu | MenuPopup keydown handler |
| ArrowRight on submenu trigger | Open submenu, highlight first child item | MenuPopup keydown handler |
| Escape | Close menu | MenuPopup keydown handler |
| Printable char | Typeahead navigation | MenuPopup keydown handler |
| Tab | Close entire menu tree (via focusout) | MenuPopup focusout handler |

### Inside a submenu

| Key | Behavior | Handled In |
|-----|----------|-----------|
| ArrowDown/Up | Navigate within submenu items | Submenu's MenuPopup keydown |
| Home/End | First/last in submenu | Submenu's MenuPopup keydown |
| Enter/Space on item | Activate, close entire tree | Submenu's MenuPopup keydown |
| Enter/Space on nested submenu trigger | Open nested submenu | Submenu's MenuPopup keydown |
| ArrowRight on nested submenu trigger | Open nested submenu | Submenu's MenuPopup keydown |
| ArrowLeft | Close this submenu, re-focus parent popup | Submenu's MenuPopup keydown |
| Escape | Close this submenu only, re-focus parent popup | Submenu's MenuPopup keydown |
| Printable char | Typeahead within submenu items | Submenu's MenuPopup keydown |

---

## 6. Test Plan (`menu.test.ts`)

```typescript
import { html, render } from 'lit-html'
import { beforeEach, describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { registerElements } from '../index.ts'

describe('Menu', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  // ---- Flat menu tests ----

  describe('Basic Functionality', () => {
    test('renders menu elements')
    test('menu popup is hidden by default')
    test('menu popup shows with defaultOpen=true')
    test('menu popup has role="menu"')
    test('menu items have role="menuitem"')
  })

  describe('Trigger Interactions', () => {
    test('clicking trigger opens menu')
    test('clicking trigger again closes menu')
    test('Enter on trigger opens menu')
    test('Space on trigger opens menu')
    test('trigger has aria-haspopup="menu"')
    test('trigger has aria-expanded="false" when closed')
    test('trigger has aria-expanded="true" when open')
    test('trigger has aria-controls pointing to popup id when open')
    test('disabled trigger does not open menu')
    test('disabled root prevents opening')
  })

  describe('Keyboard Navigation', () => {
    test('opening menu highlights first item')
    test('ArrowDown moves to next item')
    test('ArrowUp moves to previous item')
    test('ArrowDown from last item wraps to first (loop)')
    test('ArrowUp from first item wraps to last (loop)')
    test('Home moves to first item')
    test('End moves to last item')
    test('navigation skips disabled items')
    test('ArrowDown skips multiple consecutive disabled items')
  })

  describe('Item Activation', () => {
    test('Enter activates highlighted item and closes menu')
    test('Space activates highlighted item and closes menu')
    test('clicking item activates it and closes menu')
    test('activating item dispatches select event on the item element')
    test('select event can be prevented to keep menu open')
    test('disabled item cannot be activated via keyboard')
    test('clicking disabled item does not activate or close')
  })

  describe('Close Behaviors', () => {
    test('Escape closes menu')
    test('Tab closes menu')
    test('focus leaving menu tree closes menu')
  })

  describe('Typeahead', () => {
    test('typing "c" highlights first item starting with "c"')
    test('typing "co" narrows to item starting with "co"')
    test('typeahead is case-insensitive')
    test('typeahead does nothing if no item matches')
  })

  describe('Accessibility', () => {
    test('popup has aria-activedescendant pointing to active item id')
    test('aria-activedescendant updates when active item changes')
    test('aria-activedescendant is removed when no item is active')
    test('disabled items have aria-disabled="true"')
    test('active item has data-active attribute')
    test('non-active items do not have data-active attribute')
  })

  describe('Events', () => {
    test('root emits openChange event when opened')
    test('root emits openChange event when closed')
    test('openChange event can be prevented to block state change')
  })

  describe('Custom eventTarget', () => {
    test('keydown events from custom eventTarget trigger navigation')
    test('keydown events from custom eventTarget trigger item activation')
  })

  describe('Positioning', () => {
    test('positioner default placement is bottom-start')
    test('positioner respects custom placement prop')
  })

  describe('Mouse Interaction', () => {
    test('hovering item highlights it')
    test('hovering disabled item does not highlight it')
    test('mouse highlight does not change keyboard position')
  })

  // ---- Submenu tests ----

  describe('Submenu: Basic', () => {
    test('submenu trigger renders with role="menuitem"')
    test('submenu trigger has aria-haspopup="menu"')
    test('submenu trigger has aria-expanded="false" by default')
    test('submenu popup is hidden by default')
    test('submenu trigger participates in parent keyboard navigation')
    test('submenu trigger shows data-active when highlighted in parent')
  })

  describe('Submenu: Opening', () => {
    test('hovering submenu trigger opens submenu after delay')
    test('ArrowRight on highlighted submenu trigger opens submenu')
    test('Enter on highlighted submenu trigger opens submenu')
    test('Space on highlighted submenu trigger opens submenu')
    test('clicking submenu trigger opens submenu')
    test('opening submenu highlights first item in submenu')
    test('submenu trigger aria-expanded becomes "true" when submenu opens')
    test('disabled submenu trigger does not open on hover')
    test('disabled submenu trigger does not open on ArrowRight')
    test('disabled submenu trigger does not open on click')
  })

  describe('Submenu: Closing', () => {
    test('ArrowLeft inside submenu closes it')
    test('ArrowLeft inside submenu re-highlights submenu trigger in parent')
    test('Escape inside submenu closes submenu only (parent stays open)')
    test('Escape inside submenu re-focuses parent popup')
    test('clicking a regular item in submenu closes entire menu tree')
    test('closing parent menu cascades to close submenu')
    test('moving mouse to different parent item closes submenu after delay')
  })

  describe('Submenu: Navigation', () => {
    test('ArrowDown/Up inside submenu navigates within submenu only')
    test('Home/End inside submenu applies to submenu items only')
    test('typeahead inside submenu searches submenu items only')
    test('ArrowRight on non-submenu-trigger item does nothing')
    test('ArrowLeft in root menu does nothing')
  })

  describe('Submenu: Nested (3 levels)', () => {
    test('submenu can contain another submenu')
    test('ArrowRight opens L2 submenu, ArrowRight again opens L3')
    test('ArrowLeft from L3 closes L3, re-highlights L2 trigger')
    test('ArrowLeft from L2 closes L2, re-highlights L1 trigger')
    test('Escape from L3 closes L3 only')
    test('Escape from L2 closes L2 only')
    test('clicking item in L3 closes all 3 levels')
    test('closing root closes all levels')
  })

  describe('Submenu: Multiple at same level', () => {
    test('only one submenu open at a time at the same level')
    test('opening submenu B closes submenu A')
    test('ArrowDown from trigger A to trigger B: highlight B, close A')
  })

  describe('Submenu: Mouse safe zone', () => {
    test('moving mouse from submenu trigger to submenu popup keeps it open')
    test('moving mouse from submenu popup back to parent keeps parent open')
    test('moving mouse out of submenu popup (not to parent) closes it after delay')
  })

  describe('Submenu: Focus', () => {
    test('focus returns to top-level trigger when entire menu tree closes')
    test('Tab key closes entire menu tree')
  })
})
```

---

## 7. Story Design (`menu.stories.ts`)

### File Structure

```
website/stories/
  menu.stories.ts
  menu.astro
  menu/
    basic.html
    disabled-items.html
    submenu.html
    nested-submenu.html
```

### `menu.stories.ts`

```typescript
import MenuStory from './menu.astro'

export default {
  component: MenuStory,
}

export const Basic = {
  args: { story: 'basic' },
}

export const DisabledItems = {
  args: { story: 'disabled-items' },
}

export const Submenu = {
  args: { story: 'submenu' },
}

export const NestedSubmenu = {
  args: { story: 'nested-submenu' },
}
```

### `menu.astro`

```astro
---
import Basic from './menu/basic.html'
import DisabledItems from './menu/disabled-items.html'
import Submenu from './menu/submenu.html'
import NestedSubmenu from './menu/nested-submenu.html'

interface Props {
  story: 'basic' | 'disabled-items' | 'submenu' | 'nested-submenu'
}

const { story } = Astro.props
---

<script>
import { registerElements } from '@aria-ui-v2/elements'
registerElements()
</script>

<div class="p-4">
  {story === 'basic' && <Basic />}
  {story === 'disabled-items' && <DisabledItems />}
  {story === 'submenu' && <Submenu />}
  {story === 'nested-submenu' && <NestedSubmenu />}
</div>
```

### `menu/basic.html`

```html
<aria-ui-menu-root class="inline-block">
  <aria-ui-menu-trigger
    tabindex="0"
    class="inline-block px-5 py-2.5 bg-blue-500 text-white border-0 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 hover:bg-blue-600 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
  >
    Actions
  </aria-ui-menu-trigger>
  <aria-ui-menu-positioner class="overflow-visible">
    <aria-ui-menu-popup
      class="block bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] outline-none"
    >
      <aria-ui-menu-item
        value="cut"
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
      >
        Cut
      </aria-ui-menu-item>
      <aria-ui-menu-item
        value="copy"
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
      >
        Copy
      </aria-ui-menu-item>
      <aria-ui-menu-item
        value="paste"
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
      >
        Paste
      </aria-ui-menu-item>
      <div class="my-1 border-t border-gray-200"></div>
      <aria-ui-menu-item
        value="delete"
        class="block px-3 py-2 text-sm text-red-600 cursor-pointer hover:bg-red-50 [&[data-active]]:bg-red-50 [&[data-active]]:text-red-700"
      >
        Delete
      </aria-ui-menu-item>
    </aria-ui-menu-popup>
  </aria-ui-menu-positioner>
</aria-ui-menu-root>
```

### `menu/disabled-items.html`

```html
<aria-ui-menu-root class="inline-block">
  <aria-ui-menu-trigger
    tabindex="0"
    class="inline-block px-5 py-2.5 bg-blue-500 text-white border-0 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 hover:bg-blue-600"
  >
    Edit
  </aria-ui-menu-trigger>
  <aria-ui-menu-positioner class="overflow-visible">
    <aria-ui-menu-popup
      class="block bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] outline-none"
    >
      <aria-ui-menu-item
        value="undo"
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
      >
        Undo
      </aria-ui-menu-item>
      <aria-ui-menu-item
        value="redo"
        disabled
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
      >
        Redo (disabled)
      </aria-ui-menu-item>
      <aria-ui-menu-item
        value="cut"
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
      >
        Cut
      </aria-ui-menu-item>
      <aria-ui-menu-item
        value="copy"
        disabled
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
      >
        Copy (disabled)
      </aria-ui-menu-item>
    </aria-ui-menu-popup>
  </aria-ui-menu-positioner>
</aria-ui-menu-root>
```

### `menu/submenu.html`

```html
<aria-ui-menu-root class="inline-block">
  <aria-ui-menu-trigger
    tabindex="0"
    class="inline-block px-5 py-2.5 bg-blue-500 text-white border-0 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 hover:bg-blue-600"
  >
    File
  </aria-ui-menu-trigger>
  <aria-ui-menu-positioner class="overflow-visible">
    <aria-ui-menu-popup
      class="block bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] outline-none"
    >
      <aria-ui-menu-item
        value="new"
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
      >
        New File
      </aria-ui-menu-item>
      <aria-ui-menu-item
        value="open"
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
      >
        Open
      </aria-ui-menu-item>
      <div class="my-1 border-t border-gray-200"></div>

      <aria-ui-menu-submenu-root>
        <aria-ui-menu-submenu-trigger
          value="share"
          class="flex items-center justify-between px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
        >
          <span>Share</span>
          <span class="text-gray-400 text-xs ml-4">></span>
        </aria-ui-menu-submenu-trigger>
        <aria-ui-menu-positioner placement="right-start" class="overflow-visible">
          <aria-ui-menu-popup
            class="block bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] outline-none"
          >
            <aria-ui-menu-item
              value="email"
              class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
            >
              Email
            </aria-ui-menu-item>
            <aria-ui-menu-item
              value="slack"
              class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
            >
              Slack
            </aria-ui-menu-item>
            <aria-ui-menu-item
              value="link"
              class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
            >
              Copy Link
            </aria-ui-menu-item>
          </aria-ui-menu-popup>
        </aria-ui-menu-positioner>
      </aria-ui-menu-submenu-root>

      <aria-ui-menu-submenu-root>
        <aria-ui-menu-submenu-trigger
          value="export"
          class="flex items-center justify-between px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
        >
          <span>Export As</span>
          <span class="text-gray-400 text-xs ml-4">></span>
        </aria-ui-menu-submenu-trigger>
        <aria-ui-menu-positioner placement="right-start" class="overflow-visible">
          <aria-ui-menu-popup
            class="block bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] outline-none"
          >
            <aria-ui-menu-item
              value="pdf"
              class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
            >
              PDF
            </aria-ui-menu-item>
            <aria-ui-menu-item
              value="csv"
              class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
            >
              CSV
            </aria-ui-menu-item>
          </aria-ui-menu-popup>
        </aria-ui-menu-positioner>
      </aria-ui-menu-submenu-root>

      <div class="my-1 border-t border-gray-200"></div>
      <aria-ui-menu-item
        value="close"
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
      >
        Close
      </aria-ui-menu-item>
    </aria-ui-menu-popup>
  </aria-ui-menu-positioner>
</aria-ui-menu-root>
```

### `menu/nested-submenu.html`

Three levels deep: Actions > More > Even More

```html
<aria-ui-menu-root class="inline-block">
  <aria-ui-menu-trigger
    tabindex="0"
    class="inline-block px-5 py-2.5 bg-blue-500 text-white border-0 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 hover:bg-blue-600"
  >
    Actions
  </aria-ui-menu-trigger>
  <aria-ui-menu-positioner class="overflow-visible">
    <aria-ui-menu-popup
      class="block bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] outline-none"
    >
      <aria-ui-menu-item
        value="action-1"
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
      >
        Action 1
      </aria-ui-menu-item>

      <!-- L2 submenu -->
      <aria-ui-menu-submenu-root>
        <aria-ui-menu-submenu-trigger
          value="more"
          class="flex items-center justify-between px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
        >
          <span>More</span>
          <span class="text-gray-400 text-xs ml-4">></span>
        </aria-ui-menu-submenu-trigger>
        <aria-ui-menu-positioner placement="right-start" class="overflow-visible">
          <aria-ui-menu-popup
            class="block bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] outline-none"
          >
            <aria-ui-menu-item
              value="action-2"
              class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
            >
              Action 2
            </aria-ui-menu-item>

            <!-- L3 submenu -->
            <aria-ui-menu-submenu-root>
              <aria-ui-menu-submenu-trigger
                value="even-more"
                class="flex items-center justify-between px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
              >
                <span>Even More</span>
                <span class="text-gray-400 text-xs ml-4">></span>
              </aria-ui-menu-submenu-trigger>
              <aria-ui-menu-positioner placement="right-start" class="overflow-visible">
                <aria-ui-menu-popup
                  class="block bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] outline-none"
                >
                  <aria-ui-menu-item
                    value="action-3"
                    class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
                  >
                    Action 3
                  </aria-ui-menu-item>
                  <aria-ui-menu-item
                    value="action-4"
                    class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
                  >
                    Action 4
                  </aria-ui-menu-item>
                </aria-ui-menu-popup>
              </aria-ui-menu-positioner>
            </aria-ui-menu-submenu-root>

            <aria-ui-menu-item
              value="action-5"
              class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
            >
              Action 5
            </aria-ui-menu-item>
          </aria-ui-menu-popup>
        </aria-ui-menu-positioner>
      </aria-ui-menu-submenu-root>

      <aria-ui-menu-item
        value="action-6"
        class="block px-3 py-2 text-sm text-gray-700 cursor-pointer [&[data-active]]:bg-blue-50 [&[data-active]]:text-blue-700"
      >
        Action 6
      </aria-ui-menu-item>
    </aria-ui-menu-popup>
  </aria-ui-menu-positioner>
</aria-ui-menu-root>
```

---

## 8. Registration Updates

### `packages/elements/src/index.ts` additions:

```typescript
import { MenuItemElement, registerMenuItemElement } from './menu/menu-item.ts'
import { MenuPopupElement, registerMenuPopupElement } from './menu/menu-popup.ts'
import { MenuPositionerElement, registerMenuPositionerElement } from './menu/menu-positioner.ts'
import { MenuRootElement, registerMenuRootElement } from './menu/menu-root.ts'
import { MenuSubmenuRootElement, registerMenuSubmenuRootElement } from './menu/menu-submenu-root.ts'
import { MenuSubmenuTriggerElement, registerMenuSubmenuTriggerElement } from './menu/menu-submenu-trigger.ts'
import { MenuTriggerElement, registerMenuTriggerElement } from './menu/menu-trigger.ts'

// Add to exports
export {
  MenuItemElement,
  MenuPopupElement,
  MenuPositionerElement,
  MenuRootElement,
  MenuSubmenuRootElement,
  MenuSubmenuTriggerElement,
  MenuTriggerElement,
  registerMenuItemElement,
  registerMenuPopupElement,
  registerMenuPositionerElement,
  registerMenuRootElement,
  registerMenuSubmenuRootElement,
  registerMenuSubmenuTriggerElement,
  registerMenuTriggerElement,
}

// Add to registerElements()
registerMenuRootElement()
registerMenuTriggerElement()
registerMenuPopupElement()
registerMenuPositionerElement()
registerMenuItemElement()
registerMenuSubmenuRootElement()
registerMenuSubmenuTriggerElement()

// Add to HTMLElementTagNameMap
'aria-ui-menu-root': MenuRootElement
'aria-ui-menu-trigger': MenuTriggerElement
'aria-ui-menu-popup': MenuPopupElement
'aria-ui-menu-positioner': MenuPositionerElement
'aria-ui-menu-item': MenuItemElement
'aria-ui-menu-submenu-root': MenuSubmenuRootElement
'aria-ui-menu-submenu-trigger': MenuSubmenuTriggerElement
```

---

## 9. Implementation Order

1. **`menu-store.ts`** — MenuStore, MenuStoreContext, closeMenuTree
2. **`menu-root.ts`** — Root element (inline overlay root logic, create MenuStore)
3. **`menu-trigger.ts`** — Trigger element (usePress, ARIA attributes)
4. **`menu-positioner.ts`** — Positioner (thin overlay wrapper, default bottom-start)
5. **`menu-item.ts`** — Item element (collection, activation, MenuItemSelectEvent)
6. **`menu-popup.ts`** — Popup element (keyboard nav, typeahead, submenu arrows)
7. **`menu-submenu-root.ts`** — Submenu context provider (consume parent, provide child, cascade)
8. **`menu-submenu-trigger.ts`** — Submenu trigger (dual identity, hover delays, open-submenu event)
9. **Update `index.ts`** — Register all 7 elements
10. **`menu.test.ts`** — Tests (flat menu first, then submenu)
11. **Story files** — 4 stories (basic, disabled-items, submenu, nested-submenu)

---

## 10. Submenu Edge Cases & Boundary Conditions

### Context & Store

1. **MenuSubmenuRoot consumes before provides** — The context system's `handleRequest`
   checks `element === consumer` to skip self-consumption. Both consume and provide are
   registered as controllers; their `hostConnected` fires in registration order. Since
   `consume` is called before `provide` in setup, the consumer controller fires first,
   dispatching a context-request that bubbles past itself to the ancestor provider.

2. **Late connection** — If a submenu is dynamically added to the DOM after the parent
   menu is already open, the context's `attachRoot` mechanism handles late providers via
   `ContextProviderEvent` re-dispatch. The submenu's consume will still resolve.

3. **parentStore signal timing** — `childStore.parentStore` is set in an effect that
   depends on `getParentStore()`. This signal starts as `undefined` and resolves when the
   element connects. All code in `MenuSubmenuTrigger` that accesses `getParentStore()`
   handles the `null` case gracefully.

### Keyboard

4. **ArrowRight on regular item** — No-op. The keydown handler checks if the active
   element's tag is `aria-ui-menu-submenu-trigger`; if not, ArrowRight is ignored.

5. **ArrowLeft in root menu** — No-op. The handler checks `store.parentStore`; if null
   (root), ArrowLeft is ignored.

6. **Escape in submenu vs root** — Same handler, different effect. In submenu:
   `store.emitOpenChange(false)` closes only this level; the cascade-close effect does
   NOT fire because the parent is still open. In root: closes the root, focus returns to
   trigger.

7. **ArrowRight into empty submenu** — The submenu opens but `collection.first()` returns
   `null`. `activeValue` is set to `null`, no item is highlighted. ArrowDown/Up from `null`
   start from first/last respectively.

8. **Typeahead scope isolation** — Each popup level has its own keydown handler with its
   own store's collection. Typeahead in a submenu only searches that submenu's items.

### Mouse

9. **Mouse leaving submenu trigger diagonally toward submenu popup** — The `mouseleave`
   handler checks `event.relatedTarget`: if it's inside `MenuSubmenuRoot` (which contains
   both the trigger and the positioner/popup), the close timer is NOT started. This provides
   a basic safe-zone without the complexity of a "safe triangle" algorithm.

10. **Rapid mouse movement between submenu triggers** — When mouse moves from trigger A to
    trigger B (both submenu triggers at the same level), A's close effect fires (parent
    `activeValue` changed) and B's open timer starts. The delays (200ms open, 150ms close)
    provide a smooth experience without flicker.

11. **Mouse enters submenu popup directly** — If the user somehow moves mouse directly into
    the submenu popup (bypassing the trigger), the popup's own mouse events don't affect
    the parent's `activeValue`, so the submenu stays open.

### Multiple Submenus

12. **Only one submenu open at a time** — Enforced by the effect in `MenuSubmenuTrigger`
    that watches `parentStore.activeValue`. When parent highlights a different item, the
    currently open submenu closes after `CLOSE_DELAY`. There's no explicit "close sibling
    submenus" logic; the activeValue-based closing handles it naturally.

13. **Two submenus at different levels** — Each level is independent. Having L2 submenu A
    open and then opening L2 submenu B (different parent) is not possible because only one
    item can be active in any given parent level.

### Focus

14. **Focus return on submenu close** — `MenuSubmenuRoot`'s effect detects close and calls
    `parentPopup.focus()`. The parent popup's `activeValue` still points to the submenu
    trigger, so keyboard navigation continues seamlessly.

15. **Focus return on root close** — When the root menu closes, focus should return to the
    trigger element. The trigger is stored in `store.anchorElement`. The root's close
    handler (or an effect on root's open state) calls `store.anchorElement.get()?.focus()`.

16. **Tab key** — When Tab is pressed, focus moves to the next focusable element outside
    the menu tree. The `focusout` handler on the popup detects that `relatedTarget` is
    outside the menu root and calls `closeMenuTree()`.

### Dynamic Content

17. **Items added/removed while menu is open** — The collection is rebuilt whenever items
    mount/unmount (`onMount` cleanup) and whenever props change (effect). Keyboard
    navigation uses the latest collection.

18. **Submenu added/removed dynamically** — Same as above. The submenu trigger's `onMount`
    registers it in the parent's collection, and cleanup removes it.

---

## 11. Compatibility with table-handle Migration

The v1 → v2 migration for table-handle should be straightforward:

| v1 API | v2 API |
|--------|--------|
| `useMenuRoot(host, { state, emit })` | `setupMenuRoot(host, props)` via `MenuRootElement` |
| `useMenuTrigger(host)` | `setupMenuTrigger(host, props)` via `MenuTriggerElement` |
| `useMenuContent(host, { state, emit })` | `setupMenuPopup(host, props)` via `MenuPopupElement` |
| `useMenuItem(host, { state, emit })` | `setupMenuItem(host, props)` via `MenuItemElement` |
| `menuContentProps.eventTarget` | `MenuPopupProps.eventTarget` (same concept) |
| `MenuItemEvents.select` | `MenuItemSelectEvent` (same pattern as `ValueChangeEvent` in listbox) |

The table-handle's custom `TypedEventTarget<'keydown'>` pattern (delegating document
keydowns) will work with the new `eventTarget` prop on `MenuPopup`.

---

## 12. Detailed TODO List

### Phase 1: Store & Core Infrastructure ✅

- [x] **1.1** Create `aria-ui/packages/elements/src/menu/` directory
- [x] **1.2** Implement `menu-store.ts`
  - [x] `MenuStore` class extending `OverlayStore`
    - `activeValue: Signal<string | null>`
    - `collection: Signal<Collection>`
    - `parentStore: MenuStore | null`
  - [x] `MenuStoreContext` via `createContext<MenuStore>`
  - [x] `closeMenuTree()` helper (walk `parentStore` chain to root, close root)

### Phase 2: Flat Menu Elements (no submenus yet) ✅

- [x] **2.1** Implement `menu-root.ts`
  - [x] `MenuRootProps` extending `OverlayRootProps`
  - [x] `MenuRootPropsDeclaration` (spread `OverlayRootPropsDeclaration`)
  - [x] `MenuRootEvents` with `openChange: OpenChangeEvent`
  - [x] `setupMenuRoot` — inline `setupOverlayRoot` logic but create `MenuStore` instead of `OverlayStore`
    - [x] `computed` for `getOpen` (from `open` ?? `defaultOpen`)
    - [x] `computed` for `getDisabled`
    - [x] `emitOpenChange` with `OpenChangeEvent` + `preventDefault` guard
    - [x] Create `MenuStore`, provide via `MenuStoreContext`
    - [x] `useAriaDisabled`
  - [x] `MenuRootElement` class via `defineCustomElement`
  - [x] `registerMenuRootElement` (tag: `aria-ui-menu-root`)

- [x] **2.2** Implement `menu-trigger.ts`
  - [x] `MenuTriggerProps` with `disabled: boolean`
  - [x] `MenuTriggerPropsDeclaration`
  - [x] `MenuTriggerEvents` with `openChange: OpenChangeEvent`
  - [x] `setupMenuTrigger`
    - [x] Consume `MenuStoreContext`
    - [x] `usePress` to toggle open/close
    - [x] Set `anchorElement` on store
    - [x] `useAriaExpanded`, `useAriaDisabled`, `useAriaControls`
    - [x] Set `aria-haspopup="menu"` on mount
  - [x] `MenuTriggerElement` class
  - [x] `registerMenuTriggerElement` (tag: `aria-ui-menu-trigger`)

- [x] **2.3** Implement `menu-positioner.ts`
  - [x] `MenuPositionerProps` extending `OverlayPositionerProps` with `placement` default override
  - [x] `MenuPositionerPropsDeclaration` — spread `OverlayPositionerPropsDeclaration`, override `placement` to `'bottom-start'`
  - [x] `setupMenuPositioner` — delegate to `setupOverlayPositioner(host, props, MenuStoreContext)`
  - [x] `MenuPositionerElement` class
  - [x] `registerMenuPositionerElement` (tag: `aria-ui-menu-positioner`)

- [x] **2.4** Implement `menu-item.ts`
  - [x] `MenuItemSelectEvent` class (extends `Event`, type `'select'`, bubbles, cancelable)
  - [x] `MenuItemProps` with `value: string`, `disabled: boolean`
  - [x] `MenuItemPropsDeclaration`
  - [x] `MenuItemEvents` with `select: MenuItemSelectEvent`
  - [x] `setupMenuItem`
    - [x] Set `role="menuitem"` on mount
    - [x] `useElementId` for `aria-activedescendant` support
    - [x] Consume `MenuStoreContext`
    - [x] Sync `data-value` attribute
    - [x] `useAriaDisabled`
    - [x] Track `data-active` from `store.activeValue`
    - [x] `rebuildCollection` — query `aria-ui-menu-item, aria-ui-menu-submenu-trigger` scoped to nearest `aria-ui-menu-popup` (filter by `el.closest('aria-ui-menu-popup') === popup`)
    - [x] Call `rebuildCollection` on mount/unmount and when `value`/`disabled` change
    - [x] `mouseenter` → set `activeValue`
    - [x] `click` → dispatch `MenuItemSelectEvent`, call `closeMenuTree` if not prevented
  - [x] `MenuItemElement` class
  - [x] `registerMenuItemElement` (tag: `aria-ui-menu-item`)

- [x] **2.5** Implement `menu-popup.ts`
  - [x] `MenuPopupProps` with `eventTarget: HTMLElement | TypedEventTarget<'keydown'> | null` (default `null`)
  - [x] `MenuPopupPropsDeclaration`
  - [x] `setupMenuPopup`
    - [x] Consume `MenuStoreContext`
    - [x] Register popup ID in store via `useElementId`
    - [x] Set `role="menu"` and `tabIndex=0` on mount
    - [x] Sync `data-state` (open/closed)
    - [x] `aria-activedescendant` — reactive, points to active item's `id`
    - [x] Focus management effect: on open → `requestAnimationFrame` → `host.focus()` + `activeValue.set(collection.first())`; on close → reset `activeValue` to `null`
    - [x] Keydown handler:
      - [x] `ArrowDown` → `collection.next`
      - [x] `ArrowUp` → `collection.prev`
      - [x] `Home` → `collection.first`
      - [x] `End` → `collection.last`
      - [x] `Enter`/`Space` on regular item → `activateItem` (dispatch `MenuItemSelectEvent`, `closeMenuTree`)
      - [x] `Enter`/`Space` on submenu trigger → dispatch `aria-ui:open-submenu` on the element
      - [x] `ArrowRight` on submenu trigger → dispatch `aria-ui:open-submenu` on the element
      - [x] `ArrowLeft` (if `store.parentStore` exists) → `store.emitOpenChange(false)` (close submenu)
      - [x] `Escape` → `store.emitOpenChange(false)`
      - [x] Printable character → typeahead
    - [x] Bind keydown handler to `eventTarget` prop or `host` (reactive effect with cleanup)
    - [x] Typeahead logic: module-scoped buffer + 500ms debounce timer, match `collection.getValues()` by prefix
    - [x] `activateItem` helper: find element, dispatch `MenuItemSelectEvent`, `closeMenuTree` if not prevented
    - [x] `focusout` handler → if `relatedTarget` is outside `aria-ui-menu-root`, call `closeMenuTree`
    - [x] `event.stopPropagation()` on all handled keys to prevent parent menus from double-handling
    - [x] Reset typeahead buffer when menu opens
  - [x] `MenuPopupElement` class
  - [x] `registerMenuPopupElement` (tag: `aria-ui-menu-popup`)

### Phase 3: Submenu Elements ✅

- [x] **3.1** Implement `menu-submenu-root.ts`
  - [x] `MenuSubmenuRootProps` (empty)
  - [x] `MenuSubmenuRootPropsDeclaration`
  - [x] `MenuSubmenuRootEvents` with `openChange: OpenChangeEvent`
  - [x] `setupMenuSubmenuRoot`
    - [x] Consume `MenuStoreContext` (gets parent store via same-element skip)
    - [x] Create internal `open` signal
    - [x] Create `emitOpenChange` (dispatch `OpenChangeEvent`, set `open` if not prevented)
    - [x] Create child `MenuStore` with `getOpen` / `emitOpenChange`
    - [x] Provide child store via `MenuStoreContext` (shadows parent)
    - [x] Effect: link `childStore.parentStore = getParentStore()` (reactive)
    - [x] Cascade close effect: when `parentStore.getOpen()` is false → set `open` to false
    - [x] Re-focus effect: when `open` becomes false → find nearest `aria-ui-menu-popup` ancestor → `requestAnimationFrame(() => parentPopup.focus())`
  - [x] `MenuSubmenuRootElement` class
  - [x] `registerMenuSubmenuRootElement` (tag: `aria-ui-menu-submenu-root`)

- [x] **3.2** Implement `menu-submenu-trigger.ts`
  - [x] `MenuSubmenuTriggerProps` with `value: string`, `disabled: boolean`
  - [x] `MenuSubmenuTriggerPropsDeclaration`
  - [x] `setupMenuSubmenuTrigger`
    - [x] Set `role="menuitem"` and `aria-haspopup="menu"` on mount
    - [x] `useElementId` for `aria-activedescendant` support
    - [x] Consume `MenuStoreContext` → child store
    - [x] Derive `getParentStore` from `getStore()?.parentStore`
    - [x] Set `anchorElement` on child store
    - [x] Sync `aria-expanded` from child store's open state
    - [x] `useAriaDisabled`
    - [x] Sync `data-value` attribute
    - [x] Track `data-active` from **parent** store's `activeValue`
    - [x] `rebuildCollection` — same logic as `MenuItem` but registers in **parent** store's collection
    - [x] Call `rebuildCollection` on mount/unmount and when `value`/`disabled` change
    - [x] Hover interaction:
      - [x] `mouseenter` → set parent `activeValue`, start open timer (200ms)
      - [x] `mouseleave` → start close timer (150ms), cancel if `relatedTarget` is inside `MenuSubmenuRoot`
      - [x] Clear timers on unmount
    - [x] Effect: close submenu when parent `activeValue` moves away (with `CLOSE_DELAY`)
    - [x] Listen for `aria-ui:open-submenu` event → `store.emitOpenChange(true)`
    - [x] `click` → toggle child store open/close
  - [x] `MenuSubmenuTriggerElement` class
  - [x] `registerMenuSubmenuTriggerElement` (tag: `aria-ui-menu-submenu-trigger`)

### Phase 4: Registration & Exports ✅

- [x] **4.1** Update `packages/elements/src/index.ts`
  - [x] Import all 7 element classes and their register functions
  - [x] Add all 7 to the `export {}` block
  - [x] Add all 7 `register*Element()` calls inside `registerElements()`
  - [x] Add all 7 tag names to `HTMLElementTagNameMap`

### Phase 5: Tests ✅

- [x] **5.1** Create `menu.test.ts` — flat menu tests (31 tests passing)
  - [x] Basic functionality (renders, hidden by default, defaultOpen)
  - [x] Trigger interactions (click open/close, ARIA attributes, disabled)
  - [x] Keyboard navigation (ArrowDown/Up, Home/End, loop wrapping, skip disabled)
  - [x] Item activation (Enter/Space/click, close on activate, select event, preventDefault, disabled)
  - [x] Close behaviors (Escape)
  - [x] Typeahead (single char, multi char)
  - [x] Accessibility (role, aria-disabled, data-active)
  - [x] Events (openChange emitted on open/close)
  - [x] Custom eventTarget (navigation)

- [x] **5.2** Add submenu tests to `menu.test.ts` (12 tests passing)
  - [x] Submenu basic (role, aria-haspopup, aria-expanded, hidden by default, parent navigation)
  - [x] Submenu opening (ArrowRight, Enter, first item highlighted, aria-expanded update)
  - [x] Submenu closing (ArrowLeft, Escape scoped, item click closes tree, parent close cascades)
  - [x] Submenu navigation (scoped ArrowDown/Up, ArrowRight on non-trigger, ArrowLeft in root)

### Phase 6: Stories ✅

- [x] **6.1** Create `website/stories/menu/basic.html` — flat menu with Cut/Copy/Paste/Delete
- [x] **6.2** Create `website/stories/menu/disabled-items.html` — menu with some disabled items
- [x] **6.3** Create `website/stories/menu/submenu.html` — menu with two submenus (Share, Export As)
- [x] **6.4** Create `website/stories/menu/nested-submenu.html` — three-level deep menu
- [x] **6.5** Create `website/stories/menu.astro` — Astro wrapper with story routing
- [x] **6.6** Create `website/stories/menu.stories.ts` — Storybook metadata (Basic, DisabledItems, Submenu, NestedSubmenu)

### Phase 7: Build & Verify ✅

- [x] **7.1** Run `pnpm -w run build:package` — builds successfully, framework wrappers generated
- [x] **7.2** Run `pnpm -w fix` — formatted 12 files, no issues
- [x] **7.3** Run `pnpm -w typecheck` — no type errors
- [x] **7.4** Run `pnpm -w lint` — only pre-existing Svelte `.gen.svelte` declaration errors (not related to menu)
- [x] **7.5** Run `pnpm --filter @aria-ui-v2/elements test` — all 143 tests pass (4 test files)

### Phase 8: Review & Polish ✅

- [x] **8.1** Verify all exports follow `@public` / `@internal` rules from AGENTS.md
- [x] **8.2** Verify all props have `@default` JSDoc tags matching declaration defaults
- [x] **8.3** Verify no optional `?` modifiers on prop interfaces
- [x] **8.4** Verify no unnecessary JSDoc/comments added
- [x] **8.5** Verify `null` used instead of `undefined` for prop defaults
