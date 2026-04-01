import { getId } from '@ocavue/utils'
import { createEditor, defineNodeSpec, union, type NodeJSON } from '@prosekit/core'
import { beforeEach, describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page } from 'vitest/browser'
import { computed, defineComponent, h, onMounted, onUnmounted } from 'vue'

import { ProseKit } from '../components/prosekit.ts'
import { defineTestExtension } from '../testing/index.ts'

import { defineVueNodeView, type VueNodeViewComponent, type VueNodeViewProps } from './vue-node-view.ts'

describe('VueNodeView', () => {
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
      defineVueNodeView({
        name: 'image-refresh',
        component: ImageRefreshView as VueNodeViewComponent,
      }),
    )
  }

  const ImageRefreshView = defineComponent<VueNodeViewProps>(
    {
      name: 'ImageRefreshView',
      props: ['contentRef', 'view', 'getPos', 'setAttrs', 'node', 'selected', 'decorations', 'innerDecorations'],
      setup(props: VueNodeViewProps) {
        const attrs = computed(() => props.node.value.attrs as { url: string })
        onMounted(() => {
          state.imageRefresh.mounted++
          const id = setInterval(() => {
            state.imageRefresh.setAttrs++
            props.setAttrs({ url: String(getId()) })
          }, 50)
          onUnmounted(() => {
            state.imageRefresh.unmounted++
            clearInterval(id)
          })
        })
        return () =>
          h('div', {
            'data-testid': 'image-refresh-view',
            'data-url': attrs.value.url,
          })
      },
    },
  )

  const TestEditor = defineComponent<{ initialContent?: NodeJSON }>({
    name: 'TestEditor',
    props: ['initialContent'],
    setup(props) {
      const extension = defineExtension()
      const editor = createEditor({
        extension,
        defaultContent: props.initialContent,
      })

      return () =>
        h(ProseKit, { editor }, () =>
          h('div', {
            'data-testid': 'editor',
            'ref': (el) => {
              editor.mount(el as HTMLElement | null)
            },
          }))
    },
  })

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
    const screen = await render(TestEditor, { props: { initialContent } })
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

  it('can render multiple images that refresh periodically', async () => {
    const initialContent: NodeJSON = {
      type: 'doc',
      content: [paragraphJSON, imageRefreshJSON, paragraphJSON, imageRefreshJSON, imageRefreshJSON],
    }
    const screen = await render(TestEditor, { props: { initialContent } })
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
