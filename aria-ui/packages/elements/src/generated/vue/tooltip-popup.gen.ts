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
  (_props, { slots: _slots }) => {
    registerTooltipPopupElement();

    return () => {
      const { ..._restProps } = _props;
      return h("aria-ui-tooltip-popup", { ..._restProps }, _slots.default?.());
    };
  },
  {
    props: [],
  },
);
