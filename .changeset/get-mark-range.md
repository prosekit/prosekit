---
"@prosekit/core": minor
"prosekit": minor
---

Add `getMarkRange`, which returns the contiguous range of a mark touching a resolved position. A position at either edge of the run counts as touching it, and a neighbouring mark that differs in attributes starts a new run.
