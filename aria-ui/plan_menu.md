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

### What We Do NOT Need (for now)

These Base UI features are not needed by any current consumer and add significant complexity.
They can be added later without breaking changes:

- **Submenus** (`SubmenuRoot`, `SubmenuTrigger`) - table-handle uses flat menus
- **CheckboxItem / RadioItem / RadioGroup** - table-handle items are plain actions
- **LinkItem** - not needed
- **Separator** - can be done with plain HTML/CSS between items
- **GroupLabel** - not needed
- **Arrow** - not needed (can be added to positioner later)
- **Portal** - web components don't use React portals; `hoist` on positioner serves the same purpose
- **Modal mode** - table-handle menus are non-modal
- **Hover-to-open trigger** - table-handle uses click only
- **Viewport** (for content transitions) - not needed
- **`payload` / render function children** - React-only pattern

### Design Decisions

**Decision 1: Build on top of Popover + Listbox patterns, not composition**

The menu is conceptually a "popover that contains a listbox-like list of actionable items."
Rather than literally composing `PopoverRoot` + `ListboxRoot` at runtime (which would create
deep nesting and confusing context interactions), we reuse the **shared primitives**:

- `setupOverlayRoot()` — for open/close state management (same as popover)
- `setupOverlayPositioner()` — for Floating UI positioning (same as popover)
- `setupOverlayPopup()` — for popup role and data-state (same as popover)
- `Collection` — for ordered item traversal with keyboard nav (same as listbox)

This matches exactly how Popover and Tooltip are built: they compose `overlay-*` setup functions.

**Decision 2: Menu has its own store, not OverlayStore**

The menu needs more state than `OverlayStore` provides (active item tracking, collection, event
delegation). We create a `MenuStore` that **extends** `OverlayStore` with menu-specific state:

```typescript
class MenuStore extends OverlayStore {
  readonly activeValue: Signal<string | null>
  readonly collection: Signal<Collection>
}
```

This way, `setupOverlayPositioner()` and `setupOverlayPopup()` still work (they consume
`Context<OverlayStore>`, and `MenuStore extends OverlayStore` satisfies the type).

**Decision 3: Four component parts**

```
MenuRoot          — manages open/close state, provides MenuStore context
MenuTrigger       — button that toggles the menu
MenuPositioner    — Floating UI positioning layer
MenuContent       — the popup container with role="menu", keyboard navigation
MenuItem          — individual menu item with role="menuitem"
```

Why separate `MenuContent` from `MenuPositioner`? This matches the existing Popover pattern
(PopoverPopup vs PopoverPositioner). The positioner handles CSS positioning; the content
handles ARIA roles, keyboard navigation, and focus management. This separation is important
because:

- The positioner needs `popover="manual"` for the Popover API
- The content needs `role="menu"` and handles keyboard events
- They have completely different props

**Decision 4: `MenuContent` owns keyboard navigation (not `MenuRoot`)**

In Listbox, the root owns keyboard navigation because the listbox itself is focusable.
In Menu, the content (popup) is what receives focus when the menu opens, so keyboard
navigation lives in `MenuContent`. This also makes the `eventTarget` override natural:
it's a prop on `MenuContent`, matching the v1 API that table-handle already uses.

**Decision 5: Close behaviors**

- **Escape**: closes the menu, returns focus to trigger
- **Click on item**: activates item, closes menu (configurable via `closeOnSelect` on MenuItem)
- **Click outside**: closes menu (handled by overlay positioner / popover API)
- **Tab**: closes menu (focus leaves)

**Decision 6: Typeahead**

Typeahead allows users to type characters to jump to matching items. This is a standard
menu pattern (WAI-ARIA Menu Pattern). Implementation:

- Track typed characters with a debounce timer (e.g., 500ms)
- On each character, find the first item whose text content starts with the accumulated string
- Clear the buffer after the timeout

This is implemented inside `setupMenuContent` as part of the keydown handler.

---

## 2. Component Architecture

### File Structure

```
aria-ui/packages/elements/src/menu/
  menu-store.ts          — MenuStore class + MenuStoreContext
  menu-root.ts           — MenuRootElement (open/close, context provider)
  menu-trigger.ts        — MenuTriggerElement (click to toggle)
  menu-positioner.ts     — MenuPositionerElement (Floating UI wrapper)
  menu-content.ts        — MenuContentElement (role=menu, keyboard nav, typeahead)
  menu-item.ts           — MenuItemElement (role=menuitem, activation)
  menu.test.ts           — Tests
```

