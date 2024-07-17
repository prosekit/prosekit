import type { ProseMirrorNode } from '@prosekit/pm/model'
import { EditorState, NodeSelection, TextSelection } from '@prosekit/pm/state'

import { createMarkActions, createNodeActions } from '../editor/action'
import {
  Editor,
  EditorInstance,
  setupEditorExtension,
  type EditorOptions,
} from '../editor/editor'
import type { Extension } from '../types/extension'
import { assert } from '../utils/assert'

import {
  applyMarkForTest,
  createNodeForTest,
  type TaggedProseMirrorNode,
} from './test-builder'

function maybeResolve(doc: ProseMirrorNode, pos?: number) {
  if (pos != null) {
    return doc.resolve(pos)
  }
  return undefined
}

function getSelection(doc: TaggedProseMirrorNode) {
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
    this.nodeBuilders = createNodeActions(
      this.schema,
      this.getState,
      createNodeForTest,
    )
    this.markBuilders = createMarkActions(
      this.schema,
      this.getState,
      applyMarkForTest,
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
    assert(
      doc.type.schema === this.schema,
      'Document schema does not match editor schema',
    )
    assert(
      doc.type === this.schema.topNodeType,
      'Document type does not match editor top node type',
    )
    const selection = getSelection(doc)
    const state = EditorState.create({
      doc,
      selection,
      plugins: this.state.plugins,
    })
    this.updateState(state)
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
  return new TestEditor(new TestEditorInstance(extension))
}
