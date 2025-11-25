import type { ComponentProps } from 'svelte'
import {
  cleanup,
  render,
} from 'vitest-browser-svelte/pure'

import { SvelteRenderer } from 'prosekit-registry/svelte/renderer'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'
import { EMPTY_CONTENT } from './render-empty-content'

registerCleanupFunction(cleanup)

export async function renderSvelteExample(story: string, emptyContent: boolean) {
  await runCleanupFunctions()
  type Props = ComponentProps<typeof SvelteRenderer>
  const props: Props = {
    story,
    props: emptyContent ? { defaultContent: EMPTY_CONTENT } : undefined,
  }

  // Use `as unknown as Props` to bypass the incorrect type in vitest-browser-svelte
  return render(SvelteRenderer, { props } as unknown as Props)
}
