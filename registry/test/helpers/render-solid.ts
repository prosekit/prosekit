import h from 'solid-js/h'
import {
  cleanup,
  render,
} from 'vitest-browser-solid/pure'

import { SolidRenderer } from 'prosekit-registry/solid/renderer'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'
import { EMPTY_CONTENT } from './render-empty-content'

registerCleanupFunction(cleanup)

export async function renderSolidExample(story: string, emptyContent: boolean) {
  await runCleanupFunctions()
  return render(h(SolidRenderer, {
    story,
    props: emptyContent ? { initialContent: EMPTY_CONTENT } : undefined,
  }))
}
