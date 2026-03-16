import { createComponent } from '@aria-ui/integrations/react'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react'
import {
  registerPopoverPopupElement,
  type PopoverPopupElement,
} from '../elements/popover-popup.gen'

/** Props for the {@link PopoverPopup} React component. */
export interface PopoverPopupProps
  extends HTMLAttributes<PopoverPopupElement> {}

const propNames: string[] = []
const eventHandlersMap: Record<string, string> = {}
export const PopoverPopup: ForwardRefExoticComponent<
  PopoverPopupProps & RefAttributes<PopoverPopupElement>
> = /* @__PURE__ */ createComponent(
  'aria-ui-popover-popup',
  'PopoverPopup',
  propNames,
  eventHandlersMap,
  registerPopoverPopupElement,
)
