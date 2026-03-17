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
  (props, { slots }) => {
    registerTooltipRootElement();

    return () => {
      const {
        defaultOpen: p0,
        open: p1,
        disabled: p2,
        onOpenChange: p3,
        ...restProps
      } = props;
      return h(
        "aria-ui-tooltip-root",
        {
          ...restProps,
          "defaultOpen.prop": p0,
          "open.prop": p1,
          "disabled.prop": p2,
          "v-on:openChange": p3,
        },
        slots.default?.(),
      );
    };
  },
  {
    props: ["defaultOpen", "open", "disabled", "onOpenChange"],
  },
);
