import { expect, test } from 'vitest'

import { registerResizableRootElement } from './resizable-root.ts'

function createRoot(attrs: Record<string, string>): HTMLElement {
  registerResizableRootElement()
  const root = document.createElement('prosekit-resizable-root')
  for (const [name, value] of Object.entries(attrs)) {
    root.setAttribute(name, value)
  }
  document.body.append(root)
  return root
}

// A portrait image (aspect ratio < 1) that carries a real width must be driven
// by that width (`width: <N>px; height: auto`), not by `width: min-content`. The
// `min-content` path relied on the CSS aspect-ratio transferred size, which
// WebKit does not resolve, collapsing the box to its minimum size.
test('a portrait image with a width is driven by width, not min-content', async () => {
  const root = createRoot({
    'data-width': '120',
    'data-height': '240',
    'data-aspect-ratio': '0.5',
  })

  await expect.poll(() => root.style.height).toBe('auto')
  expect(root.style.width).toBe('120px')

  root.remove()
})

// A landscape image keeps the same width-driven sizing.
test('a landscape image with a width is driven by width', async () => {
  const root = createRoot({
    'data-width': '240',
    'data-height': '120',
    'data-aspect-ratio': '2',
  })

  await expect.poll(() => root.style.height).toBe('auto')
  expect(root.style.width).toBe('240px')

  root.remove()
})

// With no width to drive the box, a portrait image still derives its width from
// the height via `min-content`.
test('a portrait image without a width falls back to min-content', async () => {
  const root = createRoot({
    'data-height': '240',
    'data-aspect-ratio': '0.5',
  })

  await expect.poll(() => root.style.width).toBe('min-content')

  root.remove()
})
