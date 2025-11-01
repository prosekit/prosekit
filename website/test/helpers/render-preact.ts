import { createElement } from 'preact'
import {
  cleanup,
  render,
} from 'vitest-browser-preact/pure'

import { PreactExample } from '../../src/examples/preact/preact-example'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderPreactExample(story: string) {
  await runCleanupFunctions()
  return render(createElement(PreactExample, { story }))
}
