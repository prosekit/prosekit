import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from "vue";
import {
  registerPopoverRootElement,
  type PopoverRootEvents as PopoverRootElementEvents,
  type PopoverRootProps as PopoverRootElementProps,
} from "../../popover/index.ts";

/**
 * Props for the {@link PopoverRoot} Vue component.
 *
 * @public
 */
export interface PopoverRootProps {
  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal?: PopoverRootElementProps["modal"];
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen?: PopoverRootElementProps["defaultOpen"];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: PopoverRootElementProps["open"];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: PopoverRootElementProps["disabled"];
  /** Emitted when the popover is opened or closed. */
  onOpenChange?: (event: PopoverRootElementEvents["openChange"]) => void;
}

/**
 * A Vue component that renders an `aria-ui-popover-root` custom element.
 *
 * @public
 */
export const PopoverRoot: DefineSetupFnComponent<
  PopoverRootProps & HTMLAttributes
> = defineComponent<PopoverRootProps & HTMLAttributes>(
  (props, { slots }) => {
    registerPopoverRootElement();

    return () => {
      const {
        modal: p0,
        defaultOpen: p1,
        open: p2,
        disabled: p3,
        onOpenChange: p4,
        ...restProps
      } = props;
      return h(
        "aria-ui-popover-root",
        {
          ...restProps,
          "modal.prop": p0,
          "defaultOpen.prop": p1,
          "open.prop": p2,
          "disabled.prop": p3,
          "v-on:openChange": p4,
        },
        slots.default?.(),
      );
    };
  },
  {
    props: ["modal", "defaultOpen", "open", "disabled", "onOpenChange"],
  },
);
