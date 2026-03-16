import { createComponent } from "@aria-ui-v2/integrations/react";
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import {
  registerTooltipPopupElement,
  type TooltipPopupElement,
} from "../../tooltip/index.ts";

/** Props for the {@link TooltipPopup} React component. */
export interface TooltipPopupProps extends HTMLAttributes<TooltipPopupElement> {}

const propNames: string[] = [];
const eventHandlersMap: Record<string, string> = {};
export const TooltipPopup: ForwardRefExoticComponent<
  TooltipPopupProps & RefAttributes<TooltipPopupElement>
> = /* @__PURE__ */ createComponent(
  "aria-ui-tooltip-popup",
  "TooltipPopup",
  propNames,
  eventHandlersMap,
  registerTooltipPopupElement,
);
