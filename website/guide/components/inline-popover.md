# Inline Popover

A popup that that floating around the current selected text. It can be used to built an inline menu.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-inline-menu/App.vue'
</script>

:::tabs key:framework
== Preview

<div class="p-2"><App/></div>
== React
<ExamplePlaygroundLazy example="react-inline-menu" />
== Vue
<ExamplePlaygroundLazy example="vue-inline-menu" />
:::

## Props

- `editor`: The editor instance. This is required for the inline popover to get the current selection.

## Examples

::: code-group

<<< @/../playground/examples/react-inline-menu/InlineMenu.tsx [React]
<<< @/../playground/examples/vue-inline-menu/InlineMenu.vue [Vue]

:::
