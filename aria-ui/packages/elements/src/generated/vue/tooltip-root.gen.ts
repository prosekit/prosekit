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

/**
 * Props for the {@link TooltipRoot} Vue component.
 *
 * @public
 */
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

/**
 * A Vue component that renders an `aria-ui-tooltip-root` custom element.
 *
 * @public
 */
export const TooltipRoot: DefineSetupFnComponent<
  TooltipRootProps & HTMLAttributes
> = defineComponent<TooltipRootProps & HTMLAttributes>(
  (props, { slots }) => {
    registerTooltipRootElement();

    return () => {
      const {
        defaultOpen: p0,
        disabled: p1,
        open: p2,
        onOpenChange: p3,
        ...restProps
      } = props;
      return h(
        "aria-ui-tooltip-root",
        {
          ...restProps,
          "defaultOpen.prop": p0,
          "disabled.prop": p1,
          "open.prop": p2,
          "v-on:openChange": p3,
        },
        slots.default?.(),
      );
    };
  },
  {
    props: ["defaultOpen", "disabled", "open", "onOpenChange"],
  },
);
