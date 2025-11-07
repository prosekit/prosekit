import {
  cleanup,
  render,
} from 'vitest-browser-svelte/pure'

import { SvelteRenderer } from 'prosekit-registry/svelte/renderer'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderSvelteExample(story: string) {
  await runCleanupFunctions()
  return render(SvelteRenderer, { story })
}
