---
"prosekit": minor
"@prosekit/preact": minor
"@prosekit/svelte": minor
"@prosekit/react": minor
"@prosekit/solid": minor
"@prosekit/lit": minor
"@prosekit/vue": minor
"@prosekit/web": minor
---

Add `<DropIndicator />` component to replace `defineDropCursor` extension

The new `<DropIndicator />` component provides improved drag-and-drop visual feedback when dragging content into the editor. This replaces the previous `defineDropCursor` extension that was based on the [`prosemirror-dropcursor`](https://github.com/ProseMirror/prosemirror-dropcursor) package. The component offers more accurate positioning for nested lists, better support for customization and animations.
