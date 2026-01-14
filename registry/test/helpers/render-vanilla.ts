import { expect } from 'vitest'

import { registerVanillaRenderer } from '../../src/vanilla/renderer'

import {
  registerCleanupFunction,
  runCleanupFunctions,
} from './render-cleanup'

const containers = new Set<HTMLElement>()

function cleanup() {
  for (const container of containers) {
    container.remove()
  }
  containers.clear()
}

registerCleanupFunction(cleanup)

export async function renderVanillaExample(story: string) {
  await runCleanupFunctions()
  const container = document.body.appendChild(document.createElement('div'))
  containers.add(container)

  registerVanillaRenderer()

  const renderer = document.createElement('vanilla-renderer')
  renderer.style.display = 'contents'
  renderer.setAttribute('data-story', story)
  container.appendChild(renderer)

  await expect.element(renderer).toHaveAttribute('data-loaded', 'true')

  const screen = {
    container,
  }

  return screen
}
