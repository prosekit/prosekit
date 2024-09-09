# prosekit/core

<a id="Priority" name="Priority"></a>

## Priority

ProseKit extension priority.

### Enumeration Members

| Enumeration Member | Value |
| ------ | ------ |
| <a id="default" name="default"></a> `default` | `2` |
| <a id="high" name="high"></a> `high` | `3` |
| <a id="highest" name="highest"></a> `highest` | `4` |
| <a id="low" name="low"></a> `low` | `1` |
| <a id="lowest" name="lowest"></a> `lowest` | `0` |

***

<a id="EditorE" name="EditorE"></a>

## Editor\<E\>

### Extended by

- [`TestEditor`](core/test.md#TestEditorE)

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT) = `any`

### Accessors

<a id="commands" name="commands"></a>

#### commands

> `get` **commands**(): `ToCommandAction`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Commands"\] extends undefined ? never : ExtractTyping\<E\>\["Commands"\]\>\[KeyType\] \}\>

All [CommandAction](core.md#CommandActionArgs)s defined by the editor.

##### Returns

`ToCommandAction`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Commands"\] extends undefined ? never : ExtractTyping\<E\>\["Commands"\]\>\[KeyType\] \}\>

<a id="focused" name="focused"></a>

#### focused

> `get` **focused**(): `boolean`

Whether the editor is focused.

##### Returns

`boolean`

<a id="marks" name="marks"></a>

#### marks

> `get` **marks**(): `ToMarkAction`\<`SimplifyDeeper`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Marks"\] extends undefined ? never : ExtractTyping\<E\>\["Marks"\]\>\[KeyType\] \}\>\>

All [MarkAction](core.md#MarkActionAttrs)s defined by the editor.

##### Returns

`ToMarkAction`\<`SimplifyDeeper`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Marks"\] extends undefined ? never : ExtractTyping\<E\>\["Marks"\]\>\[KeyType\] \}\>\>

<a id="mounted" name="mounted"></a>

#### mounted

> `get` **mounted**(): `boolean`

Whether the editor is mounted.

##### Returns

`boolean`

<a id="nodes" name="nodes"></a>

#### nodes

> `get` **nodes**(): `ToNodeAction`\<`SimplifyDeeper`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Nodes"\] extends undefined ? never : ExtractTyping\<E\>\["Nodes"\]\>\[KeyType\] \}\>\>

All [NodeAction](core.md#NodeActionAttrs)s defined by the editor.

##### Returns

`ToNodeAction`\<`SimplifyDeeper`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Nodes"\] extends undefined ? never : ExtractTyping\<E\>\["Nodes"\]\>\[KeyType\] \}\>\>

<a id="schema" name="schema"></a>

#### schema

> `get` **schema**(): [`Schema`](https://prosemirror.net/docs/ref/#model.Schema)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\>

The editor schema.

##### Returns

[`Schema`](https://prosemirror.net/docs/ref/#model.Schema)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\>

<a id="state" name="state"></a>

#### state

> `get` **state**(): [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

The editor's current state.

##### Returns

[`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

<a id="view" name="view"></a>

#### view

> `get` **view**(): [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

The editor view.

##### Returns

[`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

### Methods

<a id="blur" name="blur"></a>

#### blur()

> **blur**(): `void`

Blur the editor.

##### Returns

`void`

<a id="canExec" name="canExec"></a>

#### canExec()

> **canExec**(`command`): `boolean`

Check if the given command can be executed. Return `true` if the command
can be executed, otherwise `false`.

##### Parameters

• **command**: [`Command`](https://prosemirror.net/docs/ref/#state.Command)

##### Returns

`boolean`

<a id="exec" name="exec"></a>

#### exec()

> **exec**(`command`): `boolean`

Execute the given command. Return `true` if the command was successfully
executed, otherwise `false`.

##### Parameters

• **command**: [`Command`](https://prosemirror.net/docs/ref/#state.Command)

##### Returns

`boolean`

<a id="focus" name="focus"></a>

#### focus()

> **focus**(): `void`

Focus the editor.

##### Returns

`void`

<a id="mount" name="mount"></a>

#### mount()

> **mount**(`place`): `void`

Mount the editor to the given HTML element.
Pass `null` or `undefined` to unmount the editor.

##### Parameters

• **place**: `undefined` \| `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

##### Returns

`void`

<a id="setContent" name="setContent"></a>

#### setContent()

> **setContent**(`content`, `selection`?): `void`

Update the editor's document and selection.

##### Parameters

• **content**: `string` \| [`Node`](https://prosemirror.net/docs/ref/#model.Node) \| [`NodeJSON`](core.md#NodeJSON) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The new document to set. It can be one of the following:
  - A ProseMirror node instance
  - A ProseMirror node JSON object
  - An HTML string
  - An HTML element instance

• **selection?**: [`Selection`](https://prosemirror.net/docs/ref/#state.Selection) \| `"start"` \| [`SelectionJSON`](core.md#SelectionJSON) \| `"end"`

Optional. Specifies the new selection. It can be one of the following:
  - A ProseMirror selection instance
  - A ProseMirror selection JSON object
  - The string "start" (to set selection at the beginning, default value)
  - The string "end" (to set selection at the end)

##### Returns

`void`

<a id="unmount" name="unmount"></a>

#### unmount()

> **unmount**(): `void`

Unmount the editor. This is equivalent to `mount(null)`.

##### Returns

`void`

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

<a id="use" name="use"></a>

#### use()

> **use**(`extension`): `VoidFunction`

Register an extension to the editor. Return a function to unregister the
extension.

##### Parameters

• **extension**: [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

##### Returns

`VoidFunction`

***

<a id="AddMarkOptions" name="AddMarkOptions"></a>

## AddMarkOptions

### Properties

<a id="attrs" name="attrs"></a>

#### attrs?

> `optional` **attrs**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

The attributes of the mark to add.

<a id="from" name="from"></a>

#### from?

> `optional` **from**: `number`

The start position of the document. By default it will be the start position of current selection.

<a id="to" name="to"></a>

#### to?

> `optional` **to**: `number`

The end position of the document. By default it will be the end position of current selection.

<a id="type" name="type"></a>

#### type

> **type**: `string` \| [`MarkType`](https://prosemirror.net/docs/ref/#model.MarkType)

The type of the mark to add.

***

<a id="BaseNodeViewOptions" name="BaseNodeViewOptions"></a>

## BaseNodeViewOptions

Some basic props for custom node views.

### Extended by

- [`ReactNodeViewOptions`](react.md#ReactNodeViewOptions)
- [`SvelteNodeViewOptions`](svelte.md#SvelteNodeViewOptions)
- [`VueNodeViewOptions`](vue.md#VueNodeViewOptions)

### Properties

<a id="as" name="as"></a>

#### as?

> `optional` **as**: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| (`node`) => [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The wrapping DOM element for the node view. Defaults to `div` for block nodes and `span` for inline nodes.

<a id="contentAs" name="contentAs"></a>

#### contentAs?

> `optional` **contentAs**: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| (`node`) => [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The wrapping DOM element for the node view's content. Defaults to `div` for block nodes and `span` for inline nodes.

<a id="deselectNode" name="deselectNode"></a>

#### deselectNode()?

> `optional` **deselectNode**: () => `void`

##### Returns

`void`

<a id="destroy" name="destroy"></a>

#### destroy()?

> `optional` **destroy**: () => `void`

##### Returns

`void`

<a id="ignoreMutation" name="ignoreMutation"></a>

#### ignoreMutation()?

> `optional` **ignoreMutation**: (`mutation`) => `boolean`

##### Parameters

• **mutation**: [`MutationRecord`](https://developer.mozilla.org/docs/Web/API/MutationRecord)

##### Returns

`boolean`

<a id="onUpdate" name="onUpdate"></a>

#### onUpdate()?

> `optional` **onUpdate**: () => `void`

##### Returns

`void`

<a id="selectNode" name="selectNode"></a>

#### selectNode()?

> `optional` **selectNode**: () => `void`

##### Returns

`void`

<a id="setSelection" name="setSelection"></a>

#### setSelection()?

> `optional` **setSelection**: (`anchor`, `head`, `root`) => `void`

##### Parameters

• **anchor**: `number`

• **head**: `number`

• **root**: [`Document`](https://developer.mozilla.org/docs/Web/API/Document) \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)

##### Returns

`void`

<a id="stopEvent" name="stopEvent"></a>

#### stopEvent()?

> `optional` **stopEvent**: (`event`) => `boolean`

##### Parameters

• **event**: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)

##### Returns

`boolean`

<a id="update" name="update"></a>

#### update()?

> `optional` **update**: (`node`, `decorations`, `innerDecorations`) => `boolean`

##### Parameters

• **node**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

• **decorations**: readonly [`Decoration`](https://prosemirror.net/docs/ref/#view.Decoration)[]

• **innerDecorations**: [`DecorationSource`](https://prosemirror.net/docs/ref/#view.DecorationSource)

##### Returns

`boolean`

***

<a id="CommandActionArgs" name="CommandActionArgs"></a>

## CommandAction()\<Args\>

A function to apply a command to the editor. It will return `true` if the command was applied, and `false` otherwise.

It also has a `canExec` method to check if the command can be applied.

### Type Parameters

• **Args** *extends* `any`[] = `any`[]

> **CommandAction**(...`args`): `boolean`

A function to apply a command to the editor. It will return `true` if the command was applied, and `false` otherwise.

It also has a `canExec` method to check if the command can be applied.

### Parameters

• ...**args**: `Args`

### Returns

`boolean`

### Methods

<a id="canApply" name="canApply"></a>

#### ~~canApply()~~

> **canApply**(...`args`): `boolean`

An alias for `canExec`.

##### Parameters

• ...**args**: `Args`

##### Returns

`boolean`

##### Deprecated

Use `canExec` instead.

<a id="canExec-1" name="canExec-1"></a>

#### canExec()

> **canExec**(...`args`): `boolean`

Check if the current command can be executed. Return `true` if the command
can be executed, otherwise `false`.

##### Parameters

• ...**args**: `Args`

##### Returns

`boolean`

***

<a id="DOMDocumentOptions" name="DOMDocumentOptions"></a>

## DOMDocumentOptions

### Properties

<a id="document" name="document"></a>

#### document?

> `optional` **document**: [`Document`](https://developer.mozilla.org/docs/Web/API/Document)

***

<a id="DOMParserOptions" name="DOMParserOptions"></a>

## DOMParserOptions

### Extends

- [`ParseOptions`](https://prosemirror.net/docs/ref/#model.ParseOptions)

### Properties

<a id="DOMParser" name="DOMParser"></a>

#### DOMParser?

> `optional` **DOMParser**: *typeof* [`DOMParser`](https://prosemirror.net/docs/ref/#model.DOMParser)

***

<a id="DOMSerializerOptions" name="DOMSerializerOptions"></a>

## DOMSerializerOptions

### Properties

<a id="DOMSerializer" name="DOMSerializer"></a>

#### DOMSerializer?

> `optional` **DOMSerializer**: *typeof* [`DOMSerializer`](https://prosemirror.net/docs/ref/#model.DOMSerializer)

***

<a id="DefaultStateOptions" name="DefaultStateOptions"></a>

## DefaultStateOptions

### Properties

<a id="defaultContent" name="defaultContent"></a>

#### defaultContent?

> `optional` **defaultContent**: `string` \| [`NodeJSON`](core.md#NodeJSON) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

<a id="defaultDoc" name="defaultDoc"></a>

#### ~~defaultDoc?~~

> `optional` **defaultDoc**: [`NodeJSON`](core.md#NodeJSON)

A JSON object representing the starting document to use when creating the
editor.

##### Deprecated

Use `defaultContent` instead.

<a id="defaultHTML" name="defaultHTML"></a>

#### ~~defaultHTML?~~

> `optional` **defaultHTML**: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

A HTML element or a HTML string representing the starting document to use
when creating the editor.

##### Deprecated

Use `defaultContent` instead.

<a id="defaultSelection" name="defaultSelection"></a>

#### defaultSelection?

> `optional` **defaultSelection**: [`SelectionJSON`](core.md#SelectionJSON)

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

***

<a id="EditorOptionsE" name="EditorOptionsE"></a>

## EditorOptions\<E\>

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

### Properties

<a id="defaultContent-1" name="defaultContent-1"></a>

#### defaultContent?

> `optional` **defaultContent**: `string` \| [`NodeJSON`](core.md#NodeJSON) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

<a id="defaultDoc-1" name="defaultDoc-1"></a>

#### ~~defaultDoc?~~

> `optional` **defaultDoc**: [`NodeJSON`](core.md#NodeJSON)

A JSON object representing the starting document to use when creating the
editor.

##### Deprecated

Use `defaultContent` instead.

<a id="defaultHTML-1" name="defaultHTML-1"></a>

#### ~~defaultHTML?~~

> `optional` **defaultHTML**: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

A HTML element or a HTML string representing the starting document to use
when creating the editor.

##### Deprecated

Use `defaultContent` instead.

<a id="defaultSelection-1" name="defaultSelection-1"></a>

#### defaultSelection?

> `optional` **defaultSelection**: [`SelectionJSON`](core.md#SelectionJSON)

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

<a id="extension" name="extension"></a>

#### extension

> **extension**: `E`

The extension to use when creating the editor.

***

<a id="ExpandMarkOptions" name="ExpandMarkOptions"></a>

## ExpandMarkOptions

### Properties

<a id="type-1" name="type-1"></a>

#### type

> **type**: `string` \| [`MarkType`](https://prosemirror.net/docs/ref/#model.MarkType)

The type of the mark to expand.

***

<a id="ExtensionT" name="ExtensionT"></a>

## Extension\<T\>

### Type Parameters

• **T** *extends* `ExtensionTyping`\<`any`, `any`, `any`\> = `ExtensionTyping`\<`any`, `any`, `any`\>

### Properties

<a id="_type" name="_type"></a>

#### \_type?

> `optional` **\_type**: `T`

<a id="extension-1" name="extension-1"></a>

#### extension

> **extension**: [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\> \| [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>[]

<a id="priority" name="priority"></a>

#### priority?

> `optional` **priority**: [`Priority`](core.md#Priority)

<a id="schema-1" name="schema-1"></a>

#### schema

> **schema**: `null` \| [`Schema`](https://prosemirror.net/docs/ref/#model.Schema)\<`any`, `any`\>

The schema that this extension represents.

***

<a id="FindParentNodeResult" name="FindParentNodeResult"></a>

## FindParentNodeResult

### Properties

<a id="depth" name="depth"></a>

#### depth

> **depth**: `number`

The depth of the node.

<a id="node" name="node"></a>

#### node

> **node**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

The closest parent node that satisfies the predicate.

<a id="pos" name="pos"></a>

#### pos

> **pos**: `number`

The position directly before the node.

<a id="start" name="start"></a>

#### start

> **start**: `number`

The position at the start of the node.

***

<a id="HistoryOptions" name="HistoryOptions"></a>

## HistoryOptions

Options for [defineHistory](core.md#defineHistory).

### Properties

<a id="depth-1" name="depth-1"></a>

#### depth?

> `optional` **depth**: `number`

The amount of history events that are collected before the oldest events
are discarded.

##### Default

```ts
200
```

<a id="newGroupDelay" name="newGroupDelay"></a>

#### newGroupDelay?

> `optional` **newGroupDelay**: `number`

The delay in milliseconds between changes after which a new group should be
started.

##### Default

```ts
250
```

***

<a id="InsertDefaultBlockOptions" name="InsertDefaultBlockOptions"></a>

## InsertDefaultBlockOptions

### Properties

<a id="pos-1" name="pos-1"></a>

#### pos?

> `optional` **pos**: `number`

The position to insert the node at. By default it will insert after the
current selection.

***

<a id="InsertNodeOptions" name="InsertNodeOptions"></a>

## InsertNodeOptions

### Properties

<a id="attrs-1" name="attrs-1"></a>

#### attrs?

> `optional` **attrs**: [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

When `type` is provided, the attributes of the node to insert.

<a id="node-1" name="node-1"></a>

#### node?

> `optional` **node**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

The node to insert. Either this or `type` must be provided.

<a id="pos-2" name="pos-2"></a>

#### pos?

> `optional` **pos**: `number`

The position to insert the node at. By default it will be the anchor
position of current selection.

<a id="type-2" name="type-2"></a>

#### type?

> `optional` **type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

The type of the node to insert. Either this or `node` must be provided.

***

<a id="JSONParserOptions" name="JSONParserOptions"></a>

## JSONParserOptions

### Properties

<a id="schema-2" name="schema-2"></a>

#### schema

> **schema**: [`Schema`](https://prosemirror.net/docs/ref/#model.Schema)\<`any`, `any`\>

***

<a id="Keymap" name="Keymap"></a>

## Keymap

### Indexable

 \[`key`: `string`\]: [`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="MarkActionAttrs" name="MarkActionAttrs"></a>

## MarkAction()\<Attrs\>

A function for creating a mark with optional attributes and any number of
children.

It also has a `isActive` method for checking if the mark is active in the
current editor selection.

### Type Parameters

• **Attrs** *extends* [`AnyAttrs`](core.md#AnyAttrs) = [`AnyAttrs`](core.md#AnyAttrs)

> **MarkAction**(`attrs`, ...`children`): [`Node`](https://prosemirror.net/docs/ref/#model.Node)[]

A function for creating a mark with optional attributes and any number of
children.

It also has a `isActive` method for checking if the mark is active in the
current editor selection.

### Parameters

• **attrs**: `null` \| `Attrs`

• ...**children**: [`NodeChild`](core.md#NodeChild)[]

### Returns

[`Node`](https://prosemirror.net/docs/ref/#model.Node)[]

> **MarkAction**(...`children`): [`Node`](https://prosemirror.net/docs/ref/#model.Node)[]

A function for creating a mark with optional attributes and any number of
children.

It also has a `isActive` method for checking if the mark is active in the
current editor selection.

### Parameters

• ...**children**: [`NodeChild`](core.md#NodeChild)[]

### Returns

[`Node`](https://prosemirror.net/docs/ref/#model.Node)[]

### Properties

<a id="isActive" name="isActive"></a>

#### isActive()

> **isActive**: (`attrs`?) => `boolean`

Checks if the mark is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the mark is active
with the given attributes.

##### Parameters

• **attrs?**: `Attrs`

##### Returns

`boolean`

***

<a id="MarkAttrOptionsMarkName-AttrName-AttrType" name="MarkAttrOptionsMarkName-AttrName-AttrType"></a>

## MarkAttrOptions\<MarkName, AttrName, AttrType\>

### Extends

- [`AttrSpec`](core.md#AttrSpecAttrType)\<`AttrType`\>

### Type Parameters

• **MarkName** *extends* `string` = `string`

• **AttrName** *extends* `string` = `string`

• **AttrType** = `any`

### Properties

<a id="attr" name="attr"></a>

#### attr

> **attr**: `AttrName`

The name of the attribute.

<a id="default-1" name="default-1"></a>

#### default?

> `optional` **default**: `AttrType`

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

##### Inherited from

`AttrSpec.default`

<a id="parseDOM" name="parseDOM"></a>

#### parseDOM()?

> `optional` **parseDOM**: (`node`) => `AttrType`

Parses the attribute value from the DOM.

##### Parameters

• **node**: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

##### Returns

`AttrType`

<a id="toDOM" name="toDOM"></a>

#### toDOM()?

> `optional` **toDOM**: (`value`) => `undefined` \| `null` \| [`string`, `string`]

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

##### Parameters

• **value**: `AttrType`

The value of the attribute of current ProseMirror node.

##### Returns

`undefined` \| `null` \| [`string`, `string`]

<a id="type-3" name="type-3"></a>

#### type

> **type**: `MarkName`

The name of the mark type.

<a id="validate" name="validate"></a>

#### validate?

> `optional` **validate**: `string` \| (`value`) => `void`

A function or type name used to validate values of this attribute. This
will be used when deserializing the attribute from JSON, and when running
[`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check). When a
function, it should raise an exception if the value isn't of the expected
type or shape. When a string, it should be a `|`-separated string of
primitive types (`"number"`, `"string"`, `"boolean"`, `"null"`, and
`"undefined"`), and the library will raise an error when the value is not
one of those types.

##### Inherited from

`AttrSpec.validate`

***

<a id="MarkSpecOptionsMarkName-Attrs" name="MarkSpecOptionsMarkName-Attrs"></a>

## MarkSpecOptions\<MarkName, Attrs\>

### Extends

- [`MarkSpec`](https://prosemirror.net/docs/ref/#model.MarkSpec)

### Type Parameters

• **MarkName** *extends* `string` = `string`

• **Attrs** *extends* [`AnyAttrs`](core.md#AnyAttrs) = [`AnyAttrs`](core.md#AnyAttrs)

### Properties

<a id="attrs-2" name="attrs-2"></a>

#### attrs?

> `optional` **attrs**: \{ \[K in string \| number \| symbol\]: AttrSpec\<Attrs\[K\]\> \}

The attributes that marks of this type get.

##### Overrides

`MarkSpec.attrs`

<a id="name" name="name"></a>

#### name

> **name**: `MarkName`

The name of the mark type.

***

<a id="NodeActionAttrs" name="NodeActionAttrs"></a>

## NodeAction()\<Attrs\>

A function for creating a node with optional attributes and any number of
children.

It also has a `isActive` method for checking if the node is active in the
current editor selection.

### Type Parameters

• **Attrs** *extends* [`AnyAttrs`](core.md#AnyAttrs) = [`AnyAttrs`](core.md#AnyAttrs)

> **NodeAction**(`attrs`, ...`children`): [`Node`](https://prosemirror.net/docs/ref/#model.Node)

A function for creating a node with optional attributes and any number of
children.

It also has a `isActive` method for checking if the node is active in the
current editor selection.

### Parameters

• **attrs**: `null` \| `Attrs`

• ...**children**: [`NodeChild`](core.md#NodeChild)[]

### Returns

[`Node`](https://prosemirror.net/docs/ref/#model.Node)

> **NodeAction**(...`children`): [`Node`](https://prosemirror.net/docs/ref/#model.Node)

A function for creating a node with optional attributes and any number of
children.

It also has a `isActive` method for checking if the node is active in the
current editor selection.

### Parameters

• ...**children**: [`NodeChild`](core.md#NodeChild)[]

### Returns

[`Node`](https://prosemirror.net/docs/ref/#model.Node)

### Properties

<a id="isActive-1" name="isActive-1"></a>

#### isActive()

> **isActive**: (`attrs`?) => `boolean`

Checks if the node is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the node is active
with the given attributes.

##### Parameters

• **attrs?**: `Attrs`

##### Returns

`boolean`

***

<a id="NodeAttrOptionsNodeName-AttrName-AttrType" name="NodeAttrOptionsNodeName-AttrName-AttrType"></a>

## NodeAttrOptions\<NodeName, AttrName, AttrType\>

### Extends

- [`AttrSpec`](core.md#AttrSpecAttrType)\<`AttrType`\>

### Type Parameters

• **NodeName** *extends* `string` = `string`

• **AttrName** *extends* `string` = `string`

• **AttrType** = `any`

### Properties

<a id="attr-1" name="attr-1"></a>

#### attr

> **attr**: `AttrName`

The name of the attribute.

<a id="default-2" name="default-2"></a>

#### default?

> `optional` **default**: `AttrType`

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

##### Inherited from

`AttrSpec.default`

<a id="parseDOM-1" name="parseDOM-1"></a>

#### parseDOM()?

> `optional` **parseDOM**: (`node`) => `AttrType`

Parses the attribute value from the DOM.

##### Parameters

• **node**: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

##### Returns

`AttrType`

<a id="splittable" name="splittable"></a>

#### splittable?

> `optional` **splittable**: `boolean`

Whether the attribute should be kept when the node is split. Set it to
`true` if you want to inherit the attribute from the previous node when
splitting the node by pressing `Enter`.

##### Default

```ts
undefined
```

<a id="toDOM-1" name="toDOM-1"></a>

#### toDOM()?

> `optional` **toDOM**: (`value`) => `undefined` \| `null` \| [`string`, `string`]

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

##### Parameters

• **value**: `AttrType`

The value of the attribute of current ProseMirror node.

##### Returns

`undefined` \| `null` \| [`string`, `string`]

<a id="type-4" name="type-4"></a>

#### type

> **type**: `NodeName`

The name of the node type.

<a id="validate-1" name="validate-1"></a>

#### validate?

> `optional` **validate**: `string` \| (`value`) => `void`

A function or type name used to validate values of this attribute. This
will be used when deserializing the attribute from JSON, and when running
[`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check). When a
function, it should raise an exception if the value isn't of the expected
type or shape. When a string, it should be a `|`-separated string of
primitive types (`"number"`, `"string"`, `"boolean"`, `"null"`, and
`"undefined"`), and the library will raise an error when the value is not
one of those types.

##### Inherited from

`AttrSpec.validate`

***

<a id="NodeJSON" name="NodeJSON"></a>

## NodeJSON

A JSON representation of the prosemirror node.

### Properties

<a id="attrs-3" name="attrs-3"></a>

#### attrs?

> `optional` **attrs**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `any`\>

<a id="content" name="content"></a>

#### content?

> `optional` **content**: [`NodeJSON`](core.md#NodeJSON)[]

<a id="marks-1" name="marks-1"></a>

#### marks?

> `optional` **marks**: `object`[]

<a id="text" name="text"></a>

#### text?

> `optional` **text**: `string`

<a id="type-5" name="type-5"></a>

#### type

> **type**: `string`

***

<a id="NodeSpecOptionsNodeName-Attrs" name="NodeSpecOptionsNodeName-Attrs"></a>

## NodeSpecOptions\<NodeName, Attrs\>

### Extends

- [`NodeSpec`](https://prosemirror.net/docs/ref/#model.NodeSpec)

### Type Parameters

• **NodeName** *extends* `string` = `string`

• **Attrs** *extends* [`AnyAttrs`](core.md#AnyAttrs) = [`AnyAttrs`](core.md#AnyAttrs)

### Properties

<a id="attrs-4" name="attrs-4"></a>

#### attrs?

> `optional` **attrs**: \{ \[key in string \| number \| symbol\]: AttrSpec\<Attrs\[key\]\> \}

The attributes that nodes of this type get.

##### Overrides

`NodeSpec.attrs`

<a id="name-1" name="name-1"></a>

#### name

> **name**: `NodeName`

The name of the node type.

<a id="topNode" name="topNode"></a>

#### topNode?

> `optional` **topNode**: `boolean`

Whether this is the top-level node type. Only one node type can be the
top-level node type in a schema.

***

<a id="NodeViewOptions" name="NodeViewOptions"></a>

## NodeViewOptions

### Properties

<a id="constructor" name="constructor"></a>

#### constructor

> **constructor**: [`NodeViewConstructor`](https://prosemirror.net/docs/ref/#view.NodeViewConstructor)

<a id="name-2" name="name-2"></a>

#### name

> **name**: `string`

***

<a id="RemoveMarkOptions" name="RemoveMarkOptions"></a>

## RemoveMarkOptions

### Properties

<a id="attrs-5" name="attrs-5"></a>

#### attrs?

> `optional` **attrs**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

If attrs is given, remove precisely the mark with the given attrs. Otherwise, remove all marks of the given type.

<a id="from-1" name="from-1"></a>

#### from?

> `optional` **from**: `number`

The start position of the document. By default it will be the start position of current selection.

<a id="to-1" name="to-1"></a>

#### to?

> `optional` **to**: `number`

The end position of the document. By default it will be the end position of current selection.

<a id="type-6" name="type-6"></a>

#### type

> **type**: `string` \| [`MarkType`](https://prosemirror.net/docs/ref/#model.MarkType)

The type of the mark to remove.

***

<a id="RemoveNodeOptions" name="RemoveNodeOptions"></a>

## RemoveNodeOptions

### Properties

<a id="pos-3" name="pos-3"></a>

#### pos?

> `optional` **pos**: `number`

The document position to start searching node. By default it will be the
anchor position of current selection.

<a id="type-7" name="type-7"></a>

#### type

> **type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

The type of the node to remove.

***

<a id="SelectionJSON" name="SelectionJSON"></a>

## SelectionJSON

A JSON representation of the prosemirror selection.

### Properties

<a id="anchor" name="anchor"></a>

#### anchor

> **anchor**: `number`

<a id="head" name="head"></a>

#### head

> **head**: `number`

<a id="type-8" name="type-8"></a>

#### type

> **type**: `string`

***

<a id="SetBlockTypeOptions" name="SetBlockTypeOptions"></a>

## SetBlockTypeOptions

### Properties

<a id="attrs-6" name="attrs-6"></a>

#### attrs?

> `optional` **attrs**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

<a id="from-2" name="from-2"></a>

#### from?

> `optional` **from**: `number`

<a id="to-2" name="to-2"></a>

#### to?

> `optional` **to**: `number`

<a id="type-9" name="type-9"></a>

#### type

> **type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

***

<a id="SetNodeAttrsOptions" name="SetNodeAttrsOptions"></a>

## SetNodeAttrsOptions

### Properties

<a id="attrs-7" name="attrs-7"></a>

#### attrs

> **attrs**: [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

The attributes to set.

<a id="pos-4" name="pos-4"></a>

#### pos?

> `optional` **pos**: `number`

The position of the node. Defaults to the position of the wrapping node
containing the current selection.

<a id="type-10" name="type-10"></a>

#### type

> **type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType) \| `string`[] \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)[]

The type of node to set the attributes of.

If current node is not of this type, the command will do nothing.

***

<a id="StateJSON" name="StateJSON"></a>

## StateJSON

A JSON representation of the prosemirror state.

### Properties

<a id="doc" name="doc"></a>

#### doc

> **doc**: [`NodeJSON`](core.md#NodeJSON)

The main `ProseMirror` doc.

<a id="selection" name="selection"></a>

#### selection

> **selection**: [`SelectionJSON`](core.md#SelectionJSON)

The current selection.

***

<a id="StepJSON" name="StepJSON"></a>

## StepJSON

A JSON representation of the prosemirror step.

### Indexable

 \[`x`: `string`\]: `unknown`

### Properties

<a id="stepType" name="stepType"></a>

#### stepType

> **stepType**: `string`

The type of the step.

***

<a id="ToggleMarkOptions" name="ToggleMarkOptions"></a>

## ToggleMarkOptions

### Properties

<a id="attrs-8" name="attrs-8"></a>

#### attrs?

> `optional` **attrs**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

The optional attributes to set on the mark.

<a id="enterInlineAtoms" name="enterInlineAtoms"></a>

#### enterInlineAtoms?

> `optional` **enterInlineAtoms**: `boolean`

Whether the command should act on the content of inline nodes marked as
[atoms](https://prosemirror.net/docs/ref/#model.NodeSpec.atom) that are
completely covered by a selection range.

##### Default

```ts
true
```

<a id="removeWhenPresent" name="removeWhenPresent"></a>

#### removeWhenPresent?

> `optional` **removeWhenPresent**: `boolean`

Controls whether, when part of the selected range has the mark
already and part doesn't, the mark is removed (`true`) or added
(`false`).

##### Default

```ts
false
```

<a id="type-11" name="type-11"></a>

#### type

> **type**: `string` \| [`MarkType`](https://prosemirror.net/docs/ref/#model.MarkType)

The mark type to toggle.

***

<a id="ToggleNodeOptions" name="ToggleNodeOptions"></a>

## ToggleNodeOptions

### Properties

<a id="attrs-9" name="attrs-9"></a>

#### attrs?

> `optional` **attrs**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

The attributes of the node to toggle.

<a id="type-12" name="type-12"></a>

#### type

> **type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

The type of the node to toggle.

***

<a id="ToggleWrapOptions" name="ToggleWrapOptions"></a>

## ToggleWrapOptions

### Properties

<a id="attrs-10" name="attrs-10"></a>

#### attrs?

> `optional` **attrs**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

The attributes of the node to toggle.

<a id="type-13" name="type-13"></a>

#### type

> **type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

The type of the node to toggle.

***

<a id="UnsetBlockTypeOptions" name="UnsetBlockTypeOptions"></a>

## UnsetBlockTypeOptions

### Properties

<a id="from-3" name="from-3"></a>

#### from?

> `optional` **from**: `number`

The start position of the document. By default it will be the start position of current selection.

<a id="to-3" name="to-3"></a>

#### to?

> `optional` **to**: `number`

The end position of the document. By default it will be the end position of current selection.

***

<a id="UnsetMarkOptions" name="UnsetMarkOptions"></a>

## UnsetMarkOptions

### Properties

<a id="from-4" name="from-4"></a>

#### from?

> `optional` **from**: `number`

The start position of the document. By default it will be the start position of current selection.

<a id="to-4" name="to-4"></a>

#### to?

> `optional` **to**: `number`

The end position of the document. By default it will be the end position of current selection.

***

<a id="WrapOptions" name="WrapOptions"></a>

## WrapOptions

### Properties

<a id="attrs-11" name="attrs-11"></a>

#### attrs?

> `optional` **attrs**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

Optional attributes to apply to the node.

<a id="nodeType" name="nodeType"></a>

#### ~~nodeType?~~

> `optional` **nodeType**: [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

##### Deprecated

Use `nodeSpec` instead.

<a id="type-14" name="type-14"></a>

#### type

> **type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

The node type to wrap the selected textblock with.

***

<a id="AnyAttrs" name="AnyAttrs"></a>

## AnyAttrs

> **AnyAttrs**: [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

An object holding the attributes of a node.

***

<a id="AttrSpecAttrType" name="AttrSpecAttrType"></a>

## AttrSpec\<AttrType\>

> **AttrSpec**\<`AttrType`\>: `object`

### Type Parameters

• **AttrType** = `any`

### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `default` | `AttrType` | The default value for this attribute, to use when no explicit value is provided. Attributes that have no default must be provided whenever a node or mark of a type that has them is created. |
| `validate` | `string` \| (`value`) => `void` | A function or type name used to validate values of this attribute. This will be used when deserializing the attribute from JSON, and when running [`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check). When a function, it should raise an exception if the value isn't of the expected type or shape. When a string, it should be a `|`-separated string of primitive types (`"number"`, `"string"`, `"boolean"`, `"null"`, and `"undefined"`), and the library will raise an error when the value is not one of those types. |

***

<a id="ClickHandler" name="ClickHandler"></a>

## ClickHandler()

> **ClickHandler**: (`view`, `pos`, `event`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **pos**: `number`

• **event**: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

### Returns

`boolean` \| `void`

***

<a id="ClickOnHandler" name="ClickOnHandler"></a>

## ClickOnHandler()

> **ClickOnHandler**: (`view`, `pos`, `node`, `nodePos`, `event`, `direct`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **pos**: `number`

• **node**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

• **nodePos**: `number`

• **event**: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

• **direct**: `boolean`

### Returns

`boolean` \| `void`

***

<a id="DOMEventHandlerEvent" name="DOMEventHandlerEvent"></a>

## DOMEventHandler()\<Event\>

> **DOMEventHandler**\<`Event`\>: (`view`, `event`) => `boolean` \| `void`

A function to handle the events fired on the editable DOM element. Returns
`true` to indicate that it handled the given event. you are responsible for
calling `preventDefault` yourself (or not, if you want to allow the default
behavior).

### Type Parameters

• **Event** *extends* keyof [`DOMEventMap`](https://prosemirror.net/docs/ref/#view.DOMEventMap) = `string`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **event**: [`DOMEventMap`](https://prosemirror.net/docs/ref/#view.DOMEventMap)\[`Event`\]

### Returns

`boolean` \| `void`

***

<a id="DocChangeHandler" name="DocChangeHandler"></a>

## DocChangeHandler()

> **DocChangeHandler**: (`view`, `prevState`) => `void`

A function that is called when the editor document is changed.

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

The editor view.

• **prevState**: [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

The previous editor state.

### Returns

`void`

***

<a id="DoubleClickHandler" name="DoubleClickHandler"></a>

## DoubleClickHandler()

> **DoubleClickHandler**: (`view`, `pos`, `event`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **pos**: `number`

• **event**: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

### Returns

`boolean` \| `void`

***

<a id="DoubleClickOnHandler" name="DoubleClickOnHandler"></a>

## DoubleClickOnHandler()

> **DoubleClickOnHandler**: (`view`, `pos`, `node`, `nodePos`, `event`, `direct`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **pos**: `number`

• **node**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

• **nodePos**: `number`

• **event**: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

• **direct**: `boolean`

### Returns

`boolean` \| `void`

***

<a id="DropHandler" name="DropHandler"></a>

## DropHandler()

> **DropHandler**: (`view`, `event`, `slice`, `moved`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **event**: [`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)

• **slice**: [`Slice`](https://prosemirror.net/docs/ref/#model.Slice)

• **moved**: `boolean`

### Returns

`boolean` \| `void`

***

<a id="ExtractCommandActionsE" name="ExtractCommandActionsE"></a>

## ExtractCommandActions\<E\>

> **ExtractCommandActions**\<`E`\>: `ToCommandAction`\<`ExtractCommands`\<`E`\>\>

Extracts the [CommandAction](core.md#CommandActionArgs)s from an extension type.

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

***

<a id="ExtractCommandAppliersE" name="ExtractCommandAppliersE"></a>

## ~~ExtractCommandAppliers\<E\>~~

> **ExtractCommandAppliers**\<`E`\>: [`ExtractCommandActions`](core.md#ExtractCommandActionsE)\<`E`\>

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

### Deprecated

Use `ExtractCommandActions` instead.

***

<a id="ExtractCommandCreatorsE" name="ExtractCommandCreatorsE"></a>

## ExtractCommandCreators\<E\>

> **ExtractCommandCreators**\<`E`\>: `ToCommandCreators`\<`ExtractCommands`\<`E`\>\>

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

***

<a id="ExtractMarkActionsE" name="ExtractMarkActionsE"></a>

## ExtractMarkActions\<E\>

> **ExtractMarkActions**\<`E`\>: `ToMarkAction`\<[`ExtractMarks`](core.md#ExtractMarksE)\<`E`\>\>

Extracts the [MarkAction](core.md#MarkActionAttrs)s from an extension type.

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

***

<a id="ExtractMarksE" name="ExtractMarksE"></a>

## ExtractMarks\<E\>

> **ExtractMarks**\<`E`\>: `SimplifyDeeper`\<`SimplifyUnion`\<`ExtractTyping`\<`E`\>\[`"Marks"`\]\>\>

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

***

<a id="ExtractNodeActionsE" name="ExtractNodeActionsE"></a>

## ExtractNodeActions\<E\>

> **ExtractNodeActions**\<`E`\>: `ToNodeAction`\<[`ExtractNodes`](core.md#ExtractNodesE)\<`E`\>\>

Extracts the [NodeAction](core.md#NodeActionAttrs)s from an extension type.

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

***

<a id="ExtractNodesE" name="ExtractNodesE"></a>

## ExtractNodes\<E\>

> **ExtractNodes**\<`E`\>: `SimplifyDeeper`\<`SimplifyUnion`\<`ExtractTyping`\<`E`\>\[`"Nodes"`\]\>\>

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

***

<a id="FocusChangeHandler" name="FocusChangeHandler"></a>

## FocusChangeHandler()

> **FocusChangeHandler**: (`hasFocus`) => `void`

A function that is called when the editor gains or loses focus.

### Parameters

• **hasFocus**: `boolean`

Whether the editor has focus.

### Returns

`void`

***

<a id="KeyDownHandler" name="KeyDownHandler"></a>

## KeyDownHandler()

> **KeyDownHandler**: (`view`, `event`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **event**: [`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)

### Returns

`boolean` \| `void`

***

<a id="KeyPressHandler" name="KeyPressHandler"></a>

## KeyPressHandler()

> **KeyPressHandler**: (`view`, `event`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **event**: [`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)

### Returns

`boolean` \| `void`

***

<a id="MarkBuilder" name="MarkBuilder"></a>

## ~~MarkBuilder~~

> **MarkBuilder**: [`MarkAction`](core.md#MarkActionAttrs)

### Deprecated

Use type [MarkAction](core.md#MarkActionAttrs) instead.

***

<a id="MountHandler" name="MountHandler"></a>

## MountHandler()

> **MountHandler**: (`view`) => `void`

A function that is called when the editor view is mounted.

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

The editor view.

### Returns

`void`

***

<a id="NodeBuilder" name="NodeBuilder"></a>

## ~~NodeBuilder~~

> **NodeBuilder**: [`NodeAction`](core.md#NodeActionAttrs)

### Deprecated

Use type [NodeAction](core.md#NodeActionAttrs) instead.

***

<a id="NodeChild" name="NodeChild"></a>

## NodeChild

> **NodeChild**: [`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node) \| `string` \| [`NodeChild`](core.md#NodeChild)[]

Available children parameters for [NodeAction](core.md#NodeActionAttrs) and [MarkAction](core.md#MarkActionAttrs).

***

<a id="NodeContent" name="NodeContent"></a>

## ~~NodeContent~~

> **NodeContent**: [`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node) \| [`ProseMirrorFragment`](https://prosemirror.net/docs/ref/#model.Fragment) \| [`NodeContent`](core.md#NodeContent)[]

### Deprecated

***

<a id="PasteHandler" name="PasteHandler"></a>

## PasteHandler()

> **PasteHandler**: (`view`, `event`, `slice`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **event**: [`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent)

• **slice**: [`Slice`](https://prosemirror.net/docs/ref/#model.Slice)

### Returns

`boolean` \| `void`

***

<a id="ScrollToSelectionHandler" name="ScrollToSelectionHandler"></a>

## ScrollToSelectionHandler()

> **ScrollToSelectionHandler**: (`view`) => `boolean`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

### Returns

`boolean`

***

<a id="TextInputHandler" name="TextInputHandler"></a>

## TextInputHandler()

> **TextInputHandler**: (`view`, `from`, `to`, `text`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **from**: `number`

• **to**: `number`

• **text**: `string`

### Returns

`boolean` \| `void`

***

<a id="TripleClickHandler" name="TripleClickHandler"></a>

## TripleClickHandler()

> **TripleClickHandler**: (`view`, `pos`, `event`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **pos**: `number`

• **event**: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

### Returns

`boolean` \| `void`

***

<a id="TripleClickOnHandler" name="TripleClickOnHandler"></a>

## TripleClickOnHandler()

> **TripleClickOnHandler**: (`view`, `pos`, `node`, `nodePos`, `event`, `direct`) => `boolean` \| `void`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **pos**: `number`

• **node**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

• **nodePos**: `number`

• **event**: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

• **direct**: `boolean`

### Returns

`boolean` \| `void`

***

<a id="UnmountHandler" name="UnmountHandler"></a>

## UnmountHandler()

> **UnmountHandler**: () => `void`

A function that is called when the editor view is unmounted.

### Returns

`void`

***

<a id="UpdateHandler" name="UpdateHandler"></a>

## UpdateHandler()

> **UpdateHandler**: (`view`, `prevState`) => `void`

A function that is called when the editor state is updated.

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

The editor view.

• **prevState**: [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

The previous editor state.

### Returns

`void`

***

<a id="addMark" name="addMark"></a>

## addMark()

> **addMark**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that adds the given mark with the given attributes.

### Parameters

• **options**: [`AddMarkOptions`](core.md#AddMarkOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="canUseRegexLookbehind" name="canUseRegexLookbehind"></a>

## canUseRegexLookbehind()

> **canUseRegexLookbehind**(): `boolean`

### Returns

`boolean`

***

<a id="clsx" name="clsx"></a>

## clsx()

> **clsx**(...`args`): `string`

A utility for constructing `className` strings conditionally.

It is a re-export of [clsx/lite](https://www.npmjs.com/package/clsx) with stricter types.

### Parameters

• ...**args**: (`undefined` \| `null` \| `string` \| `boolean`)[]

### Returns

`string`

***

<a id="collectChildren" name="collectChildren"></a>

## collectChildren()

> **collectChildren**(`parent`): [`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node)[]

Collects all children of a node or a fragment, and returns them as an array.

### Parameters

• **parent**: [`Node`](https://prosemirror.net/docs/ref/#model.Node) \| [`Fragment`](https://prosemirror.net/docs/ref/#model.Fragment)

### Returns

[`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node)[]

***

<a id="collectNodes" name="collectNodes"></a>

## ~~collectNodes()~~

> **collectNodes**(`content`): [`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node)[]

Collects all nodes from a given content.

### Parameters

• **content**: [`NodeContent`](core.md#NodeContent)

### Returns

[`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node)[]

### Deprecated

Use `collectChildren` instead.

***

<a id="createEditor" name="createEditor"></a>

## createEditor()

> **createEditor**\<`E`\>(`options`): [`Editor`](core.md#EditorE)\<`E`\>

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

### Parameters

• **options**: [`EditorOptions`](core.md#EditorOptionsE)\<`E`\>

### Returns

[`Editor`](core.md#EditorE)\<`E`\>

***

<a id="defineBaseCommands" name="defineBaseCommands"></a>

## defineBaseCommands()

> **defineBaseCommands**(): `BaseCommandsExtension`

Add some base commands

### Returns

`BaseCommandsExtension`

***

<a id="defineBaseKeymap" name="defineBaseKeymap"></a>

## defineBaseKeymap()

> **defineBaseKeymap**(`options`?): `BaseKeymapExtension`

Defines some basic key bindings.

### Parameters

• **options?**

• **options.priority?**: [`Priority`](core.md#Priority)

The priority of the keymap.

**Default**

```ts
Priority.low
```

### Returns

`BaseKeymapExtension`

***

<a id="defineClickHandler" name="defineClickHandler"></a>

## defineClickHandler()

> **defineClickHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleClick)

### Parameters

• **handler**: [`ClickHandler`](core.md#ClickHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineClickOnHandler" name="defineClickOnHandler"></a>

## defineClickOnHandler()

> **defineClickOnHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn)

### Parameters

• **handler**: [`ClickOnHandler`](core.md#ClickOnHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineCommands" name="defineCommands"></a>

## defineCommands()

> **defineCommands**\<`T`\>(`commands`): [`Extension`](core.md#ExtensionT)\<`object`\>

### Type Parameters

• **T** *extends* [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `CommandCreator`\> = [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `CommandCreator`\>

### Parameters

• **commands**: `T`

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Commands` | `{ [K in keyof T]: Parameters<T[K]> }` |

***

<a id="defineDOMEventHandler" name="defineDOMEventHandler"></a>

## defineDOMEventHandler()

> **defineDOMEventHandler**\<`Event`\>(`event`, `handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

Register a new event handler for the given event type.

### Type Parameters

• **Event** *extends* keyof [`DOMEventMap`](https://prosemirror.net/docs/ref/#view.DOMEventMap) = `string`

### Parameters

• **event**: `Event`

• **handler**: [`DOMEventHandler`](core.md#DOMEventHandlerEvent)\<`Event`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineDefaultState" name="defineDefaultState"></a>

## defineDefaultState()

> **defineDefaultState**(`options`): `PlainExtension`

Define a default state for the editor.

### Parameters

• **options**: [`DefaultStateOptions`](core.md#DefaultStateOptions)

### Returns

`PlainExtension`

***

<a id="defineDoc" name="defineDoc"></a>

## defineDoc()

> **defineDoc**(): `DocExtension`

### Returns

`DocExtension`

***

<a id="defineDocChangeHandler" name="defineDocChangeHandler"></a>

## defineDocChangeHandler()

> **defineDocChangeHandler**(`handler`): `PlainExtension`

Registers a event handler that is called when the editor document is changed.

### Parameters

• **handler**: [`DocChangeHandler`](core.md#DocChangeHandler)

### Returns

`PlainExtension`

***

<a id="defineDoubleClickHandler" name="defineDoubleClickHandler"></a>

## defineDoubleClickHandler()

> **defineDoubleClickHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick)

### Parameters

• **handler**: [`DoubleClickHandler`](core.md#DoubleClickHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineDoubleClickOnHandler" name="defineDoubleClickOnHandler"></a>

## defineDoubleClickOnHandler()

> **defineDoubleClickOnHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn)

### Parameters

• **handler**: [`DoubleClickOnHandler`](core.md#DoubleClickOnHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineDropHandler" name="defineDropHandler"></a>

## defineDropHandler()

> **defineDropHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop](https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop)

### Parameters

• **handler**: [`DropHandler`](core.md#DropHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineFocusChangeHandler" name="defineFocusChangeHandler"></a>

## defineFocusChangeHandler()

> **defineFocusChangeHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

Registers a event handler that is called when the editor gains or loses focus.

### Parameters

• **handler**: [`FocusChangeHandler`](core.md#FocusChangeHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineHistory" name="defineHistory"></a>

## defineHistory()

> **defineHistory**(`options`): `HistoryExtension`

Add undo/redo history to the editor.

### Parameters

• **options**: [`HistoryOptions`](core.md#HistoryOptions) = `{}`

### Returns

`HistoryExtension`

***

<a id="defineKeyDownHandler" name="defineKeyDownHandler"></a>

## defineKeyDownHandler()

> **defineKeyDownHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown](https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown)

### Parameters

• **handler**: [`KeyDownHandler`](core.md#KeyDownHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineKeyPressHandler" name="defineKeyPressHandler"></a>

## defineKeyPressHandler()

> **defineKeyPressHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress](https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress)

### Parameters

• **handler**: [`KeyPressHandler`](core.md#KeyPressHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineKeymap" name="defineKeymap"></a>

## defineKeymap()

> **defineKeymap**(`keymap`): `PlainExtension`

### Parameters

• **keymap**: [`Keymap`](core.md#Keymap)

### Returns

`PlainExtension`

***

<a id="defineMarkAttr" name="defineMarkAttr"></a>

## defineMarkAttr()

> **defineMarkAttr**\<`MarkType`, `AttrName`, `AttrType`\>(`options`): [`Extension`](core.md#ExtensionT)\<`object`\>

### Type Parameters

• **MarkType** *extends* `string` = `string`

• **AttrName** *extends* `string` = `string`

• **AttrType** = `any`

### Parameters

• **options**: [`MarkAttrOptions`](core.md#MarkAttrOptionsMarkName-AttrName-AttrType)\<`MarkType`, `AttrName`, `AttrType`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Marks` | `{ [K in MarkType]: AttrType }` |

***

<a id="defineMarkSpec" name="defineMarkSpec"></a>

## defineMarkSpec()

> **defineMarkSpec**\<`Mark`, `Attrs`\>(`options`): [`Extension`](core.md#ExtensionT)\<`object`\>

### Type Parameters

• **Mark** *extends* `string`

• **Attrs** *extends* [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs) = [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

### Parameters

• **options**: [`MarkSpecOptions`](core.md#MarkSpecOptionsMarkName-Attrs)\<`Mark`, `Attrs`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Marks` | `{ [K in Mark]: Attrs }` |

***

<a id="defineMountHandler" name="defineMountHandler"></a>

## defineMountHandler()

> **defineMountHandler**(`handler`): `PlainExtension`

Registers a event handler that is called when the editor view is mounted.

### Parameters

• **handler**: [`MountHandler`](core.md#MountHandler)

### Returns

`PlainExtension`

***

<a id="defineNodeAttr" name="defineNodeAttr"></a>

## defineNodeAttr()

> **defineNodeAttr**\<`NodeType`, `AttrName`, `AttrType`\>(`options`): [`Extension`](core.md#ExtensionT)\<`object`\>

Defines an attribute for a node type.

### Type Parameters

• **NodeType** *extends* `string` = `string`

• **AttrName** *extends* `string` = `string`

• **AttrType** = `any`

### Parameters

• **options**: [`NodeAttrOptions`](core.md#NodeAttrOptionsNodeName-AttrName-AttrType)\<`NodeType`, `AttrName`, `AttrType`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Nodes` | `{ [K in NodeType]: { [K in AttrName]: AttrType } }` |

***

<a id="defineNodeSpec" name="defineNodeSpec"></a>

## defineNodeSpec()

> **defineNodeSpec**\<`Node`, `Attrs`\>(`options`): [`Extension`](core.md#ExtensionT)\<`object`\>

Defines a node type.

### Type Parameters

• **Node** *extends* `string`

• **Attrs** *extends* [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs) = [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

### Parameters

• **options**: [`NodeSpecOptions`](core.md#NodeSpecOptionsNodeName-Attrs)\<`Node`, `Attrs`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Nodes` | `{ [K in Node]: Attrs }` |

***

<a id="defineNodeView" name="defineNodeView"></a>

## defineNodeView()

> **defineNodeView**(`options`): [`Extension`](core.md#ExtensionT)

### Parameters

• **options**: [`NodeViewOptions`](core.md#NodeViewOptions)

### Returns

[`Extension`](core.md#ExtensionT)

***

<a id="defineParagraph" name="defineParagraph"></a>

## defineParagraph()

> **defineParagraph**(): `ParagraphExtension`

Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.

### Returns

`ParagraphExtension`

***

<a id="definePasteHandler" name="definePasteHandler"></a>

## definePasteHandler()

> **definePasteHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste)

### Parameters

• **handler**: [`PasteHandler`](core.md#PasteHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="definePlugin" name="definePlugin"></a>

## definePlugin()

> **definePlugin**(`plugin`): `PlainExtension`

Adds a ProseMirror plugin to the editor.

### Parameters

• **plugin**: [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)\<`any`\> \| [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)\<`any`\>[] \| (`context`) => [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)\<`any`\> \| [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)\<`any`\>[]

The ProseMirror plugin to add, or an array of plugins, or a
function that returns one or multiple plugins.

### Returns

`PlainExtension`

***

<a id="defineScrollToSelectionHandler" name="defineScrollToSelectionHandler"></a>

## defineScrollToSelectionHandler()

> **defineScrollToSelectionHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection](https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection)

### Parameters

• **handler**: [`ScrollToSelectionHandler`](core.md#ScrollToSelectionHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineText" name="defineText"></a>

## defineText()

> **defineText**(): `TextExtension`

### Returns

`TextExtension`

***

<a id="defineTextInputHandler" name="defineTextInputHandler"></a>

## defineTextInputHandler()

> **defineTextInputHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput](https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput)

### Parameters

• **handler**: [`TextInputHandler`](core.md#TextInputHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineTripleClickHandler" name="defineTripleClickHandler"></a>

## defineTripleClickHandler()

> **defineTripleClickHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick)

### Parameters

• **handler**: [`TripleClickHandler`](core.md#TripleClickHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineTripleClickOnHandler" name="defineTripleClickOnHandler"></a>

## defineTripleClickOnHandler()

> **defineTripleClickOnHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn)

### Parameters

• **handler**: [`TripleClickOnHandler`](core.md#TripleClickOnHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

***

<a id="defineUnmountHandler" name="defineUnmountHandler"></a>

## defineUnmountHandler()

> **defineUnmountHandler**(`handler`): `PlainExtension`

Registers a event handler that is called when the editor view is unmounted.

### Parameters

• **handler**: [`UnmountHandler`](core.md#UnmountHandler)

### Returns

`PlainExtension`

***

<a id="defineUpdateHandler" name="defineUpdateHandler"></a>

## defineUpdateHandler()

> **defineUpdateHandler**(`handler`): `PlainExtension`

Registers a event handler that is called when the editor state is updated.

### Parameters

• **handler**: [`UpdateHandler`](core.md#UpdateHandler)

### Returns

`PlainExtension`

***

<a id="elementFromJSON" name="elementFromJSON"></a>

## elementFromJSON()

> **elementFromJSON**(`json`, `options`): [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

Parse a ProseMirror document JSON object to a HTML element.

### Parameters

• **json**: [`NodeJSON`](core.md#NodeJSON)

• **options**: [`JSONParserOptions`](core.md#JSONParserOptions) & [`DOMSerializerOptions`](core.md#DOMSerializerOptions) & [`DOMDocumentOptions`](core.md#DOMDocumentOptions)

### Returns

[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

***

<a id="elementFromNode" name="elementFromNode"></a>

## elementFromNode()

> **elementFromNode**(`node`, `options`?): [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

Serialize a ProseMirror node to a HTML element.

### Parameters

• **node**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

• **options?**: [`DOMSerializerOptions`](core.md#DOMSerializerOptions) & [`DOMDocumentOptions`](core.md#DOMDocumentOptions)

### Returns

[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

***

<a id="expandMark" name="expandMark"></a>

## expandMark()

> **expandMark**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Expands the selection to include the entire mark at the current position.

### Parameters

• **options**: [`ExpandMarkOptions`](core.md#ExpandMarkOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="findParentNode" name="findParentNode"></a>

## findParentNode()

> **findParentNode**(`predicate`, `$pos`): [`FindParentNodeResult`](core.md#FindParentNodeResult) \| `undefined`

Find the closest parent node that satisfies the predicate.

### Parameters

• **predicate**

The predicate to test the parent node.

• **$pos**: [`ResolvedPos`](https://prosemirror.net/docs/ref/#model.ResolvedPos)

The position to start searching from.

### Returns

[`FindParentNodeResult`](core.md#FindParentNodeResult) \| `undefined`

***

<a id="findParentNodeOfType" name="findParentNodeOfType"></a>

## findParentNodeOfType()

> **findParentNodeOfType**(`type`, `$pos`): [`FindParentNodeResult`](core.md#FindParentNodeResult) \| `undefined`

Finds the closest parent node that matches the given node type.

### Parameters

• **type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

The type of the node to find.

• **$pos**: [`ResolvedPos`](https://prosemirror.net/docs/ref/#model.ResolvedPos)

The position to start searching from.

### Returns

[`FindParentNodeResult`](core.md#FindParentNodeResult) \| `undefined`

***

<a id="htmlFromJSON" name="htmlFromJSON"></a>

## htmlFromJSON()

> **htmlFromJSON**(`json`, `options`): `string`

Parse a ProseMirror document JSON object to a HTML string.

### Parameters

• **json**: [`NodeJSON`](core.md#NodeJSON)

• **options**: [`JSONParserOptions`](core.md#JSONParserOptions) & [`DOMSerializerOptions`](core.md#DOMSerializerOptions) & [`DOMDocumentOptions`](core.md#DOMDocumentOptions)

### Returns

`string`

***

<a id="htmlFromNode" name="htmlFromNode"></a>

## htmlFromNode()

> **htmlFromNode**(`node`, `options`?): `string`

Serialize a ProseMirror node to a HTML string

### Parameters

• **node**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

• **options?**: [`DOMSerializerOptions`](core.md#DOMSerializerOptions) & [`DOMDocumentOptions`](core.md#DOMDocumentOptions)

### Returns

`string`

***

<a id="insertDefaultBlock" name="insertDefaultBlock"></a>

## insertDefaultBlock()

> **insertDefaultBlock**(`options`?): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that inserts a default block after current selection or at
the given position.

### Parameters

• **options?**: [`InsertDefaultBlockOptions`](core.md#InsertDefaultBlockOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="insertNode" name="insertNode"></a>

## insertNode()

> **insertNode**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that inserts the given node at the current selection or at
the given position.

### Parameters

• **options**: [`InsertNodeOptions`](core.md#InsertNodeOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="isAllSelection" name="isAllSelection"></a>

## isAllSelection()

> **isAllSelection**(`sel`): `sel is AllSelection`

Checks if the given object is a `AllSelection` instance.

### Parameters

• **sel**: [`Selection`](https://prosemirror.net/docs/ref/#state.Selection)

### Returns

`sel is AllSelection`

***

<a id="isFragment" name="isFragment"></a>

## isFragment()

> **isFragment**(`fragment`): `fragment is Fragment`

Checks if the given object is a `Fragment` instance.

### Parameters

• **fragment**: `unknown`

### Returns

`fragment is Fragment`

***

<a id="isMark" name="isMark"></a>

## isMark()

> **isMark**(`mark`): `mark is Mark`

Checks if the given object is a `Mark` instance.

### Parameters

• **mark**: `unknown`

### Returns

`mark is Mark`

***

<a id="isNodeSelection" name="isNodeSelection"></a>

## isNodeSelection()

> **isNodeSelection**(`sel`): `sel is NodeSelection`

Checks if the given object is a `NodeSelection` instance.

### Parameters

• **sel**: [`Selection`](https://prosemirror.net/docs/ref/#state.Selection)

### Returns

`sel is NodeSelection`

***

<a id="isProseMirrorNode" name="isProseMirrorNode"></a>

## isProseMirrorNode()

> **isProseMirrorNode**(`node`): `node is Node`

Checks if the given object is a `ProseMirrorNode` instance.

### Parameters

• **node**: `unknown`

### Returns

`node is Node`

***

<a id="isSelection" name="isSelection"></a>

## isSelection()

> **isSelection**(`sel`): `sel is Selection`

Checks if the given object is a `Selection` instance.

### Parameters

• **sel**: `unknown`

### Returns

`sel is Selection`

***

<a id="isSlice" name="isSlice"></a>

## isSlice()

> **isSlice**(`slice`): `slice is Slice`

Checks if the given object is a `Slice` instance.

### Parameters

• **slice**: `unknown`

### Returns

`slice is Slice`

***

<a id="isTextSelection" name="isTextSelection"></a>

## isTextSelection()

> **isTextSelection**(`sel`): `sel is TextSelection`

Checks if the given object is a `TextSelection` instance.

### Parameters

• **sel**: [`Selection`](https://prosemirror.net/docs/ref/#state.Selection)

### Returns

`sel is TextSelection`

***

<a id="jsonFromHTML" name="jsonFromHTML"></a>

## jsonFromHTML()

> **jsonFromHTML**(`html`, `options`): [`NodeJSON`](core.md#NodeJSON)

Parse a HTML string to a ProseMirror document JSON object.

### Parameters

• **html**: `string`

• **options**: [`DOMDocumentOptions`](core.md#DOMDocumentOptions) & [`DOMParserOptions`](core.md#DOMParserOptions) & [`JSONParserOptions`](core.md#JSONParserOptions)

### Returns

[`NodeJSON`](core.md#NodeJSON)

***

<a id="jsonFromNode" name="jsonFromNode"></a>

## jsonFromNode()

> **jsonFromNode**(`node`): [`NodeJSON`](core.md#NodeJSON)

Return a JSON object representing this node.

### Parameters

• **node**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

### Returns

[`NodeJSON`](core.md#NodeJSON)

***

<a id="jsonFromState" name="jsonFromState"></a>

## jsonFromState()

> **jsonFromState**(`state`): [`StateJSON`](core.md#StateJSON)

Return a JSON object representing this state.

### Parameters

• **state**: [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

### Returns

[`StateJSON`](core.md#StateJSON)

***

<a id="nodeFromElement" name="nodeFromElement"></a>

## nodeFromElement()

> **nodeFromElement**(`element`, `options`): [`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node)

Parse a HTML element to a ProseMirror node.

### Parameters

• **element**: [`Node`](https://developer.mozilla.org/docs/Web/API/Node)

• **options**: [`DOMParserOptions`](core.md#DOMParserOptions) & [`JSONParserOptions`](core.md#JSONParserOptions)

### Returns

[`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node)

***

<a id="nodeFromHTML" name="nodeFromHTML"></a>

## nodeFromHTML()

> **nodeFromHTML**(`html`, `options`): [`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node)

Parse a HTML string to a ProseMirror node.

### Parameters

• **html**: `string`

• **options**: [`DOMParserOptions`](core.md#DOMParserOptions) & [`JSONParserOptions`](core.md#JSONParserOptions) & [`DOMDocumentOptions`](core.md#DOMDocumentOptions)

### Returns

[`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node)

***

<a id="nodeFromJSON" name="nodeFromJSON"></a>

## nodeFromJSON()

> **nodeFromJSON**(`json`, `options`): [`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node)

Parse a JSON object to a ProseMirror node.

### Parameters

• **json**: [`NodeJSON`](core.md#NodeJSON)

• **options**: [`JSONParserOptions`](core.md#JSONParserOptions)

### Returns

[`ProseMirrorNode`](https://prosemirror.net/docs/ref/#model.Node)

***

<a id="removeMark" name="removeMark"></a>

## removeMark()

> **removeMark**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that removes the given mark.

### Parameters

• **options**: [`RemoveMarkOptions`](core.md#RemoveMarkOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="removeNode" name="removeNode"></a>

## removeNode()

> **removeNode**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command to remove the nearest ancestor node of a specific type from the current position.

### Parameters

• **options**: [`RemoveNodeOptions`](core.md#RemoveNodeOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="setBlockType" name="setBlockType"></a>

## setBlockType()

> **setBlockType**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that tries to set the selected textblocks to the given node
type with the given attributes.

### Parameters

• **options**: [`SetBlockTypeOptions`](core.md#SetBlockTypeOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="setNodeAttrs" name="setNodeAttrs"></a>

## setNodeAttrs()

> **setNodeAttrs**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that set the attributes of the current node.

### Parameters

• **options**: [`SetNodeAttrsOptions`](core.md#SetNodeAttrsOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="setSelectionAround" name="setSelectionAround"></a>

## setSelectionAround()

> **setSelectionAround**(`tr`, `pos`): `void`

### Parameters

• **tr**: [`Transaction`](https://prosemirror.net/docs/ref/#state.Transaction)

• **pos**: `number`

### Returns

`void`

***

<a id="stateFromJSON" name="stateFromJSON"></a>

## stateFromJSON()

> **stateFromJSON**(`json`, `options`): [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

Parse a JSON object to a ProseMirror state.

### Parameters

• **json**: [`StateJSON`](core.md#StateJSON)

• **options**: [`JSONParserOptions`](core.md#JSONParserOptions)

### Returns

[`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

***

<a id="toggleMark" name="toggleMark"></a>

## toggleMark()

> **toggleMark**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that toggles the given mark with the given attributes.

### Parameters

• **options**: [`ToggleMarkOptions`](core.md#ToggleMarkOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="toggleNode" name="toggleNode"></a>

## toggleNode()

> **toggleNode**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that set the selected textblocks to the given node type
with the given attributes.

### Parameters

• **options**: [`ToggleNodeOptions`](core.md#ToggleNodeOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="toggleWrap" name="toggleWrap"></a>

## toggleWrap()

> **toggleWrap**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Toggle between wrapping an inactive node with the provided node type, and
lifting it up into it's parent.

### Parameters

• **options**: [`ToggleWrapOptions`](core.md#ToggleWrapOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="union" name="union"></a>

## union()

### union(exts)

> **union**\<`E`\>(...`exts`): `Union`\<`E`\>

Merges multiple extensions into one. You can pass multiple extensions as
arguments or a single array containing multiple extensions.

#### Type Parameters

• **E** *extends* readonly [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>[]

#### Parameters

• ...**exts**: `E`

#### Returns

`Union`\<`E`\>

#### Throws

If no extensions are provided.

#### Examples

```ts
function defineFancyNodes() {
  return union(
    defineFancyParagraph(),
    defineFancyHeading(),
  )
}
```

```ts
function defineFancyNodes() {
  return union([
    defineFancyParagraph(),
    defineFancyHeading(),
  ])
}
```

### union(exts)

> **union**\<`E`\>(`exts`): `Union`\<`E`\>

#### Type Parameters

• **E** *extends* readonly [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>[]

#### Parameters

• **exts**: `E`

#### Returns

`Union`\<`E`\>

***

<a id="unsetBlockType" name="unsetBlockType"></a>

## unsetBlockType()

> **unsetBlockType**(`options`?): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that set the type of all textblocks between the given range
to the default type (usually `paragraph`).

### Parameters

• **options?**: [`UnsetBlockTypeOptions`](core.md#UnsetBlockTypeOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="unsetMark" name="unsetMark"></a>

## unsetMark()

> **unsetMark**(`options`?): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that removes all marks.

### Parameters

• **options?**: [`UnsetMarkOptions`](core.md#UnsetMarkOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="withPriority" name="withPriority"></a>

## withPriority()

> **withPriority**\<`T`\>(`extension`, `priority`): `T`

Return an new extension with the given priority.

### Type Parameters

• **T** *extends* [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

### Parameters

• **extension**: `T`

• **priority**: [`Priority`](core.md#Priority)

### Returns

`T`

### Example

```ts
import { Priority, withPriority } from 'prosekit/core'

const extension = withPriority(defineMyExtension(), Priority.high)
```

***

<a id="wrap" name="wrap"></a>

## wrap()

> **wrap**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that wraps the selected textblock with the given node type.

### Parameters

• **options**: [`WrapOptions`](core.md#WrapOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)
