import { HostElement, HostElementConstructor, PropsDeclaration, State } from "@aria-ui/core";
import { OverlayPositionerProps } from "@aria-ui/elements/overlay";
import { Editor } from "@prosekit/core";
import { Placement } from "@floating-ui/dom";
import { MenuRootProps } from "@aria-ui/elements/menu";
import { defineTableCommands } from "@prosekit/extensions/table";
interface TableHandleColumnPopupProps {}
/** @internal */
declare const TableHandleColumnPopupPropsDeclaration: PropsDeclaration<TableHandleColumnPopupProps>;
/** @internal */
declare function setupTableHandleColumnPopup(host: HostElement, _props: State<TableHandleColumnPopupProps>): void;
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
declare class TableHandleColumnPopupElement extends TableHandleColumnPopupElementBase {}
/** @internal */
declare function registerTableHandleColumnPopupElement(): void;
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
declare const TableHandleColumnPositionerPropsDeclaration: PropsDeclaration<TableHandleColumnPositionerProps>;
/** @internal */
declare function setupTableHandleColumnPositioner(host: HostElement, props: State<TableHandleColumnPositionerProps>): void;
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
declare class TableHandleColumnPositionerElement extends TableHandleColumnPositionerElementBase {}
/** @internal */
declare function registerTableHandleColumnPositionerElement(): void;
interface TableHandleColumnMenuRootProps extends MenuRootProps {}
/** @internal */
declare const TableHandleColumnMenuRootPropsDeclaration: PropsDeclaration<TableHandleColumnMenuRootProps>;
/** @internal */
declare function setupTableHandleColumnMenuRoot(host: HostElement, props: State<TableHandleColumnMenuRootProps>): void;
declare const TableHandleColumnMenuRootElementBase: HostElementConstructor<TableHandleColumnMenuRootProps>;
/**
 * `<prosekit-table-handle-column-menu-root>` custom element.
 *
 * Properties: {@link TableHandleColumnMenuRootProps}
 */
declare class TableHandleColumnMenuRootElement extends TableHandleColumnMenuRootElementBase {}
/** @internal */
declare function registerTableHandleColumnMenuRootElement(): void;
type TableCommandsExtension$2 = ReturnType<typeof defineTableCommands>;
interface TableHandleColumnMenuTriggerProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension$2> | null;
}
/** @internal */
declare const TableHandleColumnMenuTriggerPropsDeclaration: PropsDeclaration<TableHandleColumnMenuTriggerProps>;
/** @internal */
declare function setupTableHandleColumnMenuTrigger(host: HostElement, props: State<TableHandleColumnMenuTriggerProps>): void;
declare const TableHandleColumnMenuTriggerElementBase: HostElementConstructor<TableHandleColumnMenuTriggerProps>;
/**
 * `<prosekit-table-handle-column-menu-trigger>` custom element.
 *
 * Properties: {@link TableHandleColumnMenuTriggerProps}
 */
declare class TableHandleColumnMenuTriggerElement extends TableHandleColumnMenuTriggerElementBase {}
/**
 * @internal
 */
declare function registerTableHandleColumnMenuTriggerElement(): void;
interface TableHandleDragPreviewProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor | null;
}
/** @internal */
declare const TableHandleDragPreviewPropsDeclaration: PropsDeclaration<TableHandleDragPreviewProps>;
/**
 * @internal
 */
declare function setupTableHandleDragPreview(host: HostElement, props: State<TableHandleDragPreviewProps>): void;
declare const TableHandleDragPreviewElementBase: HostElementConstructor<TableHandleDragPreviewProps>;
/**
 * `<prosekit-table-handle-drag-preview>` custom element.
 *
 * Properties: {@link TableHandleDragPreviewProps}
 */
declare class TableHandleDragPreviewElement extends TableHandleDragPreviewElementBase {}
/**
 * @internal
 */
declare function registerTableHandleDragPreviewElement(): void;
type TableCommandsExtension$1 = ReturnType<typeof defineTableCommands>;
interface TableHandleDropIndicatorProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension$1> | null;
}
/** @internal */
declare const TableHandleDropIndicatorPropsDeclaration: PropsDeclaration<TableHandleDropIndicatorProps>;
/**
 * @internal
 */
declare function setupTableHandleDropIndicator(host: HostElement, props: State<TableHandleDropIndicatorProps>): void;
declare const TableHandleDropIndicatorElementBase: HostElementConstructor<TableHandleDropIndicatorProps>;
/**
 * `<prosekit-table-handle-drop-indicator>` custom element.
 *
 * Properties: {@link TableHandleDropIndicatorProps}
 */
declare class TableHandleDropIndicatorElement extends TableHandleDropIndicatorElementBase {}
/**
 * @internal
 */
declare function registerTableHandleDropIndicatorElement(): void;
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
declare const TableHandleRootPropsDeclaration: PropsDeclaration<TableHandleRootProps>;
/**
 * @internal
 */
declare function setupTableHandleRoot(host: HostElement, props: State<TableHandleRootProps>): void;
declare const TableHandleRootElementBase: HostElementConstructor<TableHandleRootProps>;
/**
 * `<prosekit-table-handle-root>` custom element.
 *
 * Properties: {@link TableHandleRootProps}
 */
declare class TableHandleRootElement extends TableHandleRootElementBase {}
/**
 * @internal
 */
