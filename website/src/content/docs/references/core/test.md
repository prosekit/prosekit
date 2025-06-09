---
title: prosekit/core/test
sidebar:
  label: core/test
---


## TestEditor {#test-editor}

**Extends** `Editor<E>`

An editor for testing purposes.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new TestEditor<E extends Extension<ExtensionTyping<any, any, any>>>(instance: EditorInstance): TestEditor<E>
```

</dd>

<dt>

`dispatchEvent`

</dt>

<dd>

```ts
const dispatchEvent: (event: Event) => void
```

</dd>

<dt>

`set`

</dt>

<dd>

Set the editor state to the given document. You can use special tokens
`<a>` and `<b>` to set the anchor and head positions of the selection.

**Example**

```ts
const editor = createTestEditor({ extension })
const n = editor.nodes
const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
editor.set(doc) // "Hello" is selected.
```

```ts
const set: (doc: ProseMirrorNode) => void
```

</dd>

</dl>

## createTestEditor {#create-test-editor}

```ts
function createTestEditor<E extends Extension<ExtensionTyping<any, any, any>>>(options: EditorOptions<E>): TestEditor<E>
```
