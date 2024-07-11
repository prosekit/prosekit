import {
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc,
  defineHistory,
  defineParagraph,
  defineText,
  union,
  type Extension,
  type ExtractMarks,
  type ExtractNodes,
  type MarkBuilder,
  type NodeBuilder,
} from '@prosekit/core'
import { createTestEditor, type TestEditor } from '@prosekit/core/test'

import { defineMarkSpec } from '../extensions/mark-spec'

function defineBold() {
  return defineMarkSpec({
    name: 'bold',
    parseDOM: [{ tag: 'strong' }],
    toDOM() {
      return ['strong', 0]
    },
  })
}

/**
 * @internal
 */
export function defineTestExtension() {
  return union([
    defineBaseCommands(),
    defineBaseKeymap(),
    defineDoc(),
    defineHistory(),
    defineParagraph(),
    defineText(),
    defineBold(),
  ])
}

/**
 * @internal
 */
export function setupTestExtension<E extends Extension>(
  extension: E,
): {
  editor: TestEditor<E>
  n: Record<ExtractNodes<E>, NodeBuilder>
  m: Record<ExtractMarks<E>, MarkBuilder>
} {
  const editor = createTestEditor({ extension })

  const div = document.body.appendChild(document.createElement('div'))
  div.style.minWidth = '200px'
  div.style.minHeight = '200px'
  editor.mount(div)
  editor.view.dom.focus()

  const n = editor.nodes
  const m = editor.marks
  return { editor, n, m }
}

/**
 * @internal
 */
export function setupTest() {
  return setupTestExtension(defineTestExtension())
}
