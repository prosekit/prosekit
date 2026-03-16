# Plan: Implement Tooltip Component

## Overview

Implement a Tooltip component group with four parts: **Root**, **Trigger**, **Popup**, **Positioner**. Tooltips are hover/focus-based overlays with shared delay grouping across multiple tooltip instances.

Key behaviors:
- Opens on hover (with configurable delay) and focus
- Closes on mouse leave, blur, and Escape key
- **Shared delay grouping**: Once a tooltip becomes visible and then closes, adjacent tooltips open instantly (within a 400ms window)
- ARIA: `role="tooltip"` on popup, `aria-describedby` on trigger

Reference: [base-ui Tooltip](https://base-ui.com/react/components/tooltip) (adapted, not 1:1)

## Component Architecture

```
<aria-ui-tooltip-root>                    ← manages open state, provides TooltipStore via context
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

## Phase 0: Move `positioning.ts` to shared location [ ]

The `updatePlacement` function is currently in `packages/elements/src/popover/positioning.ts`. Both popover and tooltip positioners need it. Move it to a shared location.

### 0.1 Create shared directory and move file

Move `packages/elements/src/popover/positioning.ts` → `packages/elements/src/shared/positioning.ts`

No changes to the file content.

### 0.2 Update popover positioner import

In `packages/elements/src/popover/popover-positioner.ts`, change:

```typescript
// Before
import { updatePlacement } from './positioning.ts'

// After
import { updatePlacement } from '../shared/positioning.ts'
```

## Phase 1: Tooltip Group & Store [ ]

### 1.1 Create `packages/elements/src/tooltip/tooltip-group.ts`

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

export const tooltipGroup = new TooltipGroupState()
```

### 1.2 Create `packages/elements/src/tooltip/tooltip-store.ts`

Context-based shared state between tooltip parts. Follows the same pattern as `PopoverStore`.

```typescript
import { createContext, createSignal } from '@aria-ui-v2/core'

export class TooltipStore {
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

export const TooltipStoreContext = createContext<TooltipStore>(
  'TooltipStoreContext',
)
```

## Phase 2: Component Parts [ ]

### 2.1 Create `packages/elements/src/tooltip/tooltip-root.ts`

Manages open state and provides `TooltipStore` via context. Notifies the tooltip group when closed.

```typescript
import type { HostElement, PropsDeclaration } from '@aria-ui-v2/core'
import { computed, defineCustomElement, defineProps, registerCustomElement, type Store } from '@aria-ui-v2/core'
import { useAriaDisabled } from '@aria-ui-v2/utils'

import { tooltipGroup } from './tooltip-group.ts'
import { TooltipStore, TooltipStoreContext } from './tooltip-store.ts'

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

  const store = new TooltipStore(getOpen, emitOpenChange)

  useAriaDisabled(host, getDisabled)

  TooltipStoreContext.provide(host, store)
}

/**
 * @public
 */
export class OpenChangeEvent extends Event {
  readonly open: boolean

  constructor(open: boolean) {
    super('openChange')
    this.open = open
  }
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

### 2.2 Create `packages/elements/src/tooltip/tooltip-trigger.ts`

Handles hover, focus, and keyboard interactions. Uses the tooltip group for delay skipping.

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

  // Set aria-describedby when open
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

### 2.3 Create `packages/elements/src/tooltip/tooltip-popup.ts`

Minimal component that sets `role="tooltip"` and registers its ID with the store.

```typescript
import type { HostElement, Store } from '@aria-ui-v2/core'
import { defineCustomElement, defineProps, registerCustomElement, useEffect } from '@aria-ui-v2/core'
import { useElementId } from '@aria-ui-v2/utils'

import { TooltipStoreContext } from './tooltip-store.ts'

/**
 * @public
 */
export interface TooltipPopupProps {}

/**
 * @internal
 */
export const TooltipPopupPropsDeclaration = /* @__PURE__ */ defineProps<TooltipPopupProps>({})

/**
 * @internal
 */
export function setupTooltipPopup(
  host: HostElement,
  _store: Store<TooltipPopupProps>,
) {
  const getStore = TooltipStoreContext.consume(host)
  const id = useElementId(host)

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.setPopupId(id)
  })

  useEffect(host, () => {
    host.role = 'tooltip'
  })
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

### 2.4 Create `packages/elements/src/tooltip/tooltip-positioner.ts`

Same positioning capabilities as `PopoverPositioner`. Consumes `TooltipStoreContext` instead of `PopoverStoreContext`. Uses shared `updatePlacement`.

