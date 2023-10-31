# prosekit/core

<a id="priority" name="priority"></a>

## Priority

### Enumeration Members

| Member | Value |
| :------ | :------ |
| `default` | `2` |
| `high` | `1` |
| `highest` | `0` |
| `low` | `3` |
| `lowest` | `4` |

***

<a id="editore" name="editore"></a>

## Editor`<E>`

### Type parameters

▪ **E** extends [`Extension`](core.md#extensiont) = `any`

### Constructors

<a id="constructors" name="constructors"></a>

#### new Editor(instance)

```ts
private new Editor<E>(instance): Editor<E>
```

##### Parameters

▪ **instance**: `EditorInstance`

##### Returns

[`Editor`](core.md#editore)\<`E`\>

### Properties

| Modifier | Property | Type | Description |
| :------ | :------ | :------ | :------ |
| `private` | `afterMounted` | `VoidFunction`[] | - |
| `private` | `instance` | `EditorInstance` | - |

### Accessors

<a id="commands" name="commands"></a>

#### commands

```ts
get commands(): ToCommandApplier<ExtractCommandArgs<E>>
```

##### Returns

`ToCommandApplier`\<`ExtractCommandArgs`\<`E`\>\>

<a id="marks" name="marks"></a>

#### marks

```ts
get marks(): Record<ExtractMarks<E>, MarkBuilder>
```

##### Returns

`Record`\<[`ExtractMarks`](core.md#extractmarkse)\<`E`\>, `MarkBuilder`\>

<a id="mounted" name="mounted"></a>

#### mounted

```ts
get mounted(): boolean
```

##### Returns

`boolean`

<a id="nodes" name="nodes"></a>

#### nodes

```ts
get nodes(): Record<ExtractNodes<E>, NodeBuilder>
```

##### Returns

`Record`\<[`ExtractNodes`](core.md#extractnodese)\<`E`\>, `NodeBuilder`\>

<a id="schema" name="schema"></a>

#### schema

```ts
get schema(): Schema<ExtractNodes<E>, ExtractMarks<E>>
```

##### Returns

[`Schema`]( https://prosemirror.net/docs/ref/#model.Schema )\<[`ExtractNodes`](core.md#extractnodese)\<`E`\>, [`ExtractMarks`](core.md#extractmarkse)\<`E`\>\>

<a id="view" name="view"></a>

#### view

```ts
get view(): EditorView
```

##### Returns

[`EditorView`]( https://prosemirror.net/docs/ref/#view.EditorView )

### Methods

<a id="ismarkactive" name="ismarkactive"></a>

#### isMarkActive()

```ts
isMarkActive(markType, attrs?): boolean
```

##### Parameters

▪ **markType**: `string` \| [`MarkType`]( https://prosemirror.net/docs/ref/#model.MarkType )

▪ **attrs?**: [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

##### Returns

`boolean`

##### Deprecated

<a id="isnodeactive" name="isnodeactive"></a>

#### isNodeActive()

```ts
isNodeActive(nodeType, attrs?): boolean
```

##### Parameters

▪ **nodeType**: `string` \| [`NodeType`]( https://prosemirror.net/docs/ref/#model.NodeType )

▪ **attrs?**: [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

##### Returns

`boolean`

##### Deprecated

<a id="mount" name="mount"></a>

#### mount()

```ts
mount(place): void
```

##### Parameters

▪ **place**: `undefined` \| `null` \| `void` \| [`HTMLElement`]( https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement )

##### Returns

`void`

<a id="unmount" name="unmount"></a>

#### unmount()

```ts
unmount(): void
```

##### Returns

`void`

<a id="use" name="use"></a>

#### use()

```ts
use(extension): VoidFunction
```

##### Parameters

▪ **extension**: [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

##### Returns

`VoidFunction`

***

<a id="facetinput-output" name="facetinput-output"></a>

## Facet`<Input, Output>`

### Type parameters

▪ **Input**

▪ **Output**

### Constructors

<a id="constructors-1" name="constructors-1"></a>

#### new Facet(converter, next, singleton)

```ts
private new Facet<Input, Output>(
   converter, 
   next, 
singleton): Facet<Input, Output>
```

##### Parameters

▪ **converter**: () => `FacetConverter`\<`Input`, `Output`\>

▪ **next**: `null` \| [`Facet`](core.md#facetinput-output)\<`Output`, `any`\>

▪ **singleton**: `boolean`

##### Returns

[`Facet`](core.md#facetinput-output)\<`Input`, `Output`\>

### Methods

<a id="extension" name="extension"></a>

#### extension()

```ts
extension(payloads): FacetExtension<Input, Output>
```

##### Parameters

▪ **payloads**: `Input`[]

##### Returns

[`FacetExtension`](core.md#facetextensioninput-output)\<`Input`, `Output`\>

<a id="define" name="define"></a>

#### define()

```ts
static define<Input, Output>(__namedParameters): Facet<Input, Output>
```

##### Type parameters

▪ **Input**

▪ **Output**

##### Parameters

▪ **\_\_namedParameters**: [`FacetOptions`](core.md#facetoptionsinput-output)\<`Input`, `Output`\>

##### Returns

[`Facet`](core.md#facetinput-output)\<`Input`, `Output`\>

***

<a id="facetextensioninput-output" name="facetextensioninput-output"></a>

## FacetExtension`<Input, Output>`

### Type parameters

▪ **Input**

▪ **Output**

### Constructors

<a id="constructors-2" name="constructors-2"></a>

#### new FacetExtension(facet, payloads)

```ts
new FacetExtension<Input, Output>(facet, payloads): FacetExtension<Input, Output>
```

##### Parameters

▪ **facet**: [`Facet`](core.md#facetinput-output)\<`Input`, `Output`\>

▪ **payloads**: `Input`[]

##### Returns

[`FacetExtension`](core.md#facetextensioninput-output)\<`Input`, `Output`\>

### Properties

| Modifier | Property | Type | Description |
| :------ | :------ | :------ | :------ |
| `public` | `extension` | [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> | - |
| `readonly` | `facet` | [`Facet`](core.md#facetinput-output)\<`Input`, `Output`\> | - |
| `readonly` | `payloads` | `Input`[] | - |

***

<a id="prosekiterror" name="prosekiterror"></a>

## ProseKitError

Base class for all ProseKit errors.

### Extends

- [`Error`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error )

### Constructors

<a id="constructors-3" name="constructors-3"></a>

#### new ProseKitError(message)

```ts
new ProseKitError(message?): ProseKitError
```

##### Parameters

▪ **message?**: `string`

##### Returns

[`ProseKitError`](core.md#prosekiterror)

##### Inherited from

Error.constructor

#### new ProseKitError(message, options)

```ts
new ProseKitError(message?, options?): ProseKitError
```

##### Parameters

▪ **message?**: `string`

▪ **options?**: `ErrorOptions`

##### Returns

[`ProseKitError`](core.md#prosekiterror)

##### Inherited from

Error.constructor

***

<a id="defaultstateoptions" name="defaultstateoptions"></a>

## DefaultStateOptions

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `doc`? | [`NodeJson`](core.md#nodejson) | A JSON representation of a ProseMirror document. |
| `selection`? | [`SelectionJson`](core.md#selectionjson) | A JSON representation of a ProseMirror selection. |

***

<a id="editoroptionse" name="editoroptionse"></a>

## EditorOptions`<E>`

### Type parameters

▪ **E** extends [`Extension`](core.md#extensiont)

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `defaultDoc`? | [`NodeJson`](core.md#nodejson) | A JSON object representing the starting document to use when creating the<br />editor. |
| `defaultSelection`? | [`SelectionJson`](core.md#selectionjson) | A JSON object representing the starting selection to use when creating the<br />editor. It's only used when `defaultDoc` is also provided. |
| `extension` | `E` | The extension to use when creating the editor. |

***

<a id="extensiont" name="extensiont"></a>

## Extension`<T>`

### Type parameters

▪ **T** extends `ExtensionTyping` = `ExtensionTyping`

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `_type`? | `T` | - |
| `extension` | [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> \| [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>[] | - |
| `priority`? | [`Priority`](core.md#priority) | - |

***

<a id="facetoptionsinput-output" name="facetoptionsinput-output"></a>

## FacetOptions`<Input, Output>`

### Type parameters

▪ **Input**

▪ **Output**

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `convert`? | (`payloads`) => `Output` | - |
| `converter`? | () => `FacetConverter`\<`Input`, `Output`\> | - |
| `next` | [`Facet`](core.md#facetinput-output)\<`Output`, `any`\> | - |
| `singleton`? | `boolean` | - |

***

<a id="keymap" name="keymap"></a>

## Keymap

### Indexable

 \[`key`: `string`\]: [`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="markspecoptionsmarkname" name="markspecoptionsmarkname"></a>

## MarkSpecOptions`<MarkName>`

### Extends

- [`MarkSpec`]( https://prosemirror.net/docs/ref/#model.MarkSpec )

### Type parameters

▪ **MarkName** extends `string` = `string`

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `name` | `MarkName` | - |

***

<a id="nodejson" name="nodejson"></a>

## NodeJson

A JSON representation of the prosemirror node.

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `attrs`? | `Record`\<`string`, `any`\> | - |
| `content`? | [`NodeJson`](core.md#nodejson)[] | - |
| `marks`? | `any`[] | - |
| `text`? | `string` | - |
| `type` | `string` | - |

***

<a id="nodespecoptionsnodename" name="nodespecoptionsnodename"></a>

## NodeSpecOptions`<NodeName>`

### Extends

- [`NodeSpec`]( https://prosemirror.net/docs/ref/#model.NodeSpec )

### Type parameters

▪ **NodeName** extends `string` = `string`

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `name` | `NodeName` | - |
| `topNode`? | `boolean` | - |

***

<a id="nodeviewoptions" name="nodeviewoptions"></a>

## NodeViewOptions

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `constructor` | [`NodeViewConstructor`]( https://prosemirror.net/docs/ref/#view.NodeViewConstructor ) | - |
| `name` | `string` | - |

***

<a id="selectionjson" name="selectionjson"></a>

## SelectionJson

A JSON representation of the prosemirror selection.

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `from` | `number` | - |
| `to` | `number` | - |
| `type` | `string` | - |

***

<a id="statejson" name="statejson"></a>

## StateJson

A JSON representation of the prosemirror state.

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `doc` | [`NodeJson`](core.md#nodejson) | The main `ProseMirror` doc. |
| `selection` | [`SelectionJson`](core.md#selectionjson) | The current selection. |

***

<a id="extractcommandapplierse" name="extractcommandapplierse"></a>

## ExtractCommandAppliers`<E>`

```ts
type ExtractCommandAppliers<E>: ToCommandApplier<ExtractCommandArgs<E>>;
```

### Type parameters

| Parameter |
| :------ |
| `E` extends [`Extension`](core.md#extensiont) |

***

<a id="extractcommandcreatorse" name="extractcommandcreatorse"></a>

## ExtractCommandCreators`<E>`

```ts
type ExtractCommandCreators<E>: ToCommandCreators<ExtractCommandArgs<E>>;
```

### Type parameters

| Parameter |
| :------ |
| `E` extends [`Extension`](core.md#extensiont) |

***

<a id="extractmarkse" name="extractmarkse"></a>

## ExtractMarks`<E>`

```ts
type ExtractMarks<E>: ExtractMarksFromTyping<ExtractTyping<E>>;
```

### Type parameters

| Parameter |
| :------ |
| `E` extends [`Extension`](core.md#extensiont) |

***

<a id="extractnodese" name="extractnodese"></a>

## ExtractNodes`<E>`

```ts
type ExtractNodes<E>: ExtractNodesFromTyping<ExtractTyping<E>>;
```

### Type parameters

| Parameter |
| :------ |
| `E` extends [`Extension`](core.md#extensiont) |

***

<a id="nodevieweffectoptions" name="nodevieweffectoptions"></a>

## NodeViewEffectOptions

```ts
type NodeViewEffectOptions: object | object;
```

***

<a id="simplifyuniont" name="simplifyuniont"></a>

## SimplifyUnion`<T>`

```ts
type SimplifyUnion<T>: Simplify<UnionToIntersection<T>>;
```

### Intneral

### Type parameters

| Parameter |
| :------ |
| `T` |

***

<a id="addmark" name="addmark"></a>

## addMark()

```ts
addMark(options): Command
```

### Parameters

▪ **options**: `object`

▪ **options.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

▪ **options.from?**: `number`

The start position of the mark. By default it will be the start position of current selection.

▪ **options.to?**: `number`

The end position of the mark. By default it will be the end position of current selection.

▪ **options.type**: `string` \| [`MarkType`]( https://prosemirror.net/docs/ref/#model.MarkType )

### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="createeditor" name="createeditor"></a>

## createEditor()

```ts
createEditor<E>(__namedParameters): Editor<E>
```

### Type parameters

▪ **E** extends [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Parameters

▪ **\_\_namedParameters**: [`EditorOptions`](core.md#editoroptionse)\<`E`\>

### Returns

[`Editor`](core.md#editore)\<`E`\>

***

<a id="definebasecommands" name="definebasecommands"></a>

## defineBaseCommands()

```ts
defineBaseCommands(): Extension<object>
```

Add some base commands

### Returns

[`Extension`](core.md#extensiont)\<`object`\>

***

<a id="definebasekeymap" name="definebasekeymap"></a>

## defineBaseKeymap()

```ts
defineBaseKeymap(): Extension<ExtensionTyping<string, string, CommandArgs>>
```

### Returns

[`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="definecommands" name="definecommands"></a>

## defineCommands()

```ts
defineCommands<T>(commands): Extension<object>
```

### Type parameters

▪ **T** extends `Record`\<`string`, `CommandCreator`\> = `Record`\<`string`, `CommandCreator`\>

### Parameters

▪ **commands**: `T`

### Returns

[`Extension`](core.md#extensiont)\<`object`\>

***

<a id="definedefaultstate" name="definedefaultstate"></a>

## defineDefaultState()

```ts
defineDefaultState(options): Extension
```

### Parameters

▪ **options**: [`DefaultStateOptions`](core.md#defaultstateoptions)

### Returns

[`Extension`](core.md#extensiont)

***

<a id="definedoc" name="definedoc"></a>

## defineDoc()

```ts
defineDoc(): Extension<object>
```

### Returns

[`Extension`](core.md#extensiont)\<`object`\>

***

<a id="definehistory" name="definehistory"></a>

## defineHistory()

```ts
defineHistory(): Extension<object>
```

Add undo/redo history to the editor.

### Returns

[`Extension`](core.md#extensiont)\<`object`\>

***

<a id="defineinputrule" name="defineinputrule"></a>

## defineInputRule()

```ts
defineInputRule(rules): Extension
```

### Parameters

▪ **rules**: (`context`) => [`InputRule`]( https://prosemirror.net/docs/ref/#inputrules.InputRule )[]

### Returns

[`Extension`](core.md#extensiont)

***

<a id="definekeymap" name="definekeymap"></a>

## defineKeymap()

```ts
defineKeymap(keymap): Extension
```

### Parameters

▪ **keymap**: [`Keymap`](core.md#keymap)

### Returns

[`Extension`](core.md#extensiont)

***

<a id="definemarkspec" name="definemarkspec"></a>

## defineMarkSpec()

```ts
defineMarkSpec<Mark>(options): Extension<object>
```

### Type parameters

▪ **Mark** extends `string`

### Parameters

▪ **options**: [`MarkSpecOptions`](core.md#markspecoptionsmarkname)\<`Mark`\>

### Returns

[`Extension`](core.md#extensiont)\<`object`\>

***

<a id="definenodespec" name="definenodespec"></a>

## defineNodeSpec()

```ts
defineNodeSpec<NodeName>(options): Extension<object>
```

### Type parameters

▪ **NodeName** extends `string`

### Parameters

▪ **options**: [`NodeSpecOptions`](core.md#nodespecoptionsnodename)\<`NodeName`\>

### Returns

[`Extension`](core.md#extensiont)\<`object`\>

***

<a id="definenodeview" name="definenodeview"></a>

## defineNodeView()

```ts
defineNodeView(options): Extension
```

### Parameters

▪ **options**: [`NodeViewOptions`](core.md#nodeviewoptions)

### Returns

[`Extension`](core.md#extensiont)

***

<a id="definenodevieweffect" name="definenodevieweffect"></a>

## defineNodeViewEffect()

```ts
defineNodeViewEffect(options): Extension
```

### Parameters

▪ **options**: [`NodeViewEffectOptions`](core.md#nodevieweffectoptions)

### Returns

[`Extension`](core.md#extensiont)

***

<a id="defineparagraph" name="defineparagraph"></a>

## defineParagraph()

```ts
defineParagraph(): Extension<object>
```

Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.

### Returns

[`Extension`](core.md#extensiont)\<`object`\>

***

<a id="defineplugin" name="defineplugin"></a>

## definePlugin()

```ts
definePlugin(plugin): Extension
```

Adds a ProseMirror plugin to the editor.

### Parameters

▪ **plugin**: [`Plugin`]( https://prosemirror.net/docs/ref/#state.Plugin )\<`any`\> \| [`Plugin`]( https://prosemirror.net/docs/ref/#state.Plugin )\<`any`\>[] \| (`context`) => [`Plugin`]( https://prosemirror.net/docs/ref/#state.Plugin )\<`any`\>[]

The ProseMirror plugin to add, or an array of plugins, or a
function that returns an array of plugins.

### Returns

[`Extension`](core.md#extensiont)

***

<a id="definetext" name="definetext"></a>

## defineText()

```ts
defineText(): Extension<object>
```

### Returns

[`Extension`](core.md#extensiont)\<`object`\>

***

<a id="insertnode" name="insertnode"></a>

## insertNode()

### insertNode(options)

```ts
insertNode(options): Command
```

#### Parameters

▪ **options**: `object`

▪ **options.node**: [`Node`]( https://prosemirror.net/docs/ref/#model.Node )

▪ **options.pos?**: `number`

#### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

### insertNode(options)

```ts
insertNode(options): Command
```

#### Parameters

▪ **options**: `object`

▪ **options.attrs?**: [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

▪ **options.pos?**: `number`

▪ **options.type**: `string`

#### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="setblocktype" name="setblocktype"></a>

## setBlockType()

```ts
setBlockType(options): Command
```

Returns a command that tries to set the selected textblocks to the given node
type with the given attributes.

### Parameters

▪ **options**: `object`

▪ **options.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

▪ **options.from?**: `number`

▪ **options.to?**: `number`

▪ **options.type**: `string` \| [`NodeType`]( https://prosemirror.net/docs/ref/#model.NodeType )

### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="togglemark" name="togglemark"></a>

## toggleMark()

```ts
toggleMark(__namedParameters): Command
```

### Parameters

▪ **\_\_namedParameters**: `object`

▪ **\_\_namedParameters.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

▪ **\_\_namedParameters.type**: `string` \| [`MarkType`]( https://prosemirror.net/docs/ref/#model.MarkType )

### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="togglenode" name="togglenode"></a>

## toggleNode()

```ts
toggleNode(__namedParameters): Command
```

### Parameters

▪ **\_\_namedParameters**: `object`

▪ **\_\_namedParameters.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

▪ **\_\_namedParameters.type**: `string` \| [`NodeType`]( https://prosemirror.net/docs/ref/#model.NodeType )

### Returns

[`Command`]( https://prosemirror.net/docs/ref/#state.Command )

***

<a id="union" name="union"></a>

## union()

```ts
union<E>(extension): SimplifyExtension<E>
```

### Type parameters

▪ **E** extends [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> \| [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>[]

### Parameters

▪ **extension**: `E`

### Returns

`SimplifyExtension`\<`E`\>

***

<a id="withpriority" name="withpriority"></a>

## withPriority()

```ts
withPriority<T>(extension, priority): T
```

### Type parameters

▪ **T** extends [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Parameters

▪ **extension**: `T`

▪ **priority**: [`Priority`](core.md#priority)

### Returns

`T`

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
