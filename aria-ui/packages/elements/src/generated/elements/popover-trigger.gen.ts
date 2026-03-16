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
  PopoverTriggerPropsDeclaration,
  setupPopoverTrigger,
  type PopoverTriggerProps,
} from "../../popover/popover-trigger";

const attributeNameToPropertyName =
  /* @__PURE__ */ createAttributePropertyNameMap(
    PopoverTriggerPropsDeclaration,
  );
const observedAttributes: string[] = /* @__PURE__ */ Array.from(
  attributeNameToPropertyName.keys(),
);

export class PopoverTriggerElement extends HostElement {
  private _store: Store<PopoverTriggerProps>;
  static observedAttributes = observedAttributes;

  constructor() {
    super();
    this._store = createStore(this, PopoverTriggerPropsDeclaration);
    setupPopoverTrigger(this, this._store);
    usePropertiesToAttributes(
      this,
      this._store,
      PopoverTriggerPropsDeclaration,
    );
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ): void {
    handleAttributeChanged(
      this._store,
      PopoverTriggerPropsDeclaration,
      attributeNameToPropertyName,
      name,
      newValue,
    );
  }

  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  get disabled(): PopoverTriggerProps["disabled"] {
    return this._store.disabled.get();
  }

  set disabled(value: PopoverTriggerProps["disabled"]) {
    this._store.disabled.set(value);
  }

  /**
   * Whether the popover should also open when the trigger is hovered.
   * @default false
   */
  get openOnHover(): PopoverTriggerProps["openOnHover"] {
    return this._store.openOnHover.get();
  }

  set openOnHover(value: PopoverTriggerProps["openOnHover"]) {
    this._store.openOnHover.set(value);
  }

  /**
   * The delay in milliseconds before opening the popover when hovering.
   * Only applies when `openOnHover` is true.
   * @default 300
   */
  get delay(): PopoverTriggerProps["delay"] {
    return this._store.delay.get();
  }

  set delay(value: PopoverTriggerProps["delay"]) {
    this._store.delay.set(value);
  }

  /**
   * The delay in milliseconds before closing the popover when hover ends.
   * Only applies when `openOnHover` is true.
   * @default 0
   */
  get closeDelay(): PopoverTriggerProps["closeDelay"] {
    return this._store.closeDelay.get();
  }

  set closeDelay(value: PopoverTriggerProps["closeDelay"]) {
    this._store.closeDelay.set(value);
  }
}

export function registerPopoverTriggerElement(): void {
  registerCustomElement("aria-ui-popover-trigger", PopoverTriggerElement);
}
