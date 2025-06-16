---
title: prosekit/extensions/mark-rule
sidebar:
  label: extensions/mark-rule
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### MarkRuleOptions {#markruleoptions}

<!-- DEBUG memberWithGroups 1 -->

The options for [defineMarkRule](#definemarkrule).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs}

```ts
optional attrs: 
  | null
  | Attrs
  | (match: RegExpMatchArray) => null | Attrs;
```

Attributes to set on the mark. If a function is provided, it will be called
with the matched result from the regular expression.

###### Default

```ts
null
```

##### regex {#regex}

```ts
regex: RegExp;
```

The regular expression to match against. It must has a `g` flag to match
all instances of the mark.

##### type {#type}

```ts
type: string | MarkType;
```

The mark type to apply to the matched text.

<!-- DEBUG memberWithGroups 10 -->

## Functions

### defineMarkRule() {#definemarkrule}

```ts
function defineMarkRule(options: MarkRuleOptions): PlainExtension;
```

A mark rule is something that can automatically apply marks to text if it
matches a certain pattern, and remove them if it doesn't match anymore.

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

`options`

</td>
<td>

[`MarkRuleOptions`](#markruleoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
