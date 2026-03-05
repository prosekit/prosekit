import type { ProseMirrorNode } from '@prosekit/pm/model';
import { type UseExtensionOptions } from './use-extension.ts';
/**
 * Calls the given handler whenever the editor document changes.
 *
 * @public
 */
export declare function useDocChange(handler: (doc: ProseMirrorNode) => void, options?: UseExtensionOptions): void;
//# sourceMappingURL=use-doc-change.d.ts.map