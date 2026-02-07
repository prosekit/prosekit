import { defineKeymap } from '@prosekit/core';
import { derived } from 'svelte/store';
import { useExtension } from "./use-extension.js";
export function useKeymap(keymapStore, options) {
    const extension = derived(keymapStore, (keymap) => defineKeymap(keymap));
    useExtension(extension, options);
}
