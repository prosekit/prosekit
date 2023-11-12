/**
 * A JSON representation of the prosemirror node.
 *
 * @public
 */
export interface NodeJSON {
  type: string
  marks?: Array<any>
  text?: string
  content?: NodeJSON[]
  attrs?: Record<string, any>
}

/**
 * A JSON representation of the prosemirror selection.
 *
 * @public
 */
export interface SelectionJSON {
  anchor: number
  head: number
  type: string
}

/**
 * A JSON representation of the prosemirror state.
 *
 * @public
 */
export interface StateJSON {
  /**
   * The main `ProseMirror` doc.
   */
  doc: NodeJSON

  /**
   * The current selection.
   */
  selection: SelectionJSON
}
