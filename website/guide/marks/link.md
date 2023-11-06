# Link

The `link` mark is used to represent links. It will be rendered as `<a>` element in HTML.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-link/App.vue'
</script>

:::tabs key:framework
== Preview

<div class="p-2"><App/></div>
== Vue
<ExamplePlaygroundLazy example="vue-link" />
:::

## Commands

### `addLink`

```ts
editor.commands.addLink({ href: 'https://www.example.com' })
```

### `toggleStrike`

```ts
editor.commands.toggleStrike({ href: 'https://www.example.com' })
```
