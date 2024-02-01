# Mention

A mention is an inline node that represents a reference to an entity. It can be used to represent a reference to a person `@john` or a reference to a tag `#tag` etc.

<!-- @include: @/examples/user-menu.md -->

## Attributes

- **`id`** - `string` - The id of the mention. This is used to identify the mention in the editor.
- **`kind`** - `string` - The kind of the mention. You can use this to style the mention differently based on the kind. This string will be rendered as `data-mention` attribute to the HTML element.
- **`value`** - `string` - The value of the mention. This is the text that will be rendered in the editor.
