/**
 * The attributes of a list node.
 */
export interface ListAttrs {
  /**
   * The kind of list node. Can be `"bullet"`, `"ordered"`, `"task"` or `"toggle"`.
   */
  kind?: string
  /**
   * The optional order of the list node.
   */
  order?: number | null
  /**
   * Whether the list node is checked if its `kind` is `"task"`.
   */
  checked?: boolean
  /**
   * Whether the list node is collapsed if its `kind` is `"toggle"`.
   */
  collapsed?: boolean
}
