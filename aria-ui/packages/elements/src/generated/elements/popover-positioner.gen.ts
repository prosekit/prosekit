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
  PopoverPositionerPropsDeclaration,
  setupPopoverPositioner,
  type PopoverPositionerProps,
} from "../../popover/popover-positioner";

const attributeNameToPropertyName =
  /* @__PURE__ */ createAttributePropertyNameMap(
    PopoverPositionerPropsDeclaration,
  );
const observedAttributes: string[] = /* @__PURE__ */ Array.from(
  attributeNameToPropertyName.keys(),
);

export class PopoverPositionerElement extends HostElement {
  private _store: Store<PopoverPositionerProps>;
  static observedAttributes = observedAttributes;

  constructor() {
    super();
    this._store = createStore(this, PopoverPositionerPropsDeclaration);
    setupPopoverPositioner(this, this._store);
    usePropertiesToAttributes(
      this,
      this._store,
      PopoverPositionerPropsDeclaration,
    );
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ): void {
    handleAttributeChanged(
      this._store,
      PopoverPositionerPropsDeclaration,
      attributeNameToPropertyName,
      name,
      newValue,
    );
  }

  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  get strategy(): PopoverPositionerProps["strategy"] {
    return this._store.strategy.get();
  }

  set strategy(value: PopoverPositionerProps["strategy"]) {
    this._store.strategy.set(value);
  }

  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  get placement(): PopoverPositionerProps["placement"] {
    return this._store.placement.get();
  }

  set placement(value: PopoverPositionerProps["placement"]) {
    this._store.placement.set(value);
  }

  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  get autoUpdate(): PopoverPositionerProps["autoUpdate"] {
    return this._store.autoUpdate.get();
  }

  set autoUpdate(value: PopoverPositionerProps["autoUpdate"]) {
    this._store.autoUpdate.set(value);
  }

  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content. When enabled,
   * the floating element won't be clipped by an ancestor. This provides a
   * similar result to React's `<Portals>` or Vue's `<Teleport>`.
   *
   * @default true
   */
  get hoist(): PopoverPositionerProps["hoist"] {
    return this._store.hoist.get();
  }

  set hoist(value: PopoverPositionerProps["hoist"]) {
    this._store.hoist.set(value);
  }

  /**
   * The distance between the reference and floating element.
   *
   * @default 6
   */
  get offset(): PopoverPositionerProps["offset"] {
    return this._store.offset.get();
  }

  set offset(value: PopoverPositionerProps["offset"]) {
    this._store.offset.set(value);
  }

  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  get flip(): PopoverPositionerProps["flip"] {
    return this._store.flip.get();
  }

  set flip(value: PopoverPositionerProps["flip"]) {
    this._store.flip.set(value);
  }

  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  get shift(): PopoverPositionerProps["shift"] {
    return this._store.shift.get();
  }

  set shift(value: PopoverPositionerProps["shift"]) {
    this._store.shift.set(value);
  }

  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  get overlap(): PopoverPositionerProps["overlap"] {
    return this._store.overlap.get();
  }

  set overlap(value: PopoverPositionerProps["overlap"]) {
    this._store.overlap.set(value);
  }

  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  get fitViewport(): PopoverPositionerProps["fitViewport"] {
    return this._store.fitViewport.get();
  }

  set fitViewport(value: PopoverPositionerProps["fitViewport"]) {
    this._store.fitViewport.set(value);
  }

  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  get sameWidth(): PopoverPositionerProps["sameWidth"] {
    return this._store.sameWidth.get();
  }

  set sameWidth(value: PopoverPositionerProps["sameWidth"]) {
    this._store.sameWidth.set(value);
  }

  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  get sameHeight(): PopoverPositionerProps["sameHeight"] {
    return this._store.sameHeight.get();
  }

  set sameHeight(value: PopoverPositionerProps["sameHeight"]) {
    this._store.sameHeight.set(value);
  }

  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  get inline(): PopoverPositionerProps["inline"] {
    return this._store.inline.get();
  }

  set inline(value: PopoverPositionerProps["inline"]) {
    this._store.inline.set(value);
  }

  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default false
   */
  get hide(): PopoverPositionerProps["hide"] {
    return this._store.hide.get();
  }

  set hide(value: PopoverPositionerProps["hide"]) {
    this._store.hide.set(value);
  }

  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  get boundary(): PopoverPositionerProps["boundary"] {
    return this._store.boundary.get();
  }

  set boundary(value: PopoverPositionerProps["boundary"]) {
    this._store.boundary.set(value);
  }

  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  get rootBoundary(): PopoverPositionerProps["rootBoundary"] {
    return this._store.rootBoundary.get();
  }

  set rootBoundary(value: PopoverPositionerProps["rootBoundary"]) {
    this._store.rootBoundary.set(value);
  }

  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  get overflowPadding(): PopoverPositionerProps["overflowPadding"] {
    return this._store.overflowPadding.get();
  }

  set overflowPadding(value: PopoverPositionerProps["overflowPadding"]) {
    this._store.overflowPadding.set(value);
  }

  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  get elementContext(): PopoverPositionerProps["elementContext"] {
    return this._store.elementContext.get();
  }

  set elementContext(value: PopoverPositionerProps["elementContext"]) {
    this._store.elementContext.set(value);
  }

  /**
   * Whether to check the alternate elementContext’s boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  get altBoundary(): PopoverPositionerProps["altBoundary"] {
    return this._store.altBoundary.get();
  }

  set altBoundary(value: PopoverPositionerProps["altBoundary"]) {
    this._store.altBoundary.set(value);
  }
}

export function registerPopoverPositionerElement(): void {
  registerCustomElement("aria-ui-popover-positioner", PopoverPositionerElement);
}
