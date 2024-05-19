import { union } from 'prosekit/core'
import { defineEnterRule } from 'prosekit/extensions/enter-rule'
import { defineInputRule } from 'prosekit/extensions/input-rule'
import { InputRule } from 'prosekit/pm/inputrules'

/**
 * Converts the text before the text cursor into an emoji when pressing `Enter`.
 */
export function defineEmojiEnterRule() {
  return defineEnterRule({
    regex: /:(apple|banana):$/,
    handler: ({ match, from, to, state }) => {
      const text = match[1] as 'apple' | 'banana'
      const emoji = text === 'apple' ? '🍎' : '🍌'
      return state.tr.replaceWith(from, to, state.schema.text(emoji))
    },
  })
}

/**
 * Converts the text before the text cursor into an emoji when pressing `Space`.
 */
export function defineEmojiSpaceRule() {
  return union([
    defineInputRule(new InputRule(/:apple: $/, '🍎')),
    defineInputRule(new InputRule(/:banana: $/, '🍌')),
  ])
}
