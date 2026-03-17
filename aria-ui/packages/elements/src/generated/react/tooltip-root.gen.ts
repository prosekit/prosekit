import { ReactWrapper } from "@aria-ui-v2/integrations/react";
import {
  createElement,
  forwardRef,
  type ForwardedRef,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type RefAttributes,
} from "react";
import {
  registerTooltipRootElement,
  type TooltipRootElement,
  type TooltipRootProps as TooltipRootElementProps,
  type TooltipRootEvents as TooltipRootElementEvents,
} from "../../tooltip/index.ts";

const propNames: string[] = ["defaultOpen", "open", "disabled"];
const eventNameMap: Record<string, string> = { onOpenChange: "openChange" };

/**
 * Props for the {@link TooltipRoot} React component.
 *
 * @public
 */
export interface TooltipRootProps extends HTMLAttributes<TooltipRootElement> {
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

function TooltipRootComponent(
  props: TooltipRootProps,
  forwardedRef: ForwardedRef<TooltipRootElement>,
) {
  registerTooltipRootElement();
  return createElement(ReactWrapper, {
    as: "aria-ui-tooltip-root",
    propNames,
    eventNameMap,
    props,
    forwardedRef,
  });
}

/**
 * A React component that renders an `aria-ui-tooltip-root` custom element.
 *
 * @public
 */
export const TooltipRoot: ForwardRefExoticComponent<
  TooltipRootProps & RefAttributes<TooltipRootElement>
> = /* @__PURE__ */ forwardRef(TooltipRootComponent);
