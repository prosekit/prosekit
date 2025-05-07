import { BaseElementConstructor, EventDeclarations, PropDeclarations } from "@aria-ui/core";
import { Editor } from "@prosekit/core";
import { OverlayPositionerEvents, OverlayPositionerProps } from "@aria-ui/overlay";
import { MenuContentEvents, MenuContentProps } from "@aria-ui/menu/elements";
import { defineTableCommands } from "@prosekit/extensions/table";
import { MenuItemEvents, MenuItemProps } from "@aria-ui/menu";
import { Placement } from "@floating-ui/dom";

//#region src/components/table-handle/table-handle-column-root/types.d.ts
interface TableHandleColumnRootProps extends Omit<OverlayPositionerProps, "placement"> {
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
//#region src/components/table-handle/table-handle-column-trigger/types.d.ts
type TableCommandsExtension$1 = ReturnType<typeof defineTableCommands>;
interface TableHandleColumnTriggerProps {
  editor: Editor<TableCommandsExtension$1> | null;
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
//#region src/components/table-handle/table-handle-popover-content/types.d.ts
interface TableHandlePopoverContentProps extends Omit<MenuContentProps, "placement" | "offset"> {
  /**
  * @default 'bottom-start'
  */
  placement: MenuContentProps["placement"];
  /**
  * @default {mainAxis: -4, crossAxis: 4}
  */
  offset: MenuContentProps["offset"];
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
//#region src/components/table-handle/table-handle-row-root/types.d.ts
interface TableHandleRowRootProps extends Omit<OverlayPositionerProps, "placement"> {
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
//#region src/components/table-handle/table-handle-row-trigger/types.d.ts
type TableCommandsExtension = ReturnType<typeof defineTableCommands>;
interface TableHandleRowTriggerProps {
  editor: Editor<TableCommandsExtension> | null;
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
export { TableHandleColumnRootElement, TableHandleColumnRootEvents, TableHandleColumnRootProps, TableHandleColumnTriggerElement, TableHandleColumnTriggerEvents, TableHandleColumnTriggerProps, TableHandlePopoverContentElement, TableHandlePopoverContentEvents, TableHandlePopoverContentProps, TableHandlePopoverItemElement, TableHandlePopoverItemEvents, TableHandlePopoverItemProps, TableHandleRootElement, TableHandleRootEvents, TableHandleRootProps, TableHandleRowRootElement, TableHandleRowRootEvents, TableHandleRowRootProps, TableHandleRowTriggerElement, TableHandleRowTriggerEvents, TableHandleRowTriggerProps, tableHandleColumnRootEvents, tableHandleColumnRootProps, tableHandleColumnTriggerEvents, tableHandleColumnTriggerProps, tableHandlePopoverContentEvents, tableHandlePopoverContentProps, tableHandlePopoverItemEvents, tableHandlePopoverItemProps, tableHandleRootEvents, tableHandleRootProps, tableHandleRowRootEvents, tableHandleRowRootProps, tableHandleRowTriggerEvents, tableHandleRowTriggerProps };