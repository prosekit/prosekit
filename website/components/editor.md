# Basic Editor

A basic editor component.

<!-- @include: @/examples/minimal.md -->

## Installation

### `extension.ts`

To begin, you need to define the editor extensions by creating an `extension.ts` file.

::: code-group

<<< @/../playground/src/examples/react/minimal/extension.ts

:::

For now, we simply use the `defineBasicExtensions()`. You might want to customize the extensions to suit your needs. The extensions defined here will determine the available commands later on. Refer to the [Extensions](../guide/extensions) guide for more information.

The `EditorExtension` type is exported to provide type safety and enhance the developer experience with TypeScript's type hints and autocompletion.

### `Editor`

After that, we can create the `Editor` component by copying the following code into our project.

<!-- @include: @/example-code-blocks/minimal/editor.md -->

`Editor` accepts `defaultDoc` and `onDocUpdate` as props.

- `defaultDoc` is the initial document represented as a JSON object.
- `onDocUpdate` is a callback that is called when the document is updated.

Now you can import the `Editor` component and start using it!
