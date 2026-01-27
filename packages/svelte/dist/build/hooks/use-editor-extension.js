import { EditorNotFoundError, } from '@prosekit/core';
import { queueExtension } from '@prosekit/web';
import { onMount } from 'svelte';
import { useEditorContext } from '../contexts/editor-context';
/**
 * @internal
 */
export function useEditorExtension(maybeEditor, extensionStore) {
    const editorContext = useEditorContext();
    onMount(() => {
        let cleanup;
        let unsubscribe;
        unsubscribe = extensionStore.subscribe((extension) => {
            cleanup?.();
            cleanup = undefined;
            const editor = maybeEditor || editorContext;
            if (!editor) {
                throw new EditorNotFoundError();
            }
            if (extension) {
                cleanup = queueExtension(editor, extension);
            }
        });
        return () => {
            cleanup?.();
            cleanup = undefined;
            unsubscribe?.();
            unsubscribe = undefined;
        };
    });
}
