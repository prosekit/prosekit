# Extensions

In ProseKit, many features are provided in the form of extensions. Extensions can do various things, such as defining a Node or Mark, adding a shortcut key, or combining a series of complex functionalities.

Extensions are provided in the form of functions. An extension function can return one or more extensions. By convention, the name of an extension function should start with `define`.

```js
function defineFancyHeading() {
  return defineFeatureA({ optionA: '...', optionB: '...' })
}
```

```js
import { union } from 'prosekit/core'

function defineAwesomeFeature() {
  return union([
    defineFeatureA({optionA: "...", optionB: "..."})
    defineFeatureB()
  ])
}
```

## List of Core Extensions

`prosekit/core` provides some core extensions that's used by almost all editors.

You can use the following extensions to add more features to the editor. All other extensions are built on top of these extensions.

- `defineNodeSpec` can be used to define a node type.
- `defineMarkSpec` can be used to define a mark type.
- `defineCommands` configures some commands into the editor.
- `defineBaseCommands` configures some pre-defined basic commands.
- `defineKeymap` configures some keybindings into the editor.
- `defineBaseKeymap` configures a set of pre-defined basic keybindings.
- `definePlugin` registers a [plugin] into the editor.
- `defineNodeView` registers a [node view] into the editor.
- `defineInputRule` configures an [input rule] into the editor.
- `defineHistory` allows the editor to undo/redo.

## Vital Node Types

The following three extension functions defines a minimal editor schema. In most cases, you should include them in your editor, unless you are building something very special.

- `defineDoc` adds a `doc` node type.
- `defineText` adds a `text` node type.
- `defineParagraph` adds a `paragraph` node type.

## A Starter Set of Extensions

You can use the `defineBasicExtension` from `prosekit/basic` to quick start an editor with some common features. It includes some common node types, marks, commands, keybindings, and plugins.

[plugin]: https://prosemirror.net/docs/ref#state.Plugin_System
[node view]: https://prosemirror.net/docs/ref#view.NodeView
[input rule]: https://prosemirror.net/docs/ref#inputrules

## Enable Extensions Dynamically

If you want to enable an extension after the editor is initialized, you can call `editor.use(extension)` to enable it. It will return a function that can be called to disable the extension.

If you are using `React`, `Vue`, `Preact`, `Svelte` or `Solid`, you can also use the `useExtension` to enable or disable an extension dynamically in your application. Check out the [readonly](/guide/extensions/readonly) for an example.
