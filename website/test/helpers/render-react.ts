import { createElement } from 'react'
import {
  cleanup,
  render,
} from 'vitest-browser-react/pure'

import { ReactExample } from '../../src/examples/react/react-example'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderReactExample(story: string) {
  await runCleanupFunctions()
  return await render(createElement(ReactExample, { story }))
}
