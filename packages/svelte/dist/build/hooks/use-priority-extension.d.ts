import { type Extension, type Priority } from '@prosekit/core';
import { type Readable } from 'svelte/store';
/**
 * @internal
 */
export declare function usePriorityExtension<T extends Extension = Extension>(extensionStore: Readable<T | null>, priority?: Priority | null): Readable<T | null>;
//# sourceMappingURL=use-priority-extension.d.ts.map