declare function registerTableHandleRootElement(): void;
interface TableHandleRowPopupProps {}
/** @internal */
declare const TableHandleRowPopupPropsDeclaration: PropsDeclaration<TableHandleRowPopupProps>;
/** @internal */
declare function setupTableHandleRowPopup(host: HostElement, _props: State<TableHandleRowPopupProps>): void;
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
declare class TableHandleRowPopupElement extends TableHandleRowPopupElementBase {}
/** @internal */
declare function registerTableHandleRowPopupElement(): void;
interface TableHandleRowPositionerProps extends Omit<SharedTableHandlePositionerProps, 'placement'> {
  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "left"
   */
  placement: Placement;
}
/** @internal */
declare const TableHandleRowPositionerPropsDeclaration: PropsDeclaration<TableHandleRowPositionerProps>;
/** @internal */
declare function setupTableHandleRowPositioner(host: HostElement, props: State<TableHandleRowPositionerProps>): void;
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
declare class TableHandleRowPositionerElement extends TableHandleRowPositionerElementBase {}
/** @internal */
declare function registerTableHandleRowPositionerElement(): void;
interface TableHandleRowMenuRootProps extends MenuRootProps {}
/** @internal */
declare const TableHandleRowMenuRootPropsDeclaration: PropsDeclaration<TableHandleRowMenuRootProps>;
/** @internal */
declare function setupTableHandleRowMenuRoot(host: HostElement, props: State<TableHandleRowMenuRootProps>): void;
declare const TableHandleRowMenuRootElementBase: HostElementConstructor<TableHandleRowMenuRootProps>;
/**
 * `<prosekit-table-handle-row-menu-root>` custom element.
 *
 * Properties: {@link TableHandleRowMenuRootProps}
 */
declare class TableHandleRowMenuRootElement extends TableHandleRowMenuRootElementBase {}
/** @internal */
declare function registerTableHandleRowMenuRootElement(): void;
type TableCommandsExtension = ReturnType<typeof defineTableCommands>;
interface TableHandleRowMenuTriggerProps {
  /**
   * @default null
   * @hidden
   */
  editor: Editor<TableCommandsExtension> | null;
}
/** @internal */
declare const TableHandleRowMenuTriggerPropsDeclaration: PropsDeclaration<TableHandleRowMenuTriggerProps>;
/** @internal */
declare function setupTableHandleRowMenuTrigger(host: HostElement, props: State<TableHandleRowMenuTriggerProps>): void;
declare const TableHandleRowMenuTriggerElementBase: HostElementConstructor<TableHandleRowMenuTriggerProps>;
/**
 * `<prosekit-table-handle-row-menu-trigger>` custom element.
 *
 * Properties: {@link TableHandleRowMenuTriggerProps}
 */
declare class TableHandleRowMenuTriggerElement extends TableHandleRowMenuTriggerElementBase {}
/**
 * @internal
 */
declare function registerTableHandleRowMenuTriggerElement(): void;
export { TableHandleColumnMenuRootElement, type TableHandleColumnMenuRootProps, TableHandleColumnMenuRootPropsDeclaration, TableHandleColumnMenuTriggerElement, type TableHandleColumnMenuTriggerProps, TableHandleColumnMenuTriggerPropsDeclaration, TableHandleColumnPopupElement, type TableHandleColumnPopupProps, TableHandleColumnPopupPropsDeclaration, TableHandleColumnPositionerElement, type TableHandleColumnPositionerProps, TableHandleColumnPositionerPropsDeclaration, TableHandleDragPreviewElement, type TableHandleDragPreviewProps, TableHandleDragPreviewPropsDeclaration, TableHandleDropIndicatorElement, type TableHandleDropIndicatorProps, TableHandleDropIndicatorPropsDeclaration, TableHandleRootElement, type TableHandleRootProps, TableHandleRootPropsDeclaration, TableHandleRowMenuRootElement, type TableHandleRowMenuRootProps, TableHandleRowMenuRootPropsDeclaration, TableHandleRowMenuTriggerElement, type TableHandleRowMenuTriggerProps, TableHandleRowMenuTriggerPropsDeclaration, TableHandleRowPopupElement, type TableHandleRowPopupProps, TableHandleRowPopupPropsDeclaration, TableHandleRowPositionerElement, type TableHandleRowPositionerProps, TableHandleRowPositionerPropsDeclaration, registerTableHandleColumnMenuRootElement, registerTableHandleColumnMenuTriggerElement, registerTableHandleColumnPopupElement, registerTableHandleColumnPositionerElement, registerTableHandleDragPreviewElement, registerTableHandleDropIndicatorElement, registerTableHandleRootElement, registerTableHandleRowMenuRootElement, registerTableHandleRowMenuTriggerElement, registerTableHandleRowPopupElement, registerTableHandleRowPositionerElement, setupTableHandleColumnMenuRoot, setupTableHandleColumnMenuTrigger, setupTableHandleColumnPopup, setupTableHandleColumnPositioner, setupTableHandleDragPreview, setupTableHandleDropIndicator, setupTableHandleRoot, setupTableHandleRowMenuRoot, setupTableHandleRowMenuTrigger, setupTableHandleRowPopup, setupTableHandleRowPositioner };
//# sourceMappingURL=table-handle.d.ts.map