---
title: prosekit/extensions/commit
sidebar:
  label: extensions/commit
---

## Classes

### CommitRecorder {#commitrecorder}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorcommitrecorder" href="#constructorcommitrecorder">CommitRecorder</a>(): [`CommitRecorder`](#commitrecorder)</code>

</dt>

</dl>

#### Methods

##### commit() {#commit}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="commit-1" href="#commit-1">commit</a>(): `null` \| [`Commit`](#commit-2)</code>

</dt>

<dd>

Return a commit object including all changes since the last commit. `null`
will be returned if there is no change.

</dd>

</dl>

## Interfaces

### Commit {#commit-2}

A JSON representation of a commit.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="doc" href="#doc">doc</a>: [`NodeJSON`](../core.md#nodejson)</code>

</dt>

<dd>

The current doc node in the JSON format

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="parent" href="#parent">parent</a>: [`NodeJSON`](../core.md#nodejson)</code>

</dt>

<dd>

The parent node in the JSON format

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="steps" href="#steps">steps</a>: [`StepJSON`](../core.md#stepjson)[]</code>

</dt>

<dd>

An array of steps in the JSON format that transform the parent node to the
current doc node.

</dd>

</dl>

## Functions

### defineCommitRecorder() {#definecommitrecorder}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definecommitrecorder-2" href="#definecommitrecorder-2">defineCommitRecorder</a>(`commitRecorder`: [`CommitRecorder`](#commitrecorder)): `PlainExtension`</code>

</dt>

<dd>

Define an extension that can record the changes in the editor.

</dd>

</dl>

***

### defineCommitViewer() {#definecommitviewer}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definecommitviewer-2" href="#definecommitviewer-2">defineCommitViewer</a>(`commit`: [`Commit`](#commit-2)): `PlainExtension`</code>

</dt>

<dd>

Define an extension to display the changes from the given commit in the editor.

</dd>

</dl>
