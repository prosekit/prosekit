# Schemas

A schema is used to define the structure of a document. A schema consists of
multiple node types and mark types. Nodes represent different elements in the
document such as paragraphs, headings, lists, tables, etc. Marks represent
various formatting styles applied to the inline content, such as bold, italic,
underline, etc.

## Nodes

You can use [`addNodeSpec`] to defined a node type. It accepts the node name and a
[`NodeSpec`] object.

## Marks

You can use [`addMarkspec`] to defined a mark type. It accepts the mark name and a
[`MarkSpec`] object.

[`addNodeSpec`]: https://prosekit.dev/references/prosekit_core#addnodespec
[`addMarkSpec`]: https://prosekit.dev/references/prosekit_core#addmarkspec
[`NodeSpec`]: https://prosemirror.net/docs/ref/#model.NodeSpec
[`MarkSpec`]: https://prosemirror.net/docs/ref/#model.MarkSpec
