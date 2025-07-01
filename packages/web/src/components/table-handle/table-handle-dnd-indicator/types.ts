import type { EventDeclarations, PropDeclarations } from "@aria-ui/core";
import type { Editor } from "@prosekit/core";
import type { TableCommandsExtension } from "@prosekit/extensions/table";

export interface TableHandleDndIndicatorProps {
  editor: Editor<TableCommandsExtension> | null
}

export const tableHandleDndIndicatorProps: PropDeclarations<TableHandleDndIndicatorProps> = {
  editor: { default: null },
}

export interface TableHandleDndIndicatorEvents {}

export const tableHandleDndIndicatorEvents: EventDeclarations<TableHandleDndIndicatorEvents> = {}
