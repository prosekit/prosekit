import type { EventDeclarations, PropDeclarations } from "@aria-ui/core";
import type { Editor } from "@prosekit/core";

export interface TableHandleDndPreviewProps {
  editor: Editor | null
}

export const tableHandleDndPreviewProps: PropDeclarations<TableHandleDndPreviewProps> = {
  editor: { default: null },
}

export interface TableHandleDndPreviewEvents {}

export const tableHandleDndPreviewEvents: EventDeclarations<TableHandleDndPreviewEvents> = {}