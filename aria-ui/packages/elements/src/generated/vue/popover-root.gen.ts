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

/** Props for the {@link PopoverRoot} Vue component. */
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

export const PopoverRoot: DefineSetupFnComponent<
  PopoverRootProps & HTMLAttributes
> = defineComponent<PopoverRootProps & HTMLAttributes>(
  (_props, { slots: _slots }) => {
    registerPopoverRootElement();

    return () => {
      const {
        modal,
        defaultOpen,
        open,
        disabled,
        onOpenChange,
        ..._restProps
      } = _props;
      return h(
        "aria-ui-popover-root",
        {
          ..._restProps,
          "modal.prop": modal,
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
    props: ["modal", "defaultOpen", "open", "disabled", "onOpenChange"],
  },
);
