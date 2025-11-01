import h from 'solid-js/h'
import {
  cleanup,
  render,
} from 'vitest-browser-solid/pure'

import { SolidExample } from '../../src/examples/solid/solid-example'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderSolidExample(story: string) {
  await runCleanupFunctions()
  return render(h(SolidExample, { story }))
}
