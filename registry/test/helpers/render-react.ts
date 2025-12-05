import { sleep } from '@ocavue/utils'
import type { NodeJSON } from 'prosekit/core'
import {
  act,
  createElement,
} from 'react'
import { expect } from 'vitest'
import { page } from 'vitest/browser'
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
  const screen = await render(createElement(ReactRenderer, {
    story,
    exampleProps: initialContent ? { initialContent } : {},
  }))

  await act(() => sleep(1))

  const fallback = page.getByTestId('react-renderer-fallback')
  await expect.element(fallback).not.toBeInTheDocument()

  await act(() => sleep(1))

  return screen
}
