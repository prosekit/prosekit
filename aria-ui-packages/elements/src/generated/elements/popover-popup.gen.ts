import {
  createStore,
  HostElement,
  registerCustomElement,
  type Store,
} from "@aria-ui-v2/core";
import {
  PopoverPopupPropsDeclaration,
  setupPopoverPopup,
  type PopoverPopupProps,
} from "../../popover/popover-popup";

export class PopoverPopupElement extends HostElement {
  private _store: Store<PopoverPopupProps>;

  constructor() {
    super();
    this._store = createStore(this, PopoverPopupPropsDeclaration);
    setupPopoverPopup(this, this._store);
  }
}

export function registerPopoverPopupElement(): void {
  registerCustomElement("aria-ui-popover-popup", PopoverPopupElement);
}
