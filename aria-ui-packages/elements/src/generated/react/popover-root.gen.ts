import { createComponent } from '@aria-ui/integrations/react'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'
import type {
  PopoverRootProps as PopoverRootElementProps,
  PopoverRootEvents as PopoverRootElementEvents,
} from '../../popover/popover-root'
import {
  registerPopoverRootElement,
  type PopoverRootElement,
} from '../elements/popover-root.gen'

/** Props for the {@link PopoverRoot} React component. */
export interface PopoverRootProps extends HTMLAttributes<PopoverRootElement> {
  /**
   * Whether the popover is initially open.
   *
   * To render a controlled popover, use the `open` property instead.
   * @default false
   */
  defaultOpen?: PopoverRootElementProps['defaultOpen']
  /**
   * Whether the popover is currently open.
   *
   * @default undefined
   */
  open?: PopoverRootElementProps['open']
  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal?: PopoverRootElementProps['modal']
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: PopoverRootElementProps['disabled']
  /** Emitted when the popover is opened or closed. */
  onOpenChange?: (event: PopoverRootElementEvents['openChange']) => void
}

const propNames: string[] = ['defaultOpen', 'open', 'modal', 'disabled']
const eventHandlersMap: Record<string, string> = { onOpenChange: 'openChange' }
export const PopoverRoot: ForwardRefExoticComponent<
  PopoverRootProps & RefAttributes<PopoverRootElement>
> = /* @__PURE__ */ createComponent(
  'aria-ui-popover-root',
  'PopoverRoot',
  propNames,
  eventHandlersMap,
  registerPopoverRootElement,
)
