import { createComponent } from "@aria-ui-v2/integrations/react";
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import {
  registerTooltipRootElement,
  type TooltipRootElement,
  type TooltipRootProps as TooltipRootElementProps,
  type TooltipRootEvents as TooltipRootElementEvents,
} from "../../tooltip/index.ts";

/** Props for the {@link TooltipRoot} React component. */
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

const propNames: string[] = ["defaultOpen", "open", "disabled"];
const eventHandlersMap: Record<string, string> = { onOpenChange: "openChange" };
export const TooltipRoot: ForwardRefExoticComponent<
  TooltipRootProps & RefAttributes<TooltipRootElement>
> = /* @__PURE__ */ createComponent(
  "aria-ui-tooltip-root",
  "TooltipRoot",
  propNames,
  eventHandlersMap,
  registerTooltipRootElement,
);
