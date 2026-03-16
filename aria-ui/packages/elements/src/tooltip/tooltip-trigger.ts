import type { HostElement } from '@aria-ui-v2/core'
import { computed, defineCustomElement, defineProps, registerCustomElement, useEffect, type Store } from '@aria-ui-v2/core'
import { createDelayedToggle, useAriaDescribedBy, useAriaDisabled } from '@aria-ui-v2/utils'

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

  const getAriaDescribedBy = computed(() => {
    const open = getOpen()
    const popupId = getPopupId()
    return open && popupId ? popupId : undefined
  })
  useAriaDescribedBy(host, getAriaDescribedBy)

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

    const controller = new AbortController()
    const { signal } = controller

    host.addEventListener('mouseenter', onMouseEnter, { signal })
    host.addEventListener('mouseleave', onMouseLeave, { signal })
    host.addEventListener('focusin', onFocusIn, { signal })
    host.addEventListener('focusout', onFocusOut, { signal })
    host.addEventListener('keydown', onKeyDown, { signal })

    return () => {
      controller.abort()
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
