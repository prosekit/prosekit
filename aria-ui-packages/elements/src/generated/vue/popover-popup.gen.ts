import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from 'vue'

import { registerPopoverPopupElement } from '../elements/popover-popup.gen'

/** Props for the {@link PopoverPopup} Vue component. */
export interface PopoverPopupProps {}

export const PopoverPopup: DefineSetupFnComponent<
  PopoverPopupProps & HTMLAttributes
> = defineComponent<PopoverPopupProps & HTMLAttributes>(
  (_props, { slots: _slots }) => {
    registerPopoverPopupElement()

    return () => {
      const { ..._restProps } = _props
      return h('aria-ui-popover-popup', { ..._restProps }, _slots.default?.())
    }
  },
  {
    props: [],
  },
)
