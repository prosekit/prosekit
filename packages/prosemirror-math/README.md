# prosemirror-math

Math editing extensions for [ProseMirror](https://prosemirror.net/). Provides node specs, node views, input rules, and plugins for inline and block math.

## Installation

```bash
npm install prosemirror-math
```

<!-- TODO: Add live demo link -->

## Usage

### Node specs

`mathBlockSpec` and `mathInlineSpec` are [NodeSpec](https://prosemirror.net/docs/ref/#model.NodeSpec) objects that you can add to your schema.

```ts
import { mathBlockSpec, mathInlineSpec } from 'prosemirror-math'
import { Schema } from 'prosemirror-model'

const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: { content: 'inline*', group: 'block', parseDOM: [{ tag: 'p' }], toDOM: () => ['p', 0] },
    text: { group: 'inline' },
    mathBlock: { ...mathBlockSpec },
    mathInline: { ...mathInlineSpec },
  },
})
```

### Node views

`createMathBlockView` and `createMathInlineView` create [NodeView](https://prosemirror.net/docs/ref/#view.NodeView) instances with a source editor and a rendered display area. You provide your own math rendering function (e.g. using [Temml](https://temml.org/) or [KaTeX](https://katex.org/)).

```ts
import { createMathBlockView, createMathInlineView } from 'prosemirror-math'
import { EditorView } from 'prosemirror-view'
import Temml from 'temml'

const view = new EditorView(document.body, {
  state,
  nodeViews: {
    mathBlock: (node, view, getPos, decorations) => createMathBlockView((text, element) => {
      Temml.render(text, element, { displayMode: true })
    }, node, decorations),
    mathInline: (node, view, getPos, decorations) => createMathInlineView((text, element) => {
      Temml.render(text, element, { displayMode: false })
    }, node, decorations),
  },
})
```

### Input rules

`createMathInlineInputRule` creates a ProseMirror [InputRule](https://prosemirror.net/docs/ref/#inputrules.InputRule) that converts `$...$` or `$$...$$` into an inline math node.

```ts
import { inputRules } from 'prosemirror-inputrules'
import { createMathInlineInputRule } from 'prosemirror-math'

const plugin = inputRules({
  rules: [createMathInlineInputRule('mathInline')],
})
```

### Enter rule

`mathBlockEnterRule` is an [EnterRule](https://www.npmjs.com/package/prosemirror-enter-rules) that converts a paragraph containing `$$` into a math block when Enter is pressed.

```ts
import { createEnterRulePlugin } from 'prosemirror-enter-rules'
import { mathBlockEnterRule } from 'prosemirror-math'

const plugin = createEnterRulePlugin({
  rules: [mathBlockEnterRule],
})
```

### Cursor inside plugin

`createCursorInsidePlugin` adds a `prosemirror-math-head-inside` CSS class to math nodes when the cursor is inside them, useful for styling the active math node.

```ts
import { createCursorInsidePlugin } from 'prosemirror-math'

const plugin = createCursorInsidePlugin()
```

## API

### Node specs

- **`mathBlockSpec`** — NodeSpec for block math (`div.prosekit-math-block > pre > code`)
- **`mathInlineSpec`** — NodeSpec for inline math (`span.prosekit-math-inline > code`)

### Node views

- **`createMathBlockView(renderMath, node, decorations)`** — Creates a block math NodeView
- **`createMathInlineView(renderMath, node, decorations)`** — Creates an inline math NodeView

The `renderMath` callback receives `(text: string, element: HTMLElement)` and should render the math into the element.

### Input rules

- **`createMathInlineInputRule(nodeType)`** — Creates an InputRule for inline math

### Enter rules

- **`mathBlockEnterRule`** — EnterRule for converting `$$` into a math block

### Plugins

- **`createCursorInsidePlugin()`** — Plugin that decorates math nodes containing the cursor

## License

MIT
