import type { Extension } from 'prosekit/core'
import { defineNodeView } from 'prosekit/core'
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import type { EditorView } from 'prosekit/pm/view'

class CodeBlockNodeView {
  dom: HTMLElement
  contentDOM: HTMLElement
  private node: ProseMirrorNode
  private view: EditorView
  private getPos: () => number | undefined
  private select: HTMLSelectElement
  private pre: HTMLPreElement

  constructor(node: ProseMirrorNode, view: EditorView, getPos: () => number | undefined) {
    this.node = node
    this.view = view
    this.getPos = getPos

    const root = document.createElement('div')
    root.setAttribute('data-node-view-root', 'true')

    const wrapper = document.createElement('div')
    wrapper.className = 'CSS_LANGUAGE_WRAPPER'
    wrapper.setAttribute('contenteditable', 'false')

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
    wrapper.appendChild(this.select)

    this.pre = document.createElement('pre')
    this.contentDOM = document.createElement('code')
    this.contentDOM.setAttribute('data-node-view-content', 'true')
    this.contentDOM.style.whiteSpace = 'inherit'
    this.pre.appendChild(this.contentDOM)

    root.appendChild(wrapper)
    root.appendChild(this.pre)

    this.dom = root
    this.syncAttrs()
  }

  private handleChange = (event: Event) => {
    const language = (event.target as HTMLSelectElement).value
    const pos = this.getPos()
    if (typeof pos !== 'number') return
    const attrs: CodeBlockAttrs = { ...(this.node.attrs as CodeBlockAttrs), language }
    this.view.dispatch(this.view.state.tr.setNodeMarkup(pos, undefined, attrs))
  }

  private syncAttrs() {
    const language = (this.node.attrs as CodeBlockAttrs).language || ''
    this.select.value = language
    if (language) {
      this.pre.setAttribute('data-language', language)
    } else {
      this.pre.removeAttribute('data-language')
    }
  }

  update(node: ProseMirrorNode) {
    if (node.type !== this.node.type) return false
    this.node = node
    this.syncAttrs()
    return true
  }

  destroy() {
    this.select.removeEventListener('change', this.handleChange)
  }
}

export function defineCodeBlockView(): Extension {
  return defineNodeView({
    name: 'codeBlock',
    constructor: (node, view, getPos) => new CodeBlockNodeView(node, view, getPos),
  })
}
