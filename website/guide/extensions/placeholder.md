# Placeholder

Show some placeholder text when the current text block is empty or the whole document is empty.

<script setup>	 
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'	
import App from '../../components/vue-placeholder/editor.vue'	
</script>

:::tabs

== Preview

<ClientOnly><App/></ClientOnly>
== Vue
<ExamplePlaygroundLazy example="vue-placeholder" />
:::

## Usage

```ts
import 'prosekit/extensions/placeholder/style.css'

import { definePlaceholder } from 'prosekit/extensions/readonly'

extension = definePlaceholder({ placeholder: 'Type Something...' })
```

Note that you would need to import the style file for the extension to work.

## API Reference

- [prosekit/extensions/placeholder](/references/extensions/placeholder)
