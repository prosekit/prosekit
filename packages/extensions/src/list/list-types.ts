/**
 * The attributes of a list node.
 *
 * @public
 */
export interface ListAttrs {
  /**
   * The kind of list node.
   */
  kind?: 'bullet' | 'ordered' | 'task' | 'toggle'
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
