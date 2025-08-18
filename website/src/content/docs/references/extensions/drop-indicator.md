---
title: prosekit/extensions/drop-indicator
sidebar:
  label: extensions/drop-indicator
---

## Interfaces

### DropIndicatorOptions {#dropindicatoroptions}

Options for [defineDropIndicator](#definedropindicator).

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="onshow" href="#onshow">onShow</a><i>?</i>: [`ShowHandler`](#showhandler)</code>

</dt>

<dd>

A callback that is called when the drop indicator should be shown.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="onhide" href="#onhide">onHide</a><i>?</i>: `VoidFunction`</code>

</dt>

<dd>

A callback that is called when the drop indicator should be hidden.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="ondrag" href="#ondrag">onDrag</a><i>?</i>: [`DragEventHandler`](#drageventhandler)</code>

</dt>

<dd>

A callback that is called when the `dragover` event is fired. You can
return `false` to disable the current drop point and thus hide the drop
indicator.

</dd>

</dl>

***

### DragEventHandlerOptions {#drageventhandleroptions}

Options for [DragEventHandler](#drageventhandler).

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="view" href="#view">view</a>: [`EditorView`](../pm/view.md#editorview)</code>

</dt>

<dd>

The editor's view.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="pos" href="#pos">pos</a>: `number`</code>

</dt>

<dd>

The drop position in current document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="event" href="#event">event</a>: [`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)</code>

</dt>

<dd>

The `dragover` event.

</dd>

</dl>

***

### ShowHandlerOptions {#showhandleroptions}

Options for [ShowHandler](#showhandler).

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="view-1" href="#view-1">view</a>: [`EditorView`](../pm/view.md#editorview)</code>

</dt>

<dd>

The editor's view.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="pos-1" href="#pos-1">pos</a>: `number`</code>

</dt>

<dd>

The ProseMirror position that the drop indicator should be shown at.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="line" href="#line">line</a>: `Line`</code>

</dt>

<dd>

The line that the drop indicator should be shown at.

</dd>

</dl>

## Type Aliases

### DragEventHandler() {#drageventhandler}

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="drageventhandler" href="#drageventhandler">DragEventHandler</a> = (`options`: [`DragEventHandlerOptions`](#drageventhandleroptions)) => `boolean`</code>

</dt>

<dd>

A function that will be called when the `dragover` event is fired. You can
return `false` to disable the current drop point and thus hide the drop
indicator.

</dd>

</dl>

***

### ShowHandler() {#showhandler}

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="showhandler" href="#showhandler">ShowHandler</a> = (`options`: [`ShowHandlerOptions`](#showhandleroptions)) => `void`</code>

</dt>

<dd>

A function that will be called when the drop indicator should be shown.

</dd>

</dl>

## Functions

### defineDropIndicator() {#definedropindicator}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="definedropindicator" href="#definedropindicator">defineDropIndicator</a>(`options?`: [`DropIndicatorOptions`](#dropindicatoroptions)): `PlainExtension`</code>

</dt>

<dd>

Defines an extension that controls the behavior of the drop indicator.

This extension itself doesn't draw the drop indicator, but it provides the
necessary callbacks to do so. You probably don't want to use this extension
directly, but rather use the `<DropIndicator>` component.

You can add this extension multiple times. If any extension has `onDrag`
callback defined, and it returns `false`, then the drop point will be
discarded.

</dd>

</dl>
