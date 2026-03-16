import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from "vue";
import {
  registerTooltipRootElement,
  type TooltipRootEvents as TooltipRootElementEvents,
  type TooltipRootProps as TooltipRootElementProps,
} from "../../tooltip/index.ts";

/** Props for the {@link TooltipRoot} Vue component. */
export interface TooltipRootProps {
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen?: TooltipRootElementProps["defaultOpen"];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: TooltipRootElementProps["open"];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: TooltipRootElementProps["disabled"];
  /** Emitted when the tooltip is opened or closed. */
  onOpenChange?: (event: TooltipRootElementEvents["openChange"]) => void;
}

export const TooltipRoot: DefineSetupFnComponent<
  TooltipRootProps & HTMLAttributes
> = defineComponent<TooltipRootProps & HTMLAttributes>(
  (_props, { slots: _slots }) => {
    registerTooltipRootElement();

    return () => {
      const { defaultOpen, open, disabled, onOpenChange, ..._restProps } =
        _props;
      return h(
        "aria-ui-tooltip-root",
        {
          ..._restProps,
          "defaultOpen.prop": defaultOpen,
          "open.prop": open,
          "disabled.prop": disabled,
          "v-on:openChange": onOpenChange,
        },
        _slots.default?.(),
      );
    };
  },
  {
    props: ["defaultOpen", "open", "disabled", "onOpenChange"],
  },
);
