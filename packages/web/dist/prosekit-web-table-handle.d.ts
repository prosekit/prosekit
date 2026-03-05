import { BaseElementConstructor, ConnectableElement, EventDeclarations, PropDeclarations, SetupOptions, SignalState } from "@aria-ui/core";
import { Editor } from "@prosekit/core";
import { OverlayPositionerEvents, OverlayPositionerProps } from "@aria-ui/overlay";
import { MenuContentEvents, MenuContentProps } from "@aria-ui/menu/elements";
import { TableCommandsExtension, defineTableCommands } from "@prosekit/extensions/table";
import { Placement } from "@floating-ui/dom";
import { MenuItemEvents, MenuItemProps } from "@aria-ui/menu";

//#region src/components/table-handle/table-handle-column-root/types.d.ts
interface TableHandleColumnRootProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "top"
   */
  placement: Placement;
  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist: boolean;
  /**
   * @default false
   * @hidden
   */
  flip: boolean;
  /**
   * @default false
   * @hidden
   */
  shift: boolean;
  /**
   * @default true
   * @hidden
   */
  hide: boolean;
}
/** @internal */
declare const tableHandleColumnRootProps: PropDeclarations<TableHandleColumnRootProps>;
/** @internal */
interface TableHandleColumnRootEvents extends OverlayPositionerEvents {}
/** @internal */
declare const tableHandleColumnRootEvents: EventDeclarations<TableHandleColumnRootEvents>;
//#endregion
//#region src/components/table-handle/table-handle-column-root/element.gen.d.ts
declare const TableHandleColumnRootElementBase: BaseElementConstructor<TableHandleColumnRootProps>;
declare class TableHandleColumnRootElement extends TableHandleColumnRootElementBase {}
//#endregion
//#region src/components/table-handle/table-handle-column-root/setup.d.ts
/**
 * @internal
 */
declare function useTableHandleColumnRoot(host: ConnectableElement, {
  state
}: {
  state: SignalState<TableHandleColumnRootProps>;
}): void;
//#endregion
//#region src/components/table-handle/table-handle-column-trigger/types.d.ts
type TableCommandsExtension$2 = ReturnType<typeof defineTableCommands>;
interface TableHandleColumnTriggerProps {
  editor: Editor<TableCommandsExtension$2> | null;
}
/** @internal */
declare const tableHandleColumnTriggerProps: PropDeclarations<TableHandleColumnTriggerProps>;
/** @internal */
interface TableHandleColumnTriggerEvents {}
/** @internal */
declare const tableHandleColumnTriggerEvents: EventDeclarations<TableHandleColumnTriggerEvents>;
//#endregion
//#region src/components/table-handle/table-handle-column-trigger/element.gen.d.ts
declare const TableHandleColumnTriggerElementBase: BaseElementConstructor<TableHandleColumnTriggerProps>;
declare class TableHandleColumnTriggerElement extends TableHandleColumnTriggerElementBase {}
//#endregion
//#region src/components/table-handle/table-handle-column-trigger/setup.d.ts
/**
 * @internal
 */
declare function useTableHandleColumnTrigger(host: ConnectableElement, {
  state
}: SetupOptions<TableHandleColumnTriggerProps, TableHandleColumnTriggerEvents>): void;
//#endregion
//#region src/components/table-handle/table-handle-drag-preview/types.d.ts
interface TableHandleDragPreviewProps {
  editor: Editor | null;
}
declare const tableHandleDragPreviewProps: PropDeclarations<TableHandleDragPreviewProps>;
interface TableHandleDragPreviewEvents {}
declare const tableHandleDragPreviewEvents: EventDeclarations<TableHandleDragPreviewEvents>;
//#endregion
//#region src/components/table-handle/table-handle-drag-preview/element.gen.d.ts
declare const TableHandleDragPreviewElementBase: BaseElementConstructor<TableHandleDragPreviewProps>;
declare class TableHandleDragPreviewElement extends TableHandleDragPreviewElementBase {}
//#endregion
//#region src/components/table-handle/table-handle-drag-preview/setup.d.ts
/**
 * @internal
 */
