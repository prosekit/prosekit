# Extensions

In ProseKit, many features are provided in the form of extensions. Extensions can do various things, such as defining a Node or Mark, adding a shortcut key, or combining a series of complex functionalities.

Extensions are provided in the form of functions. By convention, the name of an extension function should start with `define`.

```ts twoslash
import { defineNodeSpec } from 'prosekit/core'

/**
 * Return an extension that defines a paragraph type with custom styles.
 */
export function defineFancyParagraph() {
  return defineNodeSpec({
    name: 'paragraph',
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return ['p', { class: 'fancy-paragraph' }, 0]
    },
  })
}
```

You can use [`union`] to merge multiple extensions into one.

```ts twoslash
import {
  defineHeadingSpec as defineFancyHeadingSpec,
  defineHeadingKeymap as defineFancyHeadingKeymap,
  defineHeadingCommands as defineFancyHeadingCommands,
} from 'prosekit/extensions/heading'

// ---cut---
import { union } from 'prosekit/core'

/**
 * Return an extension that defines heading node spec, keymap and commands.
 */
function defineFancyHeading() {
  return union([
    defineFancyHeadingSpec(),
    defineFancyHeadingKeymap(),
    defineFancyHeadingCommands(),
  ])
}
```

## List of Core Extensions

`prosekit/core` includes essential extensions used by nearly all editors. These
extensions add various features to the editor, and allother extensions are built
upon them.

- [`defineNodeSpec`] defines a node type.
- [`defineMarkSpec`] defines a mark type.
- [`defineCommands`] configures commands in the editor.
- [`defineBaseCommands`] sets up basic predefined commands.
- [`defineKeymap`] configures keybindings.
- [`defineBaseKeymap`]sets up basic predefined keybindings.
- [`definePlugin`] registers a plugin in the editor.
- [`defineNodeView`] registers a node view in the editor.
- [`defineHistory`] enables undo/redo functionality.

## Vital Node Types

The following extension functions define a minimal editor schema. They are
generally included unless creating a highly specialized editor.

- [`defineDoc`] adds a `doc` node type, serving as the root node of a document.
- [`defineParagraph`] adds a `paragraph` node type, which holds inline nodes like `text`.
- [`defineText`] adds a `text` node type, which holds text content.

## Event Handlers

Use these functions to register event handlers in the editor.

- [`defineMountHandler`] registers a event handler that's called when the editor is mounted.
- [`defineUnmountHandler`] registers a event handler that's called when the editor is unmounted.
- [`defineUpdateHandler`] registers a event handler that's called when the editor state is updated.
- [`defineDocChangeHandler`] registers a event handler that's called when the editor document is changed.
- [`defineFocusChangeHandler`] registers a event handler that's called when the editor gains or loses focus.

Check out the [save-json] example for an example of using event handlers to save and restore the editor document.

## Priority

By default, later extensions have higher priority. To override this, such as for setting keybinding order, use the [`withPriority`] function.

## A Starter Set of Extensions

The `defineBasicExtension` from `prosekit/basic` can quickly set up an editor with common features, including node types, marks, commands, keybindings, and plugins.

## Enable Extensions Dynamically

To enable an extension after initializing the editor, call `editor.use(extension)`. This method returns a function to disable the extension later.

If you are using `React`, `Vue`, `Preact`, `Svelte` or `Solid`, you can also use the `useExtension` to enable or disable an extension dynamically in your application. Check out the [readonly](/extensions/readonly) for an example.

<!-- Link references -->

[plugin]: https://prosemirror.net/docs/ref#state.Plugin_System
[node view]: https://prosemirror.net/docs/ref#view.NodeView
[input rule]: https://prosemirror.net/docs/ref#inputrules
[save-json]: /examples/save-json
[`defineNodeSpec`]: /references/core#define-node-spec
[`defineMarkSpec`]: /references/core#define-mark-spec
[`defineCommands`]: /references/core#define-commands
[`defineBaseCommands`]: /references/core#define-base-commands
[`defineKeymap`]: /references/core#define-keymap
[`defineBaseKeymap`]: /references/core#define-base-keymap
[`definePlugin`]: /references/core#define-plugin
[`defineNodeView`]: /references/core#define-node-view
[`defineInputRule`]: /references/core#define-input-rule
[`defineHistory`]: /references/core#define-history
[`defineDoc`]: /references/core#define-doc
[`defineText`]: /references/core#define-text
[`defineParagraph`]: /references/core#define-paragraph
[`defineMountHandler`]: /references/core#define-mount-handler
[`defineUnmountHandler`]: /references/core#define-unmount-handler
[`defineUpdateHandler`]: /references/core#define-update-handler
[`defineDocChangeHandler`]: /references/core#define-doc-change-handler
[`defineFocusChangeHandler`]: /references/core#define-focus-change-handler
[`withPriority`]: /references/core#with-priority
[`union`]: /references/core#union
