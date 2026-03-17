import { PreactWrapper } from "@aria-ui-v2/integrations/preact";
import { createElement, type HTMLAttributes, type Ref } from "preact";
import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "preact/compat";
import {
  registerTooltipRootElement,
  type TooltipRootElement,
  type TooltipRootProps as TooltipRootElementProps,
  type TooltipRootEvents as TooltipRootElementEvents,
} from "../../tooltip/index.ts";

const propNames: string[] = ["defaultOpen", "disabled", "open"];
const eventNameMap: Record<string, string> = { onOpenChange: "openChange" };

/**
 * Props for the {@link TooltipRoot} Preact component.
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
  forwardedRef: Ref<TooltipRootElement>,
) {
  registerTooltipRootElement();
  return createElement(PreactWrapper, {
    as: "aria-ui-tooltip-root",
    propNames,
    eventNameMap,
    props,
    forwardedRef,
  });
}

/**
 * A Preact component that renders an `aria-ui-tooltip-root` custom element.
 *
 * @public
 */
export const TooltipRoot: ForwardRefExoticComponent<
  TooltipRootProps & RefAttributes<TooltipRootElement>
> = /* @__PURE__ */ forwardRef(TooltipRootComponent);
