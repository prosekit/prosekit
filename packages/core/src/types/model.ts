/**
 * A JSON representation of the prosemirror node.
 */
export interface NodeJSON {
  type: string
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
  text?: string
  content?: NodeJSON[]
  attrs?: Record<string, any>
}

/**
 * A JSON representation of the prosemirror selection.
 */
export interface SelectionJSON {
  anchor: number
  head: number
  type: string
}

/**
 * A JSON representation of the prosemirror state.
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

/**
 * A JSON representation of the prosemirror step.
 */
export interface StepJSON {
  /**
   * The type of the step.
   */
  stepType: string

  [x: string]: unknown
}
