# Extensions

In ProseKit, many features are provided in the form of extensions. Extensions can do various things, such as defining a Node or Mark, adding a shortcut key, or combining a series of complex functionalities.

Extensions are provided in the form of functions. An extension function can return one or more extensions. By convention, the name of an extension function should start with `add`.

```js
function addFancyHeading() {
  return addFeatureA({ optionA: '...', optionB: '...' })
}
```

```js
import { defineExtension } from 'prosekit/core'

function addAwesomeFeature() {
  return defineExtension([
    addFeatureA({optionA: "...", optionB: "..."})
    addFeatureB()
  ])
}
```

## List of Core Extensions

`prosekit/core` provides some core extensions that's used by almost all editors.

You can use the following extensions to add more features to the editor. All other extensions are built on top of these extensions.

- `addNodeSpec` can be used to define a node type.
- `addMarkSpec` can be used to define a mark type.
- `addCommands` configures some commands into the editor.
- `addBaseCommands` configures some pre-defined basic commands.
- `addKeymap` configures some keybindings into the editor.
- `addBaseKeymap` configures a set of pre-defined basic keybindings.
- `addPlugin` registers a [plugin] into the editor.
- `addNodeView` registers a [node view] into the editor.
- `addInputRule` configures an [input rule] into the editor.
- `addHistory` allows the editor to undo/redo.

## Vital Node Types

The following three extension functions defines a minimal editor schema. In most cases, you should include them in your editor, unless you are building something very special.

- `addDoc` adds a `doc` node type.
- `addText` adds a `text` node type.
- `addParagraph` adds a `paragraph` node type.

## A starter set of extensions

You can use the `addBasicExtension` from `prosekit/basic` to quick start an editor with some common features. It includes some common node types, marks, commands, keybindings, and plugins.

[plugin]: https://prosemirror.net/docs/ref#state.Plugin_System
[node view]: https://prosemirror.net/docs/ref#view.NodeView
[input rule]: https://prosemirror.net/docs/ref#inputrules
