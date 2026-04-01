import type { NodeJSON } from '@prosekit/core'
import { beforeEach, describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'

import TestEditor from '../testing/image-refresh-editor.svelte'
import { resetState, state } from '../testing/image-refresh-state'

describe('SvelteNodeView', () => {
  beforeEach(() => {
    resetState()
  })

  const paragraphJSON: NodeJSON = {
    type: 'paragraph',
    content: [{ type: 'text', text: 'Hello' }],
  }
  const imageRefreshJSON: NodeJSON = {
    type: 'image',
  }

  const editor = page.getByTestId('editor')
  const imageRefresh = page.getByTestId('image-refresh-view')

  it('can render a single self-update image node', async () => {
    const initialContent: NodeJSON = {
      type: 'doc',
      content: [imageRefreshJSON, paragraphJSON],
    }
    const screen = await render(TestEditor, { initialContent })
    await expect.element(editor).toBeVisible()
    await expect.element(imageRefresh).toBeInTheDocument()

    const urls = new Set<string>()
    const check = () => {
      imageRefresh.elements().forEach((element) => {
        const url = element.getAttribute('data-url')
        if (url) {
          urls.add(url)
        }
      })
      return urls.size >= 5
    }

    await expect.poll(check, { interval: 50, timeout: 30_000 }).toBe(true)

    await screen.unmount()

    expect(state.imageRefresh.setAttrs).toBeGreaterThanOrEqual(5)
    expect(state.imageRefresh.mounted).toBe(1)
    expect(state.imageRefresh.unmounted).toBe(1)
  })

  it('can render multiple self-update image nodes', async () => {
    const initialContent: NodeJSON = {
      type: 'doc',
      content: [imageRefreshJSON, paragraphJSON, imageRefreshJSON, imageRefreshJSON],
    }
    const screen = await render(TestEditor, { initialContent })
    await expect.element(editor).toBeVisible()
    await expect.element(imageRefresh.nth(0)).toBeInTheDocument()
    await expect.element(imageRefresh.nth(1)).toBeInTheDocument()
    await expect.element(imageRefresh.nth(2)).toBeInTheDocument()
    await expect.element(imageRefresh.nth(3)).not.toBeInTheDocument()

    const urls = new Set<string>()
    const check = () => {
      imageRefresh.elements().forEach((element) => {
        const url = element.getAttribute('data-url')
        if (url) {
          urls.add(url)
        }
      })
      return urls.size >= 15
    }

    await expect.poll(check, { interval: 50, timeout: 30_000 }).toBe(true)

    await screen.unmount()

    expect(state.imageRefresh.setAttrs).toBeGreaterThanOrEqual(15)
    expect(state.imageRefresh.mounted).toBe(3)
    expect(state.imageRefresh.unmounted).toBe(3)
  })
})
