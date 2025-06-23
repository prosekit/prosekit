---
title: prosekit/react
sidebar:
  label: react
---

## Interfaces

### ProseKitProps {#prosekitprops}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="children" href="#children">children</a><i>?</i>: `ReactNode`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editor" href="#editor">editor</a>: [`Editor`](core.md#editor)</code>

</dt>

</dl>

***

### ReactMarkViewOptions {#reactmarkviewoptions}

Options for [defineReactMarkView](#definereactmarkview).

#### Extends

- `CoreMarkViewUserOptions`\<[`ReactMarkViewComponent`](#reactmarkviewcomponent)\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="as" href="#as">as</a><i>?</i>: `MarkViewDOMSpec`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="component" href="#component">component</a>: [`ReactMarkViewComponent`](#reactmarkviewcomponent)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="contentas" href="#contentas">contentAs</a><i>?</i>: `MarkViewDOMSpec`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="destroy" href="#destroy">destroy</a><i>?</i>: () => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ignoremutation" href="#ignoremutation">ignoreMutation</a><i>?</i>: (`mutation`: [`ViewMutationRecord`](pm/view.md#viewmutationrecord)) => `boolean` \| `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="name" href="#name">name</a>: `string`</code>

</dt>

<dd>

The name of the mark type.

</dd>

</dl>

***

### ReactMarkViewProps {#reactmarkviewprops}

#### Extends

- `MarkViewContext`

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="contentref" href="#contentref">contentRef</a>: `MarkViewContentRef`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="mark" href="#mark">mark</a>: [`Mark`](pm/model.md#mark)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="view" href="#view">view</a>: [`EditorView`](pm/view.md#editorview)</code>

</dt>

</dl>

***

### ReactNodeViewOptions {#reactnodeviewoptions}

Options for [defineReactNodeView](#definereactnodeview).

#### Extends

- `CoreNodeViewUserOptions`\<[`ReactNodeViewComponent`](#reactnodeviewcomponent)\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="as-1" href="#as-1">as</a><i>?</i>: `NodeViewDOMSpec`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="component-1" href="#component-1">component</a>: [`ReactNodeViewComponent`](#reactnodeviewcomponent)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="contentas-1" href="#contentas-1">contentAs</a><i>?</i>: `NodeViewDOMSpec`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="deselectnode" href="#deselectnode">deselectNode</a><i>?</i>: () => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="destroy-1" href="#destroy-1">destroy</a><i>?</i>: () => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ignoremutation-1" href="#ignoremutation-1">ignoreMutation</a><i>?</i>: (`mutation`: [`ViewMutationRecord`](pm/view.md#viewmutationrecord)) => `boolean` \| `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="name-1" href="#name-1">name</a>: `string`</code>

</dt>

<dd>

The name of the node type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="onupdate" href="#onupdate">onUpdate</a><i>?</i>: () => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="selectnode" href="#selectnode">selectNode</a><i>?</i>: () => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setselection" href="#setselection">setSelection</a><i>?</i>: (`anchor`: `number`, `head`: `number`, `root`: [`Document`](https://developer.mozilla.org/docs/Web/API/Document) \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="stopevent" href="#stopevent">stopEvent</a><i>?</i>: (`event`: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)) => `boolean`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="update" href="#update">update</a><i>?</i>: (`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode), `decorations`: readonly [`Decoration`](pm/view.md#decoration)[], `innerDecorations`: [`DecorationSource`](pm/view.md#decorationsource)) => `boolean` \| `void`</code>

</dt>

</dl>

***

### ReactNodeViewProps {#reactnodeviewprops}

#### Extends

- `NodeViewContext`

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="contentref-1" href="#contentref-1">contentRef</a>: `NodeViewContentRef`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="decorations" href="#decorations">decorations</a>: readonly [`Decoration`](pm/view.md#decoration)[]</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getpos" href="#getpos">getPos</a>: () => `undefined` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="innerdecorations" href="#innerdecorations">innerDecorations</a>: [`DecorationSource`](pm/view.md#decorationsource)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="node" href="#node">node</a>: [`ProseMirrorNode`](pm/model.md#prosemirrornode)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="selected" href="#selected">selected</a>: `boolean`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setattrs" href="#setattrs">setAttrs</a>: (`attrs`: [`Attrs`](pm/model.md#attrs-7)) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="view-1" href="#view-1">view</a>: [`EditorView`](pm/view.md#editorview)</code>

</dt>

</dl>

***

### UseEditorDerivedOptions\<E\> {#useeditorderivedoptions}

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`E` *extends* [`Extension`](core.md#extension-1)

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editor-1" href="#editor-1">editor</a><i>?</i>: [`Editor`](core.md#editor)\<`E`\></code>

</dt>

<dd>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

</dd>

</dl>

***

### UseExtensionOptions {#useextensionoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editor-2" href="#editor-2">editor</a><i>?</i>: [`Editor`](core.md#editor)\<`any`\></code>

</dt>

<dd>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="priority" href="#priority">priority</a><i>?</i>: [`Priority`](core.md#priority)</code>

</dt>

<dd>

Optional priority to add the extension with.

</dd>

</dl>

## Type Aliases

### ReactMarkViewComponent {#reactmarkviewcomponent}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="reactmarkviewcomponent" href="#reactmarkviewcomponent">ReactMarkViewComponent</a> = `ComponentType`\<[`ReactMarkViewProps`](#reactmarkviewprops)\></code>

</dt>

<dd>

</dd>

</dl>

***

### ReactNodeViewComponent {#reactnodeviewcomponent}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="reactnodeviewcomponent" href="#reactnodeviewcomponent">ReactNodeViewComponent</a> = `ComponentType`\<[`ReactNodeViewProps`](#reactnodeviewprops)\></code>

</dt>

<dd>

</dd>

</dl>

## Variables

### ProseKit {#prosekit}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="prosekit" href="#prosekit">ProseKit</a>: `ComponentType`\<[`ProseKitProps`](#prosekitprops)\></code>

</dt>

<dd>

The root component for a ProseKit editor.

</dd>

</dl>

## Functions

### defineReactMarkView() {#definereactmarkview}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definereactmarkview-2" href="#definereactmarkview-2">defineReactMarkView</a>(`options`: [`ReactMarkViewOptions`](#reactmarkviewoptions)): [`Extension`](core.md#extension-1)</code>

</dt>

<dd>

Defines a mark view using a React component.

</dd>

</dl>

***

### defineReactNodeView() {#definereactnodeview}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definereactnodeview-2" href="#definereactnodeview-2">defineReactNodeView</a>(`options`: [`ReactNodeViewOptions`](#reactnodeviewoptions)): [`Extension`](core.md#extension-1)</code>

</dt>

<dd>

Defines a node view using a React component.

</dd>

</dl>

***

### useDocChange() {#usedocchange}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="usedocchange-2" href="#usedocchange-2">useDocChange</a>(`handler`: (`doc`: [`ProseMirrorNode`](pm/model.md#prosemirrornode)) => `void`, `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

<dd>

Calls the given handler whenever the editor document changes.

</dd>

</dl>

***

### useEditor() {#useeditor}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="useeditor-2" href="#useeditor-2">useEditor</a>\<E\>(`options?`: `object`): [`Editor`](core.md#editor)\<`E`\></code>

</dt>

<dd>

Retrieves the editor instance from the nearest ProseKit component.

</dd>

</dl>

***

### useEditorDerivedValue() {#useeditorderivedvalue}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="useeditorderivedvalue-2" href="#useeditorderivedvalue-2">useEditorDerivedValue</a>\<E, Derived\>(`derive`: (`editor`: [`Editor`](core.md#editor)\<`E`\>) => `Derived`, `options?`: [`UseEditorDerivedOptions`](#useeditorderivedoptions)\<`E`\>): `Derived`</code>

</dt>

<dd>

A hook that runs a function to derive a value from the editor instance after
editor state changes.

This is useful when you need to render something based on the editor state,
for example, whether the selected text is wrapped in an italic mark.

</dd>

</dl>

***

### useExtension() {#useextension}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="useextension-2" href="#useextension-2">useExtension</a>(`extension`: `null` \| [`Extension`](core.md#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>, `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

<dd>

Add an extension to the editor.

</dd>

</dl>

***

### useKeymap() {#usekeymap}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="usekeymap-2" href="#usekeymap-2">useKeymap</a>(`keymap`: [`Keymap`](core.md#keymap), `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

</dl>

***

### useStateUpdate() {#usestateupdate}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="usestateupdate-2" href="#usestateupdate-2">useStateUpdate</a>(`handler`: (`state`: [`EditorState`](pm/state.md#editorstate)) => `void`, `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

<dd>

Calls the given handler whenever the editor state changes.

</dd>

</dl>
