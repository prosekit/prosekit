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
  registerPopoverPopupElement,
  type PopoverPopupElement,
} from "../../popover/index.ts";

const propNames: string[] = [];
const eventNameMap: Record<string, string> = {};

/**
 * Props for the {@link PopoverPopup} React component.
 *
 * @public
 */
export interface PopoverPopupProps extends HTMLAttributes<PopoverPopupElement> {}

function PopoverPopupComponent(
  props: PopoverPopupProps,
  forwardedRef: ForwardedRef<PopoverPopupElement>,
) {
  registerPopoverPopupElement();
  return createElement(ReactWrapper, {
    as: "aria-ui-popover-popup",
    propNames,
    eventNameMap,
    props,
    forwardedRef,
  });
}

/**
 * A React component that renders an `aria-ui-popover-popup` custom element.
 *
 * @public
 */
export const PopoverPopup: ForwardRefExoticComponent<
  PopoverPopupProps & RefAttributes<PopoverPopupElement>
> = /* @__PURE__ */ forwardRef(PopoverPopupComponent);
