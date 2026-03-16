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

/** Props for the {@link TooltipTrigger} Vue component. */
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

export const TooltipTrigger: DefineSetupFnComponent<
  TooltipTriggerProps & HTMLAttributes
> = defineComponent<TooltipTriggerProps & HTMLAttributes>(
  (_props, { slots: _slots }) => {
    registerTooltipTriggerElement();

    return () => {
      const { disabled, openDelay, closeDelay, ..._restProps } = _props;
      return h(
        "aria-ui-tooltip-trigger",
        {
          ..._restProps,
          "disabled.prop": disabled,
          "openDelay.prop": openDelay,
          "closeDelay.prop": closeDelay,
        },
        _slots.default?.(),
      );
    };
  },
  {
    props: ["disabled", "openDelay", "closeDelay"],
  },
);
