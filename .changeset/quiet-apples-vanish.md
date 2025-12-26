---
'prosekit': minor
'@prosekit/core': minor
---

Add `setNodeAttrsBetween` command and update `setNodeAttrs` behavior.

- **New**: Added `setNodeAttrsBetween` command to set attributes on all matching nodes within a range (from/to positions or selection range)
- **Changed**: `setNodeAttrs` now updates only a single node instead of all nodes in a range. When no position is specified, it finds the closest ancestor node matching the type. When a position is provided, it updates the node at that specific position.
