# List

The `list` node is used to represent a list item. It is built on top of [prosemirror-flat-list](https://github.com/ocavue/prosemirror-flat-list).

## Usage

```ts
import 'prosekit/extensions/list/style.css'

import { defineList } from 'prosekit/extensions/list'

const extension = defineList()
```

## Input Rules

Input `1.` followed by a space to convert to an ordered list item.

Input `-` or `*` followed by a space to convert to an unordered list item.

Input `[x]` or `[]` followed by a space to convert to an task list item.

Input `>>` followed by a space to convert to an toggle list item.

## Example

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
</script>

:::tabs key:framework
== React
<ExamplePlaygroundLazy example="react-list" />
== Svelte
<ExamplePlaygroundLazy example="svelte-list" />
:::

## API Reference

See the documentation below for a complete reference to the extensions mentioned here.

- [prosekit/extensions/list](/references/extensions/list)
