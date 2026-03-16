import {
  registerTooltipPopupElement,
  type TooltipPopupElement,
} from "../../tooltip/index.ts";
import type { Component, JSX } from "solid-js";
import h from "solid-js/h";

/** Props for the {@link TooltipPopup} Solid component. */
export interface TooltipPopupProps extends JSX.HTMLAttributes<TooltipPopupElement> {}

export const TooltipPopup: Component<TooltipPopupProps> = (props): any => {
  registerTooltipPopupElement();

  const restProps = props;

  return h("aria-ui-tooltip-popup", restProps);
};
