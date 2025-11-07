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

registerCleanupFunction(cleanup)

export async function renderPreactExample(story: string) {
  await runCleanupFunctions()
  return render(createElement(PreactRenderer, { story }))
}
