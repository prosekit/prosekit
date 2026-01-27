import { ProseKitError, } from '@prosekit/core';
import { getContext, hasContext, setContext, } from 'svelte';
const key = 'prosekit-svelte-editor-context';
/**
 * @internal
 */
export function setEditorContext(editor) {
    if (!editor) {
        throw new ProseKitError('editor should not be empty');
    }
    setContext(key, editor);
}
/**
 * @internal
 */
export function useEditorContext() {
    if (hasContext(key)) {
        return getContext(key);
    }
}
