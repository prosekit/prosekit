# prosekit/extensions/mention

## MentionAttrs {#mention-attrs}

<dl>

<dt>

`id: string`

</dt>

<dd>

</dd>

<dt>

`kind: string`

</dt>

<dd>

</dd>

<dt>

`value: string`

</dt>

<dd>

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
