# CodeBlock

The `codeBlock` node is for representing blocks of code within your document.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-code-block/editor.vue'
</script>

:::tabs key:framework

== Preview

<ClientOnly><App/></ClientOnly>
== React
<ExamplePlaygroundLazy example="react-code-block" />
:::

## Usage

```ts
import { defineCodeBlock } from 'prosekit/extensions/code-block'

const extension = defineCodeBlock()
```

## Syntax Highlighting

The `codeBlock` node comes with support for syntax highlighting, thanks to the [prosemirror-highlight] library. You have the flexibility to choose from a variety of syntax highlighters, including [Shiki], [Shikiji], [lowlight] (which is based on [Highlight.js]) and [refractor] (which is based on [Prism]). Below, you'll find an example of how to use the [Shikiji] library.

Start by installing the necessary dependencies:

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

Once the dependencies are installed, you can specify the theme and language for the syntax highlighting and create a Shikiji highlighter instance:

```ts
import { getHighlighter } from 'shikiji'

const highlighter = await getHighlighter({
  themes: ['github-light'],
  langs: ['javascript', 'typescript'],
})
```

Finally, you'll need to create a ProseKit extension function that uses the Shikiji highlighter instance:

```ts
import { createParser } from 'prosemirror-highlight/shikiji'
import { defineCodeBlockHighlight } from 'prosekit/extensions/code-block'

const parser = createParser(highlighter)
defineCodeBlockHighlight({ parser })
```

Check the [prosemirror-highlight] documentation for more information on how to use the other syntax highlighters.

[prosemirror-highlight]: https://github.com/ocavue/prosemirror-highlight
[lowlight]: https://github.com/wooorm/lowlight
[Highlight.js]: https://github.com/highlightjs/highlight.js
[Shiki]: https://github.com/shikijs/shiki
[Shikiji]: https://github.com/antfu/shikiji
[refractor]: https://github.com/wooorm/refractor
[Prism]: https://github.com/PrismJS/prism
