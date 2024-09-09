import {
  defineCommands,
  defineNodeSpec,
  getNodeType,
  isEmptyBlockNode,
  union,
  type Extension,
  type PlainExtension,
  type Union,
} from '@prosekit/core'
import { InputRule } from '@prosekit/pm/inputrules'
import type { Attrs } from '@prosekit/pm/model'
import { type Command } from '@prosekit/pm/state'

import { defineInputRule } from '../input-rule'

type HorizontalRuleSpecExtension = Extension<{
  Nodes: {
    horizontalRule: Attrs
  }
}>

function defineHorizontalRuleSpec(): HorizontalRuleSpecExtension {
  return defineNodeSpec({
    name: 'horizontalRule',
    group: 'block',
    parseDOM: [{ tag: 'hr' }],
    toDOM: () => ['hr'],
  })
}

interface InsertHorizontalRuleOptions {
  insertionNode?: boolean
}

/**
 * Adds input rules for `horizontalRule` nodes.
 *
 * @public
 */
function defineHorizontalRuleInputRule(): PlainExtension {
  return union(
    defineInputRule(
      new InputRule(/^---$/, (state, match, start, end) => {
        const { schema } = state
        const { tr } = state
        const hr = getNodeType(schema, 'horizontalRule')
        if (match[0]) {
          tr.insert(start - 1, hr.create()).delete(
            tr.mapping.map(start),
            tr.mapping.map(end),
          )
        }

        return tr.scrollIntoView()
      }),
    ),
  )
}

type HorizontalRuleCommandsExtension = Extension<{
  Commands: {
    insertHorizontalRule: [options?: InsertHorizontalRuleOptions]
  }
}>

function defineHorizontalRuleCommands(): HorizontalRuleCommandsExtension {
  return defineCommands({
    insertHorizontalRule: () => {
      const insertHorizontalRuleCommand: Command = (state, dispatch) => {
        if (!dispatch) return true

        const { schema } = state
        const { tr } = state
        const hr = getNodeType(schema, 'horizontalRule')
        const $pos = tr.selection.$anchor

        const initialParent = $pos.parent

        const shouldDuplicateEmptyNode =
          tr.selection.empty && isEmptyBlockNode(initialParent)

        if (shouldDuplicateEmptyNode) {
          tr.insert($pos.pos + 1, initialParent)
          tr.replaceSelectionWith(hr.create())
        } else {
          tr.insert($pos.pos, hr.create())
        }

        dispatch(tr)

        return true
      }

      return insertHorizontalRuleCommand
    },
  })
}

type HorizontalRuleExtension = Union<
  [HorizontalRuleSpecExtension, HorizontalRuleCommandsExtension]
>

/**
 * @public
 */
function defineHorizontalRule(): HorizontalRuleExtension {
  return union(
    defineHorizontalRuleSpec(),
    defineHorizontalRuleInputRule(),
    defineHorizontalRuleCommands(),
  )
}

export {
  defineHorizontalRule,
  defineHorizontalRuleSpec,
  defineHorizontalRuleInputRule,
  defineHorizontalRuleCommands,
  type HorizontalRuleSpecExtension,
  type InsertHorizontalRuleOptions,
}
