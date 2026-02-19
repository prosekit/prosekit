import {
  defineFacet,
  defineFacetPayload,
  editorEventFacet,
  type DropHandler,
  type EditorEventPayload,
  type PlainExtension,
} from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { handleEvent } from './helpers.ts'

export interface FileDropHandlerOptions {
  /**
   * The editor view.
   */
  view: EditorView

  /**
   * The event that triggered the drop.
   */
  event: DragEvent

  /**
   * The file that was dropped.
   */
  file: File

  /**
   * The position of the document where the file was dropped.
   */
  pos: number
}

/**
 * A function that handles one of the files in a drop event.
 *
 * Returns `true` if the file was handled and thus should not be handled by
 * other handlers.
 */
export type FileDropHandler = (
  options: FileDropHandlerOptions,
) => boolean | void

export function defineFileDropHandler(
  handler: FileDropHandler,
): PlainExtension {
  return defineFacetPayload(facet, [handler]) as PlainExtension
}

function getFiles(event: DragEvent) {
  return Array.from(event.dataTransfer?.files ?? [])
}

const facet = defineFacet<FileDropHandler, EditorEventPayload>({
  parent: editorEventFacet,
  singleton: true,
  reducer: (handlers: FileDropHandler[]): EditorEventPayload => {
    const dropHandler: DropHandler = (view, event): boolean => {
      const position = view.posAtCoords({ left: event.x, top: event.y })
      if (!position) {
        return false
      }
      const pos = position.inside > 0 ? position.inside : position.pos

      return handleEvent<DragEvent>(
        view,
        event,
        handlers.map((handler) => (options) => handler({ ...options, pos })),
        getFiles,
      )
    }
    return ['drop', dropHandler]
  },
})
