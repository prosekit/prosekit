import {
  registerTooltipRootElement,
  type TooltipRootElement,
  type TooltipRootEvents as TooltipRootElementEvents,
  type TooltipRootProps as TooltipRootElementProps,
} from "../../tooltip/index.ts";
import { mergeProps, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import h from "solid-js/h";

/**
 * Props for the {@link TooltipRoot} Solid component.
 *
 * @public
 */
export interface TooltipRootProps extends JSX.HTMLAttributes<TooltipRootElement> {
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
 * A Solid component that renders an `aria-ui-tooltip-root` custom element.
 *
 * @public
 */
export const TooltipRoot: Component<TooltipRootProps> = (props): any => {
  registerTooltipRootElement();

  const [elementProps, eventHandlers, restProps] = splitProps(
    props,
    ["defaultOpen", "open", "disabled"],
    ["onOpenChange"],
  );

  return h(
    "aria-ui-tooltip-root",
    mergeProps(restProps, {
      "prop:defaultOpen": () => elementProps.defaultOpen,
      "prop:open": () => elementProps.open,
      "prop:disabled": () => elementProps.disabled,
      "on:openChange": (event: TooltipRootElementEvents["openChange"]) =>
        eventHandlers.onOpenChange?.(event),
    }),
  );
};