### Component Tree (HTML)

```html
<aria-ui-menu-root>
  <aria-ui-menu-trigger tabindex="0">
    Open Menu
  </aria-ui-menu-trigger>
  <aria-ui-menu-positioner>
    <aria-ui-menu-content>
      <aria-ui-menu-item value="cut">Cut</aria-ui-menu-item>
      <aria-ui-menu-item value="copy">Copy</aria-ui-menu-item>
      <aria-ui-menu-item value="paste">Paste</aria-ui-menu-item>
    </aria-ui-menu-content>
  </aria-ui-menu-positioner>
</aria-ui-menu-root>
```

### Context Flow

```
MenuRoot
  ├─ provides: MenuStoreContext (MenuStore instance)
  │
  ├─ MenuTrigger
  │    └─ consumes: MenuStoreContext
  │         → sets anchorElement, toggles open
  │
  ├─ MenuPositioner
  │    └─ consumes: MenuStoreContext (as OverlayStore via inheritance)
  │         → positions itself relative to anchor
  │
  └─ MenuContent
       ├─ consumes: MenuStoreContext
       │    → registers popup ID, handles keyboard nav
       │
       └─ MenuItem (multiple)
            └─ consumes: MenuStoreContext
                 → registers in collection, handles activation
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

  constructor(
    getOpen: () => boolean,
    emitOpenChange: (open: boolean) => void,
  ) {
    super(getOpen, emitOpenChange)
    this.activeValue = createSignal<string | null>(null)
    this.collection = createSignal(new Collection([]))
  }
}

/**
 * @internal
 */
export const MenuStoreContext: Context<MenuStore> =
  createContext<MenuStore>('MenuStoreContext')
```

**Why extend OverlayStore?**

`setupOverlayPositioner()` and `setupOverlayPopup()` accept `Context<OverlayStore>`.
Since `MenuStore extends OverlayStore`, we can pass `MenuStoreContext` to these functions
and TypeScript is happy. This avoids duplicating overlay logic.

### 3.2 `menu-root.ts`

```typescript
import type { HostElement } from '@aria-ui-v2/core'
import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  type Store,
} from '@aria-ui-v2/core'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'
import {
  OverlayRootPropsDeclaration,
  setupOverlayRoot,
  type OverlayRootProps,
} from '../overlay/overlay-root.ts'

import { MenuStoreContext } from './menu-store.ts'

export { OpenChangeEvent }

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
  setupOverlayRoot(host, props, MenuStoreContext)
}

/**
 * @public
 */
export class MenuRootElement extends defineCustomElement(
  setupMenuRoot,
  MenuRootPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerMenuRootElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-menu-root', MenuRootElement)
}
```

**Why this is so simple:**

The root only needs to manage open/close state and provide context.
`setupOverlayRoot()` already handles:
- Computing effective open state from `open` / `defaultOpen` props
- Creating and providing the store (using our `MenuStoreContext`)
- Emitting `OpenChangeEvent`
- Setting `aria-disabled`

Wait — `setupOverlayRoot` creates an `OverlayStore`, not a `MenuStore`. We need to
override this behavior. Let me revise:

**Revised approach**: Don't use `setupOverlayRoot()`. Instead, inline the logic and
create a `MenuStore`:

```typescript
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
  useAriaDisabled(host, getDisabled)
  MenuStoreContext.provide(host, store)
}
```

This is essentially the same as `setupOverlayRoot()` but creates `MenuStore` instead of
`OverlayStore`. The duplication is minimal (10 lines) and avoids type gymnastics.

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

