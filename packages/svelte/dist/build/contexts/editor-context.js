import { ProseKitError } from '@prosekit/core';
import { getContext, hasContext, setContext } from 'svelte';
const key = 'prosekit-svelte-editor-context';
/**
 * @internal
 */
export function setEditorContext(getEditor) {
    setContext(key, getEditor);
}
/**
 * @internal
 */
export function useEditorContext() {
    if (hasContext(key)) {
        const context = getContext(key);
        const editor = context();
        if (!editor) {
            throw new ProseKitError('editor should not be empty');
        }
        return editor;
    }
}
