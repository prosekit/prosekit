import { HostElement, HostElementConstructor, PropsDeclaration, State } from "@aria-ui/core";
import { OverlayPositionerProps } from "@aria-ui/elements/overlay";
import { Editor } from "@prosekit/core";
import { Placement } from "@floating-ui/dom";
import { MenuRootProps } from "@aria-ui/elements/menu";
import { defineTableCommands } from "@prosekit/extensions/table";
interface TableHandleColumnPopupProps {}
/** @internal */
export declare const TableHandleColumnPopupPropsDeclaration: PropsDeclaration<TableHandleColumnPopupProps>;
/** @internal */
export declare function setupTableHandleColumnPopup(host: HostElement, _props: State<TableHandleColumnPopupProps>): void;
declare const TableHandleColumnPopupElementBase: HostElementConstructor<TableHandleColumnPopupProps>;
/**
 * `<prosekit-table-handle-column-popup>` custom element.
 *
 * Properties: {@link TableHandleColumnPopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when visible, `"closed"` otherwise |
 */
export declare class TableHandleColumnPopupElement extends TableHandleColumnPopupElementBase {}
/** @internal */
export declare function registerTableHandleColumnPopupElement(): void;
/**
 * @internal
 */
interface SharedTableHandlePositionerProps extends Omit<OverlayPositionerProps, 'hoist' | 'flip' | 'shift' | 'hide' | 'offset'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist: OverlayPositionerProps['hoist'];
  /**
   * @default false
   * @hidden
   */
  flip: OverlayPositionerProps['flip'];
  /**
   * @default false
   * @hidden
   */
  shift: OverlayPositionerProps['shift'];
  /**
   * @default true
   * @hidden
   */
  hide: OverlayPositionerProps['hide'];
  /**
   * @default 0
   * @hidden
   */
  offset: OverlayPositionerProps['offset'];
}
interface TableHandleColumnPositionerProps extends Omit<SharedTableHandlePositionerProps, 'placement'> {
  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "top"
   */
  placement: Placement;
}
/** @internal */
export declare const TableHandleColumnPositionerPropsDeclaration: PropsDeclaration<TableHandleColumnPositionerProps>;
/** @internal */
export declare function setupTableHandleColumnPositioner(host: HostElement, props: State<TableHandleColumnPositionerProps>): void;
declare const TableHandleColumnPositionerElementBase: HostElementConstructor<TableHandleColumnPositionerProps>;
/**
 * `<prosekit-table-handle-column-positioner>` custom element.
 *
 * Properties: {@link TableHandleColumnPositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
export declare class TableHandleColumnPositionerElement extends TableHandleColumnPositionerElementBase {}
/** @internal */
export declare function registerTableHandleColumnPositionerElement(): void;
interface TableHandleColumnMenuRootProps extends MenuRootProps {}
/** @internal */
export declare const TableHandleColumnMenuRootPropsDeclaration: PropsDeclaration<TableHandleColumnMenuRootProps>;
/** @internal */
export declare function setupTableHandleColumnMenuRoot(host: HostElement, props: State<TableHandleColumnMenuRootProps>): void;
declare const TableHandleColumnMenuRootElementBase: HostElementConstructor<TableHandleColumnMenuRootProps>;
/**
 * `<prosekit-table-handle-column-menu-root>` custom element.
 *
 * Properties: {@link TableHandleColumnMenuRootProps}
 */
export declare class TableHandleColumnMenuRootElement extends TableHandleColumnMenuRootElementBase {}
/** @internal */
export declare function registerTableHandleColumnMenuRootElement(): void;
type TableCommandsExtension$2 = ReturnType<typeof defineTableCommands>;
interface TableHandleColumnMenuTriggerProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension$2> | null;
}
/** @internal */
export declare const TableHandleColumnMenuTriggerPropsDeclaration: PropsDeclaration<TableHandleColumnMenuTriggerProps>;
/** @internal */
export declare function setupTableHandleColumnMenuTrigger(host: HostElement, props: State<TableHandleColumnMenuTriggerProps>): void;
declare const TableHandleColumnMenuTriggerElementBase: HostElementConstructor<TableHandleColumnMenuTriggerProps>;
/**
 * `<prosekit-table-handle-column-menu-trigger>` custom element.
 *
 * Properties: {@link TableHandleColumnMenuTriggerProps}
 */
export declare class TableHandleColumnMenuTriggerElement extends TableHandleColumnMenuTriggerElementBase {}
/**
 * @internal
 */
export declare function registerTableHandleColumnMenuTriggerElement(): void;
interface TableHandleDragPreviewProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor | null;
}
/** @internal */
export declare const TableHandleDragPreviewPropsDeclaration: PropsDeclaration<TableHandleDragPreviewProps>;
/**
 * @internal
 */
export declare function setupTableHandleDragPreview(host: HostElement, props: State<TableHandleDragPreviewProps>): void;
declare const TableHandleDragPreviewElementBase: HostElementConstructor<TableHandleDragPreviewProps>;
/**
 * `<prosekit-table-handle-drag-preview>` custom element.
 *
 * Properties: {@link TableHandleDragPreviewProps}
 */
export declare class TableHandleDragPreviewElement extends TableHandleDragPreviewElementBase {}
/**
 * @internal
 */
