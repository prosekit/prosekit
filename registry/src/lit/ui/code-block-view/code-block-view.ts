import { renderMermaidSVG, THEMES } from 'beautiful-mermaid'
import type { Extension } from 'prosekit/core'
import { defineNodeView } from 'prosekit/core'
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import {
  hasCodeBlockPreviewHiddenDecoration,
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
  private select: HTMLSelectElement
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

    this.select = document.createElement('select')
    this.select.setAttribute('aria-label', 'Code block language')
    this.select.className = 'CSS_LANGUAGE_SELECT'

    const plain = document.createElement('option')
    plain.value = ''
    plain.textContent = 'Plain Text'
    this.select.appendChild(plain)

    for (const info of shikiBundledLanguagesInfo) {
      const option = document.createElement('option')
      option.value = info.id
      option.textContent = info.name
      this.select.appendChild(option)
    }

    this.select.addEventListener('change', this.handleChange)
    this.wrapper.appendChild(this.select)

    this.pre = document.createElement('pre')
    this.pre.className = 'CSS_CODE_BLOCK_PREVIEW_SOURCE'
    this.contentDOM = document.createElement('code')
    this.contentDOM.setAttribute('data-node-view-content', 'true')
    this.contentDOM.style.whiteSpace = 'inherit'
    this.pre.appendChild(this.contentDOM)

    this.preview = document.createElement('div')
    this.preview.className = 'CSS_CODE_BLOCK_PREVIEW_DISPLAY'
    this.preview.setAttribute('contenteditable', 'false')
    this.preview.setAttribute('tabindex', '0')
    this.preview.addEventListener('mousedown', this.handlePreviewMouseDown)

    root.appendChild(this.wrapper)
    root.appendChild(this.pre)
    root.appendChild(this.preview)

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
  }

  private sync() {
    const language = (this.node.attrs as CodeBlockAttrs).language || ''
    const forceShowSource = hasCodeBlockPreviewHiddenDecoration(this.decorations)
    const showMermaidPreview = !forceShowSource && language === 'mermaid'

    this.select.value = language
    if (language) {
      this.pre.setAttribute('data-language', language)
    } else {
      this.pre.removeAttribute('data-language')
    }

    if (showMermaidPreview) {
      this.wrapper.style.display = 'none'
      this.pre.setAttribute('data-preview', '')
      this.preview.style.display = ''
      this.renderPreview()
    } else {
      this.wrapper.style.display = ''
      this.pre.removeAttribute('data-preview')
      this.preview.style.display = 'none'
      this.preview.replaceChildren()
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
    this.select.removeEventListener('change', this.handleChange)
    this.preview.removeEventListener('mousedown', this.handlePreviewMouseDown)
  }
}

export function defineCodeBlockView(): Extension {
  return defineNodeView({
    name: 'codeBlock',
    constructor: (node, view, getPos, decorations) =>
      new CodeBlockNodeView(node, view, getPos, decorations),
  })
}
