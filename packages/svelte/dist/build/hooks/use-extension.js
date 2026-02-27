import { useEditorExtension } from './use-editor-extension.ts';
import { usePriorityExtension } from './use-priority-extension.ts';
/**
 * Add an extension to the editor.
 */
export function useExtension(
/**
 * The store to an extension to add to the editor. If it changes, the previous
 * extension will be removed and the new one (if not null) will be added.
 */
extension, options) {
    useEditorExtension(options?.editor, usePriorityExtension(extension, options?.priority));
}
