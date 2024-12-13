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

```ts
const blur: () => void
```

</dd>

<dt>

`canExec`

</dt>

<dd>

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

```ts
const exec: (command: Command) => boolean
```

</dd>

<dt>

`focus`

</dt>

<dd>

```ts
const focus: () => void
```

</dd>

<dt>

`mount`

</dt>

<dd>

```ts
const mount: (place: undefined | null | HTMLElement) => void
```

</dd>

<dt>

`set`

</dt>

<dd>

```ts
const set: (doc: Node) => void
```

</dd>

<dt>

`setContent`

</dt>

<dd>

```ts
const setContent: (content: string | Node | NodeJSON | HTMLElement, selection?: Selection | "start" | SelectionJSON | "end") => void
```

</dd>

<dt>

`unmount`

</dt>

<dd>

```ts
const unmount: () => void
```

</dd>

<dt>

`updateState`

</dt>

<dd>

```ts
const updateState: (state: EditorState) => void
```

</dd>

<dt>

`use`

</dt>

<dd>

```ts
const use: (extension: Extension<ExtensionTyping<any, any, any>>) => VoidFunction
```

</dd>

</dl>

## createTestEditor {#create-test-editor}

```ts
function createTestEditor<E extends Extension<ExtensionTyping<any, any, any>>>(options: EditorOptions<E>): TestEditor<E>
```
