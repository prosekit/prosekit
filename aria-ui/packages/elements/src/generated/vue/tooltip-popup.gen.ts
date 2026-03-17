import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from "vue";
import { registerTooltipPopupElement } from "../../tooltip/index.ts";

/** Props for the {@link TooltipPopup} Vue component. */
export interface TooltipPopupProps {}

export const TooltipPopup: DefineSetupFnComponent<
  TooltipPopupProps & HTMLAttributes
> = defineComponent<TooltipPopupProps & HTMLAttributes>(
  (props, { slots }) => {
    registerTooltipPopupElement();

    return () => {
      const { ...restProps } = props;
      return h("aria-ui-tooltip-popup", { ...restProps }, slots.default?.());
    };
  },
  {
    props: [],
  },
);
