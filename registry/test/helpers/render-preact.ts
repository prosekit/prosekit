import { createElement } from 'preact'
import {
  cleanup,
  render,
} from 'vitest-browser-preact/pure'

import { PreactRenderer } from 'prosekit-registry/preact/renderer'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'
import { EMPTY_CONTENT } from './render-empty-content'

registerCleanupFunction(cleanup)

export async function renderPreactExample(story: string, emptyContent: boolean) {
  await runCleanupFunctions()
  return render(createElement(PreactRenderer, {
    story,
    props: emptyContent ? { defaultContent: EMPTY_CONTENT } : undefined,
  }))
}
