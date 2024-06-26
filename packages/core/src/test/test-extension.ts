import { union } from '../editor/union'
import { defineBaseCommands } from '../extensions/command'
import { defineDoc } from '../extensions/doc'
import { defineHistory } from '../extensions/history'
import { defineBaseKeymap } from '../extensions/keymap'
import { defineMarkSpec } from '../extensions/mark-spec'
import { defineParagraph } from '../extensions/paragraph'
import { defineText } from '../extensions/text'

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
