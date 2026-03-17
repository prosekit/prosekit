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
  registerTooltipPopupElement,
  type TooltipPopupElement,
} from "../../tooltip/index.ts";

/**
 * Props for the {@link TooltipPopup} Preact component.
 *
 * @public
 */
export interface TooltipPopupProps extends HTMLAttributes<TooltipPopupElement> {}

const propNames: string[] = [];
const eventNameMap: Record<string, string> = {};

function TooltipPopupComponent(
  props: TooltipPopupProps,
  forwardedRef: Ref<TooltipPopupElement>,
): VNode<any> {
  registerTooltipPopupElement();
  return createElement(PreactWrapper, {
    as: "aria-ui-tooltip-popup",
    propNames,
    eventNameMap,
    props,
    forwardedRef,
  });
}

/**
 * A Preact component that renders an `aria-ui-tooltip-popup` custom element.
 *
 * @public
 */
export const TooltipPopup: ForwardRefExoticComponent<
  TooltipPopupProps & RefAttributes<TooltipPopupElement>
> = /* @__PURE__ */ forwardRef(TooltipPopupComponent);
