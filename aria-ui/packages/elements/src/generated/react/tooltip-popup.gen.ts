import { ReactWrapper } from "@aria-ui-v2/integrations/react";
import {
  createElement,
  forwardRef,
  type ForwardedRef,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type ReactElement,
  type RefAttributes,
} from "react";
import {
  registerTooltipPopupElement,
  type TooltipPopupElement,
} from "../../tooltip/index.ts";

/**
 * Props for the {@link TooltipPopup} React component.
 *
 * @public
 */
export interface TooltipPopupProps extends HTMLAttributes<TooltipPopupElement> {}

const propNames: string[] = [];
const eventNameMap: Record<string, string> = {};

function TooltipPopupComponent(
  props: TooltipPopupProps,
  forwardedRef: ForwardedRef<TooltipPopupElement>,
): ReactElement {
  registerTooltipPopupElement();
  return createElement(ReactWrapper, {
    as: "aria-ui-tooltip-popup",
    propNames,
    eventNameMap,
    props,
    forwardedRef,
  });
}

/**
 * A React component that renders an `aria-ui-tooltip-popup` custom element.
 *
 * @public
 */
export const TooltipPopup: ForwardRefExoticComponent<
  TooltipPopupProps & RefAttributes<TooltipPopupElement>
> = /* @__PURE__ */ forwardRef(TooltipPopupComponent);
