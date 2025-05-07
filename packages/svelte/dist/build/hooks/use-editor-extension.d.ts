import { type Editor, type Extension } from '@prosekit/core';
import type { Readable } from 'svelte/store';
/**
 * @internal
 */
export declare function useEditorExtension(maybeEditor: Editor | null | undefined, extensionStore: Readable<Extension | null>): void;
