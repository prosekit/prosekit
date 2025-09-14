# prosemirror-drop-indicator

[![npm](https://img.shields.io/npm/v/prosemirror-drop-indicator)](https://www.npmjs.com/package/prosemirror-drop-indicator)

A module for [ProseMirror](https://prosemirror.net/) that provides a drop indicator plugin.

This package serves a similar purpose to the [`prosemirror-dropcursor`](https://github.com/ProseMirror/prosemirror-dropcursor) package, but with the following differences:

- It doesn't render the indicator directly. Instead, you provide callbacks to control the drop indicator's behavior.
- It provides better drop-position prediction, especially for nested nodes.
- It has not yet implemented the vertical drop indicator.

## API documentation

- [prosemirror-drop-indicator](https://doc.deno.land/https://esm.sh/prosemirror-drop-indicator)

## License

MIT