declare function useTableHandleDragPreview(host: ConnectableElement, {
  state
}: {
  state: SignalState<TableHandleDragPreviewProps>;
}): void;
//#endregion
//#region src/components/table-handle/table-handle-drop-indicator/types.d.ts
interface TableHandleDropIndicatorProps {
  editor: Editor<TableCommandsExtension> | null;
}
declare const tableHandleDropIndicatorProps: PropDeclarations<TableHandleDropIndicatorProps>;
interface TableHandleDropIndicatorEvents {}
declare const tableHandleDropIndicatorEvents: EventDeclarations<TableHandleDropIndicatorEvents>;
//#endregion
//#region src/components/table-handle/table-handle-drop-indicator/element.gen.d.ts
declare const TableHandleDropIndicatorElementBase: BaseElementConstructor<TableHandleDropIndicatorProps>;
declare class TableHandleDropIndicatorElement extends TableHandleDropIndicatorElementBase {}
//#endregion
//#region src/components/table-handle/table-handle-drop-indicator/setup.d.ts
/**
 * @internal
 */
declare function useTableHandleDropIndicator(host: ConnectableElement, {
  state
}: {
  state: SignalState<TableHandleDropIndicatorProps>;
}): void;
//#endregion
//#region src/components/table-handle/table-handle-popover-content/types.d.ts
interface TableHandlePopoverContentProps extends Omit<MenuContentProps, 'placement' | 'offset'> {
  /**
   * @default 'bottom-start'
   */
  placement: MenuContentProps['placement'];
  /**
   * @default {mainAxis: -4, crossAxis: 4}
   */
  offset: MenuContentProps['offset'];
  editor: Editor | null;
}
/** @internal */
declare const tableHandlePopoverContentProps: PropDeclarations<TableHandlePopoverContentProps>;
interface TableHandlePopoverContentEvents extends MenuContentEvents {}
/** @internal */
declare const tableHandlePopoverContentEvents: EventDeclarations<TableHandlePopoverContentEvents>;
//#endregion
//#region src/components/table-handle/table-handle-popover-content/element.gen.d.ts
declare const TableHandlePopoverContentElementBase: BaseElementConstructor<TableHandlePopoverContentProps>;
declare class TableHandlePopoverContentElement extends TableHandlePopoverContentElementBase {}
//#endregion
//#region src/components/table-handle/table-handle-popover-content/setup.d.ts
/**
 * @internal
 */
declare function useTableHandlePopoverContent(host: ConnectableElement, {
  state,
  emit
}: SetupOptions<TableHandlePopoverContentProps, TableHandlePopoverContentEvents>): void;
//#endregion
//#region src/components/table-handle/table-handle-popover-item/types.d.ts
interface TableHandlePopoverItemProps extends MenuItemProps {}
/** @internal */
declare const tableHandlePopoverItemProps: PropDeclarations<TableHandlePopoverItemProps>;
interface TableHandlePopoverItemEvents extends MenuItemEvents {}
/** @internal */
declare const tableHandlePopoverItemEvents: EventDeclarations<TableHandlePopoverItemEvents>;
//#endregion
//#region src/components/table-handle/table-handle-popover-item/element.gen.d.ts
declare const TableHandlePopoverItemElementBase: BaseElementConstructor<TableHandlePopoverItemProps>;
declare class TableHandlePopoverItemElement extends TableHandlePopoverItemElementBase {}
//#endregion
//#region src/components/table-handle/table-handle-popover-item/setup.d.ts
/**
 * @internal
 */
declare function useTableHandlePopoverItem(element: ConnectableElement, {
  state,
  emit
}: SetupOptions<TableHandlePopoverItemProps, TableHandlePopoverItemEvents>): void;
//#endregion
//#region src/components/table-handle/table-handle-root/types.d.ts
interface TableHandleRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
}
/** @internal */
declare const tableHandleRootProps: PropDeclarations<TableHandleRootProps>;
/** @internal */
interface TableHandleRootEvents {}
/** @internal */
declare const tableHandleRootEvents: EventDeclarations<TableHandleRootEvents>;
//#endregion
//#region src/components/table-handle/table-handle-root/element.gen.d.ts
declare const TableHandleRootElementBase: BaseElementConstructor<TableHandleRootProps>;
declare class TableHandleRootElement extends TableHandleRootElementBase {}
//#endregion
//#region src/components/table-handle/table-handle-root/setup.d.ts
/**
 * @internal
 */
