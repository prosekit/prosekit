# CodeBlock

The `codeBlock` node is designed to represent blocks of code within your document.

<!-- @include: @/examples/code-block.md -->

## Usage

```ts
import { defineCodeBlock } from 'prosekit/extensions/code-block'

const extension = defineCodeBlock()
```

## Syntax Highlighting

You can use `defineCodeBlockShikiji` to enable syntax highlighting for the `codeBlock` node using the [Shikiji] library. `defineCodeBlockShikiji` will only load the [Shikiji] library and used languages asynchronously, which is useful for reducing the initial bundle size of your application.

```ts
import { defineCodeBlockShikiji } from 'prosekit/extensions/code-block'

const extension = defineCodeBlockShikiji({ theme: 'github-light' })
```

If you want to use a different syntax highlighter or have more control over the syntax highlighting, you can use the `defineCodeBlockHighlight` function to create an extension. This function accepts a `parser` object, defined by the [prosemirror-highlight] library. For more details on how to use the other syntax highlighters, refer to the [prosemirror-highlight] documentation.

```ts
import { defineCodeBlockHighlight } from 'prosekit/extensions/code-block'
import { parser } from './my-prosemirror-highlight-parser'

const extension = defineCodeBlockHighlight({ parser })
```

[prosemirror-highlight]: https://github.com/ocavue/prosemirror-highlight
[lowlight]: https://github.com/wooorm/lowlight
[Highlight.js]: https://github.com/highlightjs/highlight.js
[Shiki]: https://github.com/shikijs/shiki
[Shikiji]: https://github.com/antfu/shikiji
[refractor]: https://github.com/wooorm/refractor
[Prism]: https://github.com/PrismJS/prism
