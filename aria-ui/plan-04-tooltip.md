# Plan: Implement Tooltip Component

## Overview

Implement a Tooltip component group with four parts: **Root**, **Trigger**, **Popup**, **Positioner**. Tooltips are hover/focus-based overlays with shared delay grouping across multiple tooltip instances.

Key behaviors:
- Opens on hover (with configurable delay) and focus
- Closes on mouse leave, blur, and Escape key
- **Shared delay grouping**: Once a tooltip becomes visible and then closes, adjacent tooltips open instantly (within a 400ms window)
- ARIA: `role="tooltip"` on popup, `aria-describedby` on trigger

Reference: [base-ui Tooltip](https://base-ui.com/react/components/tooltip) (adapted, not 1:1)

## Code Sharing Strategy

Tooltip and Popover share significant structure. Instead of duplicating, extract shared logic into `packages/elements/src/shared/`:

| Shared module | What it provides | Used by |
|---|---|---|
| `shared/overlay-store.ts` | `OverlayStore` class (anchorElement, popupId, positionerId, getOpen, emitOpenChange) | Popover store, Tooltip store |
| `shared/open-change-event.ts` | `OpenChangeEvent` class | Popover root, Tooltip root |
| `shared/positioning.ts` | `updatePlacement()` (moved from `popover/positioning.ts`) | Popover positioner, Tooltip positioner |
| `shared/overlay-positioner.ts` | `OverlayPositionerProps` interface, `OverlayPositionerPropsDeclaration`, `setupOverlayPositioner()` | Popover positioner, Tooltip positioner |
| `shared/overlay-popup.ts` | `setupOverlayPopup()` with role parameter | Popover popup, Tooltip popup |

The parser uses `type.getProperties()` which resolves inherited properties, so `interface TooltipPositionerProps extends OverlayPositionerProps {}` works correctly with code generation.

update: 不要放到 shared/ 下面，放到 overlay/ 下面

**Not shared** (meaningfully different):
- **Root**: Tooltip adds `tooltipGroup.notifyClosed()`, no `modal` prop
- **Trigger**: Popover = click-based + opt-in hover; Tooltip = always hover/focus + group-aware delay + Escape key

## Component Architecture

```
<aria-ui-tooltip-root>                    ← manages open state, provides context
  <aria-ui-tooltip-trigger>               ← hover/focus/keyboard interactions
    <button>Hover me</button>
  </aria-ui-tooltip-trigger>
  <aria-ui-tooltip-positioner>            ← floating-ui positioning + popover API
    <aria-ui-tooltip-popup>               ← role="tooltip", registers ID
      Tooltip content
    </aria-ui-tooltip-popup>
  </aria-ui-tooltip-positioner>
</aria-ui-tooltip-root>
```

## Phase 1: Extract shared modules [ ]

### 1.1 Create `packages/elements/src/shared/overlay-store.ts`

Extract `PopoverStore` → `OverlayStore`. The class is identical for both popover and tooltip; only the context key differs.

```typescript
import { createSignal } from '@aria-ui-v2/core'

/**
 * @internal
 */
export class OverlayStore {
  readonly anchorElement = createSignal<HTMLElement | undefined>(undefined)

  private positionerId = createSignal<string>('')

  private popupId = createSignal<string>('')

  constructor(
    readonly getOpen: () => boolean,
    readonly emitOpenChange: (open: boolean) => void,
  ) {}

  getPositionerId(): string {
    return this.positionerId.get()
  }

  setPositionerId(id: string): void {
    this.positionerId.set(id)
  }

  getPopupId(): string {
    return this.popupId.get()
  }

  setPopupId(id: string): void {
    this.popupId.set(id)
  }
}
```

### 1.2 Create `packages/elements/src/shared/open-change-event.ts`

Extract `OpenChangeEvent` from `popover-root.ts` to shared.

```typescript
/**
 * Represents an event that fires when an overlay element is toggled between being shown and hidden.
 *
 * Call `event.preventDefault()` to prevent the overlay from opening or closing.
 *
 * @public
 */
export class OpenChangeEvent extends Event {
  readonly open: boolean

  constructor(open: boolean) {
    super('openChange')
    this.open = open
  }
}
```

### 1.3 Move `packages/elements/src/popover/positioning.ts` → `packages/elements/src/shared/positioning.ts`

No content changes. Just move the file.

### 1.4 Create `packages/elements/src/shared/overlay-positioner.ts`

Extract the positioner props interface, declaration, and setup logic. The setup function takes a `Context<OverlayStore>` parameter so it works for both popover and tooltip.

```typescript
import type { Context, HostElement } from '@aria-ui-v2/core'
import { computed, defineProps, useEffect, type Store } from '@aria-ui-v2/core'
import { FeatureDetection, useElementId } from '@aria-ui-v2/utils'
import type { AutoUpdateOptions, Boundary, ElementContext, OffsetOptions, Placement, RootBoundary } from '@floating-ui/dom'

import type { OverlayStore } from './overlay-store.ts'
import { updatePlacement } from './positioning.ts'

/**
 * @public
 */
export interface OverlayPositionerProps {
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy: 'absolute' | 'fixed'

  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  placement: Placement

  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate: boolean | AutoUpdateOptions

  /**
   * Whether to use the browser Popover API to place the floating element on
   * top of other page content.
   *
   * @default true
   */
  hoist: boolean

  /**
   * The distance between the reference and floating element.
   *
   * @default 6
   */
  offset: OffsetOptions

  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  flip: boolean | Placement[]

  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift: boolean

  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap: boolean

  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport: boolean

  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth: boolean

  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight: boolean

  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline: boolean

  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default false
   */
  hide: boolean

  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary: Boundary

  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary: RootBoundary

  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding: number

  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext: ElementContext

  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary: boolean
}

/**
 * @internal
 */
export const OverlayPositionerPropsDeclaration = /* @__PURE__ */ defineProps<OverlayPositionerProps>({
  strategy: { default: 'absolute', attribute: 'strategy', type: 'string' },
  placement: { default: 'top', attribute: 'placement', type: 'string' },
  autoUpdate: { default: true, attribute: false, type: 'json' },
  hoist: { default: true, attribute: 'hoist', type: 'boolean' },
  offset: { default: 6, attribute: false, type: 'json' },
  flip: { default: true, attribute: false, type: 'json' },
  shift: { default: true, attribute: 'shift', type: 'boolean' },
  overlap: { default: false, attribute: 'overlap', type: 'boolean' },
  fitViewport: { default: false, attribute: 'fit-viewport', type: 'boolean' },
  sameWidth: { default: false, attribute: 'same-width', type: 'boolean' },
  sameHeight: { default: false, attribute: 'same-height', type: 'boolean' },
  inline: { default: false, attribute: 'inline', type: 'boolean' },
  hide: { default: false, attribute: 'hide', type: 'boolean' },
  boundary: { default: 'clippingAncestors', attribute: false, type: 'json' },
  rootBoundary: { default: 'viewport', attribute: 'root-boundary', type: 'string' },
  overflowPadding: { default: 4, attribute: 'overflow-padding', type: 'number' },
  elementContext: { default: 'floating', attribute: 'element-context', type: 'string' },
  altBoundary: { default: false, attribute: 'alt-boundary', type: 'boolean' },
})

/**
 * @internal
 */
export function setupOverlayPositioner(
  host: HostElement,
  props: Store<OverlayPositionerProps>,
  storeContext: Context<OverlayStore>,
): void {
  const getStore = storeContext.consume(host)
  const getOpen = computed(() => getStore()?.getOpen() ?? false)
  const getAnchorElement = computed(() => getStore()?.anchorElement.get())

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const id = useElementId(host)
    store.setPositionerId(id)
  })

  if (FeatureDetection.supportsPopover()) {
    useEffect(host, () => {
      host.popover = 'manual'
    })

    useEffect(host, () => {
      const store = getStore()
      if (!store) return

      const expectedOpen = getOpen()
      const currentOpen = host.matches(':popover-open')
      if (currentOpen === expectedOpen) return

      if (FeatureDetection.supportsTogglePopoverSource()) {
        const anchorElement = getAnchorElement()
        host.togglePopover(
          anchorElement
            ? { force: expectedOpen, source: anchorElement }
            : { force: expectedOpen },
        )
      } else {
        if (expectedOpen) {
          host.showPopover()
        } else {
          host.hidePopover()
        }
      }
    })
  } else {
    useEffect(host, () => {
      const open = getOpen()
      if (open) {
        host.style.display = ''
      } else {
        host.style.display = 'none'
      }
    })
  }

  useEffect(host, () => {
    const open = getOpen()
    if (!open) return

    const anchorElement = getAnchorElement()
    if (!anchorElement) return

    return updatePlacement(host, anchorElement, {
      strategy: props.strategy.get(),
      placement: props.placement.get(),
      autoUpdate: props.autoUpdate.get(),
      hoist: props.hoist.get(),
      offset: props.offset.get(),
      flip: props.flip.get(),
      shift: props.shift.get(),
      overlap: props.overlap.get(),
      fitViewport: props.fitViewport.get(),
      sameWidth: props.sameWidth.get(),
      sameHeight: props.sameHeight.get(),
      inline: props.inline.get(),
      hide: props.hide.get(),
      boundary: props.boundary.get(),
      rootBoundary: props.rootBoundary.get(),
      overflowPadding: props.overflowPadding.get(),
      elementContext: props.elementContext.get(),
      altBoundary: props.altBoundary.get(),
    })
  })
}
```

### 1.5 Create `packages/elements/src/shared/overlay-popup.ts`

Extract shared popup setup logic. Takes context and role as parameters.

```typescript
import type { Context, HostElement, Store } from '@aria-ui-v2/core'
import { defineProps, useEffect } from '@aria-ui-v2/core'
import { useElementId } from '@aria-ui-v2/utils'

import type { OverlayStore } from './overlay-store.ts'

/**
 * @public
 */
export interface OverlayPopupProps {}

/**
 * @internal
 */
export const OverlayPopupPropsDeclaration = /* @__PURE__ */ defineProps<OverlayPopupProps>({})

/**
 * @internal
 */
export function setupOverlayPopup(
  host: HostElement,
  _props: Store<OverlayPopupProps>,
  storeContext: Context<OverlayStore>,
  role: string,
): void {
  const getStore = storeContext.consume(host)
  const id = useElementId(host)

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.setPopupId(id)
  })

  useEffect(host, () => {
    host.role = role
  })
}
```

## Phase 2: Refactor popover to use shared modules [ ]

Update existing popover files to use the shared code. No behavioral changes — this is a pure refactor.

### 2.1 Update `packages/elements/src/popover/popover-store.ts`

Replace `PopoverStore` class with re-exported `OverlayStore`:

```typescript
import { createContext } from '@aria-ui-v2/core'
import { OverlayStore } from '../shared/overlay-store.ts'

export { OverlayStore as PopoverStore }

/**
 * @internal
 */
export const PopoverStoreContext = createContext<OverlayStore>(
  'PopoverStoreContext',
)
```

### 2.2 Update `packages/elements/src/popover/popover-root.ts`

Import `OpenChangeEvent` from shared instead of defining locally. Import `OverlayStore` instead of `PopoverStore`:

```typescript
import type { HostElement, PropsDeclaration } from '@aria-ui-v2/core'
import { computed, defineCustomElement, defineProps, registerCustomElement, type Store } from '@aria-ui-v2/core'
import { useAriaDisabled } from '@aria-ui-v2/utils'

import { OpenChangeEvent } from '../shared/open-change-event.ts'
import { OverlayStore } from '../shared/overlay-store.ts'
import { PopoverStoreContext } from './popover-store.ts'

// Re-export for public API
export { OpenChangeEvent }

// ... PopoverRootProps interface unchanged ...
// ... PopoverRootPropsDeclaration unchanged ...
// ... PopoverRootEvents unchanged ...

export function setupPopoverRoot(
  host: HostElement,
  props: Store<PopoverRootProps>,
) {
  // ... same logic, just use OverlayStore instead of PopoverStore ...
  const store = new OverlayStore(getOpen, emitOpenChange)
  // ... rest unchanged ...
}

// ... Element class and register function unchanged ...
```

### 2.3 Update `packages/elements/src/popover/popover-popup.ts`

Replace inline setup with shared `setupOverlayPopup`:

```typescript
import type { HostElement, Store } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement } from '@aria-ui-v2/core'
import { OverlayPopupPropsDeclaration, setupOverlayPopup, type OverlayPopupProps } from '../shared/overlay-popup.ts'
import { PopoverStoreContext } from './popover-store.ts'

export type PopoverPopupProps = OverlayPopupProps
export const PopoverPopupPropsDeclaration = OverlayPopupPropsDeclaration

/**
 * @internal
 */
export function setupPopoverPopup(
  host: HostElement,
  props: Store<PopoverPopupProps>,
) {
  setupOverlayPopup(host, props, PopoverStoreContext, 'dialog')
}

/**
 * @public
 */
export class PopoverPopupElement extends defineCustomElement(
  setupPopoverPopup,
  PopoverPopupPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerPopoverPopupElement(): void {
  registerCustomElement('aria-ui-popover-popup', PopoverPopupElement)
}
```

### 2.4 Update `packages/elements/src/popover/popover-positioner.ts`

Replace ~300 lines of props/setup with thin wrapper around shared:

```typescript
import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement, type Store } from '@aria-ui-v2/core'
import { OverlayPositionerPropsDeclaration, setupOverlayPositioner, type OverlayPositionerProps } from '../shared/overlay-positioner.ts'
import { PopoverStoreContext } from './popover-store.ts'

/**
 * @public
 */
export interface PopoverPositionerProps extends OverlayPositionerProps {}

/**
 * @internal
 */
export const PopoverPositionerPropsDeclaration = OverlayPositionerPropsDeclaration

/**
 * @internal
 */
export function setupPopoverPositioner(
  host: HostElement,
  props: Store<PopoverPositionerProps>,
) {
  setupOverlayPositioner(host, props, PopoverStoreContext)
}

/**
 * @public
 */
export class PopoverPositionerElement extends defineCustomElement(
  setupPopoverPositioner,
  PopoverPositionerPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerPopoverPositionerElement(): void {
  registerCustomElement('aria-ui-popover-positioner', PopoverPositionerElement)
}
```

### 2.5 Update `packages/elements/src/popover/popover-trigger.ts`

Update `PopoverStore` import to use re-exported name:

```typescript
// Before
import { PopoverStoreContext } from './popover-store.ts'
// After (same — the re-export in popover-store.ts handles the type)
import { PopoverStoreContext } from './popover-store.ts'
```

No changes needed since the `PopoverStore` type is only used via `PopoverStoreContext.consume()` which returns `() => OverlayStore | undefined`.

### 2.6 Delete `packages/elements/src/popover/positioning.ts`

File has been moved to `shared/positioning.ts` in Phase 1.3.

### 2.7 Verify popover still works

```bash
pnpm --filter @aria-ui-v2/elements typecheck
pnpm --filter @aria-ui-v2/elements test
```

## Phase 3: Tooltip-specific code [ ]

### 3.1 Create `packages/elements/src/tooltip/tooltip-group.ts`

Module-level singleton that tracks when tooltips were last closed, enabling instant open for adjacent tooltips.

```typescript
const TOOLTIP_GROUP_TIMEOUT = 400

class TooltipGroupState {
  private lastCloseTimestamp = 0

  notifyClosed(): void {
    this.lastCloseTimestamp = Date.now()
  }

  shouldSkipDelay(): boolean {
    return Date.now() - this.lastCloseTimestamp < TOOLTIP_GROUP_TIMEOUT
  }
}

// update：你这个东西就一个 instance，没有必要做成一个 class，直接使用 local variable 就好了。

export const tooltipGroup = new TooltipGroupState()
```

### 3.2 Create `packages/elements/src/tooltip/tooltip-store.ts`

Just a context definition — the store class is shared.

```typescript
import { createContext } from '@aria-ui-v2/core'
import type { OverlayStore } from '../shared/overlay-store.ts'

/**
 * @internal
 */
export const TooltipStoreContext = createContext<OverlayStore>(
  'TooltipStoreContext',
)
```

### 3.3 Create `packages/elements/src/tooltip/tooltip-root.ts`

Similar to popover root but without `modal` and with tooltip group notification on close.

```typescript
import type { HostElement, PropsDeclaration } from '@aria-ui-v2/core'
import { computed, defineCustomElement, defineProps, registerCustomElement, type Store } from '@aria-ui-v2/core'
import { useAriaDisabled } from '@aria-ui-v2/utils'

import { OpenChangeEvent } from '../shared/open-change-event.ts'
import { OverlayStore } from '../shared/overlay-store.ts'
import { tooltipGroup } from './tooltip-group.ts'
import { TooltipStoreContext } from './tooltip-store.ts'

export { OpenChangeEvent }

/**
 * @public
 */
export interface TooltipRootProps {
  /**
   * Whether the tooltip is initially open.
   * @default false
   */
  defaultOpen: boolean

  /**
   * Whether the tooltip is currently open.
   * @default null
   */
  open: boolean | null

  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const TooltipRootPropsDeclaration: PropsDeclaration<TooltipRootProps> = defineProps<TooltipRootProps>({
  defaultOpen: {
    default: false,
    attribute: 'default-open',
    type: 'boolean',
  },
  open: {
    default: null,
    attribute: 'open',
    type: 'json',
  },
  disabled: {
    default: false,
    attribute: 'disabled',
    type: 'boolean',
  },
})

/**
 * @public
 */
export interface TooltipRootEvents {
  openChange: OpenChangeEvent
}

// update: 这个逻辑不是和 setupPopoverRoot 几乎一毛一样么？能不能复用/抽象/封装
/**
 * @internal
 */
export function setupTooltipRoot(
  host: HostElement,
  props: Store<TooltipRootProps>,
) {
  const getOpen = computed(() => {
    const open = props.open.get()
    const defaultOpen = props.defaultOpen.get()
    return open ?? defaultOpen
  })

  const getDisabled = computed(() => props.disabled.get())

  const emitOpenChange = (open: boolean) => {
    if (getDisabled()) return
    if (!open) tooltipGroup.notifyClosed()
    const event = new OpenChangeEvent(open)
    host.dispatchEvent(event)
    if (event.defaultPrevented) return
    props.open.set(open)
  }

  const store = new OverlayStore(getOpen, emitOpenChange)
  useAriaDisabled(host, getDisabled)
  TooltipStoreContext.provide(host, store)
}

/**
 * @public
 */
export class TooltipRootElement extends defineCustomElement(
  setupTooltipRoot,
  TooltipRootPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerTooltipRootElement(): void {
  registerCustomElement('aria-ui-tooltip-root', TooltipRootElement)
}
```

### 3.4 Create `packages/elements/src/tooltip/tooltip-trigger.ts`

Unique to tooltip — hover/focus-based with group-aware delay and Escape key support.

```typescript
import type { HostElement } from '@aria-ui-v2/core'
import { computed, defineCustomElement, defineProps, registerCustomElement, useEffect, type Store } from '@aria-ui-v2/core'
import { useAriaDisabled } from '@aria-ui-v2/utils'

import { tooltipGroup } from './tooltip-group.ts'
import { TooltipStoreContext } from './tooltip-store.ts'

/**
 * @public
 */
export interface TooltipTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: boolean

  /**
   * The delay in milliseconds before opening the tooltip on hover.
   * @default 600
   */
  openDelay: number

  /**
   * The delay in milliseconds before closing the tooltip when hover/focus ends.
   * @default 0
   */
  closeDelay: number
}

/**
 * @internal
 */
export const TooltipTriggerPropsDeclaration = /* @__PURE__ */ defineProps<TooltipTriggerProps>({
  disabled: {
    default: false,
    attribute: 'disabled',
    type: 'boolean',
  },
  openDelay: {
    default: 600,
    attribute: 'open-delay',
    type: 'number',
  },
  closeDelay: {
    default: 0,
    attribute: 'close-delay',
    type: 'number',
  },
})

/**
 * @internal
 */
export function setupTooltipTrigger(
  host: HostElement,
  props: Store<TooltipTriggerProps>,
) {
  // update: getDisabled = props.disabled.get
  // 更简单，也同步更新 setupPopoverTrigger
  const getDisabled = computed<boolean>(() => props.disabled.get())
  const getStore = TooltipStoreContext.consume(host)
  const getOpen = computed(() => getStore()?.getOpen())
  const getPopupId = computed(() => getStore()?.getPopupId())

  // Register trigger as anchor element
  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.anchorElement.set(host)
  })

  // Set aria-describedby when open (tooltip pattern, not aria-expanded)
  useEffect(host, () => {
    const open = getOpen()
    const popupId = getPopupId()
    if (open && popupId) {
      host.setAttribute('aria-describedby', popupId)
    } else {
      host.removeAttribute('aria-describedby')
    }
  })

  useAriaDisabled(host, getDisabled)

  // Hover, focus, and keyboard interactions
  // 能不能复用已有的 useHover？做更好的抽象和封装，也许需要在 utils 包加点东西
  useEffect(host, () => {
    if (getDisabled()) return
    const store = getStore()
    if (!store) return

    const openDelay = props.openDelay.get()
    const closeDelay = props.closeDelay.get()

    let isHovered = false
    let isFocused = false
    let openTimeout: number | undefined
    let closeTimeout: number | undefined

    function cancelOpen() {
      if (openTimeout !== undefined) {
        clearTimeout(openTimeout)
        openTimeout = undefined
      }
    }

    function cancelClose() {
      if (closeTimeout !== undefined) {
        clearTimeout(closeTimeout)
        closeTimeout = undefined
      }
    }

    function scheduleOpen() {
      cancelClose()
      if (store.getOpen()) return

      const delay = tooltipGroup.shouldSkipDelay() ? 0 : openDelay
      if (delay > 0) {
        openTimeout = window.setTimeout(() => {
          openTimeout = undefined
          store.emitOpenChange(true)
        }, delay)
      } else {
        store.emitOpenChange(true)
      }
    }

    function scheduleClose() {
      cancelOpen()
      if (!store.getOpen()) return

      if (closeDelay > 0) {
        closeTimeout = window.setTimeout(() => {
          closeTimeout = undefined
          store.emitOpenChange(false)
        }, closeDelay)
      } else {
        store.emitOpenChange(false)
      }
    }

    const onMouseEnter = () => {
      isHovered = true
      scheduleOpen()
    }

    const onMouseLeave = () => {
      isHovered = false
      if (!isFocused) scheduleClose()
    }

    const onFocusIn = () => {
      isFocused = true
      scheduleOpen()
    }

    const onFocusOut = () => {
      isFocused = false
      if (!isHovered) scheduleClose()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && store.getOpen()) {
        cancelOpen()
        cancelClose()
        store.emitOpenChange(false)
      }
    }

    host.addEventListener('mouseenter', onMouseEnter)
    host.addEventListener('mouseleave', onMouseLeave)
    host.addEventListener('focusin', onFocusIn)
    host.addEventListener('focusout', onFocusOut)
    host.addEventListener('keydown', onKeyDown)

    return () => {
      host.removeEventListener('mouseenter', onMouseEnter)
      host.removeEventListener('mouseleave', onMouseLeave)
      host.removeEventListener('focusin', onFocusIn)
      host.removeEventListener('focusout', onFocusOut)
      host.removeEventListener('keydown', onKeyDown)
      cancelOpen()
      cancelClose()
    }
  })
}

/**
 * @public
 */
export class TooltipTriggerElement extends defineCustomElement(
  setupTooltipTrigger,
  TooltipTriggerPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerTooltipTriggerElement(): void {
  registerCustomElement('aria-ui-tooltip-trigger', TooltipTriggerElement)
}
```

### 3.5 Create `packages/elements/src/tooltip/tooltip-popup.ts`

Thin wrapper — calls shared `setupOverlayPopup` with `'tooltip'` role.

```typescript
import type { HostElement, Store } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement } from '@aria-ui-v2/core'
import { OverlayPopupPropsDeclaration, setupOverlayPopup, type OverlayPopupProps } from '../shared/overlay-popup.ts'
import { TooltipStoreContext } from './tooltip-store.ts'

export type TooltipPopupProps = OverlayPopupProps
export const TooltipPopupPropsDeclaration = OverlayPopupPropsDeclaration

/**
 * @internal
 */
export function setupTooltipPopup(
  host: HostElement,
  props: Store<TooltipPopupProps>,
) {
  setupOverlayPopup(host, props, TooltipStoreContext, 'tooltip')
}

/**
 * @public
 */
export class TooltipPopupElement extends defineCustomElement(
  setupTooltipPopup,
  TooltipPopupPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerTooltipPopupElement(): void {
  registerCustomElement('aria-ui-tooltip-popup', TooltipPopupElement)
}
```

### 3.6 Create `packages/elements/src/tooltip/tooltip-positioner.ts`

Thin wrapper — inherits props from `OverlayPositionerProps`, calls shared `setupOverlayPositioner`.

```typescript
import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement, type Store } from '@aria-ui-v2/core'
import { OverlayPositionerPropsDeclaration, setupOverlayPositioner, type OverlayPositionerProps } from '../shared/overlay-positioner.ts'
import { TooltipStoreContext } from './tooltip-store.ts'

/**
 * @public
 */
export interface TooltipPositionerProps extends OverlayPositionerProps {}

/**
 * @internal
 */
export const TooltipPositionerPropsDeclaration = OverlayPositionerPropsDeclaration

/**
 * @internal
 */
export function setupTooltipPositioner(
  host: HostElement,
  props: Store<TooltipPositionerProps>,
) {
  setupOverlayPositioner(host, props, TooltipStoreContext)
}

/**
 * @public
 */
export class TooltipPositionerElement extends defineCustomElement(
  setupTooltipPositioner,
  TooltipPositionerPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerTooltipPositionerElement(): void {
  registerCustomElement('aria-ui-tooltip-positioner', TooltipPositionerElement)
}
```

## Phase 4: Barrel Exports & Registration [ ]

### 4.1 Create `packages/elements/src/tooltip/index.ts`

```typescript
export {
  OpenChangeEvent,
  TooltipRootElement,
  registerTooltipRootElement,
  setupTooltipRoot,
  type TooltipRootEvents,
  type TooltipRootProps,
  type TooltipRootPropsDeclaration,
} from './tooltip-root.ts'

export {
  TooltipTriggerElement,
  registerTooltipTriggerElement,
  setupTooltipTrigger,
  type TooltipTriggerProps,
  type TooltipTriggerPropsDeclaration,
} from './tooltip-trigger.ts'

export {
  TooltipPopupElement,
  registerTooltipPopupElement,
  setupTooltipPopup,
  type TooltipPopupProps,
  type TooltipPopupPropsDeclaration,
} from './tooltip-popup.ts'

export {
  TooltipPositionerElement,
  registerTooltipPositionerElement,
  setupTooltipPositioner,
  type TooltipPositionerProps,
  type TooltipPositionerPropsDeclaration,
} from './tooltip-positioner.ts'
```

### 4.2 Update `packages/elements/src/index.ts`

Add tooltip imports, exports, registration, and `HTMLElementTagNameMap` entries alongside popover.

## Phase 5: Code Generation & Build [ ]

### 5.1 Update `packages/elements/package.json`

Add `./tooltip` export and update `build:gen` to run for both popover and tooltip:

```json
{
  "exports": {
    "./tooltip": {
      "aria-ui-dev": "./src/tooltip/index.ts",
      "types": "./dist/tooltip/index.d.ts",
      "import": "./dist/tooltip/index.js"
    }
  },
  "scripts": {
    "build:gen": "aria-ui ... --entry ./src/popover/index.ts ... && aria-ui ... --entry ./src/tooltip/index.ts ..."
  }
}
```

### 5.2 Run code generation

```bash
pnpm --filter @aria-ui-v2/elements run build:gen
```

## Phase 6: Tests [ ]

### 6.1 Create `packages/elements/src/tooltip/tooltip.test.ts`

Uses same environment/feature-detection pattern as popover tests.

```typescript
import { FeatureDetectionInternals } from '@aria-ui-v2/utils'
import { html, render } from 'lit-html'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { page } from 'vitest/browser'

import { registerElements } from '../index.ts'

// update： 不同 environment 的情况已经在 popover 里测试过了，tooltip 不需要测试 不同 environment 的情况
// ... same environment setup as popover.test.ts ...

function runTests() {
  describe('Basic Functionality', () => {
    test('renders tooltip elements', () => { /* ... */ })
    test('popup is hidden by default', () => { /* ... */ })
    test('popup shows with defaultOpen=true', () => { /* ... */ })
  })

  describe('Hover Interactions', () => {
    test('hover opens tooltip (with zero delay)', async () => { /* ... */ })
    test('hover opens tooltip with delay', async () => {
      // Uses vi.useFakeTimers() to test delay behavior
    })
    test('mouse leave closes tooltip', async () => { /* ... */ })
    test('disabled trigger does not open tooltip', async () => { /* ... */ })
  })

  describe('Focus Interactions', () => {
    test('focus opens tooltip', async () => { /* ... */ })
    test('blur closes tooltip', async () => { /* ... */ })
    test('tooltip stays open when hover ends but focus remains', async () => {
      // Hover + focus both active → mouse leaves → still open (focus holds)
      // Focus also leaves → closes
    })
  })

  describe('Keyboard Interactions', () => {
    test('Escape key closes tooltip', async () => { /* ... */ })
  })

  describe('Tooltip Group (Shared Delay)', () => {
    test('second tooltip opens instantly after first closes within group timeout', async () => {
      // Open tooltip A via controlled prop → close it → hover trigger B
      // → tooltip B opens instantly (no 600ms delay)
    })
  })

  describe('Controlled Mode', () => {
    test('controlled open prop overrides internal state', () => { /* ... */ })
  })

  describe('Events', () => {
    test('emits openChange event when opened', async () => { /* ... */ })
  })

  describe('Accessibility', () => {
    test('popup has role tooltip', () => { /* ... */ })
    test('trigger has aria-describedby when tooltip is open', async () => { /* ... */ })
    test('trigger does not have aria-describedby when tooltip is closed', () => { /* ... */ })
    test('disabled elements have aria-disabled', () => { /* ... */ })
  })

  describe('Positioning', () => {
    test('positioner is positioned absolutely by default', async () => { /* ... */ })
    test('positioner respects strategy prop', async () => { /* ... */ })
  })
}

describe('Tooltip', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  const environments = collectEnvironments()
  forEachEnvironment(environments, runTests)
})
```

## Summary of Files Changed

| File | Change |
|---|---|
| **Shared (new)** | |
| `src/shared/overlay-store.ts` | **New** — `OverlayStore` class extracted from `PopoverStore` |
| `src/shared/open-change-event.ts` | **New** — `OpenChangeEvent` class extracted from `popover-root.ts` |
| `src/shared/positioning.ts` | **Moved** from `popover/positioning.ts` |
| `src/shared/overlay-positioner.ts` | **New** — `OverlayPositionerProps`, declaration, and `setupOverlayPositioner()` |
| `src/shared/overlay-popup.ts` | **New** — `OverlayPopupProps`, declaration, and `setupOverlayPopup()` |
| **Popover (refactored)** | |
| `src/popover/popover-store.ts` | Re-export `OverlayStore` as `PopoverStore`, keep context |
| `src/popover/popover-root.ts` | Import from shared (`OpenChangeEvent`, `OverlayStore`) |
| `src/popover/popover-popup.ts` | Thin wrapper calling `setupOverlayPopup(…, 'dialog')` |
| `src/popover/popover-positioner.ts` | Thin wrapper: `PopoverPositionerProps extends OverlayPositionerProps`, calls `setupOverlayPositioner()` |
| `src/popover/popover-trigger.ts` | No changes (import path unchanged) |
| `src/popover/positioning.ts` | **Deleted** (moved to shared) |
| **Tooltip (new)** | |
| `src/tooltip/tooltip-group.ts` | **New** — module-level singleton for shared delay |
| `src/tooltip/tooltip-store.ts` | **New** — just `TooltipStoreContext` definition |
| `src/tooltip/tooltip-root.ts` | **New** — like popover root but no `modal`, adds group notification |
| `src/tooltip/tooltip-trigger.ts` | **New** — hover/focus/keyboard with group-aware delay |
| `src/tooltip/tooltip-popup.ts` | **New** — thin wrapper calling `setupOverlayPopup(…, 'tooltip')` |
| `src/tooltip/tooltip-positioner.ts` | **New** — thin wrapper: `TooltipPositionerProps extends OverlayPositionerProps` |
| `src/tooltip/index.ts` | **New** — barrel export |
| `src/tooltip/tooltip.test.ts` | **New** — 17 test cases |
| **Other** | |
| `src/index.ts` | Add tooltip registration and exports |
| `package.json` | Add `./tooltip` export, update `build:gen` |

## Key Design Decisions

1. **Shared `OverlayStore`** — PopoverStore and TooltipStore were identical. One class, different context keys.

2. **Shared `setupOverlayPositioner(host, props, context)`** — Parameterized by context. Both positioners have identical props (inherited via `extends OverlayPositionerProps`) and identical setup logic.

3. **Shared `setupOverlayPopup(host, props, context, role)`** — Parameterized by context and role (`'dialog'` vs `'tooltip'`).

4. **Not shared: Root** — Tooltip root adds `tooltipGroup.notifyClosed()` and lacks `modal`. Small enough that sharing would add complexity without benefit.

5. **Not shared: Trigger** — Fundamentally different interaction model. Popover = click toggle + opt-in hover. Tooltip = always hover/focus + group-aware delay + Escape.

6. **Parser compatibility** — `extractPropertiesFromInterface()` uses `type.getProperties()` which resolves inherited properties and their JSDoc, so `interface TooltipPositionerProps extends OverlayPositionerProps {}` works correctly with code generation.

## Verification

After implementation:

1. `pnpm --filter @aria-ui-v2/cli typecheck`
2. `pnpm --filter @aria-ui-v2/elements typecheck`
3. `pnpm --filter @aria-ui-v2/elements test` — all popover tests still pass (Phase 2 verification)
4. `pnpm --filter @aria-ui-v2/elements run build:gen` — generates framework wrappers for both popover and tooltip
5. `pnpm --filter @aria-ui-v2/elements test` — all tooltip tests pass
6. `nr fix` — formatting
