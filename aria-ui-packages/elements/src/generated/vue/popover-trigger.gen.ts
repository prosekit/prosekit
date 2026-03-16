import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from 'vue'
import type {
  PopoverTriggerEvents as PopoverTriggerElementEvents,
  PopoverTriggerProps as PopoverTriggerElementProps,
} from '../../popover/popover-trigger'
import { registerPopoverTriggerElement } from '../elements/popover-trigger.gen'

/** Props for the {@link PopoverTrigger} Vue component. */
export interface PopoverTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: PopoverTriggerElementProps['disabled']
  /**
   * Whether the popover should also open when the trigger is hovered.
   * @default false
   */
  openOnHover?: PopoverTriggerElementProps['openOnHover']
  /**
   * The delay in milliseconds before opening the popover when hovering.
   * Only applies when `openOnHover` is true.
   * @default 300
   */
  delay?: PopoverTriggerElementProps['delay']
  /**
   * The delay in milliseconds before closing the popover when hover ends.
   * Only applies when `openOnHover` is true.
   * @default 0
   */
  closeDelay?: PopoverTriggerElementProps['closeDelay']
  /** Emitted when the popover is opened or closed. */
  onOpenChange?: (event: PopoverTriggerElementEvents['openChange']) => void
}

export const PopoverTrigger: DefineSetupFnComponent<
  PopoverTriggerProps & HTMLAttributes
> = defineComponent<PopoverTriggerProps & HTMLAttributes>(
  (_props, { slots: _slots }) => {
    registerPopoverTriggerElement()

    return () => {
      const {
        disabled,
        openOnHover,
        delay,
        closeDelay,
        onOpenChange,
        ..._restProps
      } = _props
      return h(
        'aria-ui-popover-trigger',
        {
          ..._restProps,
          'disabled.prop': disabled,
          'openOnHover.prop': openOnHover,
          'delay.prop': delay,
          'closeDelay.prop': closeDelay,
          'v-on:openChange': onOpenChange,
        },
        _slots.default?.(),
      )
    }
  },
  {
    props: ['disabled', 'openOnHover', 'delay', 'closeDelay', 'onOpenChange'],
  },
)
