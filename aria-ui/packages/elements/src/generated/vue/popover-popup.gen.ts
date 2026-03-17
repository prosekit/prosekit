import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from "vue";
import { registerPopoverPopupElement } from "../../popover/index.ts";

/** Props for the {@link PopoverPopup} Vue component. */
export interface PopoverPopupProps {}

export const PopoverPopup: DefineSetupFnComponent<
  PopoverPopupProps & HTMLAttributes
> = defineComponent<PopoverPopupProps & HTMLAttributes>(
  (props, { slots }) => {
    registerPopoverPopupElement();

    return () => {
      const { ...restProps } = props;
      return h("aria-ui-popover-popup", { ...restProps }, slots.default?.());
    };
  },
  {
    props: [],
  },
);
