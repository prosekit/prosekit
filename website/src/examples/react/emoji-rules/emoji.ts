import { defineEnterRule } from 'prosekit/extensions/enter-rule'

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
