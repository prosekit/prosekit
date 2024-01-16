import { type Editor, type Extension } from '@prosekit/core'
import type { ReactiveControllerHost } from 'lit'

import type { WithEditor } from '../types/with-editor'

export function useEditorExtension(
  host: WithEditor<ReactiveControllerHost>,
  extension: Extension,
) {
  let cleanup: VoidFunction | undefined
  let editor: Editor | undefined | null

  const update = () => {
    cleanup?.()
    cleanup = editor?.use(extension)
  }

  const hostConnected = () => {
    editor = host.editor
    update()
  }

  const hostUpdated = () => {
    const newEditor = host.editor
    if (editor !== newEditor) {
      editor = newEditor
      update()
    }
  }

  const hostDisconnected = () => {
    cleanup?.()
    cleanup = undefined
  }

  host.addController({
    hostConnected,
    hostDisconnected,
    hostUpdated,
  })
}
