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

Tooltip and Popover share significant structure. Extract shared logic into `packages/elements/src/overlay/`:

| Shared module | What it provides | Used by |
|---|---|---|
| `overlay/overlay-store.ts` | `OverlayStore` class | Popover store, Tooltip store |
| `overlay/open-change-event.ts` | `OpenChangeEvent` class | Popover root, Tooltip root |
| `overlay/positioning.ts` | `updatePlacement()` (moved from `popover/`) | Popover positioner, Tooltip positioner |
| `overlay/overlay-root.ts` | `OverlayRootProps`, `OverlayRootPropsDeclaration`, `setupOverlayRoot()` | Popover root, Tooltip root |
| `overlay/overlay-positioner.ts` | `OverlayPositionerProps`, `OverlayPositionerPropsDeclaration`, `setupOverlayPositioner()` | Popover positioner, Tooltip positioner |
| `overlay/overlay-popup.ts` | `setupOverlayPopup()` with role parameter | Popover popup, Tooltip popup |

Additionally, `createDelayedToggle` is added to `@aria-ui-v2/utils` to share timer logic between `useHover` and the tooltip trigger.

The parser uses `type.getProperties()` which resolves inherited properties, so `interface TooltipPositionerProps extends OverlayPositionerProps {}` works correctly with code generation.

**Not shared** (meaningfully different):
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

## Phase 1: Add `createDelayedToggle` to utils [ ]

### 1.1 Create `packages/utils/src/delayed-toggle.ts`

Extract the timer scheduling logic shared by `useHover` and the tooltip trigger into a reusable utility.

```typescript
/**
 * @public
 */
export interface DelayedToggle {
  open(delay: number): void
  close(delay: number): void
  dispose(): void
}

/**
 * @public
 */
export function createDelayedToggle(
  onOpen: () => void,
  onClose: () => void,
): DelayedToggle {
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

  return {
    open(delay: number) {
      cancelClose()
      if (delay > 0) {
        openTimeout = window.setTimeout(() => {
          openTimeout = undefined
          onOpen()
        }, delay)
      } else {
        onOpen()
      }
    },
    close(delay: number) {
      cancelOpen()
      if (delay > 0) {
        closeTimeout = window.setTimeout(() => {
          closeTimeout = undefined
          onClose()
        }, delay)
      } else {
        onClose()
      }
    },
    dispose() {
      cancelOpen()
      cancelClose()
    },
  }
}
```

### 1.2 Refactor `packages/utils/src/use-hover.ts` to use `createDelayedToggle`

```typescript
import { createDelayedToggle, type UseHoverOptions } from './delayed-toggle.ts'

export function useHover(
  target: HTMLElement,
  options: UseHoverOptions,
): VoidFunction {
  const { openDelay = 0, closeDelay = 0, onOpen, onClose } = options

  const toggle = createDelayedToggle(
    onOpen ?? (() => {}),
    onClose ?? (() => {}),
  )

  const handleMouseEnter = () => toggle.open(openDelay)
  const handleMouseLeave = () => toggle.close(closeDelay)

  target.addEventListener('mouseenter', handleMouseEnter)
  target.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    target.removeEventListener('mouseenter', handleMouseEnter)
    target.removeEventListener('mouseleave', handleMouseLeave)
    toggle.dispose()
  }
}
```

### 1.3 Export from `packages/utils/src/index.ts`

```typescript
export { createDelayedToggle, type DelayedToggle } from './delayed-toggle.ts'
```

## Phase 2: Extract overlay shared modules [ ]

### 2.1 Create `packages/elements/src/overlay/overlay-store.ts`

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

### 2.2 Create `packages/elements/src/overlay/open-change-event.ts`

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

### 2.3 Move `packages/elements/src/popover/positioning.ts` → `packages/elements/src/overlay/positioning.ts`

No content changes. Just move the file.

### 2.4 Create `packages/elements/src/overlay/overlay-root.ts`

Extract the shared root setup logic. Both popover and tooltip roots use the same pattern: compute open state, emit open change events, create store, provide context. Parameterized by context and an optional `onBeforeOpenChange` hook (used by tooltip for group notification).

