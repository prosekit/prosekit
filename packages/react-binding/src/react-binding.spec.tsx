import { ProseMirrorDoc } from '@handlewithcare/react-prosemirror'
import { type NodeJSON, union } from '@prosekit/core'
import { defineTestExtension } from '../../testing/src/index.ts'
import { createElement, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { type ReactMarkViewProps } from './adapters/mark-view-adapter.tsx'
import { type ReactNodeViewProps } from './adapters/node-view-adapter.tsx'
import { ProseKit } from './components/prosekit.tsx'
import { createReactBindingEditor } from './editor/react-binding-editor.ts'
import { defineReactMarkView } from './extensions/mark-view.ts'
import { defineReactNodeView } from './extensions/node-view.ts'
import { useEditor } from './hooks/use-editor.ts'
import { useEditorDerivedValue } from './hooks/use-editor-derived-value.ts'
import { useEditorState } from './hooks/use-editor-state.ts'

describe('react-binding', () => {
  let updateRenderCount = 0
  let derivedRenderCount = 0

  beforeEach(() => {
    updateRenderCount = 0
    derivedRenderCount = 0
  })

  function UpdateProbe() {
    const editor = useEditor({ update: true })
    updateRenderCount++

    return createElement('div', {
      'data-testid': 'update-probe',
      'data-mounted': String(editor.mounted),
    }, String(updateRenderCount))
  }

  function DerivedProbe() {
    const size = useEditorDerivedValue((editor) => editor.state.doc.textContent.length)
    derivedRenderCount++

    return createElement('div', {
      'data-testid': 'derived-probe',
    }, `${size}:${derivedRenderCount}`)
  }

  function StateProbe() {
    const state = useEditorState()

    return createElement('div', {
      'data-testid': 'state-probe',
    }, state.doc.textContent)
  }

  function ImageSrcProbe() {
    const src = useEditorDerivedValue((editor) => {
      let imageSrc = 'none'

      editor.state.doc.descendants((node) => {
        if (node.type.name === 'image') {
          imageSrc = String(node.attrs.src ?? 'none')
          return false
        }

        return true
      })

      return imageSrc
    })

    return createElement('div', {
      'data-testid': 'image-src-probe',
    }, src)
  }

  function InsertButton() {
    const editor = useEditor()

    return createElement('button', {
      type: 'button',
      onClick: () => {
        const end = editor.view.state.selection.$to.end()
        editor.view.dispatch(editor.view.state.tr.insertText('!', end))
      },
    }, 'Insert')
  }

  function ImageView(props: ReactNodeViewProps) {
    const src = String(props.node.attrs.src ?? '')

    return createElement(
      'figure',
      { 'data-testid': 'image-view' },
      createElement('img', {
        src,
        alt: 'image',
      }),
      createElement('button', {
        type: 'button',
        onClick: () => props.setAttrs({
          ...props.node.attrs,
          src: src === 'https://example.com/image-a.png'
            ? 'https://example.com/image-b.png'
            : 'https://example.com/image-a.png',
        }),
      }, 'Toggle src'),
    )
  }

  function BoldView(props: ReactMarkViewProps) {
    return createElement(
      'strong',
      {
        'data-testid': 'bold-view',
      },
      props.children,
    )
  }

  function defineExtension() {
    return union(
      defineTestExtension(),
      defineReactNodeView({
        name: 'image',
        component: ImageView,
      }),
      defineReactMarkView({
        name: 'bold',
        component: BoldView,
      }),
    )
  }

  function TestEditor(props: { initialContent: NodeJSON }) {
    const [editor] = useState(() => {
      return createReactBindingEditor({
        extension: defineExtension(),
        defaultContent: props.initialContent,
      })
    })

    return createElement(
      ProseKit,
      { editor },
      createElement(UpdateProbe),
      createElement(DerivedProbe),
      createElement(StateProbe),
      createElement(ImageSrcProbe),
      createElement(InsertButton),
      createElement(ProseMirrorDoc, { className: 'ProseMirror' }),
    )
  }

  async function renderEditor(element: ReturnType<typeof createElement>) {
    const container = document.createElement('div')
    document.body.append(container)

    const root = createRoot(container)
    root.render(element)
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))

    return {
      unmount() {
        root.unmount()
        container.remove()
      },
    }
  }

  it('updates editor hooks after transactions', async () => {
    const initialContent: NodeJSON = {
      type: 'doc',
      content: [{
        type: 'paragraph',
        content: [{ type: 'text', text: 'Hi' }],
      }],
    }

    const screen = await renderEditor(createElement(TestEditor, { initialContent }))

    const updateProbe = page.getByTestId('update-probe')
    const derivedProbe = page.getByTestId('derived-probe')
    const stateProbe = page.getByTestId('state-probe')

    await expect.element(updateProbe).toBeVisible()
    await expect.element(updateProbe).toHaveAttribute('data-mounted', 'true')
    await expect.element(derivedProbe).toHaveTextContent(/^2:/)
    await expect.element(stateProbe).toHaveTextContent('Hi')

    const before = Number(updateProbe.element().textContent)
    await page.getByRole('button', { name: 'Insert' }).click()

    await expect.poll(() => stateProbe.element().textContent).toContain('Hi')
    await expect.poll(() => Number(updateProbe.element().textContent)).toBeGreaterThan(before)
    await expect.element(derivedProbe).toHaveTextContent(/^3:/)

    screen.unmount()
  })

  it('renders react node views and can update attrs', async () => {
    const initialContent: NodeJSON = {
      type: 'doc',
      content: [{
        type: 'image',
        attrs: {
          src: 'https://example.com/image-a.png',
        },
      }],
    }

    const screen = await renderEditor(createElement(TestEditor, { initialContent }))

    const imageView = page.getByTestId('image-view')
    const image = page.getByRole('img', { name: 'image' })
    const imageSrcProbe = page.getByTestId('image-src-probe')

    await expect.element(imageView).toBeVisible()
    await expect.element(image).toHaveAttribute('src', 'https://example.com/image-a.png')
    await expect.element(imageSrcProbe).toHaveTextContent('https://example.com/image-a.png')

    await page.getByRole('button', { name: 'Toggle src' }).click()
    await expect.element(imageSrcProbe).toHaveTextContent('https://example.com/image-b.png')
    await expect.element(image).toHaveAttribute('src', 'https://example.com/image-b.png')

    screen.unmount()
  })

  it('renders react mark views with their children', async () => {
    const initialContent: NodeJSON = {
      type: 'doc',
      content: [{
        type: 'paragraph',
        content: [{
          type: 'text',
          text: 'Bold text',
          marks: [{ type: 'bold' }],
        }],
      }],
    }

    const screen = await renderEditor(createElement(TestEditor, { initialContent }))

    const boldView = page.getByTestId('bold-view')

    await expect.element(boldView).toBeVisible()
    await expect.element(boldView).toHaveTextContent('Bold text')

    screen.unmount()
  })
})
