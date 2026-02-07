import { derived, readable } from 'svelte/store';
import { useEditor } from "./use-editor.js";
/**
 * Runs a function to derive a value from the editor instance after editor state
 * changes.
 *
 * This is useful when you need to render something based on the editor state,
 * for example, whether the selected text is wrapped in an italic mark.
 *
 * It returns a Svelte store that stores the derived value and updates whenever
 * the editor state changes.
 *
 * @public
 */
export function useEditorDerivedValue(
/**
 * A function that receives the editor instance and returns a derived value.
 *
 * It will be called whenever the editor's document state changes, or when it
 * mounts.
 */
derive, options) {
    const initialEditor = options?.editor;
    const editorStore = initialEditor
        ? readable(initialEditor)
        : useEditor({ update: true });
    return derived(editorStore, derive);
}