```typescript
import type { Context, HostElement, PropsDeclaration } from '@aria-ui-v2/core'
import { computed, defineProps, useEffect, type Store } from '@aria-ui-v2/core'
import { useAriaDisabled } from '@aria-ui-v2/utils'

import { OpenChangeEvent } from './open-change-event.ts'
import { OverlayStore } from './overlay-store.ts'

/**
 * @public
 */
export interface OverlayRootProps {
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen: boolean

  /**
   * Whether the overlay is currently open.
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
export const OverlayRootPropsDeclaration: PropsDeclaration<OverlayRootProps> = defineProps<OverlayRootProps>({
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
 * @internal
 */
export interface SetupOverlayRootOptions {
  onBeforeOpenChange?: (open: boolean) => void
}

/**
 * @internal
 */
export function setupOverlayRoot(
  host: HostElement,
  props: Store<OverlayRootProps>,
  storeContext: Context<OverlayStore>,
  options?: SetupOverlayRootOptions,
): void {
  const getOpen = computed(() => {
    const open = props.open.get()
    const defaultOpen = props.defaultOpen.get()
    return open ?? defaultOpen
  })

  const getDisabled = computed(() => props.disabled.get())

  const emitOpenChange = (open: boolean) => {
    if (getDisabled()) return
    options?.onBeforeOpenChange?.(open)
    const event = new OpenChangeEvent(open)
    host.dispatchEvent(event)
    if (event.defaultPrevented) return
    props.open.set(open)
  }

  const store = new OverlayStore(getOpen, emitOpenChange)
  useAriaDisabled(host, getDisabled)
  storeContext.provide(host, store)
}
```

### 2.5 Create `packages/elements/src/overlay/overlay-positioner.ts`

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

### 2.6 Create `packages/elements/src/overlay/overlay-popup.ts`

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

## Phase 3: Refactor popover to use overlay modules [ ]

Update existing popover files to use the shared code. No behavioral changes — this is a pure refactor.

### 3.1 Update `packages/elements/src/popover/popover-store.ts`

Replace `PopoverStore` class with re-exported `OverlayStore`:

```typescript
import { createContext } from '@aria-ui-v2/core'
import { OverlayStore } from '../overlay/overlay-store.ts'

export { OverlayStore as PopoverStore }

/**
 * @internal
 */
export const PopoverStoreContext = createContext<OverlayStore>(
  'PopoverStoreContext',
)
```

### 3.2 Update `packages/elements/src/popover/popover-root.ts`

Thin wrapper calling `setupOverlayRoot`. `PopoverRootProps` extends `OverlayRootProps` with `modal`.

```typescript
import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, defineProps, registerCustomElement, type Store } from '@aria-ui-v2/core'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'
import { OverlayRootPropsDeclaration, setupOverlayRoot, type OverlayRootProps } from '../overlay/overlay-root.ts'
import { PopoverStoreContext } from './popover-store.ts'

export { OpenChangeEvent }

/**
 * @public
 */
export interface PopoverRootProps extends OverlayRootProps {
  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal: boolean
}

/**
 * @internal
 */
export const PopoverRootPropsDeclaration = defineProps<PopoverRootProps>({
  ...OverlayRootPropsDeclaration,
  modal: {
    default: false,
    attribute: 'modal',
    type: 'boolean',
  },
})

/**
 * @public
 */
export interface PopoverRootEvents {
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupPopoverRoot(
  host: HostElement,
  props: Store<PopoverRootProps>,
) {
  setupOverlayRoot(host, props, PopoverStoreContext)
}

/**
 * @public
 */
export class PopoverRootElement extends defineCustomElement(
  setupPopoverRoot,
  PopoverRootPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerPopoverRootElement(): void {
  registerCustomElement('aria-ui-popover-root', PopoverRootElement)
}
```

### 3.3 Update `packages/elements/src/popover/popover-popup.ts`

Replace inline setup with shared `setupOverlayPopup`:

