# Get Started

## Installation

You can install ProseKit using `npm`, `yarn`, or `pnpm`. Choose the command that corresponds to your package manager:

::: code-group

```shell [npm]
npm install prosekit
```

```shell [yarn]
yarn add prosekit
```

```shell [pnpm]
pnpm add prosekit
```

:::

## Minimal Examples

ProseKit is compatible with various JavaScript frameworks and vanilla JavaScript. Here are some minimal examples of how to use ProseKit in different frameworks:

::: code-group

<<< @/../playground/examples/react-minimal/editor.tsx [React]

<<< @/../playground/examples/vue-minimal/editor.vue [Vue]

<<< @/../playground/examples/preact-minimal/editor.tsx [Preact]

<<< @/../playground/examples/svelte-minimal/editor.svelte [Svelte]

<<< @/../playground/examples/solid-minimal/editor.tsx [Solid]

:::

Let's go through the code to understand what's going on.

## Extensions

All customizations in ProseKit are done through extensions. Here we are using the `defineBasicExtension` function to return a basic extension that provides the most common features.

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'

// ---cut---
const extension = defineBasicExtension()
```

## Editor

The `createEditor` function creates an editor instance.

```ts twoslash
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
const extension = defineBasicExtension()

// ---cut---
const editor = createEditor({ extension })
```

You need to mount the editor to the DOM by calling the `editor.mount(element)` method. When the editor is unmounted, you should call the `editor.mount(null)` method to clean up the editor. Check out the minimal examples above to see how to mount the editor in different frameworks.

## Data Persistence

The editor's data should be stored in the JSON format, specifically in the [NodeJSON] format. In the given example, the Editor component takes in two properties: `defaultDoc` and `onDocChange`. The `defaultDoc` is the initial document that is displayed when the editor is first loaded. The `onDocChange` is a callback function that is triggered each time the document changes.

## Styling

ProseKit is headless, giving you full control over your editor's appearance. However, to help you in getting started, we offers two basic stylesheets.

```ts twoslash
import 'prosekit/basic/style.css'
```

```ts twoslash
import 'prosekit/basic/typograph.css'
```

The `prosekit/basic/style.css` file provides essential styles to ensure the editor displays correctly.

The `prosekit/basic/typograph.css` file offers basic typographic styles for the editor, like margins, paddings, and font sizes. This is optional, and you can exclude it if you wish to use your own styles.

<!-- References -->

[NodeJSON]: https://prosekit.dev/references/core#nodejson
