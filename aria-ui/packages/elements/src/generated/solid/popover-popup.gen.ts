import {
  registerPopoverPopupElement,
  type PopoverPopupElement,
} from "../../popover/index.ts";
import type { Component, JSX } from "solid-js";
import h from "solid-js/h";

/** Props for the {@link PopoverPopup} Solid component. */
export interface PopoverPopupProps extends JSX.HTMLAttributes<PopoverPopupElement> {}

export const PopoverPopup: Component<PopoverPopupProps> = (props): any => {
  registerPopoverPopupElement();

  const restProps = props;

  return h("aria-ui-popover-popup", restProps);
};
