# prosekit/extensions/commit

<a id="CommitRecorder" name="CommitRecorder"></a>

## CommitRecorder

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new CommitRecorder()

> **new CommitRecorder**(): [`CommitRecorder`](commit.md#CommitRecorder)

##### Returns

[`CommitRecorder`](commit.md#CommitRecorder)

### Methods

<a id="commit" name="commit"></a>

#### commit()

> **commit**(): `null` \| [`Commit`](commit.md#Commit)

Return a commit object including all changes since the last commit. `null`
will be returned if there is no change.

##### Returns

`null` \| [`Commit`](commit.md#Commit)

***

<a id="Commit" name="Commit"></a>

## Commit

A JSON representation of a commit.

### Properties

<a id="doc" name="doc"></a>

#### doc

> **doc**: [`NodeJSON`](../core.md#NodeJSON)

The current doc node in the JSON format

<a id="parent" name="parent"></a>

#### parent

> **parent**: [`NodeJSON`](../core.md#NodeJSON)

The parent node in the JSON format

<a id="steps" name="steps"></a>

#### steps

> **steps**: [`StepJSON`](../core.md#StepJSON)[]

An array of steps in the JSON format that transform the parent node to the
current doc node.

***

<a id="defineCommitRecorder" name="defineCommitRecorder"></a>

## defineCommitRecorder()

> **defineCommitRecorder**(`commitRecorder`): `PlainExtension`

Define an extension that can record the changes in the editor.

### Parameters

• **commitRecorder**: [`CommitRecorder`](commit.md#CommitRecorder)

### Returns

`PlainExtension`

***

<a id="defineCommitViewer" name="defineCommitViewer"></a>

## defineCommitViewer()

> **defineCommitViewer**(`commit`): `PlainExtension`

Define an extension to display the changes from the given commit in the editor.

### Parameters

• **commit**: [`Commit`](commit.md#Commit)

### Returns

`PlainExtension`
