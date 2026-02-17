# prosemirror-enter-rules

Enter rules for [ProseMirror](https://prosemirror.net/). An enter rule triggers when the text directly in front of the cursor matches a regex and the user presses Enter.

This is similar to ProseMirror's built-in [input rules](https://prosemirror.net/docs/ref/#inputrules), but triggered by the Enter key instead of text input.

## Installation

```bash
npm install prosemirror-enter-rules
```

## Usage

### Basic enter rule

```ts
import { createEnterRulePlugin } from 'prosemirror-enter-rules'

const plugin = createEnterRulePlugin({
  rules: [
    {
      regex: /^---$/,
      handler: ({ state, from, to }) => {
        // Replace "---" with a horizontal rule, or any other transformation
        return state.tr.delete(from, to)
      },
    },
  ],
})
```

### Text block enter rule

Use `createTextBlockEnterRule` to convert a paragraph into a different block type when Enter is pressed:

```ts
import { createEnterRulePlugin, createTextBlockEnterRule } from 'prosemirror-enter-rules'

const headingRule = createTextBlockEnterRule({
  regex: /^(#{1,6})\s$/,
  type: 'heading', // or pass a NodeType instance
  attrs: (match) => ({ level: match[1].length }),
})

const codeBlockRule = createTextBlockEnterRule({
  regex: /^```(\S*)$/,
  type: 'codeBlock',
  attrs: (match) => ({ language: match[1] || '' }),
})

const plugin = createEnterRulePlugin({
  rules: [headingRule, codeBlockRule],
})
```

### Controlling rule execution order

Each rule can have a `stop` option. When a rule with `stop: true` matches and produces a transaction, no further rules are processed. By default, `stop` is `false` for custom rules and `true` for text block rules.

```ts
const rule = {
  regex: /^test$/,
  handler: ({ state }) => state.tr,
  stop: true, // stop processing further rules after this one matches
}
```

## API

### `createEnterRulePlugin({ rules })`

Creates a ProseMirror plugin that handles enter rules.

### `createTextBlockEnterRule(options)`

Creates an `EnterRule` that replaces matched text and converts the current block to a different node type.

Options:

- `regex` - Regular expression to match (should end with `$`)
- `type` - Node type name (string) or `NodeType` instance
- `attrs` - Static attributes object, or a function `(match) => attrs`
- `stop` - Whether to stop processing further rules (default: `true`)

### `EnterRule`

An object with:

- `regex` - Regular expression to match against text before the cursor
- `handler` - Function receiving `{ state, from, to, match }` and returning a `Transaction` or `null`
- `stop` - Whether to stop processing further rules (default: `false`)

## License

MIT
