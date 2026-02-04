import { VueRenderer } from 'prosekit-registry/vue/renderer'
import type { NodeJSON } from 'prosekit/core'
import { cleanup, render } from 'vitest-browser-vue/pure'

import { registerCleanupFunction, runCleanupFunctions } from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderVueExample(story: string, initialContent?: NodeJSON) {
  await runCleanupFunctions()
  return render(VueRenderer, {
    props: {
      story,
      exampleProps: initialContent ? { initialContent } : {},
    },
  })
}
