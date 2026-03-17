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

/** Props for the {@link PopoverTrigger} Vue component. */
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

export const PopoverTrigger: DefineSetupFnComponent<
  PopoverTriggerProps & HTMLAttributes
> = defineComponent<PopoverTriggerProps & HTMLAttributes>(
  (props, { slots }) => {
    registerPopoverTriggerElement();

    return () => {
      const {
        disabled: p0,
        openOnHover: p1,
        delay: p2,
        closeDelay: p3,
        onOpenChange: p4,
        ...restProps
      } = props;
      return h(
        "aria-ui-popover-trigger",
        {
          ...restProps,
          "disabled.prop": p0,
          "openOnHover.prop": p1,
          "delay.prop": p2,
          "closeDelay.prop": p3,
          "v-on:openChange": p4,
        },
        slots.default?.(),
      );
    };
  },
  {
    props: ["disabled", "openOnHover", "delay", "closeDelay", "onOpenChange"],
  },
);
