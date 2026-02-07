import { defineUpdateHandler } from '@prosekit/core';
import { readable } from 'svelte/store';
import { useExtension } from './use-extension';
/**
 * Calls the given handler whenever the editor state changes.
 *
 * @public
 */
export function useStateUpdate(handler, options) {
    const extension = defineUpdateHandler((view) => handler(view.state));
    useExtension(readable(extension), options);
}
