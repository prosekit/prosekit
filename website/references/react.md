# prosekit/react

<a id="ProseKitProps" name="ProseKitProps"></a>

## ProseKitProps

### Properties

<a id="children" name="children"></a>

#### children?

> **children**?: `ReactNode`

<a id="editor" name="editor"></a>

#### editor

> **editor**: [`Editor`](core.md#EditorE)\<`any`\>

***

<a id="ReactNodeViewOptions" name="ReactNodeViewOptions"></a>

## ReactNodeViewOptions

Options for [defineReactNodeView](react.md#defineReactNodeView).

### Extends

- [`BaseNodeViewOptions`](core.md#BaseNodeViewOptions)

### Properties

<a id="as" name="as"></a>

#### as?

> **as**?: `string` \| [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement ) \| (`node`) => [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

The wrapping DOM element for the node view. Defaults to `div` for block nodes and `span` for inline nodes.

##### Inherited from

[`prosekit/core.BaseNodeViewOptions.as`](core.md#as)

<a id="component" name="component"></a>

#### component

> **component**: [`ReactNodeViewComponent`](react.md#ReactNodeViewComponent)

The React component to render the node.

<a id="contentAs" name="contentAs"></a>

#### contentAs?

> **contentAs**?: `string` \| [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement ) \| (`node`) => [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

The wrapping DOM element for the node view's content. Defaults to `div` for block nodes and `span` for inline nodes.

##### Inherited from

[`prosekit/core.BaseNodeViewOptions.contentAs`](core.md#contentAs)

<a id="deselectNode" name="deselectNode"></a>

#### deselectNode?

> **deselectNode**?: () => `void`

##### Returns

`void`

##### Inherited from

[`prosekit/core.BaseNodeViewOptions.deselectNode`](core.md#deselectNode)

<a id="destroy" name="destroy"></a>

#### destroy?

> **destroy**?: () => `void`

##### Returns

`void`

##### Inherited from

[`prosekit/core.BaseNodeViewOptions.destroy`](core.md#destroy)

<a id="ignoreMutation" name="ignoreMutation"></a>

#### ignoreMutation?

> **ignoreMutation**?: (`mutation`) => `boolean`

##### Parameters

• **mutation**: [`MutationRecord`]( https://developer.mozilla.org/docs/Web/API/MutationRecord )

##### Returns

`boolean`

##### Inherited from

[`prosekit/core.BaseNodeViewOptions.ignoreMutation`](core.md#ignoreMutation)

<a id="name" name="name"></a>

#### name

> **name**: `string`

The name of the node type.

<a id="onUpdate" name="onUpdate"></a>

#### onUpdate?

> **onUpdate**?: () => `void`

##### Returns

`void`

##### Inherited from

[`prosekit/core.BaseNodeViewOptions.onUpdate`](core.md#onUpdate)

<a id="selectNode" name="selectNode"></a>

#### selectNode?

> **selectNode**?: () => `void`

##### Returns

`void`

##### Inherited from

[`prosekit/core.BaseNodeViewOptions.selectNode`](core.md#selectNode)

<a id="setSelection" name="setSelection"></a>

#### setSelection?

> **setSelection**?: (`anchor`, `head`, `root`) => `void`

##### Parameters

• **anchor**: `number`

• **head**: `number`

• **root**: [`Document`]( https://developer.mozilla.org/docs/Web/API/Document ) \| [`ShadowRoot`]( https://developer.mozilla.org/docs/Web/API/ShadowRoot )

##### Returns

`void`

##### Inherited from

[`prosekit/core.BaseNodeViewOptions.setSelection`](core.md#setSelection)

<a id="stopEvent" name="stopEvent"></a>

#### stopEvent?

> **stopEvent**?: (`event`) => `boolean`

##### Parameters

• **event**: [`Event`]( https://developer.mozilla.org/docs/Web/API/Event )

##### Returns

`boolean`

##### Inherited from

[`prosekit/core.BaseNodeViewOptions.stopEvent`](core.md#stopEvent)

<a id="update" name="update"></a>

#### update?

> **update**?: (`node`, `decorations`, `innerDecorations`) => `boolean`

##### Parameters

• **node**: [`Node`]( https://prosemirror.net/docs/ref/#model.Node )

• **decorations**: readonly [`Decoration`]( https://prosemirror.net/docs/ref/#view.Decoration )[]

• **innerDecorations**: [`DecorationSource`]( https://prosemirror.net/docs/ref/#view.DecorationSource )

##### Returns

`boolean`

##### Inherited from

[`prosekit/core.BaseNodeViewOptions.update`](core.md#update)

***

<a id="ReactNodeViewProps" name="ReactNodeViewProps"></a>

## ReactNodeViewProps

### Properties

<a id="contentRef" name="contentRef"></a>

#### contentRef

> **contentRef**: (`node`) => `void`

##### Parameters

• **node**: `null` \| [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement )

##### Returns

`void`

<a id="decorations" name="decorations"></a>

#### decorations

> **decorations**: readonly [`Decoration`]( https://prosemirror.net/docs/ref/#view.Decoration )[]

<a id="getPos" name="getPos"></a>

#### getPos

> **getPos**: () => `undefined` \| `number`

##### Returns

`undefined` \| `number`

<a id="innerDecorations" name="innerDecorations"></a>

#### innerDecorations

> **innerDecorations**: [`DecorationSource`]( https://prosemirror.net/docs/ref/#view.DecorationSource )

<a id="node" name="node"></a>

#### node

> **node**: [`Node`]( https://prosemirror.net/docs/ref/#model.Node )

<a id="selected" name="selected"></a>

#### selected

> **selected**: `boolean`

<a id="setAttrs" name="setAttrs"></a>

#### setAttrs

> **setAttrs**: (`attrs`) => `void`

##### Parameters

• **attrs**: [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

##### Returns

`void`

<a id="view" name="view"></a>

#### view

> **view**: [`EditorView`]( https://prosemirror.net/docs/ref/#view.EditorView )

***

<a id="ReactNodeViewComponent" name="ReactNodeViewComponent"></a>

## ReactNodeViewComponent

> **ReactNodeViewComponent**: `ComponentType`\<[`ReactNodeViewProps`](react.md#ReactNodeViewProps)\>

***

<a id="ProseKit" name="ProseKit"></a>

## ProseKit

> **`const`** **ProseKit**: `ComponentType`\<[`ProseKitProps`](react.md#ProseKitProps)\>

***

<a id="defineReactNodeView" name="defineReactNodeView"></a>

## defineReactNodeView()

> **defineReactNodeView**(`options`): [`Extension`](core.md#ExtensionT)

Defines a node view using a React component.

### Parameters

• **options**: [`ReactNodeViewOptions`](react.md#ReactNodeViewOptions)

### Returns

[`Extension`](core.md#ExtensionT)

***

<a id="useEditor" name="useEditor"></a>

## useEditor()

> **useEditor**\<`E`\>(`options`?): [`Editor`](core.md#EditorE)\<`E`\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = `any`

### Parameters

• **options?**: `Object`

• **options\.update?**: `boolean`

### Returns

[`Editor`](core.md#EditorE)\<`E`\>

***

<a id="useExtension" name="useExtension"></a>

## useExtension()

> **useExtension**\<`T`\>(`extension`): `void`

Add an extension to the editor.

It accepts an optional extension. If the extension is changed, the previous
extension will be removed and the new one (if not null) will be added.

### Type parameters

• **T** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Parameters

• **extension**: `null` \| `T`

### Returns

`void`

***

<a id="useKeymap" name="useKeymap"></a>

## useKeymap()

> **useKeymap**(`keymap`, `options`?): `void`

### Parameters

• **keymap**: [`Keymap`](core.md#Keymap)

• **options?**: `Object`

• **options\.priority?**: `lowest` \| `low` \| `default` \| `high` \| `highest`

### Returns

`void`

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
