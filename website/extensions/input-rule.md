# Input Rule

Defines a new input rule for the editor, which can execute some action when a certain pattern is typed. This is based on the [prosemirror-inputrules].

## Usage

You can directly pass an `InputRule` instance to `defineInputRule`.

```ts twoslash
import { InputRule } from 'prosekit/pm/inputrules'
import { defineInputRule } from 'prosekit/extensions/input-rule'

/**
 * Converts three dots to an ellipsis character.
 */
function defineEllipsis() {
  const rule = new InputRule(/\.\.\.$/, '…')
  return defineInputRule(rule)
}
```

Use `defineTextBlockInputRule` to create a new input rule that can change the current text block into a different node type.

```ts twoslash
import { defineTextBlockInputRule } from 'prosekit/extensions/input-rule'

/**
 * Converts the text block to a heading when `#` is typed at the start of a new
 * line followed by a space.
 */
export function defineHeadingInputRule() {
  return defineTextBlockInputRule({
    regex: /^(#{1,6})\s$/,
    type: 'heading',
    attrs: (match) => {
      const level: number = match[1]?.length ?? 1
      return { level }
    },
  })
}
```

Use `defineWrappingInputRule` to create a new input rule that can change the current text block into a different node type.

```ts twoslash
import { defineBlockquoteInputRule } from 'prosekit/extensions/input-rule'

/**
 * Wraps the text block in a blockquote when `>` is typed at the start of a new
 * line followed by a space.
 */
export function defineBlockquoteInputRule() {
  return defineWrappingInputRule({
    regex: /^>\s/,
    type: 'blockquote',
  })
}
```

## API Reference

- [prosekit/extensions/input-rule](/references/extensions/input-rule)

<!-- Link references -->

[prosemirror-inputrules]: https://prosemirror.net/docs/ref/#inputrules
