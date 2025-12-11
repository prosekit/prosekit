import type {
  Editor,
  Extension,
} from '@prosekit/core'

/**
 * @internal
 *
 * Queues an extension to be added to the editor in the next microtask. Returns
 * a dispose function that can be used to remove the extension in the next
 * microtask.
 */
export function queueExtension(editor: Editor, extension: Extension): VoidFunction {
  let canceled = false
  let dispose: VoidFunction | undefined
  let timeout = setTimeout(() => {
    if (canceled) return
    dispose = editor.use(extension)
  })

  return () => {
    canceled = true
    clearTimeout(timeout)
    setTimeout(() => {
      if (dispose) {
        dispose()
        dispose = undefined
      }
    })
  }
}
