import { DefineSetupFnComponent, HTMLAttributes } from "vue";
import { MenuItemEvents, MenuItemProps as MenuItemProps$1, MenuPopupProps as MenuPopupProps$1, MenuPositionerProps as MenuPositionerProps$1, MenuRootEvents, MenuRootProps as MenuRootProps$1, MenuSubmenuRootEvents, MenuSubmenuRootProps as MenuSubmenuRootProps$1, MenuSubmenuTriggerProps as MenuSubmenuTriggerProps$1, MenuTriggerEvents, MenuTriggerProps as MenuTriggerProps$1 } from "@prosekit/web/menu";
/** Props for the {@link MenuItem} Vue component. */
interface MenuItemProps {
  /**
   * The unique value for this menu item.
   *
   * @default ""
   */
  value?: MenuItemProps$1['value'];
  /**
   * Whether this menu item is disabled.
   *
   * @default false
   */
  disabled?: MenuItemProps$1['disabled'];
  /**
   * Whether to close the menu when the item is pressed.
   *
   * @default true
   */
  closeOnSelect?: MenuItemProps$1['closeOnSelect'];
  /** Emitted when the the item is selected. */
  onSelect?: (event: MenuItemEvents['select']) => void;
}
/** A Vue component that renders an `prosekit-menu-item` custom element. */
declare const MenuItem: DefineSetupFnComponent<MenuItemProps & HTMLAttributes>;
/** Props for the {@link MenuPopup} Vue component. */
interface MenuPopupProps {
  /**
   * By default, the MenuPopup element will listen for keydown events.
   * You can pass a different element to listen for keydown events.
   *
   * @default null
   */
  eventTarget?: MenuPopupProps$1['eventTarget'];
}
/** A Vue component that renders an `prosekit-menu-popup` custom element. */
declare const MenuPopup: DefineSetupFnComponent<MenuPopupProps & HTMLAttributes>;
/** Props for the {@link MenuPositioner} Vue component. */
interface MenuPositionerProps {
  /**
   * The initial placement of the floating element
   *
   * @default "bottom-start"
   */
  placement?: MenuPositionerProps$1['placement'];
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy?: MenuPositionerProps$1['strategy'];
  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate?: MenuPositionerProps$1['autoUpdate'];
  /**
   * Whether to use the browser Popover API to place the floating element on
   * top of other page content.
   *
   * @default true
   */
  hoist?: MenuPositionerProps$1['hoist'];
  /**
   * The distance between the reference and floating element.
   *
   * @default 6
   */
  offset?: MenuPositionerProps$1['offset'];
  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  flip?: MenuPositionerProps$1['flip'];
  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift?: MenuPositionerProps$1['shift'];
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap?: MenuPositionerProps$1['overlap'];
  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport?: MenuPositionerProps$1['fitViewport'];
  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth?: MenuPositionerProps$1['sameWidth'];
  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight?: MenuPositionerProps$1['sameHeight'];
  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline?: MenuPositionerProps$1['inline'];
  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default false
   */
  hide?: MenuPositionerProps$1['hide'];
  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary?: MenuPositionerProps$1['boundary'];
  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary?: MenuPositionerProps$1['rootBoundary'];
  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding?: MenuPositionerProps$1['overflowPadding'];
  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext?: MenuPositionerProps$1['elementContext'];
  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary?: MenuPositionerProps$1['altBoundary'];
}
/** A Vue component that renders an `prosekit-menu-positioner` custom element. */
declare const MenuPositioner: DefineSetupFnComponent<MenuPositionerProps & HTMLAttributes>;
/** Props for the {@link MenuRoot} Vue component. */
interface MenuRootProps {
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen?: MenuRootProps$1['defaultOpen'];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: MenuRootProps$1['open'];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: MenuRootProps$1['disabled'];
  /** Emitted when the menu is opened or closed. */
  onOpenChange?: (event: MenuRootEvents['openChange']) => void;
}
/** A Vue component that renders an `prosekit-menu-root` custom element. */
declare const MenuRoot: DefineSetupFnComponent<MenuRootProps & HTMLAttributes>;
/** Props for the {@link MenuSubmenuRoot} Vue component. */
interface MenuSubmenuRootProps {
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen?: MenuSubmenuRootProps$1['defaultOpen'];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: MenuSubmenuRootProps$1['open'];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: MenuSubmenuRootProps$1['disabled'];
  /** Emitted when the submenu is opened or closed. */
  onOpenChange?: (event: MenuSubmenuRootEvents['openChange']) => void;
}
/** A Vue component that renders an `prosekit-menu-submenu-root` custom element. */
declare const MenuSubmenuRoot: DefineSetupFnComponent<MenuSubmenuRootProps & HTMLAttributes>;
/** Props for the {@link MenuSubmenuTrigger} Vue component. */
interface MenuSubmenuTriggerProps {
  /**
   * The unique value for this submenu trigger in the parent menu.
   *
   * @default ""
   */
  value?: MenuSubmenuTriggerProps$1['value'];
  /**
   * Whether this submenu trigger is disabled.
   *
   * @default false
   */
  disabled?: MenuSubmenuTriggerProps$1['disabled'];
}
/** A Vue component that renders an `prosekit-menu-submenu-trigger` custom element. */
declare const MenuSubmenuTrigger: DefineSetupFnComponent<MenuSubmenuTriggerProps & HTMLAttributes>;
/** Props for the {@link MenuTrigger} Vue component. */
interface MenuTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   *
   * @default false
   */
  disabled?: MenuTriggerProps$1['disabled'];
  /** Emitted when the menu is opened or closed. */
  onOpenChange?: (event: MenuTriggerEvents['openChange']) => void;
}
/** A Vue component that renders an `prosekit-menu-trigger` custom element. */
declare const MenuTrigger: DefineSetupFnComponent<MenuTriggerProps & HTMLAttributes>;
export { MenuItem, type MenuItemProps, MenuPopup, type MenuPopupProps, MenuPositioner, type MenuPositionerProps, MenuRoot, type MenuRootProps, MenuSubmenuRoot, type MenuSubmenuRootProps, MenuSubmenuTrigger, type MenuSubmenuTriggerProps, MenuTrigger, type MenuTriggerProps };
//# sourceMappingURL=menu.d.ts.map