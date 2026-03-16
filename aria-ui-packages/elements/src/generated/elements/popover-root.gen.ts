import {
  createAttributePropertyNameMap,
  createStore,
  handleAttributeChanged,
  HostElement,
  registerCustomElement,
  type Store,
  usePropertiesToAttributes,
} from "@aria-ui-v2/core";
import {
  PopoverRootPropsDeclaration,
  setupPopoverRoot,
  type PopoverRootProps,
} from "../../popover/popover-root";

const attributeNameToPropertyName =
  /* @__PURE__ */ createAttributePropertyNameMap(PopoverRootPropsDeclaration);
const observedAttributes: string[] = /* @__PURE__ */ Array.from(
  attributeNameToPropertyName.keys(),
);

export class PopoverRootElement extends HostElement {
  private _store: Store<PopoverRootProps>;
  static observedAttributes = observedAttributes;

  constructor() {
    super();
    this._store = createStore(this, PopoverRootPropsDeclaration);
    setupPopoverRoot(this, this._store);
    usePropertiesToAttributes(this, this._store, PopoverRootPropsDeclaration);
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ): void {
    handleAttributeChanged(
      this._store,
      PopoverRootPropsDeclaration,
      attributeNameToPropertyName,
      name,
      newValue,
    );
  }

  /**
   * Whether the popover is initially open.
   *
   * To render a controlled popover, use the `open` property instead.
   * @default false
   */
  get defaultOpen(): PopoverRootProps["defaultOpen"] {
    return this._store.defaultOpen.get();
  }

  set defaultOpen(value: PopoverRootProps["defaultOpen"]) {
    this._store.defaultOpen.set(value);
  }

  /**
   * Whether the popover is currently open.
   *
   * @default undefined
   */
  get open(): PopoverRootProps["open"] {
    return this._store.open.get();
  }

  set open(value: PopoverRootProps["open"]) {
    this._store.open.set(value);
  }

  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  get modal(): PopoverRootProps["modal"] {
    return this._store.modal.get();
  }

  set modal(value: PopoverRootProps["modal"]) {
    this._store.modal.set(value);
  }

  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  get disabled(): PopoverRootProps["disabled"] {
    return this._store.disabled.get();
  }

  set disabled(value: PopoverRootProps["disabled"]) {
    this._store.disabled.set(value);
  }
}

export function registerPopoverRootElement(): void {
  registerCustomElement("aria-ui-popover-root", PopoverRootElement);
}
