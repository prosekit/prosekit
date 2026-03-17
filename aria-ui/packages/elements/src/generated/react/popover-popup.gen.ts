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
  registerPopoverPopupElement,
  type PopoverPopupElement,
} from "../../popover/index.ts";

/**
 * Props for the {@link PopoverPopup} React component.
 *
 * @public
 */
export interface PopoverPopupProps extends HTMLAttributes<PopoverPopupElement> {}

const propNames: string[] = [];
const eventNameMap: Record<string, string> = {};

function PopoverPopupComponent(
  props: PopoverPopupProps,
  forwardedRef: ForwardedRef<PopoverPopupElement>,
): ReactElement {
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
