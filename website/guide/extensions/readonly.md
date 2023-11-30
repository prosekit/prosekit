# Readonly

Disable editing of the editor.

<script setup>	 
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'	
import App from '../../components/vue-readonly/editor.vue'	
</script>

:::tabs

== Preview

<ClientOnly><App/></ClientOnly>
== React
<ExamplePlaygroundLazy example="react-readonly" />
== Vue
<ExamplePlaygroundLazy example="vue-readonly" />
== Svelte
<ExamplePlaygroundLazy example="svelte-readonly" />
:::

## Usage

```ts
import { defineReadonly } from 'prosekit/extensions/readonly'

extension = defineReadonly()
```

You can use `useExtension()` to enable or disable this extension dynamically in your application.

## API Reference

- [prosekit/extensions/readonly](/references/extensions/readonly/)
