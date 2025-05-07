import { withPriority, } from '@prosekit/core';
import { derived, } from 'svelte/store';
/**
 * @internal
 */
export function usePriorityExtension(extensionStore, priority) {
    return derived(extensionStore, (extension) => {
        return extension && priority ? withPriority(extension, priority) : extension;
    });
}
