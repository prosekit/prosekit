import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type HTMLAttributes,
} from "vue";
import type {
  PopoverRootEvents as PopoverRootElementEvents,
  PopoverRootProps as PopoverRootElementProps,
} from "../../popover/popover-root";
import { registerPopoverRootElement } from "../elements/popover-root.gen";

/** Props for the {@link PopoverRoot} Vue component. */
export interface PopoverRootProps {
  /**
   * Whether the popover is initially open.
   *
   * To render a controlled popover, use the `open` property instead.
   * @default false
   */
  defaultOpen?: PopoverRootElementProps["defaultOpen"];
  /**
   * Whether the popover is currently open.
   *
   * @default undefined
   */
  open?: PopoverRootElementProps["open"];
  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal?: PopoverRootElementProps["modal"];
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
        defaultOpen,
        open,
        modal,
        disabled,
        onOpenChange,
        ..._restProps
      } = _props;
      return h(
        "aria-ui-popover-root",
        {
          ..._restProps,
          "defaultOpen.prop": defaultOpen,
          "open.prop": open,
          "modal.prop": modal,
          "disabled.prop": disabled,
          "v-on:openChange": onOpenChange,
        },
        _slots.default?.(),
      );
    };
  },
  {
    props: ["defaultOpen", "open", "modal", "disabled", "onOpenChange"],
  },
);
