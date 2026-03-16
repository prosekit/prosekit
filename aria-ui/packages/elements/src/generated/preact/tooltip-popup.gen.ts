import { createComponent } from "@aria-ui-v2/integrations/preact";
import type { HTMLAttributes } from "preact";
import type { ForwardRefExoticComponent, RefAttributes } from "preact/compat";
import {
  registerTooltipPopupElement,
  type TooltipPopupElement,
} from "../../tooltip/index.ts";

/** Props for the {@link TooltipPopup} Preact component. */
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
