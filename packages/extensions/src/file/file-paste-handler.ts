import {
  defineFacet,
  defineFacetPayload,
  editorEventFacet,
  type EditorEventPayload,
  type PasteHandler,
  type PlainExtension,
} from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

import { handleEvent } from './helpers.ts'

export interface FilePasteHandlerOptions {
  /**
   * The editor view.
   */
  view: EditorView

  /**
   * The event that triggered the paste.
   */
  event: ClipboardEvent

  /**
   * The file that was pasted.
   */
  file: File
}

/**
 * A function that handles one of the files in a paste event.
 *
 * Returns `true` if the file was handled and thus should not be handled by
 * other handlers.
 */
export type FilePasteHandler = (
  options: FilePasteHandlerOptions,
) => boolean | void

export function defineFilePasteHandler(
  handler: FilePasteHandler,
): PlainExtension {
  return defineFacetPayload(facet, [handler]) as PlainExtension
}

function getFiles(event: ClipboardEvent) {
  return Array.from(event.clipboardData?.files ?? [])
}

const facet = defineFacet<FilePasteHandler, EditorEventPayload>({
  parent: editorEventFacet,
  singleton: true,
  reducer: (handlers: FilePasteHandler[]): EditorEventPayload => {
    const pasteHandler: PasteHandler = (view, event): boolean => {
      return handleEvent<ClipboardEvent>(view, event, handlers, getFiles)
    }
    return ['paste', pasteHandler]
  },
})
