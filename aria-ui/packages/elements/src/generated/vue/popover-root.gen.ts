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
        defaultOpen: p0,
        disabled: p1,
        modal: p2,
        open: p3,
        onOpenChange: p4,
        ...restProps
      } = props;
      return h(
        "aria-ui-popover-root",
        {
          ...restProps,
          "defaultOpen.prop": p0,
          "disabled.prop": p1,
          "modal.prop": p2,
          "open.prop": p3,
          "v-on:openChange": p4,
        },
        slots.default?.(),
      );
    };
  },
  {
    props: ["defaultOpen", "disabled", "modal", "open", "onOpenChange"],
  },
);
