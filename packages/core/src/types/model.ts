/**
 * A JSON representation of the prosemirror node.
 *
 * @public
 */
export interface NodeJson {
  type: string
  marks?: Array<any>
  text?: string
  content?: NodeJson[]
  attrs?: Record<string, any>
}

/**
 * A JSON representation of the prosemirror selection.
 *
 * @public
 */
export interface SelectionJson {
  from: number
  to: number
  type: string
}

/**
 * A JSON representation of the prosemirror state.
 *
 * @public
 */
export interface StateJson {
  /**
   * The main `ProseMirror` doc.
   */
  doc: NodeJson

  /**
   * The current selection.
   */
  selection: SelectionJson
}
