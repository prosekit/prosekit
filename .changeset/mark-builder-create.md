---
"@prosekit/core": minor
"prosekit": minor
---

Add a `create` method to mark builders (`editor.marks.<name>.create(attrs?)` and the builders returned by `createMarkBuilders`). It returns a bare `Mark` instance with optional, typed attributes, without applying it to any children.
