import { renderMermaidSVG, THEMES } from 'beautiful-mermaid'
import { html, render } from 'lit'
import type { Extension } from 'prosekit/core'
import { defineNodeView } from 'prosekit/core'
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import {
  isCodeBlockPreviewHiddenDecoration,
  shikiBundledLanguagesInfo,
} from 'prosekit/extensions/code-block'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import { TextSelection } from 'prosekit/pm/state'
import type { Decoration, EditorView } from 'prosekit/pm/view'

class CodeBlockNodeView {
  dom: HTMLElement
  contentDOM: HTMLElement
  private node: ProseMirrorNode
  private view: EditorView
  private getPos: () => number | undefined
  private decorations: readonly Decoration[]
  private wrapper: HTMLDivElement
  private pre: HTMLPreElement
  private preview: HTMLDivElement

  constructor(
    node: ProseMirrorNode,
    view: EditorView,
    getPos: () => number | undefined,
    decorations: readonly Decoration[],
  ) {
    this.node = node
    this.view = view
    this.getPos = getPos
    this.decorations = decorations

    const root = document.createElement('div')
    root.setAttribute('data-node-view-root', 'true')

    this.wrapper = document.createElement('div')
    this.wrapper.className = 'CSS_LANGUAGE_WRAPPER'
    this.wrapper.setAttribute('contenteditable', 'false')

    this.pre = document.createElement('pre')
    this.pre.className = 'CSS_CODE_BLOCK_PREVIEW_SOURCE'
    this.contentDOM = document.createElement('code')
    this.contentDOM.setAttribute('data-node-view-content', 'true')
    this.contentDOM.style.whiteSpace = 'inherit'
    this.pre.appendChild(this.contentDOM)

    this.preview = document.createElement('div')
    this.preview.className = 'CSS_CODE_BLOCK_PREVIEW_DISPLAY'
    this.preview.setAttribute('contenteditable', 'false')
    this.preview.setAttribute('aria-label', 'Edit source')
    this.preview.addEventListener('mousedown', this.handlePreviewMouseDown)

    root.appendChild(this.wrapper)
    root.appendChild(this.pre)

    this.dom = root
    this.sync()
  }

  private handleChange = (event: Event) => {
    const language = (event.target as HTMLSelectElement).value
    const pos = this.getPos()
    if (typeof pos !== 'number') return
    const attrs: CodeBlockAttrs = { ...(this.node.attrs as CodeBlockAttrs), language }
    this.view.dispatch(this.view.state.tr.setNodeMarkup(pos, undefined, attrs))
  }

  private handlePreviewMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    const pos = this.getPos()
    if (typeof pos !== 'number') return
    const selection = TextSelection.near(this.view.state.doc.resolve(pos + 1), 1)
    this.view.dispatch(this.view.state.tr.setSelection(selection))
    this.view.focus()
    this.pre.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  private sync() {
    const language = (this.node.attrs as CodeBlockAttrs).language || ''
    const hidePreview = this.decorations.some(isCodeBlockPreviewHiddenDecoration)
    const showMermaidPreview = !hidePreview && language === 'mermaid'

    render(
      html`
        <select
          aria-label="Code block language"
          class="CSS_LANGUAGE_SELECT"
          .value=${language}
          @change=${this.handleChange}
        >
          <option value="">Plain Text</option>
          ${shikiBundledLanguagesInfo.map(
            (info) => html`<option value=${info.id}>${info.name}</option>`,
          )}
        </select>
      `,
      this.wrapper,
    )

    if (language) {
      this.pre.setAttribute('data-language', language)
    } else {
      this.pre.removeAttribute('data-language')
    }

    if (showMermaidPreview) {
      this.wrapper.setAttribute('data-preview', '')
      this.pre.setAttribute('data-preview', '')
      this.renderPreview()
      if (!this.preview.isConnected) {
        this.dom.appendChild(this.preview)
      }
    } else {
      this.wrapper.removeAttribute('data-preview')
      this.pre.removeAttribute('data-preview')
      this.preview.replaceChildren()
      if (this.preview.isConnected) {
        this.preview.remove()
      }
    }
  }

  private renderPreview() {
    this.preview.replaceChildren()
    try {
      const svg = renderMermaidSVG(this.node.textContent, THEMES['tokyo-night'])
      const svgWrapper = document.createElement('div')
      svgWrapper.innerHTML = svg
      this.preview.appendChild(svgWrapper)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      const errorPre = document.createElement('pre')
      errorPre.textContent = message
      this.preview.appendChild(errorPre)
    }
  }

  update(node: ProseMirrorNode, decorations: readonly Decoration[]) {
    if (node.type !== this.node.type) return false
    this.node = node
    this.decorations = decorations
    this.sync()
    return true
  }

  destroy() {
    this.preview.removeEventListener('mousedown', this.handlePreviewMouseDown)
    render(null, this.wrapper)
  }
}

export function defineCodeBlockView(): Extension {
  return defineNodeView({
    name: 'codeBlock',
    constructor: (node, view, getPos, decorations) =>
      new CodeBlockNodeView(node, view, getPos, decorations),
  })
}
