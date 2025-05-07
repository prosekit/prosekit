import { defineDocChangeHandler } from '@prosekit/core';
import { readable } from 'svelte/store';
import { useExtension, } from './use-extension';
/**
 * Calls the given handler whenever the editor document changes.
 *
 * @public
 */
export function useDocChange(handler, options) {
    const extension = defineDocChangeHandler((view) => handler(view.state.doc));
    useExtension(readable(extension), options);
}
