/* eslint-disable @eslint-react/component-hook-factories */

import { getId } from '@ocavue/utils'
import { createEditor, defineNodeSpec, union, type NodeJSON } from '@prosekit/core'
import { defineTestExtension } from '@prosekit/testing'
import { createElement } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { beforeEach, describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-preact'
import { page } from 'vitest/browser'

import { ProseKit } from '../components/prosekit.ts'

import { definePreactNodeView, type PreactNodeViewComponent, type PreactNodeViewProps } from './preact-node-view.ts'

describe('PreactNodeView', () => {
  const initialState = {
    imageRefresh: {
      mounted: 0,
      unmounted: 0,
      setAttrs: 0,
    },
  }

  let state = structuredClone(initialState)

  beforeEach(() => {
    state = structuredClone(initialState)
  })

  function defineExtension() {
    return union(
      defineTestExtension(),
      defineNodeSpec({
        name: 'image-refresh',
        attrs: {
          url: { default: '', validate: 'string' },
        },
        group: 'block',
        inline: false,
        atom: true,
        isolating: true,
        selectable: true,
        draggable: true,
        parseDOM: [{ tag: 'node-image-refresh' }],
        toDOM: () => ['node-image-refresh', 0],
      }),
      definePreactNodeView({
        name: 'image-refresh',
        component: ImageRefreshView satisfies PreactNodeViewComponent,
      }),
    )
  }

  function ImageRefreshView(props: PreactNodeViewProps) {
    const url = (props.node.attrs as { url: string }).url
    const setAttrs = props.setAttrs

    useEffect(() => {
      state.imageRefresh.mounted++
      const id = setInterval(() => {
        state.imageRefresh.setAttrs++
        setAttrs({ url: String(getId()) })
      }, 50)
      return () => {
        state.imageRefresh.unmounted++
        clearInterval(id)
      }
    }, [setAttrs])

    return createElement('div', {
      'data-testid': 'image-refresh-view',
      'data-url': url,
    })
  }

  function TestEditor(props: { initialContent?: NodeJSON }) {
    const [editor] = useState(() => {
      return createEditor({
        extension: defineExtension(),
        defaultContent: props.initialContent,
      })
    })

    return createElement(
      ProseKit,
      { editor },
      createElement('div', {
        'data-testid': 'editor',
        'ref': editor.mount,
      }),
    )
  }

  const paragraphJSON: NodeJSON = {
    type: 'paragraph',
    content: [{ type: 'text', text: 'Hello' }],
  }
  const imageRefreshJSON: NodeJSON = {
    type: 'image-refresh',
    attrs: { url: '' },
  }

  const editor = page.getByTestId('editor')
  const imageRefresh = page.getByTestId('image-refresh-view')

  it('can render an image that refresh periodically', async () => {
    const initialContent: NodeJSON = {
      type: 'doc',
      content: [paragraphJSON, imageRefreshJSON],
    }
    const screen = render(createElement(TestEditor, { initialContent }))
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

    screen.unmount()

    expect(state.imageRefresh.setAttrs).toBeGreaterThanOrEqual(5)
    expect(state.imageRefresh.mounted).toBe(1)
    expect(state.imageRefresh.unmounted).toBe(1)
  })

  it('can render multiple images that refresh periodically', async () => {
    const initialContent: NodeJSON = {
      type: 'doc',
      content: [paragraphJSON, imageRefreshJSON, paragraphJSON, imageRefreshJSON, imageRefreshJSON],
    }
    const screen = render(createElement(TestEditor, { initialContent }))
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

    screen.unmount()

    expect(state.imageRefresh.setAttrs).toBeGreaterThanOrEqual(15)
    expect(state.imageRefresh.mounted).toBe(3)
    expect(state.imageRefresh.unmounted).toBe(3)
  })
})
