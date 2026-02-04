import { ReactRenderer } from 'prosekit-registry/react/renderer'
import type { NodeJSON } from 'prosekit/core'
import { createElement } from 'react'
import { expect } from 'vitest'
import { cleanup, render } from 'vitest-browser-react/pure'
import { page } from 'vitest/browser'

import { registerCleanupFunction, runCleanupFunctions } from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderReactExample(story: string, initialContent?: NodeJSON) {
  await runCleanupFunctions()
  const screen = await render(createElement(ReactRenderer, {
    story,
    exampleProps: initialContent ? { initialContent } : {},
  }))

  const fallback = page.getByTestId('react-renderer-fallback')
  await expect.element(fallback).not.toBeInTheDocument()

  return screen
}
