import { DefineSetupFnComponent, HTMLAttributes } from "vue";
import { TableHandleColumnMenuRootProps as TableHandleColumnMenuRootProps$1, TableHandleColumnMenuTriggerProps as TableHandleColumnMenuTriggerProps$1, TableHandleColumnPositionerProps as TableHandleColumnPositionerProps$1, TableHandleDragPreviewProps as TableHandleDragPreviewProps$1, TableHandleDropIndicatorProps as TableHandleDropIndicatorProps$1, TableHandleRootProps as TableHandleRootProps$1, TableHandleRowMenuRootProps as TableHandleRowMenuRootProps$1, TableHandleRowMenuTriggerProps as TableHandleRowMenuTriggerProps$1, TableHandleRowPositionerProps as TableHandleRowPositionerProps$1 } from "@prosekit/web/table-handle";
/** Props for the {@link TableHandleColumnPopup} Vue component. */
interface TableHandleColumnPopupProps {}
/** A Vue component that renders an `prosekit-table-handle-column-popup` custom element. */
declare const TableHandleColumnPopup: DefineSetupFnComponent<TableHandleColumnPopupProps & HTMLAttributes>;
/** Props for the {@link TableHandleColumnPositioner} Vue component. */
interface TableHandleColumnPositionerProps {
  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "top"
   */
  placement?: TableHandleColumnPositionerProps$1['placement'];
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy?: TableHandleColumnPositionerProps$1['strategy'];
  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate?: TableHandleColumnPositionerProps$1['autoUpdate'];
  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist?: TableHandleColumnPositionerProps$1['hoist'];
  /**
   * @default 0
   * @hidden
   */
  offset?: TableHandleColumnPositionerProps$1['offset'];
  /**
   * @default false
   * @hidden
   */
  flip?: TableHandleColumnPositionerProps$1['flip'];
  /**
   * @default false
   * @hidden
   */
  shift?: TableHandleColumnPositionerProps$1['shift'];
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap?: TableHandleColumnPositionerProps$1['overlap'];
  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport?: TableHandleColumnPositionerProps$1['fitViewport'];
  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth?: TableHandleColumnPositionerProps$1['sameWidth'];
  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight?: TableHandleColumnPositionerProps$1['sameHeight'];
  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline?: TableHandleColumnPositionerProps$1['inline'];
  /**
   * @default true
   * @hidden
   */
  hide?: TableHandleColumnPositionerProps$1['hide'];
  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary?: TableHandleColumnPositionerProps$1['boundary'];
  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary?: TableHandleColumnPositionerProps$1['rootBoundary'];
  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding?: TableHandleColumnPositionerProps$1['overflowPadding'];
  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext?: TableHandleColumnPositionerProps$1['elementContext'];
  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary?: TableHandleColumnPositionerProps$1['altBoundary'];
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor?: TableHandleColumnPositionerProps$1['editor'];
}
/** A Vue component that renders an `prosekit-table-handle-column-positioner` custom element. */
declare const TableHandleColumnPositioner: DefineSetupFnComponent<TableHandleColumnPositionerProps & HTMLAttributes>;
/** Props for the {@link TableHandleColumnMenuRoot} Vue component. */
interface TableHandleColumnMenuRootProps {
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen?: TableHandleColumnMenuRootProps$1['defaultOpen'];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: TableHandleColumnMenuRootProps$1['open'];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: TableHandleColumnMenuRootProps$1['disabled'];
}
/** A Vue component that renders an `prosekit-table-handle-column-menu-root` custom element. */
declare const TableHandleColumnMenuRoot: DefineSetupFnComponent<TableHandleColumnMenuRootProps & HTMLAttributes>;
/** Props for the {@link TableHandleColumnMenuTrigger} Vue component. */
interface TableHandleColumnMenuTriggerProps {
  /**
   * @default null
   * @hidden
   */
  editor?: TableHandleColumnMenuTriggerProps$1['editor'];
}
/** A Vue component that renders an `prosekit-table-handle-column-menu-trigger` custom element. */
declare const TableHandleColumnMenuTrigger: DefineSetupFnComponent<TableHandleColumnMenuTriggerProps & HTMLAttributes>;
/** Props for the {@link TableHandleDragPreview} Vue component. */
interface TableHandleDragPreviewProps {
  /**
   * @default null
   * @hidden
   */
  editor?: TableHandleDragPreviewProps$1['editor'];
}
/** A Vue component that renders an `prosekit-table-handle-drag-preview` custom element. */
declare const TableHandleDragPreview: DefineSetupFnComponent<TableHandleDragPreviewProps & HTMLAttributes>;
/** Props for the {@link TableHandleDropIndicator} Vue component. */
interface TableHandleDropIndicatorProps {
  /**
   * @default null
   * @hidden
   */
  editor?: TableHandleDropIndicatorProps$1['editor'];
}
/** A Vue component that renders an `prosekit-table-handle-drop-indicator` custom element. */
declare const TableHandleDropIndicator: DefineSetupFnComponent<TableHandleDropIndicatorProps & HTMLAttributes>;
/** Props for the {@link TableHandleRoot} Vue component. */
interface TableHandleRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor?: TableHandleRootProps$1['editor'];
}
/** A Vue component that renders an `prosekit-table-handle-root` custom element. */
declare const TableHandleRoot: DefineSetupFnComponent<TableHandleRootProps & HTMLAttributes>;
/** Props for the {@link TableHandleRowPopup} Vue component. */
interface TableHandleRowPopupProps {}
/** A Vue component that renders an `prosekit-table-handle-row-popup` custom element. */
declare const TableHandleRowPopup: DefineSetupFnComponent<TableHandleRowPopupProps & HTMLAttributes>;
/** Props for the {@link TableHandleRowPositioner} Vue component. */
interface TableHandleRowPositionerProps {
  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "left"
   */
  placement?: TableHandleRowPositionerProps$1['placement'];
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy?: TableHandleRowPositionerProps$1['strategy'];
  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate?: TableHandleRowPositionerProps$1['autoUpdate'];
  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist?: TableHandleRowPositionerProps$1['hoist'];
  /**
   * @default 0
   * @hidden
   */
  offset?: TableHandleRowPositionerProps$1['offset'];
  /**
   * @default false
   * @hidden
   */
  flip?: TableHandleRowPositionerProps$1['flip'];
  /**
   * @default false
   * @hidden
   */
  shift?: TableHandleRowPositionerProps$1['shift'];
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap?: TableHandleRowPositionerProps$1['overlap'];
  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport?: TableHandleRowPositionerProps$1['fitViewport'];
  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth?: TableHandleRowPositionerProps$1['sameWidth'];
  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight?: TableHandleRowPositionerProps$1['sameHeight'];
  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline?: TableHandleRowPositionerProps$1['inline'];
  /**
   * @default true
   * @hidden
   */
  hide?: TableHandleRowPositionerProps$1['hide'];
  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary?: TableHandleRowPositionerProps$1['boundary'];
  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary?: TableHandleRowPositionerProps$1['rootBoundary'];
  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding?: TableHandleRowPositionerProps$1['overflowPadding'];
  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext?: TableHandleRowPositionerProps$1['elementContext'];
  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary?: TableHandleRowPositionerProps$1['altBoundary'];
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor?: TableHandleRowPositionerProps$1['editor'];
}
/** A Vue component that renders an `prosekit-table-handle-row-positioner` custom element. */
declare const TableHandleRowPositioner: DefineSetupFnComponent<TableHandleRowPositionerProps & HTMLAttributes>;
/** Props for the {@link TableHandleRowMenuRoot} Vue component. */
interface TableHandleRowMenuRootProps {
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen?: TableHandleRowMenuRootProps$1['defaultOpen'];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: TableHandleRowMenuRootProps$1['open'];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: TableHandleRowMenuRootProps$1['disabled'];
}
/** A Vue component that renders an `prosekit-table-handle-row-menu-root` custom element. */
declare const TableHandleRowMenuRoot: DefineSetupFnComponent<TableHandleRowMenuRootProps & HTMLAttributes>;
/** Props for the {@link TableHandleRowMenuTrigger} Vue component. */
interface TableHandleRowMenuTriggerProps {
  /**
   * @default null
   * @hidden
   */
  editor?: TableHandleRowMenuTriggerProps$1['editor'];
}
/** A Vue component that renders an `prosekit-table-handle-row-menu-trigger` custom element. */
declare const TableHandleRowMenuTrigger: DefineSetupFnComponent<TableHandleRowMenuTriggerProps & HTMLAttributes>;
export { TableHandleColumnMenuRoot, type TableHandleColumnMenuRootProps, TableHandleColumnMenuTrigger, type TableHandleColumnMenuTriggerProps, TableHandleColumnPopup, type TableHandleColumnPopupProps, TableHandleColumnPositioner, type TableHandleColumnPositionerProps, TableHandleDragPreview, type TableHandleDragPreviewProps, TableHandleDropIndicator, type TableHandleDropIndicatorProps, TableHandleRoot, type TableHandleRootProps, TableHandleRowMenuRoot, type TableHandleRowMenuRootProps, TableHandleRowMenuTrigger, type TableHandleRowMenuTriggerProps, TableHandleRowPopup, type TableHandleRowPopupProps, TableHandleRowPositioner, type TableHandleRowPositionerProps };
//# sourceMappingURL=table-handle.d.ts.map