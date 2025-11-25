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
import { EMPTY_CONTENT } from './render-empty-content'

registerCleanupFunction(cleanup)

export async function renderReactExample(story: string, emptyContent: boolean) {
  await runCleanupFunctions()
  return await render(createElement(ReactRenderer, {
    story,
    props: emptyContent ? { initialContent: EMPTY_CONTENT } : undefined,
  }))
}
