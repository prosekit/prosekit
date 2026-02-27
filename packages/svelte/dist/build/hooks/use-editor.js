import { defineMountHandler, defineUpdateHandler, ProseKitError, union } from '@prosekit/core';
import { onMount } from 'svelte';
import { readonly, writable } from 'svelte/store';
import { useEditorContext } from '../contexts/editor-context.ts';
/**
 * Retrieves the editor instance from the nearest ProseKit component.
 *
 * @public
 */
export function useEditor(options) {
    const update = options?.update ?? false;
    const editor = useEditorContext();
    if (!editor) {
        throw new ProseKitError('useEditor must be used within the ProseKit component');
    }
    const editorStore = writable(editor);
    if (update) {
        onMount(() => {
            // We need `queueMicrotask` here to avoid `state_unsafe_mutation` errors.
            // See https://github.com/prosekit/prosekit/issues/1439
            const forceUpdate = () => {
                queueMicrotask(() => {
                    editorStore.set(editor);
                });
            };
            const extension = union(defineMountHandler(forceUpdate), defineUpdateHandler(forceUpdate));
            return editor.use(extension);
        });
    }
    return readonly(editorStore);
}
