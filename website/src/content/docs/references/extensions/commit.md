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

<code data-typedoc-code>new <a id="constructor" href="#constructor">CommitRecorder</a>(): [`CommitRecorder`](#commitrecorder)</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="commit-1" href="#commit-1">commit</a>(): `null` \| [`Commit`](#commit)</code>

</dt>

<dd>

Return a commit object including all changes since the last commit. `null`
will be returned if there is no change.

</dd>

</dl>

## Interfaces

### Commit {#commit}

A JSON representation of a commit.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="doc" href="#doc">doc</a>: [`NodeJSON`](../core.md#nodejson)</code>

</dt>

<dd>

The current doc node in the JSON format

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="parent" href="#parent">parent</a>: [`NodeJSON`](../core.md#nodejson)</code>

</dt>

<dd>

The parent node in the JSON format

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="steps" href="#steps">steps</a>: [`StepJSON`](../core.md#stepjson)[]</code>

</dt>

<dd>

An array of steps in the JSON format that transform the parent node to the
current doc node.

</dd>

</dl>

## Functions

### defineCommitViewer() {#definecommitviewer}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecommitviewer" href="#definecommitviewer">defineCommitViewer</a>(`commit`: [`Commit`](#commit)): `PlainExtension`</code>

</dt>

<dd>

Define an extension to display the changes from the given commit in the editor.

</dd>

</dl>

***

### defineCommitRecorder() {#definecommitrecorder}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecommitrecorder" href="#definecommitrecorder">defineCommitRecorder</a>(`commitRecorder`: [`CommitRecorder`](#commitrecorder)): `PlainExtension`</code>

</dt>

<dd>

Define an extension that can record the changes in the editor.

</dd>

</dl>
