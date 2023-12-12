# CodeBlock

The `codeBlock` node is used to represent blocks of code in the document.

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

## Syntax highlighting

The `codeBlock` node supports syntax highlighting using the [prosemirror-highlight] library. You can choose from various syntax highlighter including [Shiki], [Shikiji], [lowlight] (based on [Highlight.js]) and [refractor] (based on [Prism]). There is an example of using the [Shikiji] library below.

First install the required dependencies:

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

Then you can use specific the theme and language for the syntax highlighting, and create a ProseKit extension function:

<<< @/../playground/examples/react-toolbar/shikiji.ts

[prosemirror-highlight]: https://github.com/ocavue/prosemirror-highlight
[lowlight]: https://github.com/wooorm/lowlight
[Highlight.js]: https://github.com/highlightjs/highlight.js
[Shiki]: https://github.com/shikijs/shiki
[Shikiji]: https://github.com/antfu/shikiji
[refractor]: https://github.com/wooorm/refractor
[Prism]: https://github.com/PrismJS/prism
