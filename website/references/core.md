# prosekit/core

<a id="Priority" name="Priority"></a>

## Priority

ProseKit extension priority.

### Enumeration Members

| Enumeration Member | Value |
| :------ | :------ |
| <a id="default" name="default"></a> `default` | `2` |
| <a id="high" name="high"></a> `high` | `3` |
| <a id="highest" name="highest"></a> `highest` | `4` |
| <a id="low" name="low"></a> `low` | `1` |
| <a id="lowest" name="lowest"></a> `lowest` | `0` |

***

<a id="EditorE" name="EditorE"></a>

## Editor\<E\>

### Type parameters

• **E** *extends* [`Extension`](core.md#ExtensionT) = `any`

### Accessors

<a id="commands" name="commands"></a>

#### commands

> `get` **commands**(): `ToCommandApplier`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Commands"\]\>\[KeyType\] \}\>

##### Returns

`ToCommandApplier`\<\{ \[KeyType in string \| number \| symbol\]: UnionToIntersection\<ExtractTyping\<E\>\["Commands"\]\>\[KeyType\] \}\>

<a id="focused" name="focused"></a>

#### focused

> `get` **focused**(): `boolean`

Whether the editor is focused.

##### Returns

`boolean`

<a id="marks" name="marks"></a>

#### marks

> `get` **marks**(): [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`ExtractMarks`](core.md#ExtractMarksE)\<`E`\>, `MarkBuilder`\>

##### Returns

[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`ExtractMarks`](core.md#ExtractMarksE)\<`E`\>, `MarkBuilder`\>

<a id="mounted" name="mounted"></a>

#### mounted

> `get` **mounted**(): `boolean`

Whether the editor is mounted.

##### Returns

`boolean`

<a id="nodes" name="nodes"></a>

#### nodes

> `get` **nodes**(): [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`ExtractNodes`](core.md#ExtractNodesE)\<`E`\>, `NodeBuilder`\>

##### Returns

[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`ExtractNodes`](core.md#ExtractNodesE)\<`E`\>, `NodeBuilder`\>

<a id="schema" name="schema"></a>

#### schema

> `get` **schema**(): [`Schema`](https://prosemirror.net/docs/ref/#model.Schema)\<[`ExtractNodes`](core.md#ExtractNodesE)\<`E`\>, [`ExtractMarks`](core.md#ExtractMarksE)\<`E`\>\>

The editor schema.

##### Returns

[`Schema`](https://prosemirror.net/docs/ref/#model.Schema)\<[`ExtractNodes`](core.md#ExtractNodesE)\<`E`\>, [`ExtractMarks`](core.md#ExtractMarksE)\<`E`\>\>

<a id="state" name="state"></a>

#### state

> `get` **state**(): [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

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

<a id="unmount" name="unmount"></a>

#### unmount()

> **unmount**(): `void`

Unmount the editor. This is equivalent to `mount(null)`.

##### Returns

`void`

<a id="use" name="use"></a>

#### use()

> **use**(`extension`): `VoidFunction`

##### Parameters

• **extension**: [`Extension`](core.md#ExtensionT)\<`any`\>

##### Returns

`VoidFunction`

***

<a id="BaseNodeViewOptions" name="BaseNodeViewOptions"></a>

## BaseNodeViewOptions

Some basic props for custom node views.

### Extended by

- [`ReactNodeViewOptions`](react.md#ReactNodeViewOptions)
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

<a id="DefaultStateOptions" name="DefaultStateOptions"></a>

## DefaultStateOptions

### Properties

<a id="defaultDoc" name="defaultDoc"></a>

#### defaultDoc?

> `optional` **defaultDoc**: [`NodeJSON`](core.md#NodeJSON)

A JSON object representing the starting document to use when creating the
editor.

<a id="defaultHTML" name="defaultHTML"></a>

#### defaultHTML?

> `optional` **defaultHTML**: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

A HTML element or a HTML string representing the starting document to use
when creating the editor.

<a id="defaultSelection" name="defaultSelection"></a>

#### defaultSelection?

> `optional` **defaultSelection**: [`SelectionJSON`](core.md#SelectionJSON)

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultDoc` or `defaultHTML` is also provided.

***

<a id="EditorOptionsE" name="EditorOptionsE"></a>

## EditorOptions\<E\>

### Type parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

### Properties

<a id="defaultDoc-1" name="defaultDoc-1"></a>

#### defaultDoc?

> `optional` **defaultDoc**: [`NodeJSON`](core.md#NodeJSON)

A JSON object representing the starting document to use when creating the
editor.

<a id="defaultHTML-1" name="defaultHTML-1"></a>

#### defaultHTML?

> `optional` **defaultHTML**: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

A HTML element or a HTML string representing the starting document to use
when creating the editor.

<a id="defaultSelection-1" name="defaultSelection-1"></a>

#### defaultSelection?

> `optional` **defaultSelection**: [`SelectionJSON`](core.md#SelectionJSON)

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultDoc` or `defaultHTML` is also provided.

<a id="extension" name="extension"></a>

#### extension

> **extension**: `E`

The extension to use when creating the editor.

***

<a id="ExtensionT" name="ExtensionT"></a>

## Extension\<T\>

### Type parameters

• **T** *extends* `ExtensionTyping`\<`any`, `any`, `any`\> = `any`

### Properties

<a id="_type" name="_type"></a>

#### \_type?

> `optional` **\_type**: `T`

<a id="extension-1" name="extension-1"></a>

#### extension

> **extension**: [`Extension`](core.md#ExtensionT)\<`any`\> \| [`Extension`](core.md#ExtensionT)\<`any`\>[]

<a id="priority" name="priority"></a>

#### priority?

> `optional` **priority**: [`Priority`](core.md#Priority)

<a id="schema-1" name="schema-1"></a>

#### schema

> **schema**: `null` \| [`Schema`](https://prosemirror.net/docs/ref/#model.Schema)\<`any`, `any`\>

The schema that this extension represents.

***

<a id="Keymap" name="Keymap"></a>

## Keymap

### Indexable

 \[`key`: `string`\]: [`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="MarkAttrOptions" name="MarkAttrOptions"></a>

## MarkAttrOptions

### Properties

<a id="attr" name="attr"></a>

#### attr

> **attr**: `string`

The name of the attribute.

<a id="default-1" name="default-1"></a>

#### default?

> `optional` **default**: `any`

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a mark
of a type that has them is created.

<a id="parseDOM" name="parseDOM"></a>

#### parseDOM()?

> `optional` **parseDOM**: (`node`) => `any`

Parses the attribute value from the DOM.

##### Parameters

• **node**: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

##### Returns

`any`

<a id="toDOM" name="toDOM"></a>

#### toDOM()?

> `optional` **toDOM**: (`value`) => `null` \| `void` \| [`string`, `string`]

Returns the attribute key and value to be set on the DOM node.

##### Parameters

• **value**: `any`

##### Returns

`null` \| `void` \| [`string`, `string`]

<a id="type" name="type"></a>

#### type

> **type**: `string`

The name of the mark type.

***

<a id="MarkSpecOptionsMarkName" name="MarkSpecOptionsMarkName"></a>

## MarkSpecOptions\<MarkName\>

### Extends

- [`MarkSpec`](https://prosemirror.net/docs/ref/#model.MarkSpec)

### Type parameters

• **MarkName** *extends* `string` = `string`

### Properties

<a id="name" name="name"></a>

#### name

> **name**: `MarkName`

***

<a id="NodeAttrOptions" name="NodeAttrOptions"></a>

## NodeAttrOptions

### Properties

<a id="attr-1" name="attr-1"></a>

#### attr

> **attr**: `string`

The name of the attribute.

<a id="default-2" name="default-2"></a>

#### default?

> `optional` **default**: `any`

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
of a type that has them is created.

<a id="parseDOM-1" name="parseDOM-1"></a>

#### parseDOM()?

> `optional` **parseDOM**: (`node`) => `any`

Parses the attribute value from the DOM.

##### Parameters

• **node**: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

##### Returns

`any`

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

> `optional` **toDOM**: (`value`) => `null` \| `void` \| [`string`, `string`]

Returns the attribute key and value to be set on the DOM node.

If the `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

##### Parameters

• **value**: `any`

##### Returns

`null` \| `void` \| [`string`, `string`]

<a id="type-1" name="type-1"></a>

#### type

> **type**: `string`

The name of the node type.

***

<a id="NodeJSON" name="NodeJSON"></a>

## NodeJSON

A JSON representation of the prosemirror node.

### Properties

<a id="attrs" name="attrs"></a>

#### attrs?

> `optional` **attrs**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `any`\>

<a id="content" name="content"></a>

#### content?

> `optional` **content**: [`NodeJSON`](core.md#NodeJSON)[]

<a id="marks-1" name="marks-1"></a>

#### marks?

> `optional` **marks**: `any`[]

<a id="text" name="text"></a>

#### text?

> `optional` **text**: `string`

<a id="type-2" name="type-2"></a>

#### type

> **type**: `string`

***

<a id="NodeSpecOptionsNodeName" name="NodeSpecOptionsNodeName"></a>

## NodeSpecOptions\<NodeName\>

### Extends

- [`NodeSpec`](https://prosemirror.net/docs/ref/#model.NodeSpec)

### Type parameters

• **NodeName** *extends* `string` = `string`

### Properties

<a id="name-1" name="name-1"></a>

#### name

> **name**: `NodeName`

<a id="topNode" name="topNode"></a>

#### topNode?

> `optional` **topNode**: `boolean`

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

<a id="type-3" name="type-3"></a>

#### type

> **type**: `string`

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

<a id="DOMDocumentOptions" name="DOMDocumentOptions"></a>

## DOMDocumentOptions

> **DOMDocumentOptions**: `object`

### Type declaration

| Member | Type |
| :------ | :------ |
| `document` | [`Document`](https://developer.mozilla.org/docs/Web/API/Document) |

***

<a id="DOMEventHandlerEvent" name="DOMEventHandlerEvent"></a>

## DOMEventHandler()\<Event\>

> **DOMEventHandler**\<`Event`\>: (`view`, `event`) => `boolean` \| `void`

A function to handle the events fired on the editable DOM element. Returns
`true` to indicate that it handled the given event. you are responsible for
calling `preventDefault` yourself (or not, if you want to allow the default
behavior).

### Type parameters

• **Event** *extends* keyof [`DOMEventMap`](https://prosemirror.net/docs/ref/#view.DOMEventMap) = `string`

### Parameters

• **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

• **event**: [`DOMEventMap`](https://prosemirror.net/docs/ref/#view.DOMEventMap)\[`Event`\]

### Returns

`boolean` \| `void`

***

<a id="DOMParserOptions" name="DOMParserOptions"></a>

## DOMParserOptions

> **DOMParserOptions**: `object`

### Type declaration

| Member | Type |
| :------ | :------ |
| `DOMParser` | *typeof* [`DOMParser`](https://prosemirror.net/docs/ref/#model.DOMParser) |

***

<a id="DOMSerializerOptions" name="DOMSerializerOptions"></a>

## DOMSerializerOptions

> **DOMSerializerOptions**: `object`

### Type declaration

| Member | Type |
| :------ | :------ |
| `DOMSerializer` | *typeof* [`DOMSerializer`](https://prosemirror.net/docs/ref/#model.DOMSerializer) |

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

<a id="ExtractCommandAppliersE" name="ExtractCommandAppliersE"></a>

## ExtractCommandAppliers\<E\>

> **ExtractCommandAppliers**\<`E`\>: `ToCommandApplier`\<`ExtractCommands`\<`E`\>\>

### Type parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

***

<a id="ExtractCommandCreatorsE" name="ExtractCommandCreatorsE"></a>

## ExtractCommandCreators\<E\>

> **ExtractCommandCreators**\<`E`\>: `ToCommandCreators`\<`ExtractCommands`\<`E`\>\>

### Type parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

***

<a id="ExtractMarksE" name="ExtractMarksE"></a>

## ExtractMarks\<E\>

> **ExtractMarks**\<`E`\>: `ExtractTyping`\<`E`\>\[`"Marks"`\]

### Type parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)

***

<a id="ExtractNodesE" name="ExtractNodesE"></a>

## ExtractNodes\<E\>

> **ExtractNodes**\<`E`\>: `ExtractTyping`\<`E`\>\[`"Nodes"`\]

### Type parameters

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

<a id="JSONParserOptions" name="JSONParserOptions"></a>

## JSONParserOptions

> **JSONParserOptions**: `object`

### Type declaration

| Member | Type |
| :------ | :------ |
| `schema` | [`Schema`](https://prosemirror.net/docs/ref/#model.Schema) |

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

• **options**

• **options.attrs?**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

The attributes of the mark to add.

• **options.from?**: `number`

The start position of the document. By default it will be the start position of current selection.

• **options.to?**: `number`

The end position of the document. By default it will be the end position of current selection.

• **options.type**: `string` \| [`MarkType`](https://prosemirror.net/docs/ref/#model.MarkType)

The type of the mark to add.

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

<a id="createEditor" name="createEditor"></a>

## createEditor()

> **createEditor**\<`E`\>(`options`): [`Editor`](core.md#EditorE)\<`E`\>

### Type parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)\<`any`\>

### Parameters

• **options**: [`EditorOptions`](core.md#EditorOptionsE)\<`E`\>

### Returns

[`Editor`](core.md#EditorE)\<`E`\>

***

<a id="defineBaseCommands" name="defineBaseCommands"></a>

## defineBaseCommands()

> **defineBaseCommands**(): [`Extension`](core.md#ExtensionT)\<`object`\>

Add some base commands

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `object` |
| `Commands.addMark` | [`object`] |
| `Commands.insertNode` | [`object` \| `object`] |
| `Commands.insertText` | [`object`] |
| `Commands.removeMark` | [`object`] |
| `Commands.removeNode` | [`object`] |
| `Commands.selectAll` | [] |
| `Commands.setBlockType` | [`object`] |
| `Commands.setNodeAttrs` | [`object`] |
| `Commands.wrap` | [`object`] |
| `Marks` | `never` |
| `Nodes` | `never` |

***

<a id="defineBaseKeymap" name="defineBaseKeymap"></a>

## defineBaseKeymap()

> **defineBaseKeymap**(`options`?): [`Extension`](core.md#ExtensionT)\<`any`\>

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

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineClickHandler" name="defineClickHandler"></a>

## defineClickHandler()

> **defineClickHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleClick)

### Parameters

• **handler**: [`ClickHandler`](core.md#ClickHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineClickOnHandler" name="defineClickOnHandler"></a>

## defineClickOnHandler()

> **defineClickOnHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn)

### Parameters

• **handler**: [`ClickOnHandler`](core.md#ClickOnHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineCommands" name="defineCommands"></a>

## defineCommands()

> **defineCommands**\<`T`\>(`commands`): [`Extension`](core.md#ExtensionT)\<`object`\>

### Type parameters

• **T** *extends* [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `CommandCreator`\> = [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `CommandCreator`\>

### Parameters

• **commands**: `T`

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `{ [K in keyof T]: Parameters<T[K]> }` |
| `Marks` | `never` |
| `Nodes` | `never` |

***

<a id="defineDOMEventHandler" name="defineDOMEventHandler"></a>

## defineDOMEventHandler()

> **defineDOMEventHandler**\<`Event`\>(`event`, `handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

Register a new event handler for the given event type.

### Type parameters

• **Event** *extends* keyof [`DOMEventMap`](https://prosemirror.net/docs/ref/#view.DOMEventMap) = `string`

### Parameters

• **event**: `Event`

• **handler**: [`DOMEventHandler`](core.md#DOMEventHandlerEvent)\<`Event`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineDefaultState" name="defineDefaultState"></a>

## defineDefaultState()

> **defineDefaultState**(`__namedParameters`): [`Extension`](core.md#ExtensionT)

### Parameters

• **\_\_namedParameters**: [`DefaultStateOptions`](core.md#DefaultStateOptions)

### Returns

[`Extension`](core.md#ExtensionT)

***

<a id="defineDoc" name="defineDoc"></a>

## defineDoc()

> **defineDoc**(): [`Extension`](core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"doc"` |

***

<a id="defineDocChangeHandler" name="defineDocChangeHandler"></a>

## defineDocChangeHandler()

> **defineDocChangeHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

Registers a event handler that is called when the editor document is changed.

### Parameters

• **handler**: [`DocChangeHandler`](core.md#DocChangeHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineDoubleClickHandler" name="defineDoubleClickHandler"></a>

## defineDoubleClickHandler()

> **defineDoubleClickHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick)

### Parameters

• **handler**: [`DoubleClickHandler`](core.md#DoubleClickHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineDoubleClickOnHandler" name="defineDoubleClickOnHandler"></a>

## defineDoubleClickOnHandler()

> **defineDoubleClickOnHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn)

### Parameters

• **handler**: [`DoubleClickOnHandler`](core.md#DoubleClickOnHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineDropHandler" name="defineDropHandler"></a>

## defineDropHandler()

> **defineDropHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop](https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop)

### Parameters

• **handler**: [`DropHandler`](core.md#DropHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineFocusChangeHandler" name="defineFocusChangeHandler"></a>

## defineFocusChangeHandler()

> **defineFocusChangeHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

Registers a event handler that is called when the editor gains or loses focus.

### Parameters

• **handler**: [`FocusChangeHandler`](core.md#FocusChangeHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineHistory" name="defineHistory"></a>

## defineHistory()

> **defineHistory**(): [`Extension`](core.md#ExtensionT)\<`object`\>

Add undo/redo history to the editor.

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `object` |
| `Marks` | `any` |
| `Nodes` | `any` |

***

<a id="defineKeyDownHandler" name="defineKeyDownHandler"></a>

## defineKeyDownHandler()

> **defineKeyDownHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown](https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown)

### Parameters

• **handler**: [`KeyDownHandler`](core.md#KeyDownHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineKeyPressHandler" name="defineKeyPressHandler"></a>

## defineKeyPressHandler()

> **defineKeyPressHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress](https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress)

### Parameters

• **handler**: [`KeyPressHandler`](core.md#KeyPressHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineKeymap" name="defineKeymap"></a>

## defineKeymap()

> **defineKeymap**(`keymap`): [`Extension`](core.md#ExtensionT)

### Parameters

• **keymap**: [`Keymap`](core.md#Keymap)

### Returns

[`Extension`](core.md#ExtensionT)

***

<a id="defineMarkAttr" name="defineMarkAttr"></a>

## defineMarkAttr()

> **defineMarkAttr**(`options`): [`Extension`](core.md#ExtensionT)

### Parameters

• **options**: [`MarkAttrOptions`](core.md#MarkAttrOptions)

### Returns

[`Extension`](core.md#ExtensionT)

***

<a id="defineMarkSpec" name="defineMarkSpec"></a>

## defineMarkSpec()

> **defineMarkSpec**\<`Mark`\>(`options`): [`Extension`](core.md#ExtensionT)\<`object`\>

### Type parameters

• **Mark** *extends* `string`

### Parameters

• **options**: [`MarkSpecOptions`](core.md#MarkSpecOptionsMarkName)\<`Mark`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `Mark` |
| `Nodes` | `never` |

***

<a id="defineMountHandler" name="defineMountHandler"></a>

## defineMountHandler()

> **defineMountHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

Registers a event handler that is called when the editor view is mounted.

### Parameters

• **handler**: [`MountHandler`](core.md#MountHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineNodeAttr" name="defineNodeAttr"></a>

## defineNodeAttr()

> **defineNodeAttr**(`options`): [`Extension`](core.md#ExtensionT)

Defines an attribute for a node type.

### Parameters

• **options**: [`NodeAttrOptions`](core.md#NodeAttrOptions)

### Returns

[`Extension`](core.md#ExtensionT)

***

<a id="defineNodeSpec" name="defineNodeSpec"></a>

## defineNodeSpec()

> **defineNodeSpec**\<`Node`\>(`options`): [`Extension`](core.md#ExtensionT)\<`object`\>

Defines a node type.

### Type parameters

• **Node** *extends* `string`

### Parameters

• **options**: [`NodeSpecOptions`](core.md#NodeSpecOptionsNodeName)\<`Node`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `Node` |

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

> **defineParagraph**(): [`Extension`](core.md#ExtensionT)\<`object`\>

Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"paragraph"` |

***

<a id="definePasteHandler" name="definePasteHandler"></a>

## definePasteHandler()

> **definePasteHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste)

### Parameters

• **handler**: [`PasteHandler`](core.md#PasteHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="definePlugin" name="definePlugin"></a>

## definePlugin()

> **definePlugin**(`plugin`): [`Extension`](core.md#ExtensionT)

Adds a ProseMirror plugin to the editor.

### Parameters

• **plugin**: [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)\<`any`\> \| [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)\<`any`\>[] \| (`context`) => [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)\<`any`\> \| [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)\<`any`\>[]

The ProseMirror plugin to add, or an array of plugins, or a
function that returns one or multiple plugins.

### Returns

[`Extension`](core.md#ExtensionT)

***

<a id="defineScrollToSelectionHandler" name="defineScrollToSelectionHandler"></a>

## defineScrollToSelectionHandler()

> **defineScrollToSelectionHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection](https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection)

### Parameters

• **handler**: [`ScrollToSelectionHandler`](core.md#ScrollToSelectionHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineText" name="defineText"></a>

## defineText()

> **defineText**(): [`Extension`](core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"text"` |

***

<a id="defineTextInputHandler" name="defineTextInputHandler"></a>

## defineTextInputHandler()

> **defineTextInputHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput](https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput)

### Parameters

• **handler**: [`TextInputHandler`](core.md#TextInputHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineTripleClickHandler" name="defineTripleClickHandler"></a>

## defineTripleClickHandler()

> **defineTripleClickHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick)

### Parameters

• **handler**: [`TripleClickHandler`](core.md#TripleClickHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineTripleClickOnHandler" name="defineTripleClickOnHandler"></a>

## defineTripleClickOnHandler()

> **defineTripleClickOnHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn)

### Parameters

• **handler**: [`TripleClickOnHandler`](core.md#TripleClickOnHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineUnmountHandler" name="defineUnmountHandler"></a>

## defineUnmountHandler()

> **defineUnmountHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

Registers a event handler that is called when the editor view is unmounted.

### Parameters

• **handler**: [`UnmountHandler`](core.md#UnmountHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

***

<a id="defineUpdateHandler" name="defineUpdateHandler"></a>

## defineUpdateHandler()

> **defineUpdateHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`any`\>

Registers a event handler that is called when the editor state is updated.

### Parameters

• **handler**: [`UpdateHandler`](core.md#UpdateHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`any`\>

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

• **options**

• **options.type**: `string` \| [`MarkType`](https://prosemirror.net/docs/ref/#model.MarkType)

The type of the mark to expand.

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

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

<a id="insertNode" name="insertNode"></a>

## insertNode()

> **insertNode**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that inserts the given node at the current selection or at
the given position.

### Parameters

• **options**: `object` \| `object`

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

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

• **options**

• **options.attrs?**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

If attrs is given, remove precisely the mark with the given attrs. Otherwise, remove all marks of the given type.

• **options.from?**: `number`

The start position of the document. By default it will be the start position of current selection.

• **options.to?**: `number`

The end position of the document. By default it will be the end position of current selection.

• **options.type**: `string` \| [`MarkType`](https://prosemirror.net/docs/ref/#model.MarkType)

The type of the mark to remove.

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="removeNode" name="removeNode"></a>

## removeNode()

> **removeNode**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command to remove the nearest ancestor node of a specific type from the current position.

### Parameters

• **options**

• **options.pos?**: `number`

The document position to start searching node. By default it will be the anchor position of current selection.

• **options.type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

The type of the node to remove.

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="setBlockType" name="setBlockType"></a>

## setBlockType()

> **setBlockType**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that tries to set the selected textblocks to the given node
type with the given attributes.

### Parameters

• **options**

• **options.attrs?**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

• **options.from?**: `number`

• **options.to?**: `number`

• **options.type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="setNodeAttrs" name="setNodeAttrs"></a>

## setNodeAttrs()

> **setNodeAttrs**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that set the attributes of the current node.

### Parameters

• **options**

• **options.attrs**: [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

The attributes to set.

• **options.pos?**: `number`

The position of the node. Defaults to the position of the wrapping node
containing the current selection.

• **options.type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType) \| `string`[] \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)[]

The type of node to set the attributes of.

If current node is not of this type, the command will do nothing.

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

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

> **toggleMark**(`__namedParameters`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that toggles the given mark with the given attributes.

### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.attrs?**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

• **\_\_namedParameters.type**: `string` \| [`MarkType`](https://prosemirror.net/docs/ref/#model.MarkType)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="toggleNode" name="toggleNode"></a>

## toggleNode()

> **toggleNode**(`__namedParameters`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that set the selected textblocks to the given node type
with the given attributes.

### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.attrs?**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

• **\_\_namedParameters.type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="union" name="union"></a>

## union()

> **union**\<`E`\>(`extension`): `UnionExtension`\<`E`\>

Merge multiple extensions into one.

### Type parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)\<`any`\> \| [`Extension`](core.md#ExtensionT)\<`any`\>[]

### Parameters

• **extension**: `E`

### Returns

`UnionExtension`\<`E`\>

### Throws

If no extensions are provided.

***

<a id="withPriority" name="withPriority"></a>

## withPriority()

> **withPriority**\<`T`\>(`extension`, `priority`): `T`

### Type parameters

• **T** *extends* [`Extension`](core.md#ExtensionT)\<`any`\>

### Parameters

• **extension**: `T`

• **priority**: [`Priority`](core.md#Priority)

### Returns

`T`
