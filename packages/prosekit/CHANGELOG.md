# prosekit

## 0.13.2

### Patch Changes

- [`187c1f1`](https://github.com/ocavue/prosekit/commit/187c1f106b76b0488c8596d760d1105fab32bf63) ![](https://prosekit.dev/b/prosekit)

  Fix a bundling issue where some CSS files in the `prosekit` package are empty.

## 0.13.1

### Patch Changes

- [`4ff5d1f`](https://github.com/ocavue/prosekit/commit/4ff5d1f62144db07d45257b2314ad57ae090533b) ![](https://prosekit.dev/b/preact)

  Remove incorrect dependency on `react` for `prosekit/preact`.

## 0.13.0

### Minor Changes

- [`8d31a2e`](https://github.com/ocavue/prosekit/commit/8d31a2e6ad798a5c735f062ec54d879d79fbf5fb) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/basic)

  Add a new `hardBreak` node. A hard break represents a line break in the text. It is a leaf node that will be rendered as a `<br>` DOM element.

  Use `defineHardBreak()` to add a hard break extension to your editor. This extension includes the node type for `hardBreak`, the command `insertHardBreak` and keyboard shortcuts `Shift-Enter` and `Mod-Enter` for inserting a hard break.

  `defineHardBreak()` is included in `defineBasicExtensions()`.

### Patch Changes

- [`ae7c367`](https://github.com/ocavue/prosekit/commit/ae7c367581dceeabf3554a811e8aa688420b0971) ![](https://prosekit.dev/b/extensions)

  Remember multiple ignore positions when dismissing the autocomplete menu. Previously, only the last ignore position was remembered.

- [`f78fada`](https://github.com/ocavue/prosekit/commit/f78fada9f6542904e3431c7c73b48f92ae90553c) ![](https://prosekit.dev/b/pm)

  Update ProseMirror packages.

- [`a30ef40`](https://github.com/ocavue/prosekit/commit/a30ef40a70af3e1bfe0fa1c21ed347501ebaac43) ![](https://prosekit.dev/b/extensions)

  Add validate fields to node and mark attributes.

## 0.12.1

### Patch Changes

- [`e5bac67`](https://github.com/ocavue/prosekit/commit/e5bac67f577eee91fda6db7b72501686157052c4) ![](https://prosekit.dev/b/basic)

  Add margin to tables for improved spacing in `prosekit/basic/typography.css`.

- [`e5bac67`](https://github.com/ocavue/prosekit/commit/e5bac67f577eee91fda6db7b72501686157052c4) ![](https://prosekit.dev/b/web)

  Fix a bug where the block handle was placed inside tables.

- [`445d59e`](https://github.com/ocavue/prosekit/commit/445d59e16b004329403aa3e70ed2171b2d627306) ![](https://prosekit.dev/b/web)

  Fix a bug where an empty table was left over after dragging a table.

## 0.12.0

### Minor Changes

- [`4b085db`](https://github.com/ocavue/prosekit/commit/4b085dbf47d90da929d975ba6843906e0a1da33c) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/core)

  **Breaking change**: Moved `defineDoc`, `defineText`, and `defineParagraph` from `prosekit/core` to `prosekit/extensions`. This makes the core package lighter and more focused.

  Old imports are deprecated but still available. They will print a warning when used.

  _Before_:

  ```ts
  import { defineDoc, defineText, defineParagraph } from 'prosekit/core'
  ```

  _After_:

  ```ts
  import { defineDoc } from 'prosekit/extensions/doc'
  import { defineText } from 'prosekit/extensions/text'
  import { defineParagraph } from 'prosekit/extensions/paragraph'
  ```

- [`581ed6f`](https://github.com/ocavue/prosekit/commit/581ed6f8e36b29d805e4b81e1b452e71454350f1) ![](https://prosekit.dev/b/extensions)

  Changed heading shortcuts from `mod-1`, `mod-2` to `mod-alt-1`, `mod-alt-2`, etc. This matches popular text editors like Google Docs, Microsoft Word, and Notion.

- [`e73bc55`](https://github.com/ocavue/prosekit/commit/e73bc5559e43cdd4a01c81e8174f6c9707d9ea2c) ![](https://prosekit.dev/b/extensions)

  Added new keyboard shortcut `mod-alt-0` and command `setParagraph` to set the current selected textblock into a paragraph node.

- [`c980cc3`](https://github.com/ocavue/prosekit/commit/c980cc308a1c5f18ac0eb9bc7d9fa8935a8894e3) ![](https://prosekit.dev/b/basic) ![](https://prosekit.dev/b/extensions)

  `defineCodeBlockShiki()` now sets two CSS variables `--prosemirror-highlight`
  and `--prosemirror-highlight-bg` on the code block elements, representing the
  text color and background color of the code block respectively. These colors are
  based on the Shiki theme you pass to `defineCodeBlockShiki()`.

  `prosekit/basic/typography.css` is also updated to use these CSS variables to
  set the text color and background color of code blocks.

### Patch Changes

- [`665ad43`](https://github.com/ocavue/prosekit/commit/665ad4303bf4f870932425223c6f0631092c8782) ![](https://prosekit.dev/b/extensions)

  Mark input rules won't fire inside `code` marks anymore by default. `defineMarkInputRule` now has an `inCodeMark` option to control this behavior.

- [`af5d7f8`](https://github.com/ocavue/prosekit/commit/af5d7f8a4f21e0ca6784d3b98a3c7df795afa945) ![](https://prosekit.dev/b/basic)

  `defineBasicExtension()` now includes `defineCodeBlock()`.

## 0.11.5

### Patch Changes

- [`6ba599c`](https://github.com/ocavue/prosekit/commit/6ba599c6321916ca9d19b6c87d2f2154e2ab60fc) ![](https://prosekit.dev/b/core)

  Add `editor.getDocHTML()` and `editor.getDocJSON()` methods.

## 0.11.4

### Patch Changes

- [`399c9ee`](https://github.com/ocavue/prosekit/commit/399c9eebadd4236dfa024cd8225e7e9ed7c0283e) ![](https://prosekit.dev/b/web)

  Improve block handle positioning logic.

- [`399c9ee`](https://github.com/ocavue/prosekit/commit/399c9eebadd4236dfa024cd8225e7e9ed7c0283e) ![](https://prosekit.dev/b/basic)

  Update `typography.css` to improve the block handle positioning for horizontal rule, images and code blocks.

## 0.11.3

### Patch Changes

- [`ec34074`](https://github.com/ocavue/prosekit/commit/ec3407409f8c3ee5dbfe55caab445ec97949c65b) ![](https://prosekit.dev/b/web)

  Fix an issue where the block handle popover would move to the wrong position when the hovered block changes its type.

## 0.11.2

### Patch Changes

- [`8000cab`](https://github.com/ocavue/prosekit/commit/8000cab8e1e113767926a434a8c3ed9843ac3006) ![](https://prosekit.dev/b/core)

  Add `defineMarkView()` to define [mark views](https://prosemirror.net/docs/ref/#view.MarkView) to the editor.

## 0.11.1

### Patch Changes

- [`c99a4c3`](https://github.com/ocavue/prosekit/commit/c99a4c33c95e4cf353b68b1296d632cba3123a4f) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/vue)

  Support using components to render [mark views](https://prosemirror.net/docs/ref/#view.MarkView).

## 0.11.0

### Minor Changes

- [`9ad699c`](https://github.com/ocavue/prosekit/commit/9ad699c835174d000f46db2dce32d45ee32887db) ![](https://prosekit.dev/b/svelte)

  `prosekit/svelte` now requires Svelte 5.

## 0.10.5

### Patch Changes

- [`e639355`](https://github.com/ocavue/prosekit/commit/e6393552c80c40a7aa35f0d9a738d1ff68d6e9fb) ![](https://prosekit.dev/b/pm)

  Update `prosemirror-model` and `prosemirror-view`.

- [`ed003b6`](https://github.com/ocavue/prosekit/commit/ed003b6c74dddeae99ff0fc6440a98337db65752) ![](https://prosekit.dev/b/extensions)

  `definePlaceholder()` now accepts a strategy function that gives more control over when the placeholder should be shown.

  Don't show the placeholder when the text cursor is in a table node by default.

## 0.10.4

### Patch Changes

- [`fabe364`](https://github.com/ocavue/prosekit/commit/fabe364af5d6192ca6b6541e8067fa344d3f211b) ![](https://prosekit.dev/b/web)

  Replace the `onOpenChange` callback property with an `openChange` event in the `prosekit-inline-popover` element.

  Replace the `onOpenChange` callback property with an `openChange` event in the `prosekit-autocomplete-popover` element.

  Replace the `onQueryChange` callback property with a `queryChange` event in the `prosekit-autocomplete-popover` element.

- [`fabe364`](https://github.com/ocavue/prosekit/commit/fabe364af5d6192ca6b6541e8067fa344d3f211b) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/vue)

  Refactor the event handler binding logic.

- [`ee12b0e`](https://github.com/ocavue/prosekit/commit/ee12b0e00156ec0de80f77b955431062a4c07acd) ![](https://prosekit.dev/b/web)

  Fix an issue where tooltips sometimes don't hide when they have animation with zero duration.

## 0.10.3

### Patch Changes

- [`aed977f`](https://github.com/ocavue/prosekit/commit/aed977f6db773297eef8a016b116824d61e68e73) ![](https://prosekit.dev/b/extensions)

  Add padding for table cell.

## 0.10.2

### Patch Changes

- [`a116c4f`](https://github.com/ocavue/prosekit/commit/a116c4f33d8955221a10ad00b911f8197509b722) ![](https://prosekit.dev/b/extensions)

  Support loro-crdt v1.

## 0.10.1

### Patch Changes

- [`c6bee14`](https://github.com/ocavue/prosekit/commit/c6bee140c0c3582f6941cf489c47271fb28bc4d7) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/core)

  Add `width` and `height` attributes to image node. This makes it easier to render resizable images.

- [`b5c0225`](https://github.com/ocavue/prosekit/commit/b5c022531ea9463e50df90e8a471c8e77a9355e6) ![](https://prosekit.dev/b/extensions)

  Add a new `prosekit/extensions/file` module to handle files in the editor:

  - `defineFilePasteHandler`: Handle files pasted into the editor
  - `defineFileDropHandler`: Handle files dropped into the editor
  - `UploadTask`: Manage file uploads

- [`c6bee14`](https://github.com/ocavue/prosekit/commit/c6bee140c0c3582f6941cf489c47271fb28bc4d7) ![](https://prosekit.dev/b/web)

  Improve resizable algorithm.

## 0.10.0

### Minor Changes

- [`1b080e7`](https://github.com/ocavue/prosekit/commit/1b080e7dc86d4c8d54aee6aaeb568594dd7a7908) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/lit) ![](https://prosekit.dev/b/vue) ![](https://prosekit.dev/b/web)

  This version introduces significant changes to the event handling mechanism for components:

  - Implementation Changes: Events are no longer handled by passing them to callback functions. Instead, the underlying custom elements now use `dispatchEvent()` to propagate events upwards, similar to native HTML elements. This approach allows for more native-like event handling, reducing code complexity.
  - Impact on UI Framework Integrations (React, Vue, Preact, Svelte, Solid): Except for the following change, the API remains largely unchanged.

  Event handlers for component `ResizableRoot` has changed:

  - Removed: `onSizeChangeStart`, `onSizeChange`, `onSizeChangeEnd`
  - Replaced with: `onResizeStart`, `onResizeEnd`.

  ```tsx
  // Previous code example
  <ResizableRoot
    onSizeChangeEnd={(size) => {
      handle(size.width, size.height)
    }}
  />
  ```

  ```tsx
  // Updated code example
  <ResizableRoot
    onResizeEnd={(event) => {
      handle(event.size.width, event.size.height)
    }}
  />
  ```

## 0.9.24

### Patch Changes

- [`aa4b63d`](https://github.com/ocavue/prosekit/commit/aa4b63d2d26e17efbeb38924f2d42cee6b12dfc2) ![](https://prosekit.dev/b/extensions)

  `definePlaceholder` now accepts a function that receives the current editor state to output a dynamic placeholder.

## 0.9.23

### Patch Changes

- [`020ad81`](https://github.com/ocavue/prosekit/commit/020ad81b7fec0bc3a6c5c14b92700d8042c67f4f) ![](https://prosekit.dev/b/solid)

  You can now use Solid for building node views.

- [`893ba41`](https://github.com/ocavue/prosekit/commit/893ba415afacdd6bf336af7020038f3d9ca60b19) ![](https://prosekit.dev/b/web)

  Hide the table handle when selecting text.

## 0.9.22

### Patch Changes

- [`3cab827`](https://github.com/ocavue/prosekit/commit/3cab82758b6f2e7fdf5c67c1779d15999266772d) ![](https://prosekit.dev/b/extensions)

  Add new `horizontalRule` node representing a thematic break.

- [`3cab827`](https://github.com/ocavue/prosekit/commit/3cab82758b6f2e7fdf5c67c1779d15999266772d) ![](https://prosekit.dev/b/basic)

  Add gap cursor and horizontal rule to the basic extension.

## 0.9.21

### Patch Changes

- [`2b3528e`](https://github.com/ocavue/prosekit/commit/2b3528ec9ffa814d82d4418df9f802372209ee91) ![](https://prosekit.dev/b/core)

  Add `toggleWrap` command.

- [`2b3528e`](https://github.com/ocavue/prosekit/commit/2b3528ec9ffa814d82d4418df9f802372209ee91) ![](https://prosekit.dev/b/extensions)

  Add commands and keymap for blockquote.

## 0.9.20

### Patch Changes

- [`ef25b5f`](https://github.com/ocavue/prosekit/commit/ef25b5f2700922803325abcfafd167f96ffaeb63) ![](https://prosekit.dev/b/extensions)

  Use Shiki's JavaScript RegExp Engine as the default engine for highlighting.

## 0.9.19

### Patch Changes

- [`f3ff15a`](https://github.com/ocavue/prosekit/commit/f3ff15a4837c676a45759f1b467d42b8628a3129) ![](https://prosekit.dev/b/core)

  Add `insertDefaultBlock` command.

- [`f3ff15a`](https://github.com/ocavue/prosekit/commit/f3ff15a4837c676a45759f1b467d42b8628a3129) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/lit) ![](https://prosekit.dev/b/vue) ![](https://prosekit.dev/b/web)

  Add new components:

  - `BlockHandlePopover`: A popover that appears on the left side of a block when you hover over it.
  - `BlockHandleAdd`: A button that lets you insert a new block below the one you're hovering over.
  - `BlockHandleDraggable`: A draggable component that allows to reorder a block.

  Deprecate `BlockPopover` and `BlockDragHandle`.

## 0.9.18

### Patch Changes

- [`5101cf5`](https://github.com/ocavue/prosekit/commit/5101cf57850abb61cebf1f7967dba39eebfff537) ![](https://prosekit.dev/b/web)

  Add table handles.

- [`80572dd`](https://github.com/ocavue/prosekit/commit/80572dd788a6019d128200487dafdf50264d573e) ![](https://prosekit.dev/b/extensions)

  Add the following command functions to the table extension:

  - `selectTable`
  - `selectTableCell`
  - `selectTableColumn`
  - `selectTableRow`
  - `addTableColumnBefore`
  - `addTableColumnAfter`
  - `addTableRowAbove`
  - `addTableRowBelow`
  - `deleteTable`
  - `deleteTableColumn`
  - `deleteTableRow`
  - `deleteCellSelection`
  - `mergeTableCells`
  - `splitTableCell`

## 0.9.17

### Patch Changes

- [`971afb6`](https://github.com/ocavue/prosekit/commit/971afb60017f5e0554ada7d754fa76cab6e4b4af) ![](https://prosekit.dev/b/extensions)

  Add `defineLoro` to bind [Loro](https://github.com/loro-dev/loro) to ProseKit.

## 0.9.16

### Patch Changes

- [`7217c46`](https://github.com/ocavue/prosekit/commit/7217c46621d4003a156a91e290a984512458090b) ![](https://prosekit.dev/b/core)

  Add new `Editor.exec()` and `Editor.canExec()` methods to allow executing ambiguous commands without registering them via `defineCommand()`.

  Rename `CommandAction.canApply()` to `CommandAction.canExec()` to better reflect its purpose.

## 0.9.15

### Patch Changes

- [`fe686fa`](https://github.com/ocavue/prosekit/commit/fe686fa8f846306e68c61a6dc7b0a3569b2582dd) ![](https://prosekit.dev/b/extensions)

  Add `defineYjs` to bind [Yjs](https://github.com/yjs/yjs) to ProseKit.

## 0.9.14

### Patch Changes

- [`a9bc925`](https://github.com/ocavue/prosekit/commit/a9bc9259faebfb787b143595107d779d60aa15bf) ![](https://prosekit.dev/b/core)

  You can now call `defineNodeSpec` or `defineMarkSpec` multiple times again the same node or mark name. Their specs will be merged together. This is useful if you want to extend an existing node or mark spec but tweak some of its properties.

- [`0d1243c`](https://github.com/ocavue/prosekit/commit/0d1243c68d101de5a5c472e40177807a7380784b) ![](https://prosekit.dev/b/core)

  `defineMarkSpec` can now merge multiple `style` attributes applied to the output HTML element.

- [`76fb642`](https://github.com/ocavue/prosekit/commit/76fb64238637f76a9c26b2f2dcca5a79c3a45e3b) ![](https://prosekit.dev/b/core)

  Add some common util functions for working with ProseMirror.

  - `findParentNode`
  - `findParentNodeOfTypes`
  - `collectChildren`
  - `isProseMirrorNode`
  - `isMark`
  - `isFragment`
  - `isSlice`
  - `isSelection`
  - `isTextSelection`
  - `isNodeSelection`
  - `isAllSelection`

- [`ee8597b`](https://github.com/ocavue/prosekit/commit/ee8597b89812c4a80c326e8261e90068c2025416) ![](https://prosekit.dev/b/pm)

  Update ProseMirror packages.

## 0.9.13

### Patch Changes

- [`3ce86ec`](https://github.com/ocavue/prosekit/commit/3ce86ec98297d23ffc1b5204622dd86acb84cb5c) ![](https://prosekit.dev/b/core)

  Fix a bug where `MarkAction` would erase the existing marks of a node when applying a new mark.

- [`df5bd07`](https://github.com/ocavue/prosekit/commit/df5bd073c13073cca6daa4e8920d66db67c845f1) ![](https://prosekit.dev/b/core)

  `createEditor` now accepts a new `defaultContent` option to set the initial content of the editor, which can be a JSON object, a HTML string, or a HTML element instance. It replaces the `defaultDoc` and `defaultHTML` options.

- [`bcda993`](https://github.com/ocavue/prosekit/commit/bcda99300ed0dc424c05c8271b58ffcc12eb7617) ![](https://prosekit.dev/b/core)

  Add `editor.setContent` method to update the document and selection of the editor.

## 0.9.12

### Patch Changes

- [`6161a33`](https://github.com/ocavue/prosekit/commit/6161a33215c66e0e4490ff7fc7d0a0e5c90b20e7) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/basic) ![](https://prosekit.dev/b/core)

  Explicitly declare the return type of extension functions. This would make TypeScript easier to infer extension types.

## 0.9.11

### Patch Changes

- [`2c0d8ba`](https://github.com/ocavue/prosekit/commit/2c0d8ba5efabe176d5553573aeebf3e41b168111) ![](https://prosekit.dev/b/extensions)

  Add `defineGapCursor` to provide a block-level cursor that can be used to focus places that don't allow regular selection.

## 0.9.10

### Patch Changes

- [`415b931`](https://github.com/ocavue/prosekit/commit/415b931b22932d7eb6f7082e9761d8d9d1da6128) ![](https://prosekit.dev/b/core)

  Fix an issue where the `MarkAction.isActive()` always returns `true` when multiple empty text blocks are selected.

- [`9c483cf`](https://github.com/ocavue/prosekit/commit/9c483cf4133624f354f6c7b394dba3528e8ee5af) ![](https://prosekit.dev/b/web)

  Hide the inline popover when no inline node is selected.

- [`0a09c15`](https://github.com/ocavue/prosekit/commit/0a09c15d02a0edcc29ee4f0882ab71f021172286) ![](https://prosekit.dev/b/pm)

  Update ProseMirror dependencies.

## 0.9.9

### Patch Changes

- [`0f5a8e6`](https://github.com/ocavue/prosekit/commit/0f5a8e6eafa455ba5023f780b1b9fdd14064675d) ![](https://prosekit.dev/b/core)

  Rename type `NodeBuilder` to `NodeAction`.

  Rename type `MarkBuilder` to `MarkAction`.

- [`333c9bb`](https://github.com/ocavue/prosekit/commit/333c9bb286762ec806aa6f3af79f2946f4aa6855) ![](https://prosekit.dev/b/core)

  Rename type `CommandApplier` to `CommandAction`.

- [`e9798f5`](https://github.com/ocavue/prosekit/commit/e9798f5005636039cb48fc96379f8a5e082f94e5) ![](https://prosekit.dev/b/core)

  `defineNodeSpec` and `defineMarkSpec` now accept an `Attrs` type parameter. This allows you to type the attributes of your nodes and marks.

- [`ae4c940`](https://github.com/ocavue/prosekit/commit/ae4c940144dfe3f8b950cc7ed7765999c8b74dbb) ![](https://prosekit.dev/b/extensions)

  Add key bindings `Tab` and `Shift-Tab` for incrementing and decrementing list indentation.

## 0.9.8

### Patch Changes

- [`510e438`](https://github.com/ocavue/prosekit/commit/510e4384b81139835b6dcb1d3a9a5b30ba291c0c) ![](https://prosekit.dev/b/web)

  Add a `data-state` attribute to autocomplete popover, indicating its visibility state ('open' or 'closed').

## 0.9.7

### Patch Changes

- [`e638611`](https://github.com/ocavue/prosekit/commit/e63861176c18fd04fb8eeab8977e508745369935) ![](https://prosekit.dev/b/svelte)

  Fix an issue where Svelte component node views break the server-side rendering.

- [`8468d05`](https://github.com/ocavue/prosekit/commit/8468d05211ad1d4f701437b6dbed556bd7e0bdcd) ![](https://prosekit.dev/b/core)

  `defineHistory` now accepts an options object to configure the history plugin.

  Reduce the default delay for the history plugin from 500ms to 250ms.

- [`500c6b4`](https://github.com/ocavue/prosekit/commit/500c6b447f848b9c7bafcd931b245bf9122fbe65) ![](https://prosekit.dev/b/pm)

  Update ProseMirror dependencies.

- [`3b7a6f1`](https://github.com/ocavue/prosekit/commit/3b7a6f1d22f5e43bbbe4a1d52bfc6f02a738fd72) ![](https://prosekit.dev/b/vue)

  Fix server-side rendering hydration for some Vue components.

## 0.9.6

### Patch Changes

- [`4c681bb`](https://github.com/ocavue/prosekit/commit/4c681bb7a0e599d05b17f7cffb1860bc037d007b) ![](https://prosekit.dev/b/core)

  Add `unsetBlockType` command and `unsetMark` command.

- [`9bbfd5d`](https://github.com/ocavue/prosekit/commit/9bbfd5dbe67088478f3e5eba7a8aa8924d1bc405) ![](https://prosekit.dev/b/extensions)

  When the text cursor is at the start of a heading node, press `Backspace` will set it to the default text block (usually a paragraph node).

## 0.9.5

### Patch Changes

- [`a1cc545`](https://github.com/ocavue/prosekit/commit/a1cc545a8fc8e8ed29061b7b42a35746309c3917) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/vue)

  Improve TypeScript declaration for Svelte components and Vue components. Now these components accept all HTML attributes as props.

- [`73d1741`](https://github.com/ocavue/prosekit/commit/73d1741f36deacdc8682747f9b9020622fd49143) ![](https://prosekit.dev/b/web)

  Add a new prop `dismissOnEscape` to the inline popover component. This prop allows you to control whether the inline popover should be dismissed when the editor receives an Escape key press.

## 0.9.4

### Patch Changes

- [`4762835`](https://github.com/ocavue/prosekit/commit/476283551857ebf0aebdf7a9aac9716a1b264c7e) ![](https://prosekit.dev/b/svelte)

  Fix an issue where Svelte components cannot set properties on the underlying web
  components.

## 0.9.3

### Patch Changes

- [`435728f`](https://github.com/ocavue/prosekit/commit/435728f67f28b216e3c5bd53765d3fc00b24538f) ![](https://prosekit.dev/b/svelte)

  Add `defineSvelteNodeView`, which allows you to render ProseMirror nodes using Svelte components.

- [`435728f`](https://github.com/ocavue/prosekit/commit/435728f67f28b216e3c5bd53765d3fc00b24538f) ![](https://prosekit.dev/b/basic)

  Apply styles `display: contents` to node view wrappers.

## 0.9.2

### Patch Changes

- [`b48c703`](https://github.com/ocavue/prosekit/commit/b48c70300615ae5f90b7f025167469221660acf8) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/core) ![](https://prosekit.dev/b/vue)

  Refactor node view implementation to improve maintainability.

## 0.9.1

### Patch Changes

- [`3292022`](https://github.com/ocavue/prosekit/commit/3292022de6544ad1d83e3daf2f32c625ba43509a) ![](https://prosekit.dev/b/svelte)

  Fix a bug in `useEditor` that causes `Function called outside component initialization` errors.

## 0.9.0

### Minor Changes

- [`4d5a32a`](https://github.com/ocavue/prosekit/commit/4d5a32a0ccb72d0a92a91802067c489a728d3e15) ![](https://prosekit.dev/b/core)

  Introduce the `prosekit/core/test` entry point, which provides helpers for writing tests for ProseKit.

- [`6c28770`](https://github.com/ocavue/prosekit/commit/6c28770f9a71bdfffbb0dc5bbae23d26c123ae97) ![](https://prosekit.dev/b/extensions)

  Add `defineCommitRecorder` and `defineCommitViewer` to track the changes in the document, and display them in a diff view.

- [`259bc99`](https://github.com/ocavue/prosekit/commit/259bc99daa209b72b58e4c0c7a246d36e47172a2) ![](https://prosekit.dev/b/core)

  Add `editor.updateState()` method.

### Patch Changes

- [`1970bb9`](https://github.com/ocavue/prosekit/commit/1970bb905c67659ae24c2b73dd6a162491aaf1c2) ![](https://prosekit.dev/b/core)

  Add `ParseOptions` to `nodeFromElement`.

## 0.8.2

### Patch Changes

- [`da8322f`](https://github.com/ocavue/prosekit/commit/da8322f979253df18b4d9d555d64b2d58bbfd5a3) ![](https://prosekit.dev/b/vue)

  Fix an issue where `useExtension` from `prosekit/vue` will print unnecessary warnings when the editor context is not available.

## 0.8.1

### Patch Changes

- [`41e1f58`](https://github.com/ocavue/prosekit/commit/41e1f58a915a380c3aa2cdf421e45639abad553a) ![](https://prosekit.dev/b/core)

  Fix an issue where the TypeScript typings for commands are not correctly inferred. This requires a minimum TypeScript version of 5.0.

## 0.8.0

### Minor Changes

- [`9b40642`](https://github.com/ocavue/prosekit/commit/9b40642ef32f3e34cb5f4e3ce20d2cf1db0559fa) ![](https://prosekit.dev/b/extensions)

  Add `defineSearchQuery` and `defineSearchCommands` to provide search, replace, and match highlighting features.

- [`5a9b4d7`](https://github.com/ocavue/prosekit/commit/5a9b4d7a71d5aeb9055f7b91e050fee1f66fd3ad) ![](https://prosekit.dev/b/web)

  Add `defaultOpen` prop to inline popover. It's useful for when you want to control the open state of the popover from outside.

- [`166b79b`](https://github.com/ocavue/prosekit/commit/166b79ba4c01676bc66b4763c3ef6deb95de89a7) ![](https://prosekit.dev/b/core)

  Add `removeNode` command.

### Patch Changes

- [`343b28d`](https://github.com/ocavue/prosekit/commit/343b28d495382b98c84aed9a5dfa298514ec98a6) ![](https://prosekit.dev/b/web)

  Fix an issue where the `onOpenChange` handler in `InlinePopover` would not be triggered when inline content is selected.

- [`3b022aa`](https://github.com/ocavue/prosekit/commit/3b022aa207965be380d28bd2460e803d3aff460a) ![](https://prosekit.dev/b/core)

  Fix an issue where state plugins are updated unnecessarily when updating extensions.

- [`529b1d9`](https://github.com/ocavue/prosekit/commit/529b1d9270372db0ef4a09ca65953c0807101a01) ![](https://prosekit.dev/b/extensions)

  Remove blank state between code block theme switching when the theme is already loaded.

## 0.7.7

### Patch Changes

- [`5ae30fd`](https://github.com/ocavue/prosekit/commit/5ae30fdee965a0be0c14fa9cbd0070546005c1a4) ![](https://prosekit.dev/b/pm)

  Update dependencies `prosemirror-view` and `prosemirror-model`.

## 0.7.6

### Patch Changes

- [`63e3bf8`](https://github.com/ocavue/prosekit/commit/63e3bf8a5f27ea7c53206cd1a2ea693b6c96bfc3) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/basic) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/core) ![](https://prosekit.dev/b/lit) ![](https://prosekit.dev/b/vue) ![](https://prosekit.dev/b/web)

  Bump version to resolve outdated TypeScript declaration.

## 0.7.5

### Patch Changes

- [`dabd297`](https://github.com/ocavue/prosekit/commit/dabd29714eac21b36bfbe78dab1c5c8cacf0fbb7) ![](https://prosekit.dev/b/core)

  Simplify the TypeScript types for extensions.

## 0.7.4

### Patch Changes

- [`0cd5671`](https://github.com/ocavue/prosekit/commit/0cd5671b3047bf7ad417f7d36cd48227a8aecf00) ![](https://prosekit.dev/b/extensions)

  Set the default background color of the `.prosekit-virtual-selection` element to a gray color.

- [`8caedd0`](https://github.com/ocavue/prosekit/commit/8caedd0f9f4cf1b192923a31118b89d301edb3a5) ![](https://prosekit.dev/b/web)

  Prevent inline popovers and tooltips from overflowing.

## 0.7.3

### Patch Changes

- [`05d765f`](https://github.com/ocavue/prosekit/commit/05d765f9947c6800d5e073407e11927774fd454f) ![](https://prosekit.dev/b/core)

  Fix an issue where removing an extension could lead to incorrect editor states.

## 0.7.2

### Patch Changes

- [`b4a70d7`](https://github.com/ocavue/prosekit/commit/b4a70d7456a86e2a8201629931afe476e052a7e7) ![](https://prosekit.dev/b/web)

  Fix the initial position of autocomplete popover.

## 0.7.1

### Patch Changes

- [`8a79a11`](https://github.com/ocavue/prosekit/commit/8a79a116157650bb6590787a87f98af90efd29a4) ![](https://prosekit.dev/b/pm)

  Update ProseMirror packages.

- [`dd5f781`](https://github.com/ocavue/prosekit/commit/dd5f78157d3b8eb5c1944ec83e6d45690ddd8034) ![](https://prosekit.dev/b/core)

  Fix a bug where the editor would crash during unmounting.

## 0.7.0

### Minor Changes

- [`b136cd7`](https://github.com/ocavue/prosekit/commit/b136cd73b22a7a8eb5cb5fc3a924d2f02407b180) ![](https://prosekit.dev/b/extensions)

  Add `defineTextAlign` to set the `text-align` CSS property for block nodes.

- [`b136cd7`](https://github.com/ocavue/prosekit/commit/b136cd73b22a7a8eb5cb5fc3a924d2f02407b180) ![](https://prosekit.dev/b/core)

  Add a new `splittable` option to `defineNodeAttr`.

- [`9e4d8d5`](https://github.com/ocavue/prosekit/commit/9e4d8d575f5a429eb7a6f61525e5aa6cfda1e2ee) ![](https://prosekit.dev/b/core)

  Rewrite to the internal extension facet data structure.

### Patch Changes

- [`b136cd7`](https://github.com/ocavue/prosekit/commit/b136cd73b22a7a8eb5cb5fc3a924d2f02407b180) ![](https://prosekit.dev/b/core)

  `setNodeAttrs` now accepts an array of node types.

- [`a51199d`](https://github.com/ocavue/prosekit/commit/a51199d1d70e8c43cf7c84f55d874703debb2a3a) ![](https://prosekit.dev/b/core)

  Fix an issue where the `insertNode` command creates an invalid node.

## 0.6.10

### Patch Changes

- [`c632b4e`](https://github.com/ocavue/prosekit/commit/c632b4e3e2692f4b78752b7ea7c35745584b27a9) ![](https://prosekit.dev/b/web)

  Fix an issue where the first autocomplete item won't focus.

## 0.6.9

### Patch Changes

- [`cb98437`](https://github.com/ocavue/prosekit/commit/cb9843750c0409daf39d225fddde2ff00c49b39e) ![](https://prosekit.dev/b/web)

  Don't show the inline popover when an inline node is selected.

- [`4531781`](https://github.com/ocavue/prosekit/commit/453178169d16b0d6e8c1c8b4a3accf8bad86db66) ![](https://prosekit.dev/b/web)

  Update dependencies.

- [`611658f`](https://github.com/ocavue/prosekit/commit/611658ff1842aaa017c892e0c3e52cc87ad22d2e) ![](https://prosekit.dev/b/basic)

  Includes `defineModClickPrevention()`.

- [`611658f`](https://github.com/ocavue/prosekit/commit/611658ff1842aaa017c892e0c3e52cc87ad22d2e) ![](https://prosekit.dev/b/extensions)

  Add a new function `defineModClickPrevention()` that can prevent the default mod-clicking selection.

## 0.6.8

### Patch Changes

- [`dbf6ccb`](https://github.com/ocavue/prosekit/commit/dbf6ccb66a7e526918159698667cdac88a58cc32) ![](https://prosekit.dev/b/extensions)

  Fix an issue where mark rules apply marks to the wrong position.

- [`dbf6ccb`](https://github.com/ocavue/prosekit/commit/dbf6ccb66a7e526918159698667cdac88a58cc32) ![](https://prosekit.dev/b/web)

  Fix incorrect autocomplete query update.

## 0.6.7

### Patch Changes

- [`b7cc26d`](https://github.com/ocavue/prosekit/commit/b7cc26dbe8c905f8a2fcab0846da5513450620b2) ![](https://prosekit.dev/b/core)

  The `toggleMark` command function will add the mark when only part of the selection has the mark already.

- [`f270db4`](https://github.com/ocavue/prosekit/commit/f270db4479b9a383ab9853fb4b8031442866ed94) ![](https://prosekit.dev/b/extensions)

  Add input mark rules for marks `bold`, `italic`, `code`, `strike`. For example, you can type `**text**` to bold text now.

## 0.6.6

### Patch Changes

- [`6d05193`](https://github.com/ocavue/prosekit/commit/6d051931991f3f1149bf776db42588c3b83ddfe4) ![](https://prosekit.dev/b/core)

  Do not use const enums. This resolves the "Cannot access ambient const enums when 'isolatedModules' is enabled" error for the downstream TypeScript projects.

- [`d1d2085`](https://github.com/ocavue/prosekit/commit/d1d2085dd5110e7d0e6f0887958108c139b471cc) ![](https://prosekit.dev/b/extensions)

  Fix an issue where mark rules could generate overlapped marks.

## 0.6.5

### Patch Changes

- [`91d77a4`](https://github.com/ocavue/prosekit/commit/91d77a405e9ccb8b84fdd9edb2ed16aec76de3f0) ![](https://prosekit.dev/b/extensions)

  Add `defineLinkMarkRule`, which can be used as an alternative to the combination of `defineLinkInputRule` and `defineLinkEnterRule`.

- [`91d77a4`](https://github.com/ocavue/prosekit/commit/91d77a405e9ccb8b84fdd9edb2ed16aec76de3f0) ![](https://prosekit.dev/b/extensions)

  Add `defineMarkRule` for adding or removing marks based on text content.

## 0.6.4

### Patch Changes

- [`27fff29`](https://github.com/ocavue/prosekit/commit/27fff296a312148e8c014f6b5935d1f5e474b801) ![](https://prosekit.dev/b/preact)

  Require minimal `preact` version 10.11.0.

- [`c6f22e3`](https://github.com/ocavue/prosekit/commit/c6f22e3c6faf62ac601373ce63e7948596cdfbae) ![](https://prosekit.dev/b/pm)

  Update `prosemirror-view`.

- [`03f9eb2`](https://github.com/ocavue/prosekit/commit/03f9eb2c1285a912f5d862e4fe3a572e47046f42) ![](https://prosekit.dev/b/react)

  Require minimal `react` version 18.2.0.

## 0.6.3

### Patch Changes

- [`1a10dba`](https://github.com/ocavue/prosekit/commit/1a10dba997bdd7388b22790b83b58189aeb4eea3) ![](https://prosekit.dev/b/web) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/vue)

  Fix an issue where the null filter for the autocomplete component doesn't work.

## 0.6.2

### Patch Changes

- [`20f09c3`](https://github.com/ocavue/prosekit/commit/20f09c3f8e34af930ebd4f3c9515fc45ff66be48) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/lit) ![](https://prosekit.dev/b/web)

  Update dependencies.

## 0.6.1

### Patch Changes

- [`4371e8b`](https://github.com/ocavue/prosekit/commit/4371e8b843505f4d7603bac28d58191cc33b2ee5) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/vue)

  Remove unnecessary dependencies.

## 0.6.0

### Minor Changes

- [`3bfeff5`](https://github.com/ocavue/prosekit/commit/3bfeff5fbbcff28ceab5b15e0fee07a7afab40d0) ![](https://prosekit.dev/b/web) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/lit) ![](https://prosekit.dev/b/vue)

  Redesign editor web components, including the removal of the Lit dependency and various other enhancements.

## 0.5.3

### Patch Changes

- [`9bc0e4b`](https://github.com/ocavue/prosekit/commit/9bc0e4b5d717faf5e7feef8ec525787f278c53f3) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/lit) ![](https://prosekit.dev/b/vue)

  Rewrite popover completely. Now a popover is made of 3 parts: `PopoverRoot`, `PopoverContent` and `PopoverTrigger`.

## 0.5.2

### Patch Changes

- [`b29fe28`](https://github.com/ocavue/prosekit/commit/b29fe28583afe1e79cb718feea5f40a04e6cc4ae) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/basic)

  Add basic table support.

## 0.5.1

### Patch Changes

- [`c335a24`](https://github.com/ocavue/prosekit/commit/c335a24f4868703c7419a91e3773459ed10d8cc5) ![](https://prosekit.dev/b/pm)

  Update ProseMirror packages.

- [`fc68e48`](https://github.com/ocavue/prosekit/commit/fc68e48f279088bd3220883137dc29ddafa8f2d8) ![](https://prosekit.dev/b/extensions)

  Add `prosekit/extensions/enter-rule`, to execute some action when `Enter` is pressed after a certain text pattern.

## 0.5.0

### Minor Changes

- [`1f0ce9a`](https://github.com/ocavue/prosekit/commit/1f0ce9a63bcd731cf5c5d61c32a122faa04bf1af) ![](https://prosekit.dev/b/extensions)

  Added `defineCodeBlockShiki` for code block highlighting using `shiki` v1, providing a solid default for syntax highlighting.

  Exported all `shiki` supported languages and themes via `shikiBundledLanguagesInfo` and `shikiBundledThemesInfo`.

  Removed `defineCodeBlockShikiji` because `shikiji` is merged back to `shiki`.

## 0.4.5

### Patch Changes

- [`89e8d83`](https://github.com/ocavue/prosekit/commit/89e8d8354e4a758103644f1a293d1376e6ed7dd6) ![](https://prosekit.dev/b/core)

  Add more options to parser and serializer utility functions.

- [`89e8d83`](https://github.com/ocavue/prosekit/commit/89e8d8354e4a758103644f1a293d1376e6ed7dd6) ![](https://prosekit.dev/b/extensions)

  Export `ListDOMSerializer` from `prosekit/extensions/list`.

## 0.4.4

### Patch Changes

- [`c0f4e51`](https://github.com/ocavue/prosekit/commit/c0f4e51af135a594e0949ed2dfd8c543be290668) ![](https://prosekit.dev/b/core)

  Added new utility functions for converting between ProseMirror data and HTML:

  - `elementFromJSON`
  - `elementFromNode`
  - `htmlFromJSON`
  - `htmlFromNode`

## 0.4.3

### Patch Changes

- [`c23c231`](https://github.com/ocavue/prosekit/commit/c23c2312915616269eea7808729796d51f10a92a) ![](https://prosekit.dev/b/core)

  Add following functions for defining event handlers.

  - `defineDOMEventHandler`
  - `defineKeyDownHandler`
  - `defineKeyPressHandler`
  - `defineTextInputHandler`
  - `defineClickOnHandler`
  - `defineClickHandler`
  - `defineDoubleClickOnHandler`
  - `defineDoubleClickHandler`
  - `defineTripleClickOnHandler`
  - `defineTripleClickHandler`
  - `definePasteHandler`
  - `defineDropHandler`
  - `defineScrollToSelectionHandler`

- [`36503a2`](https://github.com/ocavue/prosekit/commit/36503a2c4ffaa9a43be5ea424819c8b6a1d3eac6) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/basic) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/lit) ![](https://prosekit.dev/b/vue)

  Add a block handle component that can be used to drag and drop blocks.

## 0.4.2

### Patch Changes

- [`82c5c7e`](https://github.com/ocavue/prosekit/commit/82c5c7e72ff638bc9080cb34e5fc2f695ad662a3) ![](https://prosekit.dev/b/extensions)

  Now when you type something that's recognized as a link, it will become a link automatically.

- [`82c5c7e`](https://github.com/ocavue/prosekit/commit/82c5c7e72ff638bc9080cb34e5fc2f695ad662a3) ![](https://prosekit.dev/b/lit)

  Fix an issue where autocomplete menus would catch Enter keypress when there is no available command to select.

## 0.4.1

### Patch Changes

- [`9851f2a`](https://github.com/ocavue/prosekit/commit/9851f2a12b86b67e9130cc9a9c4cdeb1f47ea13e) ![](https://prosekit.dev/b/lit)

  Fix an issue where the autocomplete popover would overflow the viewport.

## 0.4.0

### Minor Changes

- [`5582e98`](https://github.com/ocavue/prosekit/commit/5582e98f7f7d76e6c14d3da9e3dd7ca844d139d9) ![](https://prosekit.dev/b/core)

  Add `expandMark` command.

- [`5582e98`](https://github.com/ocavue/prosekit/commit/5582e98f7f7d76e6c14d3da9e3dd7ca844d139d9) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/basic)

  Add `defineVirtualSelection` to highlight the selected text when the editor is not focused.

### Patch Changes

- [`e41f51a`](https://github.com/ocavue/prosekit/commit/e41f51a1a81444e889a3dcd0e436ee9ca16c939f) ![](https://prosekit.dev/b/vue)

  Fix incorrect editor injection type.

- [`347805b`](https://github.com/ocavue/prosekit/commit/347805b24a4133734718d5d02fb32d3688e3468d) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/core)

  Remove some deprecated APIs.

- [`3b54306`](https://github.com/ocavue/prosekit/commit/3b54306c6f99b66162ee8409e72097be16ed5cdd) ![](https://prosekit.dev/b/lit)

  Fix a bug where typing `//` would place the slash menu in a wrong position.

- [`5582e98`](https://github.com/ocavue/prosekit/commit/5582e98f7f7d76e6c14d3da9e3dd7ca844d139d9) ![](https://prosekit.dev/b/lit)

  The inline popover can place itself based on the virtual selection element.

- [`d7f74c6`](https://github.com/ocavue/prosekit/commit/d7f74c646e9a64505758b0474811c2a79cb99684) ![](https://prosekit.dev/b/extensions)

  Add blockquote input rule. Now you can type `>` to create a blockquote.

- [`5582e98`](https://github.com/ocavue/prosekit/commit/5582e98f7f7d76e6c14d3da9e3dd7ca844d139d9) ![](https://prosekit.dev/b/extensions)

  Add `expandLink` command.

## 0.3.4

### Patch Changes

- [`03a6ce8`](https://github.com/ocavue/prosekit/commit/03a6ce8cc6be99f70240d25b1688953ccb595cf1) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/vue)

  Add `useDocChange`.

## 0.3.3

### Patch Changes

- [`9c62b10`](https://github.com/ocavue/prosekit/commit/9c62b1060f4bf8b2263e71048258373d6869da63) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/vue)

  Add `useStateUpdate`.

## 0.3.2

### Patch Changes

- [`8434456`](https://github.com/ocavue/prosekit/commit/8434456fed17638baf09b5a7bcdb733995efbf05) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/vue)

  `useExtension` and `useKeymap` now accept an optional options object.

- [`8434456`](https://github.com/ocavue/prosekit/commit/8434456fed17638baf09b5a7bcdb733995efbf05) ![](https://prosekit.dev/b/core)

  Export internal `EditorNotFoundError`.

## 0.3.1

### Patch Changes

- [`8641630`](https://github.com/ocavue/prosekit/commit/86416304abf05107b9060d553d2056cf478ee759) ![](https://prosekit.dev/b/lit)

  Fix an issue where the inline popover won't disappear when the text selection collapse after you have clicked the inline popover.

## 0.3.0

### Minor Changes

- [`237f12f`](https://github.com/ocavue/prosekit/commit/237f12f3004a87c5eb22c34aef63a25033f8354d) ![](https://prosekit.dev/b/lit) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/vue)

  Rewrite the Popover component. It now provides a more clear API and has a better default behavior for inline reference elements.

## 0.2.12

### Patch Changes

- [`2d0da02`](https://github.com/ocavue/prosekit/commit/2d0da0228a6b3caa53b4f4a3490a2cb973da8ac6) ![](https://prosekit.dev/b/extensions)

  Add `setCodeBlock`, `insertCodeBlock`, `toggleCodeBlock` and `setCodeBlockAttrs` commands.

  Deprecate `setCodeBlockLanguage` command.

- [`2d0da02`](https://github.com/ocavue/prosekit/commit/2d0da0228a6b3caa53b4f4a3490a2cb973da8ac6) ![](https://prosekit.dev/b/core)

  Add `setNodeAttrs` command.

## 0.2.11

### Patch Changes

- [`b3cae9a`](https://github.com/ocavue/prosekit/commit/b3cae9a864cb03333c42ae358aba62a1068c53a9) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/vue)

  `useEditor({ update: true })` now will update the component when the editor view is mounted. This is useful for the first render of the editor.

- [`3234558`](https://github.com/ocavue/prosekit/commit/323455860c3700d2202abf22c9703af47b6fdd35) ![](https://prosekit.dev/b/core)

  Add `state` property to `Editor` class. This property is valid regardless of whether the editor is mounted or not.

## 0.2.10

### Patch Changes

- [`4d89e38`](https://github.com/ocavue/prosekit/commit/4d89e38e1467f1d612c0e1532cb8dd782e3ee733) ![](https://prosekit.dev/b/basic)

  `defineBasicExtension` now includes the `link` mark.

- [`f24717d`](https://github.com/ocavue/prosekit/commit/f24717dfe927344124eb932e5c5369523bf1d14c) ![](https://prosekit.dev/b/lit)

  Fix a bug where the inline popover would close when clicking on the input inside it.

## 0.2.9

### Patch Changes

- [`0d9eb6b`](https://github.com/ocavue/prosekit/commit/0d9eb6bd209c344720ce9ad7d4c253eb3952103c) ![](https://prosekit.dev/b/extensions)

  Add `removeLink` command.

## 0.2.8

### Patch Changes

- [`7865bc0`](https://github.com/ocavue/prosekit/commit/7865bc03e031f18c06b61db7cfe190f0d3338b7e) ![](https://prosekit.dev/b/core)

  Add `editor.focus()`, `editor.blur()` methods and `editor.focused` property.

- [`7865bc0`](https://github.com/ocavue/prosekit/commit/7865bc03e031f18c06b61db7cfe190f0d3338b7e) ![](https://prosekit.dev/b/core)

  Add `defineFocusChangeHandler` which registers a event handler that is called when the editor gains or loses focus.

## 0.2.7

### Patch Changes

- [`eea5b8d`](https://github.com/ocavue/prosekit/commit/eea5b8d91152ce2d1273ccc1feb794e4793ce3bf) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/basic)

  Add `defineDropCursor`, which allows you to show a cursor when something is dragged over the editor.

- [`eea5b8d`](https://github.com/ocavue/prosekit/commit/eea5b8d91152ce2d1273ccc1feb794e4793ce3bf) ![](https://prosekit.dev/b/extensions)

  Make images draggable by default.

## 0.2.6

### Patch Changes

- [`b9ee517`](https://github.com/ocavue/prosekit/commit/b9ee5179fe3e97c05b4fab67215eb14cab1d081c) ![](https://prosekit.dev/b/core)

  Re-export `clsx/lite` with stricter types.

- [`cf8787f`](https://github.com/ocavue/prosekit/commit/cf8787fdc2dd8f56a697833d7bffb2a773100517) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/lit) ![](https://prosekit.dev/b/vue)

  Add components Resizable and ResizableHandle.

- [`8f20d4e`](https://github.com/ocavue/prosekit/commit/8f20d4ebfeadc402416839419a3a0f7aac9c8626) ![](https://prosekit.dev/b/core)

  Add `defineNodeAttr` and `defineMarkAttr`. These functions provide a handy way to define extra attributes for existing node types and mark types.

## 0.2.5

### Patch Changes

- [`268bd6c`](https://github.com/ocavue/prosekit/commit/268bd6c4b848a27644f75f3aeeb54a7d0fc4ee12) ![](https://prosekit.dev/b/lit)

  Hide the inline popover when the text cursor is in a code block.

- [`268bd6c`](https://github.com/ocavue/prosekit/commit/268bd6c4b848a27644f75f3aeeb54a7d0fc4ee12) ![](https://prosekit.dev/b/extensions)

  Skip heading keybindings when the text cursor is in a code block.

## 0.2.4

### Patch Changes

- [`1393d74`](https://github.com/ocavue/prosekit/commit/1393d740e35118c27b84ae535156cf3030914a6f) ![](https://prosekit.dev/b/core)

  Add the following functions to register event handlers into the editor.

  - `defineMountHandler`
  - `defineUnmountHandler`
  - `defineUpdateHandler`
  - `defineDocChangeHandler`

## 0.2.3

### Patch Changes

- [`4d2d656`](https://github.com/ocavue/prosekit/commit/4d2d656bfa0e26306a777b1b045dae27d5e1846e) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/core)

  Add a new entry point `prosekit/extensions/input-rule` for the input rule extension. This entry point exports better APIs for creating input rules. The old entry point `defineInputRule` from `prosekit/core` is deprecated now and will be removed in the next minor version.

- [`fe0f64f`](https://github.com/ocavue/prosekit/commit/fe0f64f6cc00210cb82d70fd0efdcd3f50a8372e) ![](https://prosekit.dev/b/extensions)

  Add `defineCodeBlockShikiji` as an easier way to enable syntax highlighting for the `codeBlock` node using the `shikiji` library.

- [`fe62e12`](https://github.com/ocavue/prosekit/commit/fe62e12b32073e7a96d425a35812c1aa4f26e7e8) ![](https://prosekit.dev/b/extensions)

  You can now type triple backticks followed by an optional language name and press Enter to insert a code block.

- [`e09746f`](https://github.com/ocavue/prosekit/commit/e09746fd8d8d11cd2b0408fd0f9cfef76191bcd3) ![](https://prosekit.dev/b/extensions)

  Press `Enter` three times at the end of a code block to exit the block and create a new paragraph below it. Inspired by `@tiptap/extension-code-block`.

- [`74f3ade`](https://github.com/ocavue/prosekit/commit/74f3ade608e4112d58506ae27c3482c77ac29415) ![](https://prosekit.dev/b/basic)

  Update `basic/typography.css` styling for `<h5>` and `<h6>` elements.

- [`fe62e12`](https://github.com/ocavue/prosekit/commit/fe62e12b32073e7a96d425a35812c1aa4f26e7e8) ![](https://prosekit.dev/b/core)

  Export internal API `keymapFacet`.

## 0.2.2

### Patch Changes

- [`1b6744e`](https://github.com/ocavue/prosekit/commit/1b6744e71b329254ce525edcafe058bdb1d8f448) ![](https://prosekit.dev/b/basic)

  Improved `typography.css`. Increased the padding of the `p` element and fix the position of the list checkboxes.

## 0.2.1

### Patch Changes

- [`2d2b700`](https://github.com/ocavue/prosekit/commit/2d2b700e817da7c164ff82aadd83a6de7f145868) ![](https://prosekit.dev/b/basic)

  Unwrap nested CSS rules in `prosekit/basic/typography.css`.

## 0.2.0

### Minor Changes

- [`1124758`](https://github.com/ocavue/prosekit/commit/11247589114943e9e42e7dabed990ea9a50a73cb) ![](https://prosekit.dev/b/basic) ![](https://prosekit.dev/b/core)

  Improve the styling API. Now ProseKit exports two CSS files that you can import to get started.

  ```js
  import 'prosekit/basic/style.css'
  import 'prosekit/basic/typography.css'
  ```

### Patch Changes

- [`8fca5fc`](https://github.com/ocavue/prosekit/commit/8fca5fc02b5c836f3e562ac2217dd2c0bbef70bc) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/core)

  Remove deprecated API.

## 0.1.15

### Patch Changes

- [`b3c025f`](https://github.com/ocavue/prosekit/commit/b3c025fe5f5533908df44bdae833751dbf9b1ba7) ![](https://prosekit.dev/b/lit)

  Fix a bug where the editor would scroll into view automatically.

## 0.1.14

### Patch Changes

- [`d76c28b`](https://github.com/ocavue/prosekit/commit/d76c28be9597cf6bae33acfad91d804666497e61) ![](https://prosekit.dev/b/core)

  Export `BaseNodeViewOptions` interface. This is useful for defining node views in React, Vue and other frameworks.

## 0.1.13

### Patch Changes

- [`b29e75b`](https://github.com/ocavue/prosekit/commit/b29e75b6566304b3977c8baca4442bb696d5483b) ![](https://prosekit.dev/b/extensions)

  `defineCodeBlockHighlight` is the recommended way to add syntax highlighting to code blocks. The `parser` option for `defineCodeBlock` is deprecated and will be removed in a future version.

## 0.1.12

### Patch Changes

- [`1b04e65`](https://github.com/ocavue/prosekit/commit/1b04e655cfbe942da9914ef790b0a43807c299ad) ![](https://prosekit.dev/b/core)

  Export an internal `_getId()` function.

- [`1b04e65`](https://github.com/ocavue/prosekit/commit/1b04e655cfbe942da9914ef790b0a43807c299ad) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/vue)

  Add react node view and vue node view support.

## 0.1.11

### Patch Changes

- [`281a2e7`](https://github.com/ocavue/prosekit/commit/281a2e71c3daa7f1aa6b56df64f3e143c5faabe9) ![](https://prosekit.dev/b/lit)

  Use the native Popover API to place popover components in the top layer.

- [`4f79f39`](https://github.com/ocavue/prosekit/commit/4f79f3965b6f81b0310635050202ddd32eef4761) ![](https://prosekit.dev/b/lit)

  Fix various interaction issues in the ComboBox component.

- [`4f79f39`](https://github.com/ocavue/prosekit/commit/4f79f3965b6f81b0310635050202ddd32eef4761) ![](https://prosekit.dev/b/extensions)

  Use [prosemirror-highlight] to support syntax highlighting in `codeBlock` nodes.
  The previous `hljs` API is deprecated and will be removed in the future.

  [prosemirror-highlight]: https://github.com/ocavue/prosemirror-highlight

## 0.1.10

### Patch Changes

- [`dac24aa`](https://github.com/ocavue/prosekit/commit/dac24aa342df4226b23eef5731574e081f206b87) ![](https://prosekit.dev/b/pm)

  Update ProseMirror dependencies.

## 0.1.9

### Patch Changes

- [`90f237b`](https://github.com/ocavue/prosekit/commit/90f237bd1517171df3135abbccbc353d18aaad47) ![](https://prosekit.dev/b/extensions)

  Deprecate `prosekit/extensions/suggestion`. Please use `prosekit/extensions/autocomplete` instead.

- [`74cb6e3`](https://github.com/ocavue/prosekit/commit/74cb6e35c95eadb9ea1511f3b402ebf63f5838a7) ![](https://prosekit.dev/b/solid)

  `useKeymap` and `useExtension` now accept Solid accessors.

- [`5d83146`](https://github.com/ocavue/prosekit/commit/5d83146e35c6d9ec5d855a76ddaac43bf6cc6ded) ![](https://prosekit.dev/b/core)

  `defineBaseKeymap` now accepts a `priority` option. By default, the priority is `Priority.low`.

- [`5d83146`](https://github.com/ocavue/prosekit/commit/5d83146e35c6d9ec5d855a76ddaac43bf6cc6ded) ![](https://prosekit.dev/b/preact) !![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/vue)

  `useKeymap` now accepts an optional `priority` option.

## 0.1.8

### Patch Changes

- [`6c819f2`](https://github.com/ocavue/prosekit/commit/6c819f2) ![](https://prosekit.dev/b/lit)

  Fix a bug where hovering mouse over an autocomplete item would cause the autocomplete list to scroll.

- [`01b6549`](https://github.com/ocavue/prosekit/commit/01b6549) ![](https://prosekit.dev/b/extensions)

  Add `insertMention` command.

- [`d4061d4`](https://github.com/ocavue/prosekit/commit/d4061d4) ![](https://prosekit.dev/b/core)

  Try to set the selection after the inserted node when calling the `insertNode` command.

## 0.1.7

### Patch Changes

- [`0c60503`](https://github.com/ocavue/prosekit/commit/0c60503) ![](https://prosekit.dev/b/core)

  Fix a bug where a plugin can be added multiple times to the same editor.

- [`0c60503`](https://github.com/ocavue/prosekit/commit/0c60503) ![](https://prosekit.dev/b/extensions)

  Add new readonly extension.

  ```ts
  import { defineReadonly } from 'prosekit/extensions/readonly'

  const extension = defineReadonly()
  ```

- [`0c60503`](https://github.com/ocavue/prosekit/commit/0c60503) ![](https://prosekit.dev/b/preact) !![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) ![](https://prosekit.dev/b/vue)

  `useExtension` now accepts a null value for the `extension` argument. This is
  useful if you want to remove an extension from the editor.

## 0.1.6

### Patch Changes

- [`390d324`](https://github.com/ocavue/prosekit/commit/390d324) ![](https://prosekit.dev/b/prosekit)

  Fix bundled `.d.ts` files.

## 0.1.5

### Patch Changes

- [`e523df5`](https://github.com/ocavue/prosekit/commit/e523df5) ![](https://prosekit.dev/b/lit)

  Improve the position strategy of the autocomplete popover, and fix the flash of the popover when it is opened.

- [`e523df5`](https://github.com/ocavue/prosekit/commit/e523df5) ![](https://prosekit.dev/b/core)

  The `insertNode` command will place the text selection into the inserted node.

- [`e523df5`](https://github.com/ocavue/prosekit/commit/e523df5) ![](https://prosekit.dev/b/extensions)

  Add `insertList` command.

## 0.1.4

### Patch Changes

- [`6f70509`](https://github.com/ocavue/prosekit/commit/6f70509) ![](https://prosekit.dev/b/core)

  Fix `insertNode` command.

- [`a58fc69`](https://github.com/ocavue/prosekit/commit/a58fc69) ![](https://prosekit.dev/b/lit)

  Only display the inline popover when current selection is `TextSelection` or `NodeSelection`. Particularly, when the selection is `AllSelection`, the inline popover should not be displayed.

## 0.1.3

### Patch Changes

- [`404ffff`](https://github.com/ocavue/prosekit/commit/404ffff) ![](https://prosekit.dev/b/core)

  Call all update handlers after mounting.

## 0.1.2

### Patch Changes

- [`8521070`](https://github.com/ocavue/prosekit/commit/8521070) ![](https://prosekit.dev/b/solid)

  Fix an issue that caused the function properties not to work in the Solid components.

## 0.1.1

### Patch Changes

- [`9cb333b`](https://github.com/ocavue/prosekit/commit/9cb333b) ![](https://prosekit.dev/b/core)

  Add `nodeFromJSON` and `stateFromJSON`.

## 0.1.0

### Minor Changes

- [`052d7fd`](https://github.com/ocavue/prosekit/commit/052d7fd) ![](https://prosekit.dev/b/basic) ![](https://prosekit.dev/b/core) ![](https://prosekit.dev/b/extensions) ![](https://prosekit.dev/b/lit) ![](https://prosekit.dev/b/pm) ![](https://prosekit.dev/b/preact) ![](https://prosekit.dev/b/react) ![](https://prosekit.dev/b/solid) !![](https://prosekit.dev/b/svelte) ![](https://prosekit.dev/b/vue)

  Release v0.1.0.

<!-- https://shields.io/docs/logos -->

[badge-prosekit]: https://img.shields.io/badge/prosekit-444444
[badge-pm]: https://img.shields.io/badge/prosekit%2Fpm-444444
[badge-core]: https://img.shields.io/badge/prosekit%2Fcore-444444
[badge-basic]: https://img.shields.io/badge/prosekit%2Fbasic-444444
[badge-extensions]: https://img.shields.io/badge/prosekit%2Fextensions-444444
[badge-lit]: https://img.shields.io/badge/prosekit%2Flit-444444?logo=lit
[badge-vue]: https://img.shields.io/badge/prosekit%2Fvue-444444?logo=vuedotjs
[badge-solid]: https://img.shields.io/badge/prosekit%2Fsolid-444444?logo=solid
[badge-react]: https://img.shields.io/badge/prosekit%2Freact-444444?logo=react
[badge-preact]: https://img.shields.io/badge/prosekit%2Fpreact-444444?logo=preact
[badge-svelte]: https://img.shields.io/badge/prosekit%2Fsvelte-444444?logo=svelte
