# prosekit/extensions/mention

## MentionAttrs {#mention-attrs}

<dl>

<dt>

`id`

</dt>

<dd>

**Type**: `string`

</dd>

<dt>

`kind`

</dt>

<dd>

**Type**: `string`

</dd>

<dt>

`value`

</dt>

<dd>

**Type**: `string`

</dd>

</dl>

## defineMention {#define-mention}

```ts
function defineMention(): Union<readonly [Extension<{ Nodes: { mention: MentionAttrs } }>, Extension<{ Commands: { insertMention: [attrs: MentionAttrs] } }>]>
```

## defineMentionCommands {#define-mention-commands}

```ts
function defineMentionCommands(): Extension<{ Commands: { insertMention: [attrs: MentionAttrs] } }>
```

## defineMentionSpec {#define-mention-spec}

```ts
function defineMentionSpec(): Extension<{ Nodes: { mention: MentionAttrs } }>
```
