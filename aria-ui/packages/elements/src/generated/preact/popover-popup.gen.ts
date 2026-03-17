import { PreactWrapper } from "@aria-ui-v2/integrations/preact";
import { createElement, type HTMLAttributes, type Ref } from "preact";
import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "preact/compat";
import {
  registerPopoverPopupElement,
  type PopoverPopupElement,
} from "../../popover/index.ts";

const propNames: string[] = [];
const eventNameMap: Record<string, string> = {};

/**
 * Props for the {@link PopoverPopup} Preact component.
 *
 * @public
 */
export interface PopoverPopupProps extends HTMLAttributes<PopoverPopupElement> {}

function PopoverPopupComponent(
  props: PopoverPopupProps,
  forwardedRef: Ref<PopoverPopupElement>,
) {
  registerPopoverPopupElement();
  return createElement(PreactWrapper, {
    as: "aria-ui-popover-popup",
    propNames,
    eventNameMap,
    props,
    forwardedRef,
  });
}

/**
 * A Preact component that renders an `aria-ui-popover-popup` custom element.
 *
 * @public
 */
export const PopoverPopup: ForwardRefExoticComponent<
  PopoverPopupProps & RefAttributes<PopoverPopupElement>
> = /* @__PURE__ */ forwardRef(PopoverPopupComponent);
