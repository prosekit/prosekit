# prosemirror-drop-indicator

[![npm](https://img.shields.io/npm/v/prosemirror-drop-indicator)](https://www.npmjs.com/package/prosemirror-drop-indicator)

A module for [ProseMirror](https://prosemirror.net/) that provides a drop indicator plugin.

This module implements a plugin that controls the behavior of the drop indicator.

This package provides the similar goal as the [`prosemirror-dropcursor`](https://github.com/ProseMirror/prosemirror-dropcursor) package, but with the following differences:

- Unlike the `prosemirror-dropcursor`, `prosemirror-drop-indicator` doesn't drop the indicator directly. Instead, you need to provide some callbacks to control the behavior of the drop indicator.
- It provides better drop position prediction then `prosemirror-dropcursor`.

## API documentation

- [prosemirror-drop-indicator](https://doc.deno.land/https://esm.sh/prosemirror-drop-indicator)

## License 

MIT
