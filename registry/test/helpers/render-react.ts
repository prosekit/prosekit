import type { NodeJSON } from 'prosekit/core'
import { createElement } from 'react'
import {
  cleanup,
  render,
} from 'vitest-browser-react/pure'

import { ReactRenderer } from 'prosekit-registry/react/renderer'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderReactExample(story: string, initialContent?: NodeJSON) {
  await runCleanupFunctions()
  return await render(createElement(ReactRenderer, {
    story,
    exampleProps: { initialContent },
  }))
}
