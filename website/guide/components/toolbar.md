# Toolbar

A customizable toolbar providing quick access to various commands.

<!-- @include: @/examples/toolbar.md -->

## Guide

This guide outlines the general steps to create a toolbar that can be adapted to any UI framework.

### Extensions

To begin, you need to define the editor extensions by creating an `extension.ts` file:

::: code-group

<<< @/../playground/examples/vue-toolbar/extension.ts

:::

In this example, we simply use the `defineBasicExtensions()`. You might want to customize the extensions to suit your needs. The extensions defined here will determine the available commands later on. Refer to the [Extensions](../extensions) guide for more information.

The `EditorExtension` type is exported to provide type safety and enhance the developer experience with TypeScript's type hints and autocompletion.

### `Editor`

Next, construct an `Editor` component. Refer to the [Installation](../installation) for instructions on building an `Editor` component.

::: code-group

<<< @/../playground/examples/react-toolbar/editor.tsx [<span class="text-gray-500 italic">React</span> editor.tsx]
<<< @/../playground/examples/vue-toolbar/editor.vue [<span class="text-gray-500 italic">Vue</span> editor.vue]

:::

The `Editor` component includes the `Toolbar` component, which houses the command buttons. We will define this component shortly.

### `Toolbar`

The `Toolbar` component contains all the command buttons that interact with the editor instance.

::: code-group

<<< @/../playground/examples/react-toolbar/toolbar.tsx [<span class="text-gray-500 italic">React</span> toolbar.tsx]
<<< @/../playground/examples/vue-toolbar/toolbar.vue [<span class="text-gray-500 italic">Vue</span> toolbar.vue]

:::

`useEditor` retrieves the current editor instance, which is used to access the state and execute commands. The `{ update: true }` option ensures the component re-renders when the editor state changes.

Each command button within the `Toolbar` component is represented by a `Toggle` component, which requires the following properties:

- `pressed`: Indicates whether a formatting style or block element is active, such as bold or italic for text, or heading levels for block elements. Use `editor.marks.MARK_NAME.isActive()` or `editor.nodes.NODE_NAME.isActive()` to determine the current state. The `isActive()` method can accept optional parameters to specify attributes, such as `editor.nodes.heading.isActive({ level: 1 })` to check if the current node is a level 1 heading.

- `onClick`: Executes the associated command when the button is clicked, such as `editor.commands.toggleBold()` to toggle the bold mark on the current selection. Different commands may require different arguments.

- `disabled`: Determines if a command can be executed in the current state. Use `editor.commands.COMMAND_NAME.canApply()` to check if a command is executable.

### `Toggle`

The `Toggle` component represents a single command button in the toolbar, with properties to control its active state, disabled status, and an event handler for executing the command.

::: code-group

<<< @/../playground/examples/react-toolbar/toggle.tsx [<span class="text-gray-500 italic">React</span> toggle.tsx]
<<< @/../playground/examples/vue-toolbar/toggle.vue [<span class="text-gray-500 italic">Vue</span> toggle.vue]

:::

In the `Toggle` component, the `mousedown` event is prevented. This is because we do not want the editor to lose focus when the user clicks the button.
