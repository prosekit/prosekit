import { SvelteRenderer } from 'prosekit-registry/svelte/renderer'
import type { NodeJSON } from 'prosekit/core'
import type { ComponentProps } from 'svelte'
import { cleanup, render, type RenderResult } from 'vitest-browser-svelte/pure'

import { registerCleanupFunction, runCleanupFunctions } from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderSvelteExample(story: string, initialContent?: NodeJSON): Promise<RenderResult> {
  await runCleanupFunctions()
  type Props = ComponentProps<typeof SvelteRenderer>
  const props: Props = {
    story,
    exampleProps: initialContent ? { initialContent } : {},
  }
  const result: SvelteRenderResult = await render(SvelteRenderer, props)
  return result
}
