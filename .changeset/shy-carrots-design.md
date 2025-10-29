---
'prosekit': minor
"@prosekit/extensions": minor
---

Update the DOM output for task list clipboard serialization to include a
checkbox element inside the list item.

For instance, given the following content:

```ts
editor.setContent({
  type: "doc",
  content: [
    {
      type: "list",
      attrs: { kind: "task", checked: true },
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Foo" }],
        },
      ],
    },
  ],
});
console.log(editor.getDocHTML());
```

The previous output was:

```html
<div>
  <ul>
    <li
      class="prosemirror-flat-list"
      data-list-kind="task"
      data-list-checked=""
    >
      <p>
        Foo
      </p>
    </li>
  </ul>
</div>
```

The new output is:

```html
<div>
  <ul>
    <li
      class="prosemirror-flat-list"
      data-list-kind="task"
      data-list-checked=""
    >
      <p>
        <input type="checkbox" checked="" />
        Foo
      </p>
    </li>
  </ul>
</div>
```