```typescript
import type { HostElement } from '@aria-ui-v2/core'
import { computed, defineCustomElement, defineProps, registerCustomElement, useEffect, type Store } from '@aria-ui-v2/core'
import { FeatureDetection, useElementId } from '@aria-ui-v2/utils'
import type { AutoUpdateOptions, Boundary, ElementContext, OffsetOptions, Placement, RootBoundary } from '@floating-ui/dom'

import { updatePlacement } from '../shared/positioning.ts'
import { TooltipStoreContext } from './tooltip-store.ts'

/**
 * @public
 */
export interface TooltipPositionerProps {
  /**
   * @default "absolute"
   */
  strategy: 'absolute' | 'fixed'

  /**
   * @default "top"
   */
  placement: Placement

  /**
   * @default true
   */
  autoUpdate: boolean | AutoUpdateOptions

  /**
   * @default true
   */
  hoist: boolean

  /**
   * @default 6
   */
  offset: OffsetOptions

  /**
   * @default true
   */
  flip: boolean | Placement[]

  /**
   * @default true
   */
  shift: boolean

  /**
   * @default false
   */
  overlap: boolean

  /**
   * @default false
   */
  fitViewport: boolean

  /**
   * @default false
   */
  sameWidth: boolean

  /**
   * @default false
   */
  sameHeight: boolean

  /**
   * @default false
   */
  inline: boolean

  /**
   * @default false
   */
  hide: boolean

  /**
   * @default 'clippingAncestors'
   */
  boundary: Boundary

  /**
   * @default 'viewport'
   */
  rootBoundary: RootBoundary

  /**
   * @default 4
   */
  overflowPadding: number

  /**
   * @default 'floating'
   */
  elementContext: ElementContext

  /**
   * @default false
   */
  altBoundary: boolean
}

/**
 * @internal
 */
export const TooltipPositionerPropsDeclaration = /* @__PURE__ */ defineProps<TooltipPositionerProps>({
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
export function setupTooltipPositioner(
  host: HostElement,
  props: Store<TooltipPositionerProps>,
) {
  const getStore = TooltipStoreContext.consume(host)
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

## Phase 3: Barrel Exports & Registration [ ]

### 3.1 Create `packages/elements/src/tooltip/index.ts`

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

### 3.2 Update `packages/elements/src/index.ts`

Add tooltip imports, exports, registration, and `HTMLElementTagNameMap` entries:

```typescript
import { PopoverPopupElement, registerPopoverPopupElement } from './popover/popover-popup.ts'
import { PopoverPositionerElement, registerPopoverPositionerElement } from './popover/popover-positioner.ts'
import { PopoverRootElement, registerPopoverRootElement } from './popover/popover-root.ts'
import { PopoverTriggerElement, registerPopoverTriggerElement } from './popover/popover-trigger.ts'
import { TooltipPopupElement, registerTooltipPopupElement } from './tooltip/tooltip-popup.ts'
import { TooltipPositionerElement, registerTooltipPositionerElement } from './tooltip/tooltip-positioner.ts'
import { TooltipRootElement, registerTooltipRootElement } from './tooltip/tooltip-root.ts'
import { TooltipTriggerElement, registerTooltipTriggerElement } from './tooltip/tooltip-trigger.ts'

export {
  PopoverPopupElement,
  PopoverPositionerElement,
  PopoverRootElement,
  PopoverTriggerElement,
  registerPopoverPopupElement,
  registerPopoverPositionerElement,
  registerPopoverRootElement,
  registerPopoverTriggerElement,
  TooltipPopupElement,
  TooltipPositionerElement,
  TooltipRootElement,
  TooltipTriggerElement,
  registerTooltipPopupElement,
  registerTooltipPositionerElement,
  registerTooltipRootElement,
  registerTooltipTriggerElement,
}

export function registerElements(): void {
  if (typeof window === 'undefined') {
    return
  }

  registerPopoverRootElement()
  registerPopoverTriggerElement()
  registerPopoverPopupElement()
  registerPopoverPositionerElement()

  registerTooltipRootElement()
  registerTooltipTriggerElement()
  registerTooltipPopupElement()
  registerTooltipPositionerElement()
}

