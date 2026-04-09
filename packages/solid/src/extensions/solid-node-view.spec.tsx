import { createEditor, union, type NodeJSON } from '@prosekit/core'
import { defineTestExtension, type ImageAttrs } from '@prosekit/testing'
import { onCleanup, onMount, type Component } from 'solid-js'
import { beforeEach, describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-solid'
import { page } from 'vitest/browser'

import { ProseKit } from '../components/prosekit.ts'

import { defineSolidNodeView, type SolidNodeViewComponent, type SolidNodeViewProps } from './solid-node-view.ts'

describe('SolidNodeView', () => {
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
      defineSolidNodeView({
        name: 'image',
        component: ImageRefreshView satisfies SolidNodeViewComponent,
      }),
    )
  }

  const ImageRefreshView: Component<SolidNodeViewProps> = (props) => {
    const url = () => (props.node.attrs as ImageAttrs).src

    onMount(() => {
      state.imageRefresh.mounted++
      const id = setInterval(() => {
        state.imageRefresh.setAttrs++
        props.setAttrs({ src: String(Math.random()) })
      }, 50)
      onCleanup(() => {
        state.imageRefresh.unmounted++
        clearInterval(id)
      })
    })

    return <div data-testid="image-refresh-view" data-url={url()}></div>
  }

  const TestEditor: Component<{ initialContent?: NodeJSON }> = (props) => {
    const editor = createEditor({
      extension: defineExtension(),
      defaultContent: props.initialContent,
    })

    onCleanup(() => editor.mount(null))

    return (
      <ProseKit editor={editor}>
        <div data-testid="editor" ref={editor.mount}></div>
      </ProseKit>
    )
  }

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
    const screen = render(() => <TestEditor initialContent={initialContent} />)
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

  it('can render multiple self-update image nodes', async () => {
    const initialContent: NodeJSON = {
      type: 'doc',
      content: [imageRefreshJSON, paragraphJSON, imageRefreshJSON, imageRefreshJSON],
    }
    const screen = render(() => <TestEditor initialContent={initialContent} />)
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
