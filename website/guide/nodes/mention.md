# Mention

A mention is an inline node that represents a reference to an entity. It can be used to represent a reference to a person `@john` or a reference to a tag `#tag` etc.

<script setup>
import { ExamplePlaygroundLazy } from '../../components/example-playground-lazy'
import App from '../../components/vue-user-menu/editor.vue'
</script>

:::tabs key:framework
== Preview

<ClientOnly><App/></ClientOnly>
== React
<ExamplePlaygroundLazy example="react-user-menu" />
== Vue
<ExamplePlaygroundLazy example="vue-user-menu" />
:::

## Attributes

- **`id`** - `string` - The id of the mention. This is used to identify the mention in the editor.
- **`kind`** - `string` - The kind of the mention. You can use this to style the mention differently based on the kind. This string will be rendered as `data-mention` attribute to the HTML element.
- **`value`** - `string` - The value of the mention. This is the text that will be rendered in the editor.
