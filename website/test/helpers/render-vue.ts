import { VueRenderer } from 'prosekit-registry/vue/renderer'
import {
  cleanup,
  render,
} from 'vitest-browser-vue/pure'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderVueExample(story: string) {
  await runCleanupFunctions()
  return render(VueRenderer, { props: { story } })
}
