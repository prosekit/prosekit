import type { EditorView } from '@prosekit/pm/view'

type FileHandler<E extends Event> = (options: {
  view: EditorView
  event: E
  file: File
}) => boolean | void

function handleFile<E extends Event>(
  view: EditorView,
  event: E,
  file: File,
  handlers: FileHandler<E>[],
) {
  // The last item in `handlers` should has the highest priority.
  for (let i = handlers.length - 1; i >= 0; i--) {
    const handler = handlers[i]
    if (handler({ view, event, file })) {
      return true
    }
  }
  return false
}

export function handleEvent<E extends Event>(
  view: EditorView,
  event: E,
  handlers: FileHandler<E>[],
  getFiles: (event: E) => File[],
): boolean {
  const files = getFiles(event)
  let handled = false
  for (const file of files) {
    if (handleFile(view, event, file, handlers)) {
      handled = true
    }
  }
  return handled
}
