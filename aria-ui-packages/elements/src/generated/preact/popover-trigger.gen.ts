import { createComponent } from '@aria-ui/integrations/preact'
import type { HTMLAttributes } from 'preact'
import type { ForwardRefExoticComponent, RefAttributes } from 'preact/compat'
import type {
  PopoverTriggerProps as PopoverTriggerElementProps,
  PopoverTriggerEvents as PopoverTriggerElementEvents,
} from '../../popover/popover-trigger'
import {
  registerPopoverTriggerElement,
  type PopoverTriggerElement,
} from '../elements/popover-trigger.gen'

/** Props for the {@link PopoverTrigger} Preact component. */
export interface PopoverTriggerProps
  extends HTMLAttributes<PopoverTriggerElement> {
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

const propNames: string[] = ['disabled', 'openOnHover', 'delay', 'closeDelay']
const eventHandlersMap: Record<string, string> = { onOpenChange: 'openChange' }
export const PopoverTrigger: ForwardRefExoticComponent<
  PopoverTriggerProps & RefAttributes<PopoverTriggerElement>
> = /* @__PURE__ */ createComponent(
  'aria-ui-popover-trigger',
  'PopoverTrigger',
  propNames,
  eventHandlersMap,
  registerPopoverTriggerElement,
)
