import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from "vue";
import { registerTooltipPopupElement } from "../../tooltip/index.ts";

/**
 * Props for the {@link TooltipPopup} Vue component.
 *
 * @public
 */
export interface TooltipPopupProps {}

/**
 * A Vue component that renders an `aria-ui-tooltip-popup` custom element.
 *
 * @public
 */
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
