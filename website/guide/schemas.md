# Schemas

A schema is used to define the structure of a document. A schema consists of
multiple node types and mark types. Nodes represent different elements in the
document such as paragraphs, headings, lists, tables, etc. Marks represent
various formatting styles applied to the inline content, such as bold, italic,
underline, etc.

## Nodes

You can use [`defineNodeSpec`] to defined a node type. It accepts the node name and a
[`NodeSpec`] object.

## Marks

You can use [`defineMarkspec`] to defined a mark type. It accepts the mark name and a
[`MarkSpec`] object.

[`defineNodeSpec`]: /references/core#defineNodeSpec
[`defineMarkSpec`]: /references/core#defineMarkSpec
[`NodeSpec`]: https://prosemirror.net/docs/ref/#model.NodeSpec
[`MarkSpec`]: https://prosemirror.net/docs/ref/#model.MarkSpec
