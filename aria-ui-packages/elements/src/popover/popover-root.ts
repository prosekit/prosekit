import type { HostElement, PropsDeclaration } from '@aria-ui-v2/core'
import { computed, defineProps, type Store } from '@aria-ui-v2/core'
import { useAriaDisabled } from '@aria-ui-v2/utils'

import { PopoverStore, PopoverStoreContext } from './popover-store.ts'

/**
 * @public
 */
export interface PopoverRootProps {
  /**
   * Whether the popover is initially open.
   *
   * To render a controlled popover, use the `open` property instead.
   * @default false
   */
  defaultOpen: boolean

  /**
   * Whether the popover is currently open.
   *
   * @default null
   */
  open: boolean | null

  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal: boolean

  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const PopoverRootPropsDeclaration: PropsDeclaration<PopoverRootProps> =
  defineProps<PopoverRootProps>({
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
    modal: {
      default: false,
      attribute: 'modal',
      type: 'boolean',
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
export interface PopoverRootEvents {
  /**
   * Emitted when the popover is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupPopoverRoot(
  host: HostElement,
  props: Store<PopoverRootProps>,
) {
  const getOpen = computed(() => {
    const open = props.open.get()
    const defaultOpen = props.defaultOpen.get()
    return open ?? defaultOpen
  })

  const getDisabled = computed(() => {
    return props.disabled.get()
  })

  const emitOpenChange = (open: boolean) => {
    if (getDisabled()) return
    const event = new OpenChangeEvent(open)
    host.dispatchEvent(event)
    if (event.defaultPrevented) return
    props.open.set(open)
  }

  const store = new PopoverStore(getOpen, emitOpenChange)

  useAriaDisabled(host, getDisabled)

  PopoverStoreContext.provide(host, store)
}

/**
 * Represents an event that fires when a popover element is toggled between being shown and hidden.
 *
 * Call `event.preventDefault()` to prevent the popover from opening or closing.
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
