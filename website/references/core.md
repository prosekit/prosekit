# prosekit/core

<a id="Priority" name="Priority"></a>

## Priority

ProseKit extension priority.

### Enumeration Members

| Member | Value |
| :------ | :------ |
| `default` | `2` |
| `high` | `1` |
| `highest` | `0` |
| `low` | `3` |
| `lowest` | `4` |

***

<a id="EditorE" name="EditorE"></a>

## Editor\<E\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT) = `any`

### Accessors

<a id="commands" name="commands"></a>

#### commands

> **`get`** **commands**(): `ToCommandApplier`\<`ExtractCommandArgs`\<`E`\>\>

##### Returns

`ToCommandApplier`\<`ExtractCommandArgs`\<`E`\>\>

<a id="marks" name="marks"></a>

#### marks

> **`get`** **marks**(): [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<[`ExtractMarks`](core.md#ExtractMarksE)\<`E`\>, `MarkBuilder`\>

##### Returns

[`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<[`ExtractMarks`](core.md#ExtractMarksE)\<`E`\>, `MarkBuilder`\>

<a id="mounted" name="mounted"></a>

#### mounted

> **`get`** **mounted**(): `boolean`

##### Returns

`boolean`

<a id="nodes" name="nodes"></a>

#### nodes

> **`get`** **nodes**(): [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<[`ExtractNodes`](core.md#ExtractNodesE)\<`E`\>, `NodeBuilder`\>

##### Returns

[`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<[`ExtractNodes`](core.md#ExtractNodesE)\<`E`\>, `NodeBuilder`\>

<a id="schema" name="schema"></a>

#### schema

> **`get`** **schema**(): [`Schema`]( https://prosemirror.net/docs/ref/#model.Schema )\<[`ExtractNodes`](core.md#ExtractNodesE)\<`E`\>, [`ExtractMarks`](core.md#ExtractMarksE)\<`E`\>\>

##### Returns

[`Schema`]( https://prosemirror.net/docs/ref/#model.Schema )\<[`ExtractNodes`](core.md#ExtractNodesE)\<`E`\>, [`ExtractMarks`](core.md#ExtractMarksE)\<`E`\>\>

<a id="view" name="view"></a>

#### view

> **`get`** **view**(): [`EditorView`]( https://prosemirror.net/docs/ref/#view.EditorView )

##### Returns

[`EditorView`]( https://prosemirror.net/docs/ref/#view.EditorView )

### Methods

<a id="mount" name="mount"></a>

#### mount()

> **mount**(`place`): `void`

##### Parameters

• **place**: `undefined` \| `null` \| `void` \| [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

##### Returns

`void`

<a id="unmount" name="unmount"></a>

#### unmount()

> **unmount**(): `void`

##### Returns

`void`

<a id="use" name="use"></a>

#### use()

> **use**(`extension`): `VoidFunction`

##### Parameters

• **extension**: [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

##### Returns

`VoidFunction`

***

<a id="FacetInput-Output" name="FacetInput-Output"></a>

## Facet\<Input, Output\>

### Type parameters

• **Input**

• **Output**

### Methods

<a id="extension" name="extension"></a>

#### extension()

> **extension**(`payloads`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

##### Parameters

• **payloads**: `Input`[]

##### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

<a id="define" name="define"></a>

#### define()

> **`static`** **define**\<`Input`, `Output`\>(`__namedParameters`): [`Facet`](core.md#FacetInput-Output)\<`Input`, `Output`\>

##### Type parameters

• **Input**

• **Output**

##### Parameters

• **\_\_namedParameters**: [`FacetOptions`](core.md#FacetOptionsInput-Output)\<`Input`, `Output`\>

##### Returns

[`Facet`](core.md#FacetInput-Output)\<`Input`, `Output`\>

***

<a id="ProseKitError" name="ProseKitError"></a>

## ProseKitError

Base class for all ProseKit errors.

### Extends

- [`Error`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error )

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new ProseKitError(message)

> **new ProseKitError**(`message`?): [`ProseKitError`](core.md#ProseKitError)

##### Parameters

• **message?**: `string`

##### Returns

[`ProseKitError`](core.md#ProseKitError)

##### Inherited from

`Error.constructor`

#### new ProseKitError(message, options)

> **new ProseKitError**(`message`?, `options`?): [`ProseKitError`](core.md#ProseKitError)

##### Parameters

• **message?**: `string`

• **options?**: `ErrorOptions`

##### Returns

[`ProseKitError`](core.md#ProseKitError)

##### Inherited from

`Error.constructor`

***

<a id="BaseNodeViewOptions" name="BaseNodeViewOptions"></a>

## BaseNodeViewOptions

Some basic props for custom node views.

### Extended By

- [`ReactNodeViewOptions`](react.md#ReactNodeViewOptions)
- [`VueNodeViewOptions`](vue.md#VueNodeViewOptions)

### Properties

<a id="as" name="as"></a>

#### as?

> **as**?: `string` \| [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement ) \| (`node`) => [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

The wrapping DOM element for the node view. Defaults to `div` for block nodes and `span` for inline nodes.

<a id="contentAs" name="contentAs"></a>

#### contentAs?

> **contentAs**?: `string` \| [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement ) \| (`node`) => [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

The wrapping DOM element for the node view's content. Defaults to `div` for block nodes and `span` for inline nodes.

<a id="deselectNode" name="deselectNode"></a>

#### deselectNode?

> **deselectNode**?: () => `void`

##### Returns

`void`

<a id="destroy" name="destroy"></a>

#### destroy?

> **destroy**?: () => `void`

##### Returns

`void`

<a id="ignoreMutation" name="ignoreMutation"></a>

#### ignoreMutation?

> **ignoreMutation**?: (`mutation`) => `boolean`

##### Parameters

• **mutation**: [`MutationRecord`]( https://developer.mozilla.org/docs/Web/API/MutationRecord )

##### Returns

`boolean`

<a id="onUpdate" name="onUpdate"></a>

#### onUpdate?

> **onUpdate**?: () => `void`

##### Returns

`void`

<a id="selectNode" name="selectNode"></a>

#### selectNode?

> **selectNode**?: () => `void`

##### Returns

`void`

<a id="setSelection" name="setSelection"></a>

#### setSelection?

> **setSelection**?: (`anchor`, `head`, `root`) => `void`

##### Parameters

• **anchor**: `number`

• **head**: `number`

• **root**: [`Document`]( https://developer.mozilla.org/docs/Web/API/Document ) \| [`ShadowRoot`]( https://developer.mozilla.org/docs/Web/API/ShadowRoot )

##### Returns

`void`

<a id="stopEvent" name="stopEvent"></a>

#### stopEvent?

> **stopEvent**?: (`event`) => `boolean`

##### Parameters

• **event**: [`Event`]( https://developer.mozilla.org/docs/Web/API/Event )

##### Returns

`boolean`

<a id="update" name="update"></a>

#### update?

> **update**?: (`node`, `decorations`, `innerDecorations`) => `boolean`

##### Parameters

• **node**: [`Node`]( https://prosemirror.net/docs/ref/#model.Node )

• **decorations**: readonly [`Decoration`]( https://prosemirror.net/docs/ref/#view.Decoration )[]

• **innerDecorations**: [`DecorationSource`]( https://prosemirror.net/docs/ref/#view.DecorationSource )

##### Returns

`boolean`

***

<a id="DefaultStateOptions" name="DefaultStateOptions"></a>

## DefaultStateOptions

### Properties

<a id="defaultDoc" name="defaultDoc"></a>

#### defaultDoc?

> **defaultDoc**?: [`NodeJSON`](core.md#NodeJSON)

A JSON object representing the starting document to use when creating the
editor.

<a id="defaultHTML" name="defaultHTML"></a>

#### defaultHTML?

> **defaultHTML**?: `string` \| [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

A HTML element or a HTML string representing the starting document to use
when creating the editor.

<a id="defaultSelection" name="defaultSelection"></a>

#### defaultSelection?

> **defaultSelection**?: [`SelectionJSON`](core.md#SelectionJSON)

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultDoc` or `defaultHTML` is also provided.

***

<a id="EditorOptionsE" name="EditorOptionsE"></a>

## EditorOptions\<E\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)

### Properties

<a id="defaultDoc-1" name="defaultDoc-1"></a>

#### defaultDoc?

> **defaultDoc**?: [`NodeJSON`](core.md#NodeJSON)

A JSON object representing the starting document to use when creating the
editor.

<a id="defaultHTML-1" name="defaultHTML-1"></a>

#### defaultHTML?

> **defaultHTML**?: `string` \| [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

A HTML element or a HTML string representing the starting document to use
when creating the editor.

<a id="defaultSelection-1" name="defaultSelection-1"></a>

#### defaultSelection?

> **defaultSelection**?: [`SelectionJSON`](core.md#SelectionJSON)

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultDoc` or `defaultHTML` is also provided.

<a id="extension-1" name="extension-1"></a>

#### extension

> **extension**: `E`

The extension to use when creating the editor.

***

<a id="ExtensionT" name="ExtensionT"></a>

## Extension\<T\>

### Type parameters

• **T** extends `ExtensionTyping` = `ExtensionTyping`

### Properties

<a id="type" name="type"></a>

#### \_type?

> **\_type**?: `T`

<a id="extension-2" name="extension-2"></a>

#### extension

> **extension**: [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> \| [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>[]

<a id="priority" name="priority"></a>

#### priority?

> **priority**?: `lowest` \| `low` \| `default` \| `high` \| `highest`

<a id="schema-1" name="schema-1"></a>

#### schema

> **schema**: `null` \| [`Schema`]( https://prosemirror.net/docs/ref/#model.Schema )\<`any`, `any`\>

The schema that this extension represents.

***

<a id="FacetOptionsInput-Output" name="FacetOptionsInput-Output"></a>

## FacetOptions\<Input, Output\>

### Type parameters

• **Input**

• **Output**

### Properties

<a id="convert" name="convert"></a>

#### convert?

> **convert**?: (`payloads`) => `Output`

##### Parameters

• **payloads**: `Input`[]

##### Returns

`Output`

<a id="converter" name="converter"></a>

#### converter?

> **converter**?: () => `FacetConverter`\<`Input`, `Output`\>

##### Returns

`FacetConverter`\<`Input`, `Output`\>

<a id="next" name="next"></a>

#### next

> **next**: [`Facet`](core.md#FacetInput-Output)\<`Output`, `any`\>

<a id="singleton" name="singleton"></a>

#### singleton?

> **singleton**?: `boolean`

***

<a id="Keymap" name="Keymap"></a>

## Keymap

### Indexable

 \[`key`: `string`\]: [`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="MarkAttrOptions" name="MarkAttrOptions"></a>

## MarkAttrOptions

### Properties

<a id="attr" name="attr"></a>

#### attr

> **attr**: `string`

The name of the attribute.

<a id="default" name="default"></a>

#### default?

> **default**?: `any`

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a mark
of a type that has them is created.

<a id="parseDOM" name="parseDOM"></a>

#### parseDOM?

> **parseDOM**?: (`node`) => `unknown`

Parses the attribute value from the DOM.

Parses the attribute value from the DOM.

##### Parameters

• **node**: [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

##### Returns

`unknown`

<a id="toDom" name="toDom"></a>

#### toDom

> **toDom**: (`value`) => `null` \| `void` \| [`string`, `string`]

Returns the attribute key and value to be set on the DOM node.

Returns the attribute key and value to be set on the DOM node.

##### Parameters

• **value**: `unknown`

##### Returns

`null` \| `void` \| [`string`, `string`]

<a id="type-1" name="type-1"></a>

#### type

> **type**: `string`

The name of the mark type.

***

<a id="MarkSpecOptionsMarkName" name="MarkSpecOptionsMarkName"></a>

## MarkSpecOptions\<MarkName\>

### Extends

- [`MarkSpec`]( https://prosemirror.net/docs/ref/#model.MarkSpec )

### Type parameters

• **MarkName** extends `string` = `string`

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

<a id="default-1" name="default-1"></a>

#### default?

> **default**?: `any`

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
of a type that has them is created.

<a id="parseDOM-1" name="parseDOM-1"></a>

#### parseDOM?

> **parseDOM**?: (`node`) => `unknown`

Parses the attribute value from the DOM.

Parses the attribute value from the DOM.

##### Parameters

• **node**: [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

##### Returns

`unknown`

<a id="toDom-1" name="toDom-1"></a>

#### toDom

> **toDom**: (`value`) => `null` \| `void` \| [`string`, `string`]

Returns the attribute key and value to be set on the DOM node.

Returns the attribute key and value to be set on the DOM node.

##### Parameters

• **value**: `unknown`

##### Returns

`null` \| `void` \| [`string`, `string`]

<a id="type-2" name="type-2"></a>

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

> **attrs**?: [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, `any`\>

<a id="content" name="content"></a>

#### content?

> **content**?: [`NodeJSON`](core.md#NodeJSON)[]

<a id="marks-1" name="marks-1"></a>

#### marks?

> **marks**?: `any`[]

<a id="text" name="text"></a>

#### text?

> **text**?: `string`

<a id="type-3" name="type-3"></a>

#### type

> **type**: `string`

***

<a id="NodeSpecOptionsNodeName" name="NodeSpecOptionsNodeName"></a>

## NodeSpecOptions\<NodeName\>

### Extends

- [`NodeSpec`]( https://prosemirror.net/docs/ref/#model.NodeSpec )

### Type parameters

• **NodeName** extends `string` = `string`

### Properties

<a id="name-1" name="name-1"></a>

#### name

> **name**: `NodeName`

<a id="topNode" name="topNode"></a>

#### topNode?

> **topNode**?: `boolean`

***

<a id="NodeViewOptions" name="NodeViewOptions"></a>

## NodeViewOptions

### Properties

<a id="constructor" name="constructor"></a>

#### constructor

> **constructor**: [`NodeViewConstructor`]( https://prosemirror.net/docs/ref/#view.NodeViewConstructor )

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

<a id="type-4" name="type-4"></a>

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

<a id="DocChangeHandler" name="DocChangeHandler"></a>

## DocChangeHandler

> **DocChangeHandler**: (`view`, `prevState`) => `void`

A function that is called when the editor document is changed.

### Parameters

• **view**: [`EditorView`]( https://prosemirror.net/docs/ref/#view.EditorView )

The editor view.

• **prevState**: [`EditorState`]( https://prosemirror.net/docs/ref/#state.EditorState )

The previous editor state.

### Returns

`void`

***

<a id="ExtractCommandAppliersE" name="ExtractCommandAppliersE"></a>

## ExtractCommandAppliers\<E\>

> **ExtractCommandAppliers**\<`E`\>: `ToCommandApplier`\<`ExtractCommandArgs`\<`E`\>\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)

***

<a id="ExtractCommandCreatorsE" name="ExtractCommandCreatorsE"></a>

## ExtractCommandCreators\<E\>

> **ExtractCommandCreators**\<`E`\>: `ToCommandCreators`\<`ExtractCommandArgs`\<`E`\>\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)

***

<a id="ExtractMarksE" name="ExtractMarksE"></a>

## ExtractMarks\<E\>

> **ExtractMarks**\<`E`\>: `ExtractMarksFromTyping`\<`ExtractTyping`\<`E`\>\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)

***

<a id="ExtractNodesE" name="ExtractNodesE"></a>

## ExtractNodes\<E\>

> **ExtractNodes**\<`E`\>: `ExtractNodesFromTyping`\<`ExtractTyping`\<`E`\>\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)

***

<a id="MountHandler" name="MountHandler"></a>

## MountHandler

> **MountHandler**: (`view`) => `void`

A function that is called when the editor view is mounted.

### Parameters

• **view**: [`EditorView`]( https://prosemirror.net/docs/ref/#view.EditorView )

The editor view.

### Returns

`void`

***

<a id="SimplifyUnionT" name="SimplifyUnionT"></a>

## SimplifyUnion\<T\>

> **SimplifyUnion**\<`T`\>: `Simplify`\<`UnionToIntersection`\<`T`\>\>

### Intneral

### Type parameters

• **T**

***

<a id="UnmountHandler" name="UnmountHandler"></a>

## UnmountHandler

> **UnmountHandler**: () => `void`

A function that is called when the editor view is unmounted.

### Returns

`void`

***

<a id="UpdateHandler" name="UpdateHandler"></a>

## UpdateHandler

> **UpdateHandler**: (`view`, `prevState`) => `void`

A function that is called when the editor state is updated.

### Parameters

• **view**: [`EditorView`]( https://prosemirror.net/docs/ref/#view.EditorView )

The editor view.

• **prevState**: [`EditorState`]( https://prosemirror.net/docs/ref/#state.EditorState )

The previous editor state.

### Returns

`void`

***

<a id="addMark" name="addMark"></a>

## addMark()

> **addMark**(`options`): [`Command`]( https://prosemirror.net/docs/ref/#state.Command )

Add the given mark to the inline content.

### Parameters

• **options**: `Object`

• **options\.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

The attributes of the mark to add.

• **options\.from?**: `number`

The start position of the document. By default it will be the start position of current selection.

• **options\.to?**: `number`

The end position of the document. By default it will be the end position of current selection.

• **options\.type**: `string` \| [`MarkType`]( https://prosemirror.net/docs/ref/#model.MarkType )

The type of the mark to add.

### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="createEditor" name="createEditor"></a>

## createEditor()

> **createEditor**\<`E`\>(`__namedParameters`): [`Editor`](core.md#EditorE)\<`E`\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Parameters

• **\_\_namedParameters**: [`EditorOptions`](core.md#EditorOptionsE)\<`E`\>

### Returns

[`Editor`](core.md#EditorE)\<`E`\>

***

<a id="defineBaseCommands" name="defineBaseCommands"></a>

## defineBaseCommands()

> **defineBaseCommands**(): [`Extension`](core.md#ExtensionT)\<`Object`\>

Add some base commands

### Returns

[`Extension`](core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.addMark` | [`Object`] | - |
> | `COMMAND_ARGS.insertNode` | [`Object` \| `Object`] | - |
> | `COMMAND_ARGS.insertText` | [`Object`] | - |
> | `COMMAND_ARGS.removeMark` | [`Object`] | - |
> | `COMMAND_ARGS.selectAll` | [] | - |
> | `COMMAND_ARGS.setBlockType` | [`Object`] | - |
> | `COMMAND_ARGS.wrap` | [`Object`] | - |
>

***

<a id="defineBaseKeymap" name="defineBaseKeymap"></a>

## defineBaseKeymap()

> **defineBaseKeymap**(`options`?): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Defines some basic key bindings.

### Parameters

• **options?**: `Object`

• **options\.priority?**: `lowest` \| `low` \| `default` \| `high` \| `highest`

The priority of the keymap.

**Default**
```ts
Priority.low
```

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineCommands" name="defineCommands"></a>

## defineCommands()

> **defineCommands**\<`T`\>(`commands`): [`Extension`](core.md#ExtensionT)\<`Object`\>

### Type parameters

• **T** extends [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, `CommandCreator`\> = [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, `CommandCreator`\>

### Parameters

• **commands**: `T`

### Returns

[`Extension`](core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `{ [K in keyof T]: Parameters<T[K]> }` | - |
>

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

> **defineDoc**(): [`Extension`](core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `NODES` | `"doc"` | - |
>

***

<a id="defineDocChangeHandler" name="defineDocChangeHandler"></a>

## defineDocChangeHandler()

> **defineDocChangeHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Registers a event handler that is called when the editor document is changed.

### Parameters

• **handler**: [`DocChangeHandler`](core.md#DocChangeHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineHistory" name="defineHistory"></a>

## defineHistory()

> **defineHistory**(): [`Extension`](core.md#ExtensionT)\<`Object`\>

Add undo/redo history to the editor.

### Returns

[`Extension`](core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.redo` | [] | - |
> | `COMMAND_ARGS.undo` | [] | - |
>

***

<a id="defineInputRule" name="defineInputRule"></a>

## ~~defineInputRule()~~

> **defineInputRule**(`rule`): [`Extension`](core.md#ExtensionT)

Defines an input rule extension.

### Parameters

• **rule**: [`InputRule`]( https://prosemirror.net/docs/ref/#inputrules.InputRule ) \| [`InputRule`]( https://prosemirror.net/docs/ref/#inputrules.InputRule )[] \| (`context`) => [`InputRule`]( https://prosemirror.net/docs/ref/#inputrules.InputRule ) \| [`InputRule`]( https://prosemirror.net/docs/ref/#inputrules.InputRule )[]

The ProseMirror input rule to add, or an array of input rules,
or a function that returns one or multiple input rules.

### Returns

[`Extension`](core.md#ExtensionT)

### Deprecated

Use `prosekit/extensions/input-rule` instead.

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

> **defineMarkSpec**\<`Mark`\>(`options`): [`Extension`](core.md#ExtensionT)\<`Object`\>

### Type parameters

• **Mark** extends `string`

### Parameters

• **options**: [`MarkSpecOptions`](core.md#MarkSpecOptionsMarkName)\<`Mark`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `MARKS` | `Mark` | - |
>

***

<a id="defineMountHandler" name="defineMountHandler"></a>

## defineMountHandler()

> **defineMountHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Registers a event handler that is called when the editor view is mounted.

### Parameters

• **handler**: [`MountHandler`](core.md#MountHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

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

> **defineNodeSpec**\<`NodeName`\>(`options`): [`Extension`](core.md#ExtensionT)\<`Object`\>

Defines a node type.

### Type parameters

• **NodeName** extends `string`

### Parameters

• **options**: [`NodeSpecOptions`](core.md#NodeSpecOptionsNodeName)\<`NodeName`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `NODES` | `NodeName` | - |
>

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

> **defineParagraph**(): [`Extension`](core.md#ExtensionT)\<`Object`\>

Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.

### Returns

[`Extension`](core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `NODES` | `"paragraph"` | - |
>

***

<a id="definePlugin" name="definePlugin"></a>

## definePlugin()

> **definePlugin**(`plugin`): [`Extension`](core.md#ExtensionT)

Adds a ProseMirror plugin to the editor.

### Parameters

• **plugin**: [`Plugin`]( https://prosemirror.net/docs/ref/#state.Plugin )\<`any`\> \| [`Plugin`]( https://prosemirror.net/docs/ref/#state.Plugin )\<`any`\>[] \| (`context`) => [`Plugin`]( https://prosemirror.net/docs/ref/#state.Plugin )\<`any`\> \| [`Plugin`]( https://prosemirror.net/docs/ref/#state.Plugin )\<`any`\>[]

The ProseMirror plugin to add, or an array of plugins, or a
function that returns one or multiple plugins.

### Returns

[`Extension`](core.md#ExtensionT)

***

<a id="defineText" name="defineText"></a>

## defineText()

> **defineText**(): [`Extension`](core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `NODES` | `"text"` | - |
>

***

<a id="defineUnmountHandler" name="defineUnmountHandler"></a>

## defineUnmountHandler()

> **defineUnmountHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Registers a event handler that is called when the editor view is unmounted.

### Parameters

• **handler**: [`UnmountHandler`](core.md#UnmountHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineUpdateHandler" name="defineUpdateHandler"></a>

## defineUpdateHandler()

> **defineUpdateHandler**(`handler`): [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Registers a event handler that is called when the editor state is updated.

### Parameters

• **handler**: [`UpdateHandler`](core.md#UpdateHandler)

### Returns

[`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="insertNode" name="insertNode"></a>

## insertNode()

> **insertNode**(`options`): [`Command`]( https://prosemirror.net/docs/ref/#state.Command )

### Parameters

• **options**: `Object` \| `Object`

### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="jsonFromElement" name="jsonFromElement"></a>

## jsonFromElement()

> **jsonFromElement**(`element`, `schema`): [`NodeJSON`](core.md#NodeJSON)

Parse a HTML element to a ProseMirror document JSON.

### Parameters

• **element**: [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

• **schema**: [`Schema`]( https://prosemirror.net/docs/ref/#model.Schema )\<`any`, `any`\>

### Returns

[`NodeJSON`](core.md#NodeJSON)

***

<a id="jsonFromHTML" name="jsonFromHTML"></a>

## jsonFromHTML()

> **jsonFromHTML**(`html`, `schema`): [`NodeJSON`](core.md#NodeJSON)

Parse a HTML string to a ProseMirror document JSON.

### Parameters

• **html**: `string`

• **schema**: [`Schema`]( https://prosemirror.net/docs/ref/#model.Schema )\<`any`, `any`\>

### Returns

[`NodeJSON`](core.md#NodeJSON)

***

<a id="jsonFromNode" name="jsonFromNode"></a>

## jsonFromNode()

> **jsonFromNode**(`node`): [`NodeJSON`](core.md#NodeJSON)

Return a JSON object representing this node.

### Parameters

• **node**: [`Node`]( https://prosemirror.net/docs/ref/#model.Node )

### Returns

[`NodeJSON`](core.md#NodeJSON)

***

<a id="jsonFromState" name="jsonFromState"></a>

## jsonFromState()

> **jsonFromState**(`state`): [`StateJSON`](core.md#StateJSON)

Return a JSON object representing this state.

### Parameters

• **state**: [`EditorState`]( https://prosemirror.net/docs/ref/#state.EditorState )

### Returns

[`StateJSON`](core.md#StateJSON)

***

<a id="nodeFromElement" name="nodeFromElement"></a>

## nodeFromElement()

> **nodeFromElement**(`element`, `schema`): [`ProseMirrorNode`]( https://prosemirror.net/docs/ref/#model.Node )

Parse a HTML element to a ProseMirror node.

### Parameters

• **element**: [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

• **schema**: [`Schema`]( https://prosemirror.net/docs/ref/#model.Schema )\<`any`, `any`\>

### Returns

[`ProseMirrorNode`]( https://prosemirror.net/docs/ref/#model.Node )

***

<a id="nodeFromHTML" name="nodeFromHTML"></a>

## nodeFromHTML()

> **nodeFromHTML**(`html`, `schema`): [`ProseMirrorNode`]( https://prosemirror.net/docs/ref/#model.Node )

Parse a HTML string to a ProseMirror node.

### Parameters

• **html**: `string`

• **schema**: [`Schema`]( https://prosemirror.net/docs/ref/#model.Schema )\<`any`, `any`\>

### Returns

[`ProseMirrorNode`]( https://prosemirror.net/docs/ref/#model.Node )

***

<a id="nodeFromJSON" name="nodeFromJSON"></a>

## nodeFromJSON()

> **nodeFromJSON**(`json`, `schema`): [`ProseMirrorNode`]( https://prosemirror.net/docs/ref/#model.Node )

Parse a JSON object to a ProseMirror node.

### Parameters

• **json**: [`NodeJSON`](core.md#NodeJSON)

• **schema**: [`Schema`]( https://prosemirror.net/docs/ref/#model.Schema )\<`any`, `any`\>

### Returns

[`ProseMirrorNode`]( https://prosemirror.net/docs/ref/#model.Node )

***

<a id="removeMark" name="removeMark"></a>

## removeMark()

> **removeMark**(`options`): [`Command`]( https://prosemirror.net/docs/ref/#state.Command )

Remove the given mark from the inline content.

### Parameters

• **options**: `Object`

• **options\.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

If attrs is given, remove precisely the mark with the given attrs. Otherwise, remove all marks of the given type.

• **options\.from?**: `number`

The start position of the document. By default it will be the start position of current selection.

• **options\.to?**: `number`

The end position of the document. By default it will be the end position of current selection.

• **options\.type**: `string` \| [`MarkType`]( https://prosemirror.net/docs/ref/#model.MarkType )

The type of the mark to remove.

### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="setBlockType" name="setBlockType"></a>

## setBlockType()

> **setBlockType**(`options`): [`Command`]( https://prosemirror.net/docs/ref/#state.Command )

Returns a command that tries to set the selected textblocks to the given node
type with the given attributes.

### Parameters

• **options**: `Object`

• **options\.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

• **options\.from?**: `number`

• **options\.to?**: `number`

• **options\.type**: `string` \| [`NodeType`]( https://prosemirror.net/docs/ref/#model.NodeType )

### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="stateFromJSON" name="stateFromJSON"></a>

## stateFromJSON()

> **stateFromJSON**(`json`, `schema`): [`EditorState`]( https://prosemirror.net/docs/ref/#state.EditorState )

Parse a JSON object to a ProseMirror state.

### Parameters

• **json**: [`StateJSON`](core.md#StateJSON)

• **schema**: [`Schema`]( https://prosemirror.net/docs/ref/#model.Schema )\<`any`, `any`\>

### Returns

[`EditorState`]( https://prosemirror.net/docs/ref/#state.EditorState )

***

<a id="toggleMark" name="toggleMark"></a>

## toggleMark()

> **toggleMark**(`__namedParameters`): [`Command`]( https://prosemirror.net/docs/ref/#state.Command )

### Parameters

• **\_\_namedParameters**: `Object`

• **\_\_namedParameters\.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

• **\_\_namedParameters\.type**: `string` \| [`MarkType`]( https://prosemirror.net/docs/ref/#model.MarkType )

### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="toggleNode" name="toggleNode"></a>

## toggleNode()

> **toggleNode**(`__namedParameters`): [`Command`]( https://prosemirror.net/docs/ref/#state.Command )

### Parameters

• **\_\_namedParameters**: `Object`

• **\_\_namedParameters\.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

• **\_\_namedParameters\.type**: `string` \| [`NodeType`]( https://prosemirror.net/docs/ref/#model.NodeType )

### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="union" name="union"></a>

## union()

> **union**\<`E`\>(`extension`): `SimplifyExtension`\<`E`\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> \| [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>[]

### Parameters

• **extension**: `E`

### Returns

`SimplifyExtension`\<`E`\>

***

<a id="withPriority" name="withPriority"></a>

## withPriority()

> **withPriority**\<`T`\>(`extension`, `priority`): `T`

### Type parameters

• **T** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Parameters

• **extension**: `T`

• **priority**: [`Priority`](core.md#Priority)

### Returns

`T`

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
