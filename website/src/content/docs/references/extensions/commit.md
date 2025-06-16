---
title: prosekit/extensions/commit
sidebar:
  label: extensions/commit
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### CommitRecorder {#commitrecorder}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new CommitRecorder(): CommitRecorder;
```

###### Returns

[`CommitRecorder`](#commitrecorder)

<!-- DEBUG inheritance start kind=16384 -->

#### Methods

##### commit() {#commit}

```ts
commit(): null | Commit;
```

Return a commit object including all changes since the last commit. `null`
will be returned if there is no change.

###### Returns

`null` \| [`Commit`](#commit-2)

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### Commit {#commit-2}

<!-- DEBUG memberWithGroups 1 -->

A JSON representation of a commit.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### doc {#doc}

```ts
doc: NodeJSON;
```

The current doc node in the JSON format

##### parent {#parent}

```ts
parent: NodeJSON;
```

The parent node in the JSON format

##### steps {#steps}

```ts
steps: StepJSON[];
```

An array of steps in the JSON format that transform the parent node to the
current doc node.

<!-- DEBUG memberWithGroups 10 -->

## Functions

### defineCommitRecorder() {#definecommitrecorder}

```ts
function defineCommitRecorder(commitRecorder: CommitRecorder): PlainExtension;
```

Define an extension that can record the changes in the editor.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`commitRecorder`

</td>
<td>

[`CommitRecorder`](#commitrecorder)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG inheritance start kind=4096 -->

***

### defineCommitViewer() {#definecommitviewer}

```ts
function defineCommitViewer(commit: Commit): PlainExtension;
```

Define an extension to display the changes from the given commit in the editor.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`commit`

</td>
<td>

[`Commit`](#commit-2)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
