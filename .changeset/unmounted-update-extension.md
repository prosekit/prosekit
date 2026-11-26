---
"@prosekit/core": patch
"prosekit": patch
---

Fix removing an extension while the editor is unmounted. The editor state now drops the extension's plugins, so adding an extension with the same plugin key after remounting no longer throws. Updating extensions on a view that was destroyed without `editor.unmount()` now logs a warning.
