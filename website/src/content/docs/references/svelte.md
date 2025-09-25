---
title: prosekit/svelte
sidebar:
  label: svelte
---

## Interfaces

### ProseKitProps {#prosekitprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor" href="#editor">editor</a>: [`Editor`](core.md#editor)</code>

</dt>

</dl>

***

### SvelteMarkViewProps {#sveltemarkviewprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="contentref" href="#contentref">contentRef</a>: (`element`: `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="view" href="#view">view</a>: [`EditorView`](pm/view.md#editorview)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="mark" href="#mark">mark</a>: `Writable`\<[`Mark`](pm/model.md#mark)\></code>

</dt>

</dl>

***

### SvelteMarkViewOptions {#sveltemarkviewoptions}

Options for [defineSvelteMarkView](#definesveltemarkview).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="name" href="#name">name</a>: `string`</code>

</dt>

<dd>

The name of the mark type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="as" href="#as">as</a><i>?</i>: `MarkViewDOMSpec`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="contentas" href="#contentas">contentAs</a><i>?</i>: `MarkViewDOMSpec`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="component" href="#component">component</a>: [`SvelteMarkViewComponent`](#sveltemarkviewcomponent)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="ignoremutation" href="#ignoremutation">ignoreMutation</a><i>?</i>: (`mutation`: [`ViewMutationRecord`](pm/view.md#viewmutationrecord)) => `boolean` \| `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="destroy" href="#destroy">destroy</a><i>?</i>: () => `void`</code>

</dt>

</dl>

***

### SvelteNodeViewProps {#sveltenodeviewprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="contentref-1" href="#contentref-1">contentRef</a>: (`element`: `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="view-1" href="#view-1">view</a>: [`EditorView`](pm/view.md#editorview)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getpos" href="#getpos">getPos</a>: () => `undefined` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="setattrs" href="#setattrs">setAttrs</a>: (`attrs`: [`Attrs`](pm/model.md#attrs-4)) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="node" href="#node">node</a>: `Writable`\<[`ProseMirrorNode`](pm/model.md#prosemirrornode)\></code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="selected" href="#selected">selected</a>: `Writable`\<`boolean`\></code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="decorations" href="#decorations">decorations</a>: `Writable`\<readonly [`Decoration`](pm/view.md#decoration)[]\></code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="innerdecorations" href="#innerdecorations">innerDecorations</a>: `Writable`\<[`DecorationSource`](pm/view.md#decorationsource)\></code>

</dt>

</dl>

***

### SvelteNodeViewOptions {#sveltenodeviewoptions}

Options for [defineSvelteNodeView](#definesveltenodeview).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="name-1" href="#name-1">name</a>: `string`</code>

</dt>

<dd>

The name of the node type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="as-1" href="#as-1">as</a><i>?</i>: `NodeViewDOMSpec`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="contentas-1" href="#contentas-1">contentAs</a><i>?</i>: `NodeViewDOMSpec`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="component-1" href="#component-1">component</a>: [`SvelteNodeViewComponent`](#sveltenodeviewcomponent)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="update" href="#update">update</a><i>?</i>: (`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode), `decorations`: readonly [`Decoration`](pm/view.md#decoration)[], `innerDecorations`: [`DecorationSource`](pm/view.md#decorationsource)) => `boolean` \| `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="ignoremutation-1" href="#ignoremutation-1">ignoreMutation</a><i>?</i>: (`mutation`: [`ViewMutationRecord`](pm/view.md#viewmutationrecord)) => `boolean` \| `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="selectnode" href="#selectnode">selectNode</a><i>?</i>: () => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="deselectnode" href="#deselectnode">deselectNode</a><i>?</i>: () => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="setselection" href="#setselection">setSelection</a><i>?</i>: (`anchor`: `number`, `head`: `number`, `root`: [`Document`](https://developer.mozilla.org/docs/Web/API/Document) \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="stopevent" href="#stopevent">stopEvent</a><i>?</i>: (`event`: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)) => `boolean`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="destroy-1" href="#destroy-1">destroy</a><i>?</i>: () => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onupdate" href="#onupdate">onUpdate</a><i>?</i>: () => `void`</code>

</dt>

</dl>

***

### UseExtensionOptions {#useextensionoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-1" href="#editor-1">editor</a><i>?</i>: [`Editor`](core.md#editor)\<`any`\></code>

</dt>

<dd>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="priority" href="#priority">priority</a><i>?</i>: [`Priority`](core.md#priority-1)</code>

</dt>

<dd>

Optional priority to add the extension with.

</dd>

</dl>

## Type Aliases

### SvelteMarkViewComponent {#sveltemarkviewcomponent}

<dl>

<dt>

<code data-typedoc-code>type <a id="sveltemarkviewcomponent" href="#sveltemarkviewcomponent">SvelteMarkViewComponent</a> = `Component`\<[`SvelteMarkViewProps`](#sveltemarkviewprops)\></code>

</dt>

<dd>

</dd>

</dl>

***

### SvelteNodeViewComponent {#sveltenodeviewcomponent}

<dl>

<dt>

<code data-typedoc-code>type <a id="sveltenodeviewcomponent" href="#sveltenodeviewcomponent">SvelteNodeViewComponent</a> = `Component`\<[`SvelteNodeViewProps`](#sveltenodeviewprops)\></code>

</dt>

<dd>

</dd>

</dl>

## Variables

### ProseKit {#prosekit}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="prosekit" href="#prosekit">ProseKit</a>: *typeof* `SvelteComponent`</code>

</dt>

<dd>

The root component for a ProseKit editor.

</dd>

</dl>

## Functions

### defineSvelteMarkView() {#definesveltemarkview}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definesveltemarkview" href="#definesveltemarkview">defineSvelteMarkView</a>(`options`: [`SvelteMarkViewOptions`](#sveltemarkviewoptions)): [`Extension`](core.md#extension-1)</code>

</dt>

<dd>

Defines a mark view using a Svelte component.

</dd>

</dl>

***

### defineSvelteNodeView() {#definesveltenodeview}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definesveltenodeview" href="#definesveltenodeview">defineSvelteNodeView</a>(`options`: [`SvelteNodeViewOptions`](#sveltenodeviewoptions)): [`Extension`](core.md#extension-1)</code>

</dt>

<dd>

Defines a node view using a Svelte component.

</dd>

</dl>

***

### useDocChange() {#usedocchange}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="usedocchange" href="#usedocchange">useDocChange</a>(`handler`: (`doc`: [`ProseMirrorNode`](pm/model.md#prosemirrornode)) => `void`, `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

<dd>

Calls the given handler whenever the editor document changes.

</dd>

</dl>

***

### useEditor() {#useeditor}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="useeditor" href="#useeditor">useEditor</a>\<E\>(`options?`: `object`): `Readable`\<[`Editor`](core.md#editor)\<`E`\>\></code>

</dt>

<dd>

Retrieves the editor instance from the nearest ProseKit component.

</dd>

</dl>

***

### useExtension() {#useextension}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="useextension" href="#useextension">useExtension</a>\<T\>(`extension`: `Readable`\<`null` \| `T`\>, `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

<dd>

Add an extension to the editor.

</dd>

</dl>

***

### useKeymap() {#usekeymap}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="usekeymap" href="#usekeymap">useKeymap</a>(`keymapStore`: `Readable`\<[`Keymap`](core.md#keymap)\>, `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

</dl>

***

### useStateUpdate() {#usestateupdate}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="usestateupdate" href="#usestateupdate">useStateUpdate</a>(`handler`: (`state`: [`EditorState`](pm/state.md#editorstate)) => `void`, `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

<dd>

Calls the given handler whenever the editor state changes.

</dd>

</dl>
