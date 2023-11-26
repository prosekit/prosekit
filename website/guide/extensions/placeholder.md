# Placeholder

Show a placeholder when the current text block is empty or the whole document is empty.

<script setup>	 
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'	
import App from '../../components/vue-placeholder/editor.vue'	
</script>

:::tabs

== Preview

<ClientOnly><App/></ClientOnly>
== React
<ExamplePlaygroundLazy example="vue-placeholder" />
:::

## Usage

```ts
import { definePlaceholder } from 'prosekit/extensions/readonly'

extension = definePlaceholder({ placeholder: 'Type Something...' })
```

## API Reference

- [prosekit/extensions/placeholder](/references/extensions/placeholder)
