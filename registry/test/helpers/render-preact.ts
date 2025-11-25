import { createElement } from 'preact'
import type { NodeJSON } from 'prosekit/core'
import {
  cleanup,
  render,
} from 'vitest-browser-preact/pure'

import { PreactRenderer } from 'prosekit-registry/preact/renderer'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderPreactExample(story: string, initialContent?: NodeJSON) {
  await runCleanupFunctions()
  return render(createElement(PreactRenderer, {
    story,
    exampleProps: initialContent ? { initialContent } : {},
  }))
}
