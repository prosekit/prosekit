import type { EventDeclarations, PropDeclarations } from "@aria-ui/core";
import type { Editor } from "@prosekit/core";

export interface TableHandleDndIndicatorProps {
  editor: Editor | null
}

export const tableHandleDndIndicatorProps: PropDeclarations<TableHandleDndIndicatorProps> = {
  editor: { default: null },
}

export interface TableHandleDndIndicatorEvents {}

export const tableHandleDndIndicatorEvents: EventDeclarations<TableHandleDndIndicatorEvents> = {}
