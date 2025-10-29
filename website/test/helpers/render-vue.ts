import {
  cleanup,
  render,
} from 'vitest-browser-vue/pure'

import { VueExample } from '../../src/examples/vue/example'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderVueExample(story: string) {
  await runCleanupFunctions()
  return render(VueExample, { props: { story } })
}
