/**
 * The attributes of a list node.
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

/**
 * Options for the list extension.
 */
export interface ListOptions {
  /**
   * Whether to run the indent, dedent and split commands in strict mode. In
   * strict mode a list node is never more than one level deeper than the block
   * before it, so no list node ends up with a hidden marker. Tab on the first
   * item of a list then does nothing.
   *
   * @default false
   */
  strict?: boolean
}
