# prosekit/svelte

<a id="ProseKitProps" name="ProseKitProps"></a>

## ProseKitProps

### Properties

<a id="editor" name="editor"></a>

#### editor

> **editor**: [`Editor`](core.md#EditorE)\<`any`\>

***

<a id="SvelteNodeViewOptions" name="SvelteNodeViewOptions"></a>

## SvelteNodeViewOptions

Options for [defineSvelteNodeView](svelte.md#defineSvelteNodeView).

### Extends

- [`BaseNodeViewOptions`](core.md#BaseNodeViewOptions)

### Properties

<a id="as" name="as"></a>

#### as?

> `optional` **as**: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| (`node`) => [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The wrapping DOM element for the node view. Defaults to `div` for block nodes and `span` for inline nodes.

##### Inherited from

[`BaseNodeViewOptions`](core.md#BaseNodeViewOptions).[`as`](core.md#as)

<a id="component" name="component"></a>

#### component

> **component**: [`SvelteNodeViewComponent`](svelte.md#SvelteNodeViewComponent)

The Svelte component to render the node.

<a id="contentAs" name="contentAs"></a>

#### contentAs?

> `optional` **contentAs**: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| (`node`) => [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

The wrapping DOM element for the node view's content. Defaults to `div` for block nodes and `span` for inline nodes.

##### Inherited from

[`BaseNodeViewOptions`](core.md#BaseNodeViewOptions).[`contentAs`](core.md#contentAs)

<a id="deselectNode" name="deselectNode"></a>

#### deselectNode()?

> `optional` **deselectNode**: () => `void`

##### Returns

`void`

##### Inherited from

[`BaseNodeViewOptions`](core.md#BaseNodeViewOptions).[`deselectNode`](core.md#deselectNode)

<a id="destroy" name="destroy"></a>

#### destroy()?

> `optional` **destroy**: () => `void`

##### Returns

`void`

##### Inherited from

[`BaseNodeViewOptions`](core.md#BaseNodeViewOptions).[`destroy`](core.md#destroy)

<a id="ignoreMutation" name="ignoreMutation"></a>

#### ignoreMutation()?

> `optional` **ignoreMutation**: (`mutation`) => `boolean`

##### Parameters

• **mutation**: [`MutationRecord`](https://developer.mozilla.org/docs/Web/API/MutationRecord)

##### Returns

`boolean`

##### Inherited from

[`BaseNodeViewOptions`](core.md#BaseNodeViewOptions).[`ignoreMutation`](core.md#ignoreMutation)

<a id="name" name="name"></a>

#### name

> **name**: `string`

The name of the node type.

<a id="onUpdate" name="onUpdate"></a>

#### onUpdate()?

> `optional` **onUpdate**: () => `void`

##### Returns

`void`

##### Inherited from

[`BaseNodeViewOptions`](core.md#BaseNodeViewOptions).[`onUpdate`](core.md#onUpdate)

<a id="selectNode" name="selectNode"></a>

#### selectNode()?

> `optional` **selectNode**: () => `void`

##### Returns

`void`

##### Inherited from

[`BaseNodeViewOptions`](core.md#BaseNodeViewOptions).[`selectNode`](core.md#selectNode)

<a id="setSelection" name="setSelection"></a>

#### setSelection()?

> `optional` **setSelection**: (`anchor`, `head`, `root`) => `void`

##### Parameters

• **anchor**: `number`

• **head**: `number`

• **root**: [`Document`](https://developer.mozilla.org/docs/Web/API/Document) \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)

##### Returns

`void`

##### Inherited from

[`BaseNodeViewOptions`](core.md#BaseNodeViewOptions).[`setSelection`](core.md#setSelection)

<a id="stopEvent" name="stopEvent"></a>

#### stopEvent()?

> `optional` **stopEvent**: (`event`) => `boolean`

##### Parameters

• **event**: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)

##### Returns

`boolean`

##### Inherited from

[`BaseNodeViewOptions`](core.md#BaseNodeViewOptions).[`stopEvent`](core.md#stopEvent)

<a id="update" name="update"></a>

#### update()?

> `optional` **update**: (`node`, `decorations`, `innerDecorations`) => `boolean`

##### Parameters

• **node**: [`Node`](https://prosemirror.net/docs/ref/#model.Node)

• **decorations**: readonly [`Decoration`](https://prosemirror.net/docs/ref/#view.Decoration)[]

• **innerDecorations**: [`DecorationSource`](https://prosemirror.net/docs/ref/#view.DecorationSource)

##### Returns

`boolean`

##### Inherited from

[`BaseNodeViewOptions`](core.md#BaseNodeViewOptions).[`update`](core.md#update)

***

<a id="SvelteNodeViewProps" name="SvelteNodeViewProps"></a>

## SvelteNodeViewProps

### Properties

<a id="contentRef" name="contentRef"></a>

#### contentRef()

> **contentRef**: (`node`) => `void`

##### Parameters

• **node**: `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

##### Returns

`void`

<a id="decorations" name="decorations"></a>

#### decorations

> **decorations**: `Writable`\<readonly [`Decoration`](https://prosemirror.net/docs/ref/#view.Decoration)[]\>

<a id="getPos" name="getPos"></a>

#### getPos()

> **getPos**: () => `undefined` \| `number`

##### Returns

`undefined` \| `number`

<a id="innerDecorations" name="innerDecorations"></a>

#### innerDecorations

> **innerDecorations**: `Writable`\<[`DecorationSource`](https://prosemirror.net/docs/ref/#view.DecorationSource)\>

<a id="node" name="node"></a>

#### node

> **node**: `Writable`\<[`Node`](https://prosemirror.net/docs/ref/#model.Node)\>

<a id="selected" name="selected"></a>

#### selected

> **selected**: `Writable`\<`boolean`\>

<a id="setAttrs" name="setAttrs"></a>

#### setAttrs()

> **setAttrs**: (`attrs`) => `void`

##### Parameters

• **attrs**: [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

##### Returns

`void`

<a id="view" name="view"></a>

#### view

> **view**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

***

<a id="UseExtensionOptions" name="UseExtensionOptions"></a>

## UseExtensionOptions

### Properties

<a id="editor-1" name="editor-1"></a>

#### editor?

> `optional` **editor**: [`Editor`](core.md#EditorE)\<`any`\>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

<a id="priority" name="priority"></a>

#### priority?

> `optional` **priority**: [`Priority`](core.md#Priority)

Optional priority to add the extension with.

***

<a id="SvelteNodeViewComponent" name="SvelteNodeViewComponent"></a>

## SvelteNodeViewComponent

> **SvelteNodeViewComponent**: `ComponentType`\<`SvelteComponent`\<[`SvelteNodeViewProps`](svelte.md#SvelteNodeViewProps)\>\>

***

<a id="ProseKit" name="ProseKit"></a>

## ProseKit

> `const` **ProseKit**: *typeof* `SvelteComponent`

The root component for a ProseKit editor.

***

<a id="defineSvelteNodeView" name="defineSvelteNodeView"></a>

## defineSvelteNodeView()

> **defineSvelteNodeView**(`options`): [`Extension`](core.md#ExtensionT)

Defines a node view using a Svelte component.

### Parameters

• **options**: [`SvelteNodeViewOptions`](svelte.md#SvelteNodeViewOptions)

### Returns

[`Extension`](core.md#ExtensionT)

***

<a id="useDocChange" name="useDocChange"></a>

## useDocChange()

> **useDocChange**(`handler`, `options`?): `void`

Calls the given handler whenever the editor document changes.

### Parameters

• **handler**

• **options?**: [`UseExtensionOptions`](svelte.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useEditor" name="useEditor"></a>

## useEditor()

> **useEditor**\<`E`\>(`options`?): `Readable`\<[`Editor`](core.md#EditorE)\<`E`\>\>

Retrieves the editor instance from the nearest ProseKit component.

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\> = `any`

### Parameters

• **options?**

• **options.update?**: `boolean`

Whether to update the component when the editor is mounted or editor state
is updated.

**Default**

```ts
false
```

### Returns

`Readable`\<[`Editor`](core.md#EditorE)\<`E`\>\>

***

<a id="useExtension" name="useExtension"></a>

## useExtension()

> **useExtension**\<`T`\>(`extension`, `options`?): `void`

Add an extension to the editor.

### Type Parameters

• **T** *extends* [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\> = [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

### Parameters

• **extension**: `Readable`\<`null` \| `T`\>

The store to an extension to add to the editor. If it changes, the previous
extension will be removed and the new one (if not null) will be added.

• **options?**: [`UseExtensionOptions`](svelte.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useKeymap" name="useKeymap"></a>

## useKeymap()

> **useKeymap**(`keymapStore`, `options`?): `void`

### Parameters

• **keymapStore**: `Readable`\<[`Keymap`](core.md#Keymap)\>

• **options?**: [`UseExtensionOptions`](svelte.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useStateUpdate" name="useStateUpdate"></a>

## useStateUpdate()

> **useStateUpdate**(`handler`, `options`?): `void`

Calls the given handler whenever the editor state changes.

### Parameters

• **handler**

• **options?**: [`UseExtensionOptions`](svelte.md#UseExtensionOptions)

### Returns

`void`
