import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from "vue";
import {
  registerTooltipTriggerElement,
  type TooltipTriggerProps as TooltipTriggerElementProps,
} from "../../tooltip/index.ts";

/**
 * Props for the {@link TooltipTrigger} Vue component.
 *
 * @public
 */
export interface TooltipTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: TooltipTriggerElementProps["disabled"];
  /**
   * The delay in milliseconds before opening the tooltip on hover.
   * @default 600
   */
  openDelay?: TooltipTriggerElementProps["openDelay"];
  /**
   * The delay in milliseconds before closing the tooltip when hover/focus ends.
   * @default 0
   */
  closeDelay?: TooltipTriggerElementProps["closeDelay"];
}

/**
 * A Vue component that renders an `aria-ui-tooltip-trigger` custom element.
 *
 * @public
 */
export const TooltipTrigger: DefineSetupFnComponent<
  TooltipTriggerProps & HTMLAttributes
> = defineComponent<TooltipTriggerProps & HTMLAttributes>(
  (props, { slots }) => {
    registerTooltipTriggerElement();

    return () => {
      const {
        closeDelay: p0,
        disabled: p1,
        openDelay: p2,
        ...restProps
      } = props;
      return h(
        "aria-ui-tooltip-trigger",
        {
          ...restProps,
          "closeDelay.prop": p0,
          "disabled.prop": p1,
          "openDelay.prop": p2,
        },
        slots.default?.(),
      );
    };
  },
  {
    props: ["closeDelay", "disabled", "openDelay"],
  },
);
