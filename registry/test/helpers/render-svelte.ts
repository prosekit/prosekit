import { SvelteRenderer } from 'prosekit-registry/svelte/renderer'
import type { NodeJSON } from 'prosekit/core'
import type { ComponentProps } from 'svelte'
import { cleanup, render } from 'vitest-browser-svelte/pure'

import { registerCleanupFunction, runCleanupFunctions } from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderSvelteExample(story: string, initialContent?: NodeJSON) {
  await runCleanupFunctions()
  type Props = ComponentProps<typeof SvelteRenderer>
  const props: Props = {
    story,
    exampleProps: initialContent ? { initialContent } : {},
  }
  return render(SvelteRenderer, props)
}