declare function useTableHandleRoot(host: ConnectableElement, {
  state
}: {
  state: SignalState<TableHandleRootProps>;
}): void;
//#endregion
//#region src/components/table-handle/table-handle-row-root/types.d.ts
interface TableHandleRowRootProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "left"
   */
  placement: Placement;
  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist: boolean;
  /**
   * @default false
   * @hidden
   */
  flip: boolean;
  /**
   * @default false
   * @hidden
   */
  shift: boolean;
  /**
   * @default true
   * @hidden
   */
  hide: boolean;
}
/** @internal */
declare const tableHandleRowRootProps: PropDeclarations<TableHandleRowRootProps>;
/** @internal */
interface TableHandleRowRootEvents extends OverlayPositionerEvents {}
/** @internal */
declare const tableHandleRowRootEvents: EventDeclarations<TableHandleRowRootEvents>;
//#endregion
//#region src/components/table-handle/table-handle-row-root/element.gen.d.ts
declare const TableHandleRowRootElementBase: BaseElementConstructor<TableHandleRowRootProps>;
declare class TableHandleRowRootElement extends TableHandleRowRootElementBase {}
//#endregion
//#region src/components/table-handle/table-handle-row-root/setup.d.ts
/**
 * @internal
 */
declare function useTableHandleRowRoot(host: ConnectableElement, {
  state
}: SetupOptions<TableHandleRowRootProps, TableHandleRowRootEvents>): void;
//#endregion
//#region src/components/table-handle/table-handle-row-trigger/types.d.ts
type TableCommandsExtension$1 = ReturnType<typeof defineTableCommands>;
interface TableHandleRowTriggerProps {
  editor: Editor<TableCommandsExtension$1> | null;
}
/** @internal */
declare const tableHandleRowTriggerProps: PropDeclarations<TableHandleRowTriggerProps>;
interface TableHandleRowTriggerEvents {
  select: CustomEvent<void>;
}
/** @internal */
declare const tableHandleRowTriggerEvents: EventDeclarations<TableHandleRowTriggerEvents>;
//#endregion
//#region src/components/table-handle/table-handle-row-trigger/element.gen.d.ts
declare const TableHandleRowTriggerElementBase: BaseElementConstructor<TableHandleRowTriggerProps>;
declare class TableHandleRowTriggerElement extends TableHandleRowTriggerElementBase {}
//#endregion
//#region src/components/table-handle/table-handle-row-trigger/setup.d.ts
/**
 * @internal
 */
declare function useTableHandleRowTrigger(host: ConnectableElement, {
  state
}: SetupOptions<TableHandleRowTriggerProps, TableHandleRowTriggerEvents>): void;
//#endregion
export { TableHandleColumnRootElement, type TableHandleColumnRootEvents, type TableHandleColumnRootProps, TableHandleColumnTriggerElement, type TableHandleColumnTriggerEvents, type TableHandleColumnTriggerProps, TableHandleDragPreviewElement, type TableHandleDragPreviewEvents, type TableHandleDragPreviewProps, TableHandleDropIndicatorElement, type TableHandleDropIndicatorEvents, type TableHandleDropIndicatorProps, TableHandlePopoverContentElement, type TableHandlePopoverContentEvents, type TableHandlePopoverContentProps, TableHandlePopoverItemElement, type TableHandlePopoverItemEvents, type TableHandlePopoverItemProps, TableHandleRootElement, type TableHandleRootEvents, type TableHandleRootProps, TableHandleRowRootElement, type TableHandleRowRootEvents, type TableHandleRowRootProps, TableHandleRowTriggerElement, type TableHandleRowTriggerEvents, type TableHandleRowTriggerProps, tableHandleColumnRootEvents, tableHandleColumnRootProps, tableHandleColumnTriggerEvents, tableHandleColumnTriggerProps, tableHandleDragPreviewEvents, tableHandleDragPreviewProps, tableHandleDropIndicatorEvents, tableHandleDropIndicatorProps, tableHandlePopoverContentEvents, tableHandlePopoverContentProps, tableHandlePopoverItemEvents, tableHandlePopoverItemProps, tableHandleRootEvents, tableHandleRootProps, tableHandleRowRootEvents, tableHandleRowRootProps, tableHandleRowTriggerEvents, tableHandleRowTriggerProps, useTableHandleColumnRoot, useTableHandleColumnTrigger, useTableHandleDragPreview, useTableHandleDropIndicator, useTableHandlePopoverContent, useTableHandlePopoverItem, useTableHandleRoot, useTableHandleRowRoot, useTableHandleRowTrigger };
//# sourceMappingURL=prosekit-web-table-handle.d.ts.map