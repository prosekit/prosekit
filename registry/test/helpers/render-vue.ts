import {
  cleanup,
  render,
} from 'vitest-browser-vue/pure'

import { VueRenderer } from 'prosekit-registry/vue/renderer'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'
import { EMPTY_CONTENT } from './render-empty-content'

registerCleanupFunction(cleanup)

export async function renderVueExample(story: string, emptyContent: boolean) {
  await runCleanupFunctions()
  return render(VueRenderer, {
    props: {
      story,
      props: emptyContent ? { defaultContent: EMPTY_CONTENT } : undefined,
    },
  })
}
