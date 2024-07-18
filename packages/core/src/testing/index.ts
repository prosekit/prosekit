import { union } from '../editor/union'
import { defineBaseCommands } from '../extensions/command'
import { defineDoc } from '../extensions/doc'
import { defineHistory } from '../extensions/history'
import { defineBaseKeymap } from '../extensions/keymap-base'
import { defineMarkSpec } from '../extensions/mark-spec'
import { defineNodeSpec } from '../extensions/node-spec'
import { defineParagraph } from '../extensions/paragraph'
import { defineText } from '../extensions/text'
import { createTestEditor, type TestEditor } from '../test'
import type {
  Extension,
  ExtractMarkActions,
  ExtractNodeActions,
} from '../types/extension'

function defineBold() {
  return defineMarkSpec({
    name: 'bold',
    parseDOM: [{ tag: 'strong' }],
    toDOM() {
      return ['strong', 0]
    },
  })
}

function defineItalic() {
  return defineMarkSpec({
    name: 'italic',
    parseDOM: [{ tag: 'em' }],
    toDOM() {
      return ['em', 0]
    },
  })
}

function defineHeading() {
  return defineNodeSpec({
    name: 'heading',
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'h1' }],
    toDOM() {
      return ['h1', 0]
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
    defineItalic(),
    defineHeading(),
  ])
}

/**
 * @internal
 */
export function setupTestFromExtension<E extends Extension>(
  extension: E,
): {
  editor: TestEditor<E>
  n: ExtractNodeActions<E>
  m: ExtractMarkActions<E>
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
  return setupTestFromExtension(defineTestExtension())
}
