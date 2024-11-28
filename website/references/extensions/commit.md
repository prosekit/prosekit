# prosekit/extensions/commit

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

```ts
const commit: () => null | Commit
```

</dd>

</dl>

## Commit {#commit-1}

A JSON representation of a commit.

<dl>

<dt>

`doc`

</dt>

<dd>

The current doc node in the JSON format

**Type**: `NodeJSON`

</dd>

<dt>

`parent`

</dt>

<dd>

The parent node in the JSON format

**Type**: `NodeJSON`

</dd>

<dt>

`steps`

</dt>

<dd>

An array of steps in the JSON format that transform the parent node to the
current doc node.

**Type**: `StepJSON[]`

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