declare global {
  interface HTMLElementTagNameMap {
    'aria-ui-popover-root': PopoverRootElement
    'aria-ui-popover-trigger': PopoverTriggerElement
    'aria-ui-popover-popup': PopoverPopupElement
    'aria-ui-popover-positioner': PopoverPositionerElement
    'aria-ui-tooltip-root': TooltipRootElement
    'aria-ui-tooltip-trigger': TooltipTriggerElement
    'aria-ui-tooltip-popup': TooltipPopupElement
    'aria-ui-tooltip-positioner': TooltipPositionerElement
  }
}
```

## Phase 4: Code Generation & Build [ ]

### 4.1 Update `packages/elements/package.json`

Add tooltip entry to `build:gen` and add `./tooltip` export:

```json
{
  "exports": {
    ".": { ... },
    "./popover": { ... },
    "./tooltip": {
      "aria-ui-dev": "./src/tooltip/index.ts",
      "types": "./dist/tooltip/index.d.ts",
      "import": "./dist/tooltip/index.js"
    }
  },
  "scripts": {
    "build:gen": "aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated --import-source ../../popover/index.ts && aria-ui --tsconfig ./tsconfig.json --entry ./src/tooltip/index.ts --output ./src/generated --import-source ../../tooltip/index.ts"
  }
}
```

### 4.2 Run code generation

```bash
pnpm --filter @aria-ui-v2/elements run build:gen
```

This generates framework wrappers in `src/generated/{react,preact,solid,vue,svelte}/`:
- `tooltip-root.gen.ts`
- `tooltip-trigger.gen.ts`
- `tooltip-popup.gen.ts`
- `tooltip-positioner.gen.ts`
- `tooltip-root.gen.svelte` (plus `.ts`)
- etc.

## Phase 5: Tests [ ]

### 5.1 Create `packages/elements/src/tooltip/tooltip.test.ts`

```typescript
import { FeatureDetectionInternals } from '@aria-ui-v2/utils'
import { html, render } from 'lit-html'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { page } from 'vitest/browser'

import { registerElements } from '../index.ts'

interface Environment {
  popover: boolean
  togglePopoverSource: boolean
}

function collectEnvironments() {
  let environments: Environment[] = [
    {
      popover: false,
      togglePopoverSource: false,
    },
  ]

  if (FeatureDetectionInternals.Popover.detect()) {
    environments = [
      ...environments.map((env) => ({ ...env, popover: true })),
      ...environments.map((env) => ({ ...env, popover: false })),
    ]
  }

  if (FeatureDetectionInternals.TogglePopoverSource.detect()) {
    environments = [
      ...environments.map((env) => ({ ...env, togglePopoverSource: true })),
      ...environments.map((env) => ({ ...env, togglePopoverSource: false })),
    ]
  }

  return environments
}

function setupEnvironment(environment: Environment) {
  FeatureDetectionInternals.Popover.override(environment.popover)
  FeatureDetectionInternals.TogglePopoverSource.override(
    environment.togglePopoverSource,
  )
}

function teardownEnvironment() {
  FeatureDetectionInternals.Popover.reset()
  FeatureDetectionInternals.TogglePopoverSource.reset()
}

function forEachEnvironment(environments: Environment[], callback: () => void) {
  for (const environment of environments) {
    describe(`Environment popover ${environment.popover}`, () => {
      describe(`Environment togglePopoverSource ${environment.togglePopoverSource}`, () => {
        beforeEach(() => {
          setupEnvironment(environment)
        })

        afterEach(() => {
          teardownEnvironment()
        })

        callback()
      })
    })
  }
}

