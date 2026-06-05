import type { EditorView } from '@prosekit/pm/view'

/**
 * @internal
 */
export function pasteText(view: EditorView, text: string) {
  const clipboardData = new DataTransfer()
  clipboardData.setData('text/plain', text)
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteText(text, event)
}

/**
 * @internal
 */
export function pasteHTML(view: EditorView, html: string) {
  const clipboardData = new DataTransfer()
  clipboardData.setData('text/html', html)
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteHTML(html, event)
}


/*

PR_REVIEW: since we now need pasteText pasteHTML in multiple packages, let's just move them to prosekit/test so that they are available for all packages to use. Some rules to follow:

1. add some JSDoc comments to these functions so that it's clear what they do and how to use them
2. still keep them in a separate file (packages/core/src/test/clipboard.ts) and re-export them from /private/tmppackages/core/src/test/index.ts
3. these two function should still have @internal tag in their JSDoc comments, since I don't want to maintaine the API compatibility for them
4. avoid duplicated definitions of these functions in different packages
5. always git commit and git push the changes to the remote branch after your changes are done




*/
