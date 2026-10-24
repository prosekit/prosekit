import { PlainExtension } from "@prosekit/core";
/**
 * @internal
 */
export type VirtualSelectionExtension = PlainExtension;
/**
 * Shows a virtual selection when the editor is not focused. When the editor is
 * not focused, the selected inline content will be wrapped in a `<span>`
 * element with the class `prosekit-virtual-selection`.
 *
 * This is useful when you want to move the focus to an element outside the
 * editor, but still want to show the selection.
 */
export declare function defineVirtualSelection(): VirtualSelectionExtension;
//# sourceMappingURL=virtual-selection.d.ts.map