import { createElement } from 'preact'
import { PreactRenderer } from 'prosekit-registry/preact/renderer'
import type { NodeJSON } from 'prosekit/core'
import { expect } from 'vitest'
import { cleanup, render } from 'vitest-browser-preact/pure'
import { page } from 'vitest/browser'

import { registerCleanupFunction, runCleanupFunctions } from './render-cleanup'

registerCleanupFunction(cleanup)

export async function renderPreactExample(story: string, initialContent?: NodeJSON) {
  await runCleanupFunctions()
  const screen = render(createElement(PreactRenderer, {
    story,
    exampleProps: initialContent ? { initialContent } : {},
  }))

  const fallback = page.getByTestId('preact-renderer-fallback')
  await expect.element(fallback).not.toBeInTheDocument()

  return screen
}
