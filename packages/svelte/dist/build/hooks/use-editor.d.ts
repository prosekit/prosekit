import { type Editor, type Extension } from '@prosekit/core';
import { type Readable } from 'svelte/store';
/**
 * Retrieves the editor instance from the nearest ProseKit component.
 *
 * @public
 */
export declare function useEditor<E extends Extension = any>(options?: {
    /**
     * Whether to update the component when the editor is mounted or editor state
     * is updated.
     *
     * @default false
     */
    update?: boolean;
}): Readable<Editor<E>>;
//# sourceMappingURL=use-editor.d.ts.map