```typescript
import type { HostElement, Store } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement } from '@aria-ui-v2/core'
import { OverlayPopupPropsDeclaration, setupOverlayPopup, type OverlayPopupProps } from '../overlay/overlay-popup.ts'
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

### 3.4 Update `packages/elements/src/popover/popover-positioner.ts`

Thin wrapper around shared positioner:

```typescript
import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement, type Store } from '@aria-ui-v2/core'
import { OverlayPositionerPropsDeclaration, setupOverlayPositioner, type OverlayPositionerProps } from '../overlay/overlay-positioner.ts'
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

### 3.5 Update `packages/elements/src/popover/popover-trigger.ts`

Simplify `getDisabled`: use `props.disabled.get` directly instead of wrapping in `computed()`.

```typescript
// Before
const getDisabled = computed<boolean>(() => props.disabled.get())

// After
const getDisabled = props.disabled.get
```

### 3.6 Delete `packages/elements/src/popover/positioning.ts`

File has been moved to `overlay/positioning.ts` in Phase 2.3.

### 3.7 Verify popover still works

```bash
pnpm --filter @aria-ui-v2/elements typecheck
pnpm --filter @aria-ui-v2/elements test
```

## Phase 4: Tooltip-specific code [ ]

### 4.1 Create `packages/elements/src/tooltip/tooltip-group.ts`

Module-level variables (no class needed — only one instance exists). Tracks when tooltips were last closed for group delay sharing.

```typescript
const TOOLTIP_GROUP_TIMEOUT = 400

let lastCloseTimestamp = 0

export function notifyTooltipClosed(): void {
  lastCloseTimestamp = Date.now()
}

export function shouldSkipOpenDelay(): boolean {
  return Date.now() - lastCloseTimestamp < TOOLTIP_GROUP_TIMEOUT
}
```

### 4.2 Create `packages/elements/src/tooltip/tooltip-store.ts`

Just a context definition — the store class is shared.

```typescript
import { createContext } from '@aria-ui-v2/core'
import type { OverlayStore } from '../overlay/overlay-store.ts'

/**
 * @internal
 */
export const TooltipStoreContext = createContext<OverlayStore>(
  'TooltipStoreContext',
)
```

### 4.3 Create `packages/elements/src/tooltip/tooltip-root.ts`

Thin wrapper calling `setupOverlayRoot` with `onBeforeOpenChange` hook for group notification.

```typescript
import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement, type Store } from '@aria-ui-v2/core'

import { OpenChangeEvent } from '../overlay/open-change-event.ts'
import { OverlayRootPropsDeclaration, setupOverlayRoot, type OverlayRootProps } from '../overlay/overlay-root.ts'
import { notifyTooltipClosed } from './tooltip-group.ts'
import { TooltipStoreContext } from './tooltip-store.ts'

export { OpenChangeEvent }

/**
 * @public
 */
export interface TooltipRootProps extends OverlayRootProps {}

/**
 * @internal
 */
export const TooltipRootPropsDeclaration = OverlayRootPropsDeclaration

/**
 * @public
 */
export interface TooltipRootEvents {
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupTooltipRoot(
  host: HostElement,
  props: Store<TooltipRootProps>,
) {
  setupOverlayRoot(host, props, TooltipStoreContext, {
    onBeforeOpenChange: (open) => {
      if (!open) notifyTooltipClosed()
    },
  })
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

### 4.4 Create `packages/elements/src/tooltip/tooltip-trigger.ts`

Unique to tooltip — hover/focus-based with group-aware delay and Escape key support. Uses `createDelayedToggle` from utils for timer management.

```typescript
import type { HostElement } from '@aria-ui-v2/core'
import { computed, defineCustomElement, defineProps, registerCustomElement, useEffect, type Store } from '@aria-ui-v2/core'
import { createDelayedToggle, useAriaDisabled } from '@aria-ui-v2/utils'

