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

registerCleanupFunction(cleanup)

export async function renderSolidExample(story: string) {
  await runCleanupFunctions()
  return render(h(SolidRenderer, { story }))
}
