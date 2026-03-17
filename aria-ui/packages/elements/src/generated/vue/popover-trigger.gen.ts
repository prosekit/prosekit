import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from "vue";
import {
  registerPopoverTriggerElement,
  type PopoverTriggerEvents as PopoverTriggerElementEvents,
  type PopoverTriggerProps as PopoverTriggerElementProps,
} from "../../popover/index.ts";

/**
 * Props for the {@link PopoverTrigger} Vue component.
 *
 * @public
 */
export interface PopoverTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: PopoverTriggerElementProps["disabled"];
  /**
   * Whether the popover should also open when the trigger is hovered.
   * @default false
   */
  openOnHover?: PopoverTriggerElementProps["openOnHover"];
  /**
   * The delay in milliseconds before opening the popover when hovering.
   * Only applies when `openOnHover` is true.
   * @default 300
   */
  delay?: PopoverTriggerElementProps["delay"];
  /**
   * The delay in milliseconds before closing the popover when hover ends.
   * Only applies when `openOnHover` is true.
   * @default 0
   */
  closeDelay?: PopoverTriggerElementProps["closeDelay"];
  /** Emitted when the popover is opened or closed. */
  onOpenChange?: (event: PopoverTriggerElementEvents["openChange"]) => void;
}

/**
 * A Vue component that renders an `aria-ui-popover-trigger` custom element.
 *
 * @public
 */
export const PopoverTrigger: DefineSetupFnComponent<
  PopoverTriggerProps & HTMLAttributes
> = defineComponent<PopoverTriggerProps & HTMLAttributes>(
  (props, { slots }) => {
    registerPopoverTriggerElement();

    return () => {
      const {
        closeDelay: p0,
        delay: p1,
        disabled: p2,
        openOnHover: p3,
        onOpenChange: p4,
        ...restProps
      } = props;
      return h(
        "aria-ui-popover-trigger",
        {
          ...restProps,
          "closeDelay.prop": p0,
          "delay.prop": p1,
          "disabled.prop": p2,
          "openOnHover.prop": p3,
          "v-on:openChange": p4,
        },
        slots.default?.(),
      );
    };
  },
  {
    props: ["closeDelay", "delay", "disabled", "openOnHover", "onOpenChange"],
  },
);
