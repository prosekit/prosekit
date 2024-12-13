# prosekit/core/test

## TestEditor {#test-editor}

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

`get commands(): ToCommandAction<{[KeyType in string | number | symbol]: UnionToIntersection<ExtractTyping<E>["Commands"] extends undefined ? never : ExtractTyping<E>["Commands"]>[KeyType]}>`

</dt>

<dd>

All [CommandAction](../core.md#command-action)s defined by the editor.

</dd>

<dt>

`get focused(): boolean`

</dt>

<dd>

Whether the editor is focused.

</dd>

<dt>

`get marks(): ToMarkAction<SimplifyDeeper<{[KeyType in string | number | symbol]: UnionToIntersection<ExtractTyping<E>["Marks"] extends undefined ? never : ExtractTyping<E>["Marks"]>[KeyType]}>>`

</dt>

<dd>

All [MarkAction](../core.md#mark-action)s defined by the editor.

</dd>

<dt>

`get mounted(): boolean`

</dt>

<dd>

Whether the editor is mounted.

</dd>

<dt>

`get nodes(): ToNodeAction<SimplifyDeeper<{[KeyType in string | number | symbol]: UnionToIntersection<ExtractTyping<E>["Nodes"] extends undefined ? never : ExtractTyping<E>["Nodes"]>[KeyType]}>>`

</dt>

<dd>

All [NodeAction](../core.md#node-action)s defined by the editor.

</dd>

<dt>

`get schema(): Schema<ExtractNodeNames<E>, ExtractMarkNames<E>>`

</dt>

<dd>

The editor schema.

</dd>

<dt>

`get state(): EditorState`

</dt>

<dd>

The editor's current state.

</dd>

<dt>

`get view(): EditorView`

</dt>

<dd>

The editor view.

</dd>

<dt>

`blur`

</dt>

<dd>

Blur the editor.

```ts
const blur: () => void
```

</dd>

<dt>

`canExec`

</dt>

<dd>

Check if the given command can be executed. Return `true` if the command
can be executed, otherwise `false`.

```ts
const canExec: (command: Command) => boolean
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

`exec`

</dt>

<dd>

Execute the given command. Return `true` if the command was successfully
executed, otherwise `false`.

```ts
const exec: (command: Command) => boolean
```

</dd>

<dt>

`focus`

</dt>

<dd>

Focus the editor.

```ts
const focus: () => void
```

</dd>

<dt>

`mount`

</dt>

<dd>

Mount the editor to the given HTML element.
Pass `null` or `undefined` to unmount the editor.

```ts
const mount: (place: undefined | null | HTMLElement) => void
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
const set: (doc: Node) => void
```

</dd>

<dt>

`setContent`

</dt>

<dd>

Update the editor's document and selection.

```ts
const setContent: (content: string | Node | NodeJSON | HTMLElement, selection?: Selection | "start" | SelectionJSON | "end") => void
```

</dd>

<dt>

`unmount`

</dt>

<dd>

Unmount the editor. This is equivalent to `mount(null)`.

```ts
const unmount: () => void
```

</dd>

<dt>

`updateState`

</dt>

<dd>

Update the editor's state.

**Remarks**

This is an advanced method. Use it only if you have a specific reason to
directly manipulate the editor's state.

```ts
const updateState: (state: EditorState) => void
```

</dd>

<dt>

`use`

</dt>

<dd>

Register an extension to the editor. Return a function to unregister the
extension.

```ts
const use: (extension: Extension<ExtensionTyping<any, any, any>>) => VoidFunction
```

</dd>

</dl>

## createTestEditor {#create-test-editor}

```ts
function createTestEditor<E extends Extension<ExtensionTyping<any, any, any>>>(options: EditorOptions<E>): TestEditor<E>
```
