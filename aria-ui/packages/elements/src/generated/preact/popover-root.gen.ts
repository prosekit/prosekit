import { PreactWrapper } from "@aria-ui-v2/integrations/preact";
import {
  createElement,
  type HTMLAttributes,
  type Ref,
  type VNode,
} from "preact";
import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "preact/compat";
import {
  registerPopoverRootElement,
  type PopoverRootElement,
  type PopoverRootProps as PopoverRootElementProps,
  type PopoverRootEvents as PopoverRootElementEvents,
} from "../../popover/index.ts";

/**
 * Props for the {@link PopoverRoot} Preact component.
 *
 * @public
 */
export interface PopoverRootProps extends HTMLAttributes<PopoverRootElement> {
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

const propNames: string[] = ["modal", "defaultOpen", "open", "disabled"];
const eventNameMap: Record<string, string> = { onOpenChange: "openChange" };

function PopoverRootComponent(
  props: PopoverRootProps,
  forwardedRef: Ref<PopoverRootElement>,
): VNode<any> {
  registerPopoverRootElement();
  return createElement(PreactWrapper, {
    as: "aria-ui-popover-root",
    propNames,
    eventNameMap,
    props,
    forwardedRef,
  });
}

/**
 * A Preact component that renders an `aria-ui-popover-root` custom element.
 *
 * @public
 */
export const PopoverRoot: ForwardRefExoticComponent<
  PopoverRootProps & RefAttributes<PopoverRootElement>
> = /* @__PURE__ */ forwardRef(PopoverRootComponent);
