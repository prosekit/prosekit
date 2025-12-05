import { sleep } from '@ocavue/utils'
import { createElement } from 'preact'
import { act } from 'preact/test-utils'
import type { NodeJSON } from 'prosekit/core'
import { expect } from 'vitest'
import { page } from 'vitest/browser'
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

export async function renderPreactExample(story: string, initialContent?: NodeJSON) {
  await runCleanupFunctions()
  const screen = render(createElement(PreactRenderer, {
    story,
    exampleProps: initialContent ? { initialContent } : {},
  }))

  await act(() => sleep(1))

  const fallback = page.getByTestId('preact-renderer-fallback')
  await expect.element(fallback).not.toBeInTheDocument()

  await act(() => sleep(1))

  return screen
}
