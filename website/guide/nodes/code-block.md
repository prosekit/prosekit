# CodeBlock

The `codeBlock` node is designed to represent blocks of code within your document.

<!-- @include: @/examples/code-block.md -->

## Usage

```ts
import { defineCodeBlock } from 'prosekit/extensions/code-block'

const extension = defineCodeBlock()
```

## Syntax Highlighting

The `codeBlock` node includes support for syntax highlighting, powered by the [prosemirror-highlight] library. This feature provides the flexibility to select from a range of syntax highlighters, such as [Shiki], [Shikiji], [lowlight] (based on [Highlight.js]) and [refractor] (based on [Prism]). Below is an example demonstrating how to use the [Shikiji] library.

First, install the necessary dependencies:

::: code-group

```shell [npm]
npm install prosemirror-highlight shikiji
```

```shell [yarn]
yarn add prosemirror-highlight shikiji
```

```shell [pnpm]
pnpm add prosemirror-highlight shikiji
```

:::

After installing the dependencies, you can set the theme and language for the syntax highlighting and create a Shikiji highlighter instance:

```ts
import { getHighlighter } from 'shikiji'

const highlighter = await getHighlighter({
  themes: ['github-light'],
  langs: ['javascript', 'typescript'],
})
```

Lastly, create a ProseKit extension function that utilizes the Shikiji highlighter instance:

```ts
import { createParser } from 'prosemirror-highlight/shikiji'
import { defineCodeBlockHighlight } from 'prosekit/extensions/code-block'

const parser = createParser(highlighter)

function defineCodeBlockShikiji() {
  return defineCodeBlockHighlight({ parser })
}
```

For more details on how to use the other syntax highlighters, refer to the [prosemirror-highlight] documentation.

[prosemirror-highlight]: https://github.com/ocavue/prosemirror-highlight
[lowlight]: https://github.com/wooorm/lowlight
[Highlight.js]: https://github.com/highlightjs/highlight.js
[Shiki]: https://github.com/shikijs/shiki
[Shikiji]: https://github.com/antfu/shikiji
[refractor]: https://github.com/wooorm/refractor
[Prism]: https://github.com/PrismJS/prism
