import { ReactRenderer } from 'prosekit-registry/react/renderer'
import { createElement } from 'react'
import {
  cleanup,
  render,
} from 'vitest-browser-react/pure'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderReactExample(story: string) {
  await runCleanupFunctions()
  return await render(createElement(ReactRenderer, { story }))
}