function runTests() {
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

      const trigger = page.getByText('Trigger')
      const popup = page.getByText('Tooltip content')

      expect(trigger).toBeInTheDocument()
      expect(popup).toBeInTheDocument()
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

      const popup = page.getByText('Tooltip content')
      expect(popup).not.toBeVisible()
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

    test('hover opens tooltip with delay', async () => {
      vi.useFakeTimers()

      const container = document.createElement('div')
      document.body.appendChild(container)

      render(
        html`
          <aria-ui-tooltip-root>
            <aria-ui-tooltip-trigger .openDelay=${200}>Trigger</aria-ui-tooltip-trigger>
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

      // Not yet open
      expect(popup).not.toBeVisible()

      // Advance past delay
      vi.advanceTimersByTime(250)
      expect(popup).toBeVisible()

      vi.useRealTimers()
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

      const trigger = page.getByText('Trigger')
      const popup = page.getByText('Tooltip content')

      await trigger.hover()
      expect(popup).not.toBeVisible()
    })
  })

  describe('Focus Interactions', () => {
    test('focus opens tooltip', async () => {
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

    test('blur closes tooltip', async () => {
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

    test('tooltip stays open when hover ends but focus remains', async () => {
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

      // Hover and focus both active
      triggerEl.dispatchEvent(new MouseEvent('mouseenter'))
      triggerEl.dispatchEvent(new FocusEvent('focusin'))
      expect(popup).toBeVisible()

      // Mouse leaves but focus remains
      triggerEl.dispatchEvent(new MouseEvent('mouseleave'))
      expect(popup).toBeVisible()

      // Focus also leaves
      triggerEl.dispatchEvent(new FocusEvent('focusout'))
      expect(popup).not.toBeVisible()
    })
  })

  describe('Keyboard Interactions', () => {
    test('Escape key closes tooltip', async () => {
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
    test('second tooltip opens instantly after first closes within group timeout', async () => {
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

      const triggerA = container.querySelector('[data-testid="trigger-a"]')!
      const triggerB = container.querySelector('[data-testid="trigger-b"]')!
      const popupB = container.querySelector('[data-testid="popup-b"]')!

      // Open tooltip A (using defaultOpen to skip delay)
      const rootA = container.querySelector('aria-ui-tooltip-root')!
      rootA.open = true

      // Close tooltip A (triggers group notification)
      rootA.open = false

      // Now hover trigger B - should open instantly despite 600ms openDelay
      triggerB.dispatchEvent(new MouseEvent('mouseenter'))
      expect(popupB).toBeVisible()

      // Cleanup
      triggerB.dispatchEvent(new MouseEvent('mouseleave'))
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

      root.addEventListener('openChange', () => {
        eventFired = true
      })

      const trigger = page.getByText('Trigger')
      await trigger.hover()
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

      const popup = page.getByTestId('popup')
      expect(popup).toHaveAttribute('role', 'tooltip')
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

      const trigger = page.getByTestId('trigger')
      expect(trigger).not.toHaveAttribute('aria-describedby')
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

      const root = container.querySelector('aria-ui-tooltip-root')!
      const trigger = container.querySelector('aria-ui-tooltip-trigger')!

      expect(root.getAttribute('aria-disabled')).toBe('true')
      expect(trigger.getAttribute('aria-disabled')).toBe('true')
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
| `packages/elements/src/shared/positioning.ts` | **Moved** from `popover/positioning.ts` |
| `packages/elements/src/popover/popover-positioner.ts` | Update import path to `../shared/positioning.ts` |
| `packages/elements/src/tooltip/tooltip-group.ts` | **New** — module-level singleton for shared delay |
| `packages/elements/src/tooltip/tooltip-store.ts` | **New** — context store for tooltip state |
| `packages/elements/src/tooltip/tooltip-root.ts` | **New** — root component (open state, group notification) |
| `packages/elements/src/tooltip/tooltip-trigger.ts` | **New** — hover/focus/keyboard interactions |
| `packages/elements/src/tooltip/tooltip-popup.ts` | **New** — role="tooltip", ID registration |
| `packages/elements/src/tooltip/tooltip-positioner.ts` | **New** — floating-ui positioning |
| `packages/elements/src/tooltip/index.ts` | **New** — barrel export |
| `packages/elements/src/tooltip/tooltip.test.ts` | **New** — comprehensive test suite |
| `packages/elements/src/index.ts` | Add tooltip registration and exports |
| `packages/elements/package.json` | Add `./tooltip` export, update `build:gen` |

## Key Design Decisions

1. **Tooltip Group as module-level singleton** — Simplest approach for web components. All tooltip instances on the page share a single delay tracker. The 400ms group timeout is hardcoded (matching base-ui's default).

2. **Delays on the Trigger, not Root** — The trigger handles hover/focus interactions and manages timers. The `openDelay` (600ms default, matching base-ui) and `closeDelay` (0ms default) are trigger-level props.

3. **Hover + Focus coexistence** — The tooltip stays open as long as either hover or focus is active. This prevents the tooltip from flickering when keyboard-navigating while hovering.

4. **No `aria-expanded` on trigger** — Unlike popover triggers, tooltip triggers use `aria-describedby` instead of `aria-expanded`/`aria-controls`. This follows WAI-ARIA tooltip pattern.

5. **Shared positioning module** — `positioning.ts` is moved to `packages/elements/src/shared/` since both popover and tooltip positioners use identical floating-ui logic.

6. **Group notification in Root** — `tooltipGroup.notifyClosed()` is called in the root's `emitOpenChange` when `open` becomes `false`. This ensures the group timestamp is updated regardless of how the tooltip was closed (hover leave, focus loss, Escape, or programmatic).

## Verification

After implementation:

1. `pnpm --filter @aria-ui-v2/cli typecheck`
2. `pnpm --filter @aria-ui-v2/elements typecheck`
3. `pnpm --filter @aria-ui-v2/elements run build:gen` — generates framework wrappers
4. `pnpm --filter @aria-ui-v2/elements test` — all tests pass
5. `nr fix` — formatting
