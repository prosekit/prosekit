import {
  cleanup,
  render,
} from 'vitest-browser-svelte/pure'

import { SvelteExample } from '../../src/examples/svelte/svelte-example'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderSvelteExample(story: string) {
  await runCleanupFunctions()
  return render(SvelteExample, { story })
}