**Key differences from PopoverTrigger:**
- No `openOnHover` / `delay` / `closeDelay` — menus open on click only
- Sets `aria-haspopup="menu"` (popover doesn't set this)
- Otherwise identical pattern

### 3.4 `menu-positioner.ts`

```typescript
/**
 * @public
 */
export interface MenuPositionerProps extends OverlayPositionerProps {}

/**
 * @internal
 */
export const MenuPositionerPropsDeclaration = OverlayPositionerPropsDeclaration

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

This is almost identical to `PopoverPositionerElement`. The only difference is the
context: `MenuStoreContext` instead of `PopoverStoreContext`. Since `MenuStore extends
OverlayStore`, this works without any adapter.

Default placement should be `'bottom-start'` for menus (not `'top'` like generic popovers).
But we handle this via the default HTML attribute in stories, not by changing the
positioner's default. This keeps the positioner generic.

### 3.5 `menu-content.ts`

This is the most complex component. It handles:
1. ARIA role setup (`role="menu"`)
2. Keyboard navigation (arrows, Home, End)
3. Item activation (Enter, Space)
4. Typeahead
5. Escape to close
6. Focus management (focus first item on open, return focus to trigger on close)
7. Close on outside click

```typescript
/**
 * @public
 */
export interface MenuContentProps {
  /**
   * By default, the MenuContent element will listen for keydown events.
   * You can pass a different element to listen for keydown events.
   *
   * @default undefined
   */
  eventTarget: HTMLElement | TypedEventTarget<'keydown'> | undefined
}

/**
 * @internal
 */
export const MenuContentPropsDeclaration = defineProps<MenuContentProps>({
  eventTarget: { default: undefined, attribute: false, type: 'json' },
})

/**
 * @internal
 */
export function setupMenuContent(
  host: HostElement,
  props: Store<MenuContentProps>,
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

  // Focus management: focus first item when menu opens
  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const open = store.getOpen()

    if (open) {
      // Slight delay to ensure DOM is ready after positioning
      requestAnimationFrame(() => {
        host.focus()
        const collection = store.collection.get()
        store.activeValue.set(collection.first())
      })
    } else {
      // Reset active value when closing
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
          activateItem(store, currentValue, host)
        }
        return
      case 'Escape':
        event.preventDefault()
        store.emitOpenChange(false)
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

  // Close on outside click (when not using Popover API)
  useEventListener(host, 'focusout', (event: FocusEvent) => {
    const store = getStore()
    if (!store) return
    if (!store.getOpen()) return

    // Check if focus moved outside the menu root
    const relatedTarget = event.relatedTarget as Node | null
    const menuRoot = host.closest('aria-ui-menu-root')
    if (menuRoot && relatedTarget && menuRoot.contains(relatedTarget)) return

    store.emitOpenChange(false)
  })
}

// Typeahead state (module-scoped for simplicity; works because only one menu
// can be active at a time)
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

function activateItem(store: MenuStore, value: string, host: HostElement) {
  const element = store.collection.get().getElement(value)
  if (!element) return

  // Dispatch select event on the item element
  const selectEvent = new MenuItemSelectEvent()
  element.dispatchEvent(selectEvent)

  // Close the menu after selection (unless prevented)
  if (!selectEvent.defaultPrevented) {
    store.emitOpenChange(false)
  }
}
```

**Key design choices:**

1. **`eventTarget` prop** — This is critical for table-handle, which creates a custom
   `TypedEventTarget<'keydown'>` that forwards document-level keydowns into the menu.
   Without this, the menu would only respond to keydowns when the menu content element
   itself has focus.

2. **Typeahead** — Uses a simple module-scoped buffer. This is safe because only one
   menu is interactive at a time (menus are exclusive).

3. **Focus management** — The menu content itself is focusable (`tabIndex = 0`).
   When the menu opens, we focus it and highlight the first item. `aria-activedescendant`
   (set on the content element) tells screen readers which item is active without
   actually moving DOM focus to individual items.

4. **`activateItem`** — Dispatches a `MenuItemSelectEvent` on the item element.
   The item's setup function listens for this event to fire its `select` event handler.
   After activation, the menu closes unless `preventDefault()` was called.

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

  const getStore = MenuStoreContext.consume(host)

  // Set data-value attribute for debugging/styling
  useEffect(host, () => {
    host.dataset.value = props.value.get()
  })

  // ARIA disabled
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
  const rebuildCollection = () => {
    const store = getStore()
    if (!store) return
    const root = host.closest('aria-ui-menu-content')
    if (!root) return
    const itemElements = root.querySelectorAll<HTMLElement>(
      'aria-ui-menu-item:not([hidden])',
    )
    store.collection.set(new Collection(itemElements))
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
      store.emitOpenChange(false)
    }
  })
}
```

**Key differences from ListboxItem:**

1. **`role="menuitem"`** instead of `role="option"`
2. **No `aria-selected`** — menu items don't have selection state
3. **Click activates and closes** — unlike listbox where click selects
4. **Collection queries `aria-ui-menu-item`** inside `aria-ui-menu-content`
5. **`MenuItemSelectEvent`** instead of selection change events

---

## 4. ARIA Attributes Summary

| Element | Role | ARIA Attributes |
|---------|------|----------------|
| MenuRoot | (none) | `aria-disabled` |
| MenuTrigger | (none) | `aria-expanded`, `aria-haspopup="menu"`, `aria-controls`, `aria-disabled` |
| MenuPositioner | (none) | (none — purely positional) |
| MenuContent | `menu` | `aria-activedescendant`, `data-state` |
| MenuItem | `menuitem` | `aria-disabled`, `data-active`, `data-value` |

---

## 5. Keyboard Interaction Spec

| Key | Behavior | Handled In |
|-----|----------|-----------|
| Enter/Space on trigger | Toggle menu open/close | MenuTrigger (`usePress`) |
| ArrowDown on trigger | Open menu (optional, nice to have) | MenuTrigger |
| ArrowDown | Move to next item | MenuContent keydown handler |
| ArrowUp | Move to previous item | MenuContent keydown handler |
| Home | Move to first item | MenuContent keydown handler |
| End | Move to last item | MenuContent keydown handler |
| Enter/Space | Activate current item | MenuContent keydown handler |
| Escape | Close menu | MenuContent keydown handler |
| Printable char | Typeahead navigation | MenuContent keydown handler |
| Tab | Close menu (via focusout) | MenuContent focusout handler |

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

  describe('Basic Functionality', () => {
    test('renders menu elements')
    test('menu content is hidden by default')
    test('menu content shows with defaultOpen=true')
  })

  describe('Trigger Interactions', () => {
    test('clicking trigger opens menu')
    test('clicking trigger again closes menu')
    test('trigger has aria-haspopup="menu"')
    test('trigger has correct aria-expanded attribute')
    test('disabled trigger does not open menu')
  })

  describe('Keyboard Navigation', () => {
    test('opening menu highlights first item')
    test('ArrowDown moves to next item')
    test('ArrowUp moves to previous item')
    test('Home moves to first item')
    test('End moves to last item')
    test('navigation wraps around (loop)')
    test('skips disabled items')
  })

  describe('Item Activation', () => {
    test('Enter activates highlighted item')
    test('Space activates highlighted item')
    test('clicking item activates it')
    test('activating item closes menu')
    test('activating item dispatches select event')
    test('disabled item cannot be activated')
  })

  describe('Close Behaviors', () => {
    test('Escape closes menu')
    // test('clicking outside closes menu')  // May be hard to test reliably
    test('Tab closes menu')
  })

  describe('Typeahead', () => {
    test('typing a character highlights matching item')
    test('typing multiple characters narrows match')
    // test('typeahead resets after timeout')  // Timing test, may be flaky
  })

  describe('Accessibility', () => {
    test('menu content has role="menu"')
    test('menu items have role="menuitem"')
    test('disabled items have aria-disabled')
    test('active item has data-active attribute')
  })

  describe('Events', () => {
    test('emits openChange event when opened')
    test('emits openChange event when closed')
    test('select event can be prevented to keep menu open')
  })

  describe('Custom eventTarget', () => {
    test('keydown events from custom eventTarget are handled')
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
```

### `menu.astro`

```astro
---
import Basic from './menu/basic.html'
import DisabledItems from './menu/disabled-items.html'

interface Props {
  story: 'basic' | 'disabled-items'
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
  <aria-ui-menu-positioner placement="bottom-start" class="overflow-visible">
    <aria-ui-menu-content
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
    </aria-ui-menu-content>
  </aria-ui-menu-positioner>
</aria-ui-menu-root>
```

Note: The separator is just a plain `<div>` with border styling — no need for a
dedicated Separator component.

### `menu/disabled-items.html`

```html
<aria-ui-menu-root class="inline-block">
  <aria-ui-menu-trigger
    tabindex="0"
    class="inline-block px-5 py-2.5 bg-blue-500 text-white border-0 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 hover:bg-blue-600"
  >
    Edit
  </aria-ui-menu-trigger>
  <aria-ui-menu-positioner placement="bottom-start" class="overflow-visible">
    <aria-ui-menu-content
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
    </aria-ui-menu-content>
  </aria-ui-menu-positioner>
</aria-ui-menu-root>
```

---

## 8. Registration Updates

### `packages/elements/src/index.ts` additions:

```typescript
import { MenuContentElement, registerMenuContentElement } from './menu/menu-content.ts'
import { MenuItemElement, registerMenuItemElement } from './menu/menu-item.ts'
import { MenuPositionerElement, registerMenuPositionerElement } from './menu/menu-positioner.ts'
import { MenuRootElement, registerMenuRootElement } from './menu/menu-root.ts'
import { MenuTriggerElement, registerMenuTriggerElement } from './menu/menu-trigger.ts'

// Add to exports
export {
  MenuContentElement,
  MenuItemElement,
  MenuPositionerElement,
  MenuRootElement,
  MenuTriggerElement,
  registerMenuContentElement,
  registerMenuItemElement,
  registerMenuPositionerElement,
  registerMenuRootElement,
  registerMenuTriggerElement,
}

// Add to registerElements()
registerMenuRootElement()
registerMenuTriggerElement()
registerMenuContentElement()
registerMenuPositionerElement()
registerMenuItemElement()

// Add to HTMLElementTagNameMap
'aria-ui-menu-root': MenuRootElement
'aria-ui-menu-trigger': MenuTriggerElement
'aria-ui-menu-content': MenuContentElement
'aria-ui-menu-positioner': MenuPositionerElement
'aria-ui-menu-item': MenuItemElement
```

---

## 9. Implementation Order

1. **`menu-store.ts`** — Define `MenuStore` and `MenuStoreContext`
2. **`menu-root.ts`** — Root element with open/close state
3. **`menu-trigger.ts`** — Trigger element
4. **`menu-positioner.ts`** — Positioner element (thin wrapper)
5. **`menu-item.ts`** — Item element with collection management
6. **`menu-content.ts`** — Content element with keyboard nav (depends on item for collection)
7. **Update `index.ts`** — Register all elements
8. **`menu.test.ts`** — Tests
9. **Story files** — Demo stories

---

## 10. Compatibility with table-handle Migration

The v1 → v2 migration for table-handle should be straightforward:

| v1 API | v2 API |
|--------|--------|
| `useMenuRoot(host, { state, emit })` | `setupMenuRoot(host, props)` via `MenuRootElement` |
| `useMenuTrigger(host)` | `setupMenuTrigger(host, props)` via `MenuTriggerElement` |
| `useMenuContent(host, { state, emit })` | `setupMenuContent(host, props)` via `MenuContentElement` |
| `useMenuItem(host, { state, emit })` | `setupMenuItem(host, props)` via `MenuItemElement` |
| `menuContentProps.eventTarget` | `MenuContentProps.eventTarget` (same concept) |
| `MenuItemEvents.select` | `MenuItemSelectEvent` (same pattern as `ValueChangeEvent` in listbox) |

The table-handle's custom `TypedEventTarget<'keydown'>` pattern (delegating document
keydowns) will work with the new `eventTarget` prop on `MenuContent`.

---

## 11. Open Questions / Future Considerations

1. **Should `MenuContent` use `aria-activedescendant`?**
   Yes — this follows the WAI-ARIA Menu Pattern. The content element stays focused,
   and `aria-activedescendant` points to the currently active item's ID.
   Implementation detail: each `MenuItem` needs a unique ID (use `useElementId`).

2. **Should we support `orientation: 'horizontal'`?**
   Not for the initial implementation. Table-handle menus are vertical. Can be added
   later as a prop on `MenuContent`.

3. **Loop behavior**
   The `Collection` class defaults to `loop = true`, which means arrow navigation
   wraps from last to first. This is standard menu behavior. No configuration needed.

4. **Focus return on close**
   When the menu closes via Escape or item activation, focus should return to the
   trigger. This needs to be handled in `setupMenuContent` or `setupMenuRoot` by
   storing a reference to the previously focused element. Implementation: the trigger
   stores itself in the store; when content detects close, it calls
   `store.anchorElement.get()?.focus()`.