export declare function registerTableHandleDragPreviewElement(): void;
type TableCommandsExtension$1 = ReturnType<typeof defineTableCommands>;
interface TableHandleDropIndicatorProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension$1> | null;
}
/** @internal */
export declare const TableHandleDropIndicatorPropsDeclaration: PropsDeclaration<TableHandleDropIndicatorProps>;
/**
 * @internal
 */
export declare function setupTableHandleDropIndicator(host: HostElement, props: State<TableHandleDropIndicatorProps>): void;
declare const TableHandleDropIndicatorElementBase: HostElementConstructor<TableHandleDropIndicatorProps>;
/**
 * `<prosekit-table-handle-drop-indicator>` custom element.
 *
 * Properties: {@link TableHandleDropIndicatorProps}
 */
export declare class TableHandleDropIndicatorElement extends TableHandleDropIndicatorElementBase {}
/**
 * @internal
 */
export declare function registerTableHandleDropIndicatorElement(): void;
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
export declare const TableHandleRootPropsDeclaration: PropsDeclaration<TableHandleRootProps>;
/**
 * @internal
 */
export declare function setupTableHandleRoot(host: HostElement, props: State<TableHandleRootProps>): void;
declare const TableHandleRootElementBase: HostElementConstructor<TableHandleRootProps>;
/**
 * `<prosekit-table-handle-root>` custom element.
 *
 * Properties: {@link TableHandleRootProps}
 */
export declare class TableHandleRootElement extends TableHandleRootElementBase {}
/**
 * @internal
 */
export declare function registerTableHandleRootElement(): void;
interface TableHandleRowPopupProps {}
/** @internal */
export declare const TableHandleRowPopupPropsDeclaration: PropsDeclaration<TableHandleRowPopupProps>;
/** @internal */
export declare function setupTableHandleRowPopup(host: HostElement, _props: State<TableHandleRowPopupProps>): void;
declare const TableHandleRowPopupElementBase: HostElementConstructor<TableHandleRowPopupProps>;
/**
 * `<prosekit-table-handle-row-popup>` custom element.
 *
 * Properties: {@link TableHandleRowPopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when visible, `"closed"` otherwise |
 */
export declare class TableHandleRowPopupElement extends TableHandleRowPopupElementBase {}
/** @internal */
export declare function registerTableHandleRowPopupElement(): void;
interface TableHandleRowPositionerProps extends Omit<SharedTableHandlePositionerProps, 'placement'> {
  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "left"
   */
  placement: Placement;
}
/** @internal */
export declare const TableHandleRowPositionerPropsDeclaration: PropsDeclaration<TableHandleRowPositionerProps>;
/** @internal */
export declare function setupTableHandleRowPositioner(host: HostElement, props: State<TableHandleRowPositionerProps>): void;
declare const TableHandleRowPositionerElementBase: HostElementConstructor<TableHandleRowPositionerProps>;
/**
 * `<prosekit-table-handle-row-positioner>` custom element.
 *
 * Properties: {@link TableHandleRowPositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
export declare class TableHandleRowPositionerElement extends TableHandleRowPositionerElementBase {}
/** @internal */
export declare function registerTableHandleRowPositionerElement(): void;
interface TableHandleRowMenuRootProps extends MenuRootProps {}
/** @internal */
export declare const TableHandleRowMenuRootPropsDeclaration: PropsDeclaration<TableHandleRowMenuRootProps>;
/** @internal */
export declare function setupTableHandleRowMenuRoot(host: HostElement, props: State<TableHandleRowMenuRootProps>): void;
declare const TableHandleRowMenuRootElementBase: HostElementConstructor<TableHandleRowMenuRootProps>;
/**
 * `<prosekit-table-handle-row-menu-root>` custom element.
 *
 * Properties: {@link TableHandleRowMenuRootProps}
 */
export declare class TableHandleRowMenuRootElement extends TableHandleRowMenuRootElementBase {}
/** @internal */
export declare function registerTableHandleRowMenuRootElement(): void;
type TableCommandsExtension = ReturnType<typeof defineTableCommands>;
interface TableHandleRowMenuTriggerProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension> | null;
}
/** @internal */
export declare const TableHandleRowMenuTriggerPropsDeclaration: PropsDeclaration<TableHandleRowMenuTriggerProps>;
/** @internal */
export declare function setupTableHandleRowMenuTrigger(host: HostElement, props: State<TableHandleRowMenuTriggerProps>): void;
declare const TableHandleRowMenuTriggerElementBase: HostElementConstructor<TableHandleRowMenuTriggerProps>;
/**
 * `<prosekit-table-handle-row-menu-trigger>` custom element.
 *
 * Properties: {@link TableHandleRowMenuTriggerProps}
 */
export declare class TableHandleRowMenuTriggerElement extends TableHandleRowMenuTriggerElementBase {}
/**
 * @internal
 */
export declare function registerTableHandleRowMenuTriggerElement(): void;
export type { TableHandleColumnMenuRootProps, TableHandleColumnMenuTriggerProps, TableHandleColumnPopupProps, TableHandleColumnPositionerProps, TableHandleDragPreviewProps, TableHandleDropIndicatorProps, TableHandleRootProps, TableHandleRowMenuRootProps, TableHandleRowMenuTriggerProps, TableHandleRowPopupProps, TableHandleRowPositionerProps };
//# sourceMappingURL=table-handle.d.ts.map