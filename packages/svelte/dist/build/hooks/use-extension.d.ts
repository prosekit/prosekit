import type { Editor, Extension, Priority } from '@prosekit/core';
import type { Readable } from 'svelte/store';
export interface UseExtensionOptions {
    /**
     * The editor to add the extension to. If not provided, it will use the
     * editor from the nearest `<ProseKit>` component.
     */
    editor?: Editor;
    /**
     * Optional priority to add the extension with.
     */
    priority?: Priority;
}
/**
 * Add an extension to the editor.
 */
export declare function useExtension<T extends Extension = Extension>(
/**
 * The store to an extension to add to the editor. If it changes, the previous
 * extension will be removed and the new one (if not null) will be added.
 */
extension: Readable<T | null>, options?: UseExtensionOptions): void;
//# sourceMappingURL=use-extension.d.ts.map