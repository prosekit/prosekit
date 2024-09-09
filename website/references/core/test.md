# prosekit/core/test

<a id="TestEditorE" name="TestEditorE"></a>

## TestEditor\<E\>

An editor for testing purposes.

### Extends

- [`Editor`](../core.md#EditorE)\<`E`\>

### Type Parameters

• **E** *extends* [`Extension`](../core.md#ExtensionT) = [`Extension`](../core.md#ExtensionT)

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new TestEditor()

> **new TestEditor**\<`E`\>(`instance`): [`TestEditor`](test.md#TestEditorE)\<`E`\>

##### Parameters

• **instance**: `EditorInstance`

##### Returns

[`TestEditor`](test.md#TestEditorE)\<`E`\>

##### Overrides

`Editor<E>.constructor`

### Accessors

<a id="commands" name="commands"></a>

#### commands

> `get` **commands**(): `ToCommandAction`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Commands"\] extends undefined ? never : ExtractTyping\<E\>\["Commands"\]\>\[KeyType\] \}\>

All [CommandAction](../core.md#CommandActionArgs)s defined by the editor.

##### Returns

`ToCommandAction`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Commands"\] extends undefined ? never : ExtractTyping\<E\>\["Commands"\]\>\[KeyType\] \}\>

##### Inherited from

[`Editor`](../core.md#EditorE).[`commands`](../core.md#commands)

<a id="focused" name="focused"></a>

#### focused

> `get` **focused**(): `boolean`

Whether the editor is focused.

##### Returns

`boolean`

##### Inherited from

[`Editor`](../core.md#EditorE).[`focused`](../core.md#focused)

<a id="marks" name="marks"></a>

#### marks

> `get` **marks**(): `ToMarkAction`\<`SimplifyDeeper`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Marks"\] extends undefined ? never : ExtractTyping\<E\>\["Marks"\]\>\[KeyType\] \}\>\>

All [MarkAction](../core.md#MarkActionAttrs)s defined by the editor.

##### Returns

`ToMarkAction`\<`SimplifyDeeper`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Marks"\] extends undefined ? never : ExtractTyping\<E\>\["Marks"\]\>\[KeyType\] \}\>\>

##### Inherited from

[`Editor`](../core.md#EditorE).[`marks`](../core.md#marks)

<a id="mounted" name="mounted"></a>

#### mounted

> `get` **mounted**(): `boolean`

Whether the editor is mounted.

##### Returns

`boolean`

##### Inherited from

[`Editor`](../core.md#EditorE).[`mounted`](../core.md#mounted)

<a id="nodes" name="nodes"></a>

#### nodes

> `get` **nodes**(): `ToNodeAction`\<`SimplifyDeeper`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Nodes"\] extends undefined ? never : ExtractTyping\<E\>\["Nodes"\]\>\[KeyType\] \}\>\>

All [NodeAction](../core.md#NodeActionAttrs)s defined by the editor.

##### Returns

`ToNodeAction`\<`SimplifyDeeper`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Nodes"\] extends undefined ? never : ExtractTyping\<E\>\["Nodes"\]\>\[KeyType\] \}\>\>

##### Inherited from

[`Editor`](../core.md#EditorE).[`nodes`](../core.md#nodes)

<a id="schema" name="schema"></a>

#### schema

> `get` **schema**(): [`Schema`](https://prosemirror.net/docs/ref/#model.Schema)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\>

The editor schema.

##### Returns

[`Schema`](https://prosemirror.net/docs/ref/#model.Schema)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\>

##### Inherited from

[`Editor`](../core.md#EditorE).[`schema`](../core.md#schema)

<a id="state" name="state"></a>

#### state

> `get` **state**(): [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

The editor's current state.

##### Returns

[`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

##### Inherited from

[`Editor`](../core.md#EditorE).[`state`](../core.md#state)

<a id="view" name="view"></a>

#### view

> `get` **view**(): [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

The editor view.

##### Returns

[`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

##### Inherited from

[`Editor`](../core.md#EditorE).[`view`](../core.md#view)

### Methods

<a id="blur" name="blur"></a>

#### blur()

> **blur**(): `void`

Blur the editor.

##### Returns

`void`

##### Inherited from

[`Editor`](../core.md#EditorE).[`blur`](../core.md#blur)

<a id="canExec" name="canExec"></a>

#### canExec()

> **canExec**(`command`): `boolean`

Check if the given command can be executed. Return `true` if the command
can be executed, otherwise `false`.

##### Parameters

• **command**: [`Command`](https://prosemirror.net/docs/ref/#state.Command)

##### Returns

`boolean`

##### Inherited from

[`Editor`](../core.md#EditorE).[`canExec`](../core.md#canExec)

<a id="dispatchEvent" name="dispatchEvent"></a>

#### dispatchEvent()

> **dispatchEvent**(`event`): `void`

##### Parameters

• **event**: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)

##### Returns

`void`

<a id="exec" name="exec"></a>

#### exec()

> **exec**(`command`): `boolean`

Execute the given command. Return `true` if the command was successfully
executed, otherwise `false`.

##### Parameters

• **command**: [`Command`](https://prosemirror.net/docs/ref/#state.Command)

##### Returns

`boolean`

##### Inherited from

[`Editor`](../core.md#EditorE).[`exec`](../core.md#exec)

<a id="focus" name="focus"></a>

#### focus()

> **focus**(): `void`

Focus the editor.

##### Returns

`void`

##### Inherited from

[`Editor`](../core.md#EditorE).[`focus`](../core.md#focus)

<a id="mount" name="mount"></a>

#### mount()

> **mount**(`place`): `void`

Mount the editor to the given HTML element.
Pass `null` or `undefined` to unmount the editor.

##### Parameters

• **place**: `undefined` \| `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

##### Returns

`void`

##### Inherited from

[`Editor`](../core.md#EditorE).[`mount`](../core.md#mount)

<a id="set" name="set"></a>

#### set()

> **set**(`doc`): `void`

Set the editor state to the given document. You can use special tokens
`<a>` and `<b>` to set the anchor and head positions of the selection.

##### Parameters

• **doc**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

##### Returns

`void`

##### Example

```ts
const editor = createTestEditor({ extension })
const n = editor.nodes
const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
editor.set(doc) // "Hello" is selected.
```

<a id="setContent" name="setContent"></a>

#### setContent()

> **setContent**(`content`, `selection`?): `void`

Update the editor's document and selection.

##### Parameters

• **content**: `string` \| [`Node`](https://prosemirror.net/docs/ref/#model.Node) \| [`NodeJSON`](../core.md#NodeJSON) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The new document to set. It can be one of the following:
  - A ProseMirror node instance
  - A ProseMirror node JSON object
  - An HTML string
  - An HTML element instance

• **selection?**: [`Selection`](https://prosemirror.net/docs/ref/#state.Selection) \| `"start"` \| [`SelectionJSON`](../core.md#SelectionJSON) \| `"end"`

Optional. Specifies the new selection. It can be one of the following:
  - A ProseMirror selection instance
  - A ProseMirror selection JSON object
  - The string "start" (to set selection at the beginning, default value)
  - The string "end" (to set selection at the end)

##### Returns

`void`

##### Inherited from

[`Editor`](../core.md#EditorE).[`setContent`](../core.md#setContent)

<a id="unmount" name="unmount"></a>

#### unmount()

> **unmount**(): `void`

Unmount the editor. This is equivalent to `mount(null)`.

##### Returns

`void`

##### Inherited from

[`Editor`](../core.md#EditorE).[`unmount`](../core.md#unmount)

<a id="updateState" name="updateState"></a>

#### updateState()

> **updateState**(`state`): `void`

Update the editor's state.

##### Parameters

• **state**: [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

##### Returns

`void`

##### Remarks

This is an advanced method. Use it only if you have a specific reason to
directly manipulate the editor's state.

##### Inherited from

[`Editor`](../core.md#EditorE).[`updateState`](../core.md#updateState)

<a id="use" name="use"></a>

#### use()

> **use**(`extension`): `VoidFunction`

Register an extension to the editor. Return a function to unregister the
extension.

##### Parameters

• **extension**: [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

##### Returns

`VoidFunction`

##### Inherited from

[`Editor`](../core.md#EditorE).[`use`](../core.md#use)

***

<a id="createTestEditor" name="createTestEditor"></a>

## createTestEditor()

> **createTestEditor**\<`E`\>(`options`): [`TestEditor`](test.md#TestEditorE)\<`E`\>

### Type Parameters

• **E** *extends* [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

### Parameters

• **options**: [`EditorOptions`](../core.md#EditorOptionsE)\<`E`\>

### Returns

[`TestEditor`](test.md#TestEditorE)\<`E`\>
