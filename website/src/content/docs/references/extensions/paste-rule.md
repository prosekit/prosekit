---
title: prosekit/extensions/paste-rule
sidebar:
  label: extensions/paste-rule
---

## Interfaces

### MarkPasteRuleOptions {#markpasteruleoptions}

The options for [defineMarkPasteRule](#definemarkpasterule).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="regex" href="#regex">regex</a>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)</code>

</dt>

<dd>

The regular expression to match against. It must have a `g` flag to match
all instances of the mark.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="type" href="#type">type</a>: `string` \| [`MarkType`](../pm/model.md#marktype-1)</code>

</dt>

<dd>

The mark type to apply to the matched text.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getattrs" href="#getattrs">getAttrs</a><i>?</i>: (`match`: `RegExpExecArray`) => `false` \| [`Attrs`](../pm/model.md#attrs-4) \| `null` \| `undefined`</code>

</dt>

<dd>

A function used to compute attributes to set on the mark created by this
rule. When it returns `false`, the rule won't match. When it returns `null`
or `undefined`, that is interpreted as an empty/default set of attributes.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="shouldskip" href="#shouldskip">shouldSkip</a><i>?</i>: (`node`: [`ProseMirrorNode`](../pm/model.md#prosemirrornode)) => `boolean`</code>

</dt>

<dd>

Optional function to determine if a text node should be skipped.
Default behavior: skip code nodes and nodes that already have the target mark.

</dd>

</dl>

***

### PasteRuleHandlerOptions {#pasterulehandleroptions}

Options for [PasteRuleHandler](#pasterulehandler).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="slice" href="#slice">slice</a>: [`Slice`](../pm/model.md#slice)</code>

</dt>

<dd>

The slice to be pasted.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="view" href="#view">view</a>: [`EditorView`](../pm/view.md#editorview)</code>

</dt>

<dd>

The editor view.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="plain" href="#plain">plain</a>: `boolean`</code>

</dt>

<dd>

Whether the pasted content is treated as plain text. This is true when the
`Shift` key is held when pasting.

</dd>

</dl>

***

### PasteRuleOptions {#pasteruleoptions}

Options for [definePasteRule](#definepasterule).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="handler" href="#handler">handler</a>: [`PasteRuleHandler`](#pasterulehandler)</code>

</dt>

<dd>

A function to be called when a paste rule is triggered.

</dd>

</dl>

## Type Aliases

### PasteRuleHandler() {#pasterulehandler}

<dl>

<dt>

<code data-typedoc-code>type <a id="pasterulehandler" href="#pasterulehandler">PasteRuleHandler</a> = (`options`: [`PasteRuleHandlerOptions`](#pasterulehandleroptions)) => [`Slice`](../pm/model.md#slice)</code>

</dt>

<dd>

Can be used to transform pasted or dragged-and-dropped content before it is
applied to the document.

</dd>

</dl>

## Functions

### defineMarkPasteRule() {#definemarkpasterule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definemarkpasterule" href="#definemarkpasterule">defineMarkPasteRule</a>(`options`: [`MarkPasteRuleOptions`](#markpasteruleoptions)): `PlainExtension`</code>

</dt>

<dd>

Defines a paste rule that applies marks based on regex patterns.

</dd>

</dl>

***

### definePasteRule() {#definepasterule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definepasterule" href="#definepasterule">definePasteRule</a>(`options`: [`PasteRuleOptions`](#pasteruleoptions)): `PlainExtension`</code>

</dt>

<dd>

Defines a paste rule. This rule allows you to modify pasted or dragged
content before it is inserted into the document.

</dd>

</dl>
