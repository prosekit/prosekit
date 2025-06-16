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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="attrs"></a> `attrs?`

</td>
<td>

 \| `null` \| [`Attrs`](../pm/model.md#attrs-5) \| (`match`: `RegExpMatchArray`) => `null` \| [`Attrs`](../pm/model.md#attrs-5)

</td>
<td>

Attributes to set on the mark. If a function is provided, it will be called
with the matched result from the regular expression.

**Default**

```ts
null
```

</td>
</tr>
<tr>
<td>

<a id="regex"></a> `regex`

</td>
<td>

[`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

</td>
<td>

The regular expression to match against. It must has a `g` flag to match
all instances of the mark.

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`string` \| [`MarkType`](../pm/model.md#marktype-1)

</td>
<td>

The mark type to apply to the matched text.

</td>
</tr>
</tbody>
</table>

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

<!-- DEBUG memberWithGroups 10 -->
