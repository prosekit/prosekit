---
title: prosekit/extensions/commit
sidebar:
  label: extensions/commit
---


## CommitRecorder {#commit-recorder}

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new CommitRecorder(): CommitRecorder
```

</dd>

<dt>

`commit`

</dt>

<dd>

Return a commit object including all changes since the last commit. `null`
will be returned if there is no change.

```ts
const commit: () => null | Commit
```

</dd>

</dl>

## Commit {#commit-1}

A JSON representation of a commit.

<dl>

<dt>

`doc: NodeJSON`

</dt>

<dd>

The current doc node in the JSON format

</dd>

<dt>

`parent: NodeJSON`

</dt>

<dd>

The parent node in the JSON format

</dd>

<dt>

`steps: StepJSON[]`

</dt>

<dd>

An array of steps in the JSON format that transform the parent node to the
current doc node.

</dd>

</dl>

## defineCommitRecorder {#define-commit-recorder}

```ts
function defineCommitRecorder(commitRecorder: CommitRecorder): PlainExtension
```

Define an extension that can record the changes in the editor.

## defineCommitViewer {#define-commit-viewer}

```ts
function defineCommitViewer(commit: Commit): PlainExtension
```

Define an extension to display the changes from the given commit in the editor.
