import { expect } from 'vitest'
import { page } from 'vitest/browser'

import { registerLitRenderer } from '../../src/lit/renderer'

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

export async function renderLitExample(story: string) {
  await runCleanupFunctions()
  const container = document.body.appendChild(document.createElement('div'))
  containers.add(container)

  registerLitRenderer()

  const renderer = document.createElement('lit-renderer')
  renderer.style.display = 'contents'
  renderer.story = story
  container.appendChild(renderer)

  const fallback = page.getByTestId('lit-renderer-fallback')
  await expect.element(fallback).not.toBeInTheDocument()

  const screen = {
    container,
  }

  return screen
}