import { shouldSkipOpenDelay } from './tooltip-group.ts'
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
  const getDisabled = props.disabled.get
  const getStore = TooltipStoreContext.consume(host)
  const getOpen = computed(() => getStore()?.getOpen())
  const getPopupId = computed(() => getStore()?.getPopupId())

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.anchorElement.set(host)
  })

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

  useEffect(host, () => {
    if (getDisabled()) return
    const store = getStore()
    if (!store) return

    const openDelay = props.openDelay.get()
    const closeDelay = props.closeDelay.get()

    let isHovered = false
    let isFocused = false

    const toggle = createDelayedToggle(
      () => store.emitOpenChange(true),
      () => store.emitOpenChange(false),
    )

    const onMouseEnter = () => {
      isHovered = true
      toggle.open(shouldSkipOpenDelay() ? 0 : openDelay)
    }

    const onMouseLeave = () => {
      isHovered = false
      if (!isFocused) toggle.close(closeDelay)
    }

    const onFocusIn = () => {
      isFocused = true
      toggle.open(shouldSkipOpenDelay() ? 0 : openDelay)
    }

    const onFocusOut = () => {
      isFocused = false
      if (!isHovered) toggle.close(closeDelay)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && store.getOpen()) {
        toggle.dispose()
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
      toggle.dispose()
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

### 4.5 Create `packages/elements/src/tooltip/tooltip-popup.ts`

Thin wrapper — calls shared `setupOverlayPopup` with `'tooltip'` role.

```typescript
import type { HostElement, Store } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement } from '@aria-ui-v2/core'
import { OverlayPopupPropsDeclaration, setupOverlayPopup, type OverlayPopupProps } from '../overlay/overlay-popup.ts'
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

### 4.6 Create `packages/elements/src/tooltip/tooltip-positioner.ts`

Thin wrapper — inherits props from `OverlayPositionerProps`, calls shared `setupOverlayPositioner`.

```typescript
import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, registerCustomElement, type Store } from '@aria-ui-v2/core'
import { OverlayPositionerPropsDeclaration, setupOverlayPositioner, type OverlayPositionerProps } from '../overlay/overlay-positioner.ts'
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

## Phase 5: Barrel Exports & Registration [ ]

### 5.1 Create `packages/elements/src/tooltip/index.ts`

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

### 5.2 Update `packages/elements/src/index.ts`

Add tooltip imports, exports, registration, and `HTMLElementTagNameMap` entries alongside popover.

## Phase 6: Code Generation & Build [ ]

### 6.1 Update `packages/elements/package.json`

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

### 6.2 Run code generation

```bash
pnpm --filter @aria-ui-v2/elements run build:gen
```

## Phase 7: Tests [ ]

### 7.1 Create `packages/elements/src/tooltip/tooltip.test.ts`

No environment variations — the popover-level environment tests already cover different Popover API/TogglePopoverSource combinations. Tooltip tests run in the default environment only.

```typescript
import { html, render } from 'lit-html'
import { beforeEach, describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'

import { registerElements } from '../index.ts'

describe('Tooltip', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    registerElements()
  })

  describe('Basic Functionality', () => {
    test('renders tooltip elements', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      expect(page.getByText('Trigger')).toBeInTheDocument()
      expect(page.getByText('Tooltip content')).toBeInTheDocument()
    })

    test('popup is hidden by default', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      expect(page.getByText('Tooltip content')).not.toBeVisible()
    })

    test('popup shows with defaultOpen=true', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .defaultOpen=${true}>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const popup = container.querySelector('aria-ui-tooltip-popup')!
      expect(popup.style.display).toBe('')
    })
  })

  describe('Hover Interactions', () => {
    test('hover opens tooltip (with zero delay)', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const trigger = page.getByText('Trigger')
      const popup = page.getByText('Tooltip content')

      expect(popup).not.toBeVisible()
      await trigger.hover()
      expect(popup).toBeVisible()
    })

    test('mouse leave closes tooltip', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .defaultOpen=${true}>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerEl = container.querySelector('aria-ui-tooltip-trigger')!
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      expect(popup.style.display).toBe('')
      triggerEl.dispatchEvent(new MouseEvent('mouseleave'))
      expect(popup).not.toBeVisible()
    })

    test('disabled trigger does not open tooltip', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .disabled=${true} .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      await page.getByText('Trigger').hover()
      expect(page.getByText('Tooltip content')).not.toBeVisible()
    })
  })

  describe('Focus Interactions', () => {
    test('focus opens tooltip', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerEl = container.querySelector('aria-ui-tooltip-trigger')!
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      triggerEl.dispatchEvent(new FocusEvent('focusin'))
      expect(popup).toBeVisible()
    })

    test('blur closes tooltip', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .defaultOpen=${true}>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerEl = container.querySelector('aria-ui-tooltip-trigger')!
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      expect(popup.style.display).toBe('')
      triggerEl.dispatchEvent(new FocusEvent('focusout'))
      expect(popup).not.toBeVisible()
    })

    test('tooltip stays open when hover ends but focus remains', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerEl = container.querySelector('aria-ui-tooltip-trigger')!
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      triggerEl.dispatchEvent(new MouseEvent('mouseenter'))
      triggerEl.dispatchEvent(new FocusEvent('focusin'))
      expect(popup).toBeVisible()

      triggerEl.dispatchEvent(new MouseEvent('mouseleave'))
      expect(popup).toBeVisible()

      triggerEl.dispatchEvent(new FocusEvent('focusout'))
      expect(popup).not.toBeVisible()
    })
  })

  describe('Keyboard Interactions', () => {
    test('Escape key closes tooltip', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .defaultOpen=${true}>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerEl = container.querySelector('aria-ui-tooltip-trigger')!
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      expect(popup.style.display).toBe('')
      triggerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      expect(popup).not.toBeVisible()
    })
  })

  describe('Tooltip Group (Shared Delay)', () => {
    test('second tooltip opens instantly after first closes within group timeout', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${600} data-testid="trigger-a">Trigger A</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip A</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>

          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${600} data-testid="trigger-b">Trigger B</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup data-testid="popup-b">Tooltip B</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const triggerB = container.querySelector('[data-testid="trigger-b"]')!
      const popupB = container.querySelector('[data-testid="popup-b"]')!

      // Open tooltip A via controlled prop, then close it (triggers group notification)
      const rootA = container.querySelector('aria-ui-tooltip-root')!
      rootA.open = true
      rootA.open = false

      // Hover trigger B — should open instantly (group delay skip)
      triggerB.dispatchEvent(new MouseEvent('mouseenter'))
      expect(popupB).toBeVisible()
    })
  })

  describe('Controlled Mode', () => {
    test('controlled open prop overrides internal state', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .open=${true}>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const popup = page.getByTestId('popup')
      expect(popup).toBeVisible()

      const rootElement = container.querySelector('aria-ui-tooltip-root')!
      rootElement.open = false
      expect(popup).not.toBeVisible()
    })
  })

  describe('Events', () => {
    test('emits openChange event when opened', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${0}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const root = container.querySelector('aria-ui-tooltip-root')!
      let eventFired = false
      root.addEventListener('openChange', () => { eventFired = true })

      await page.getByText('Trigger').hover()
      expect(eventFired).toBe(true)
    })
  })

  describe('Accessibility', () => {
    test('popup has role tooltip', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      expect(page.getByTestId('popup')).toHaveAttribute('role', 'tooltip')
    })

    test('trigger has aria-describedby when tooltip is open', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .open=${true}>
            <aria-ui-tooltip-trigger data-testid="trigger">Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup data-testid="popup">Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const trigger = page.getByTestId('trigger')
      const popup = container.querySelector('aria-ui-tooltip-popup')!

      await expect.poll(() => trigger.element().getAttribute('aria-describedby')).toBe(popup.id)
    })

    test('trigger does not have aria-describedby when tooltip is closed', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger data-testid="trigger">Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      expect(page.getByTestId('trigger')).not.toHaveAttribute('aria-describedby')
    })

    test('disabled elements have aria-disabled', () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .disabled=${true}>
            <aria-ui-tooltip-trigger .disabled=${true}>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      expect(container.querySelector('aria-ui-tooltip-root')!.getAttribute('aria-disabled')).toBe('true')
      expect(container.querySelector('aria-ui-tooltip-trigger')!.getAttribute('aria-disabled')).toBe('true')
    })
  })

  describe('Positioning', () => {
    test('positioner is positioned absolutely by default', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .open=${true}>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const positioner = container.querySelector('aria-ui-tooltip-positioner')!
      await expect.poll(() => positioner.style.position).toBe('absolute')
    })

    test('positioner respects strategy prop', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root .open=${true}>
            <aria-ui-tooltip-trigger>Trigger</aria-ui-tooltip-trigger>
            <aria-ui-tooltip-positioner .strategy=${'fixed'}>
              <aria-ui-tooltip-popup>Tooltip content</aria-ui-tooltip-popup>
            </aria-ui-tooltip-positioner>
          </aria-ui-tooltip-root>
        `,
        container,
      )

      const positioner = container.querySelector('aria-ui-tooltip-positioner')!
      await expect.poll(() => positioner.style.position).toBe('fixed')
    })
  })
})
```

## Summary of Files Changed

| File | Change |
|---|---|
| **Utils** | |
| `packages/utils/src/delayed-toggle.ts` | **New** — `createDelayedToggle()` shared timer logic |
| `packages/utils/src/use-hover.ts` | Refactored to use `createDelayedToggle` |
| `packages/utils/src/index.ts` | Export `createDelayedToggle` |
| **Overlay (new shared)** | |
| `src/overlay/overlay-store.ts` | **New** — `OverlayStore` class extracted from `PopoverStore` |
| `src/overlay/open-change-event.ts` | **New** — `OpenChangeEvent` class extracted from `popover-root.ts` |
| `src/overlay/positioning.ts` | **Moved** from `popover/positioning.ts` |
| `src/overlay/overlay-root.ts` | **New** — `OverlayRootProps`, declaration, and `setupOverlayRoot()` |
| `src/overlay/overlay-positioner.ts` | **New** — `OverlayPositionerProps`, declaration, and `setupOverlayPositioner()` |
| `src/overlay/overlay-popup.ts` | **New** — `OverlayPopupProps`, declaration, and `setupOverlayPopup()` |
| **Popover (refactored)** | |
| `src/popover/popover-store.ts` | Re-export `OverlayStore` as `PopoverStore`, keep context |
| `src/popover/popover-root.ts` | Thin wrapper: `PopoverRootProps extends OverlayRootProps`, calls `setupOverlayRoot()` |
| `src/popover/popover-popup.ts` | Thin wrapper calling `setupOverlayPopup(…, 'dialog')` |
| `src/popover/popover-positioner.ts` | Thin wrapper: `PopoverPositionerProps extends OverlayPositionerProps`, calls `setupOverlayPositioner()` |
| `src/popover/popover-trigger.ts` | Simplify `getDisabled` to `props.disabled.get` |
| `src/popover/positioning.ts` | **Deleted** (moved to overlay) |
| **Tooltip (new)** | |
| `src/tooltip/tooltip-group.ts` | **New** — module-level variables for shared delay |
| `src/tooltip/tooltip-store.ts` | **New** — just `TooltipStoreContext` definition |
| `src/tooltip/tooltip-root.ts` | **New** — thin wrapper: calls `setupOverlayRoot()` with group hook |
| `src/tooltip/tooltip-trigger.ts` | **New** — hover/focus/keyboard with `createDelayedToggle` and group-aware delay |
| `src/tooltip/tooltip-popup.ts` | **New** — thin wrapper calling `setupOverlayPopup(…, 'tooltip')` |
| `src/tooltip/tooltip-positioner.ts` | **New** — thin wrapper: `TooltipPositionerProps extends OverlayPositionerProps` |
| `src/tooltip/index.ts` | **New** — barrel export |
| `src/tooltip/tooltip.test.ts` | **New** — 17 test cases (no environment variations) |
| **Other** | |
| `src/index.ts` | Add tooltip registration and exports |
| `package.json` | Add `./tooltip` export, update `build:gen` |

## Verification

After implementation:

1. `pnpm --filter @aria-ui-v2/utils typecheck`
2. `pnpm --filter @aria-ui-v2/cli typecheck`
3. `pnpm --filter @aria-ui-v2/elements typecheck`
4. `pnpm --filter @aria-ui-v2/elements test` — all popover tests still pass (Phase 3 verification)
5. `pnpm --filter @aria-ui-v2/elements run build:gen` — generates framework wrappers for both popover and tooltip
6. `pnpm --filter @aria-ui-v2/elements test` — all tooltip tests pass
7. `nr fix` — formatting
