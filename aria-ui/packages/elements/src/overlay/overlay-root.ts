import type { Context, HostElement, PropsDeclaration } from '@aria-ui-v2/core'
import { computed, defineProps, type Store } from '@aria-ui-v2/core'
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
export function useOverlayStore(
  host: HostElement,
  props: Store<OverlayRootProps>,
  options?: SetupOverlayRootOptions,
): OverlayStore {
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

  return store
}

// TODO: remove setupOverlayRoot function because it's too lightwight to justify its existence. Instead, we can just call useOverlayStore directly in the component.

/**
 * @internal
 */
export function setupOverlayRoot(
  host: HostElement,
  props: Store<OverlayRootProps>,
  storeContext: Context<OverlayStore>,
  options?: SetupOverlayRootOptions,
): void {
  const store = useOverlayStore(host, props, options)
  storeContext.provide(host, store)
}
