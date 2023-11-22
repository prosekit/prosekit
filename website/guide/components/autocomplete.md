# Autocomplete

A popup that shows a list of suggestions based on the text before the text cursor.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-slash-menu/app.vue'
</script>

:::tabs key:framework
== Preview

<ClientOnly><div class="p-2"><App/></div></ClientOnly>
== React
<ExamplePlaygroundLazy example="react-slash-menu" />
== Vue
<ExamplePlaygroundLazy example="vue-slash-menu" />
:::

## Usage

::: code-group

<<< @/../playground/examples/react-slash-menu/slash-menu.tsx [React]
<<< @/../playground/examples/vue-slash-menu/slash-menu.vue [Vue]

:::

## More examples

Type `@` to show a list of users to mention, or type `#` to show a list of commands.

- [react-user-menu](/examples/react-user-menu)

## API Reference

- [prosekit/react/autocomplete-popover](/references/react/autocomplete-popover)
- [prosekit/vue/autocomplete-popover](/references/vue/autocomplete-popover)
- [prosekit/preact/autocomplete-popover](/references/preact/autocomplete-popover)
- [prosekit/svelte/autocomplete-popover](/references/svelte/autocomplete-popover)
- [prosekit/solid/autocomplete-popover](/references/solid/autocomplete-popover)
- [prosekit/lit/autocomplete-popover](/references/lit/autocomplete-popover)
