import type { Context, HostElement, PropsDeclaration } from '@aria-ui-v2/core'
import { computed, defineProps, type Store } from '@aria-ui-v2/core'
import { useAriaDisabled } from '@aria-ui-v2/utils'

import type { OpenChangeEvent } from './open-change-event.ts'
import type { OverlayStore } from './overlay-store.ts'
import { createOverlayStore } from './overlay-store.ts'

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
  // TODO: why do I need this callback?
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



  const getDisabled = computed(() => props.disabled.get())


  const dispatchOpenChangeEvent = (event: OpenChangeEvent) => {
        options?.onBeforeOpenChange?.(event.open)
        host.dispatchEvent(event)
  }

  const store =createOverlayStore(
    props.open.get,
    props.open.set,
    props.defaultOpen.get,
    getDisabled,
   dispatchOpenChangeEvent,
  )

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
