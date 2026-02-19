import type { ProseMirrorNode } from '@prosekit/pm/model'
import { NodeSelection, TextSelection, type Selection } from '@prosekit/pm/state'

import { createMarkActions, createNodeActions } from '../editor/action.ts'
import { Editor, EditorInstance, setupEditorExtension, type EditorOptions } from '../editor/editor.ts'
import type { Extension } from '../types/extension.ts'
import type { NodeJSON, SelectionJSON } from '../types/model.ts'
import { isProseMirrorNode } from '../utils/type-assertion.ts'

import { applyMarkForTest, createNodeForTest, type TaggedProseMirrorNode } from './test-builder.ts'

function maybeResolve(doc: ProseMirrorNode, pos?: number) {
  if (pos != null) {
    return doc.resolve(pos)
  }
  return undefined
}

function getSelection(doc: TaggedProseMirrorNode): Selection {
  const tags = doc.tags
  const $a = maybeResolve(doc, tags?.a)
  const $b = maybeResolve(doc, tags?.b)

  if ($a) {
    if ($a.parent.inlineContent) {
      return new TextSelection($a, $b)
    } else {
      return new NodeSelection($a)
    }
  }
  return TextSelection.atStart(doc)
}

class TestEditorInstance extends EditorInstance {
  constructor(extension: Extension) {
    super(extension)
    this.nodes = createNodeActions(this.schema, this.getState, createNodeForTest)
    this.marks = createMarkActions(this.schema, this.getState, applyMarkForTest)
  }

  override setContent(
    content: ProseMirrorNode | NodeJSON | string | HTMLElement,
    selection?: SelectionJSON | Selection | 'start' | 'end',
  ): void {
    return super.setContent(
      content,
      isProseMirrorNode(content) && !selection
        ? getSelection(content)
        : selection,
    )
  }
}

/**
 * An editor for testing purposes.
 * @public
 */
export class TestEditor<E extends Extension = Extension> extends Editor<E> {
  constructor(instance: EditorInstance) {
    super(instance)
  }

  /**
   * Set the editor state to the given document. You can use special tokens
   * `<a>` and `<b>` to set the anchor and head positions of the selection.
   *
   * @example
   *
   * ```ts
   * const editor = createTestEditor({ extension })
   * const n = editor.nodes
   * const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
   * editor.set(doc) // "Hello" is selected.
   * ```
   */
  set(doc: ProseMirrorNode): void {
    return this.setContent(doc)
  }

  dispatchEvent(event: Event): void {
    this.view.dispatchEvent(event)
  }
}

/**
 * @public
 */
export function createTestEditor<E extends Extension>(
  options: EditorOptions<E>,
): TestEditor<E> {
  const extension = setupEditorExtension(options)
  const instance = new TestEditorInstance(extension)
  return new TestEditor(instance)
}
