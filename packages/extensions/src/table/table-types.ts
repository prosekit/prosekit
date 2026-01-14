/**
 * The attributes of a table node.
 *
 * @public
 */
export interface TableAttrs {}

/**
 * The attributes of a table row node.
 *
 * @public
 */
export interface TableRowAttrs {}

/**
 * The attributes of a table cell or table header cell node.
 *
 * @public
 */
export interface TableCellAttrs {
  /**
   * The number of columns this cell spans.
   */
  colspan?: number
  /**
   * The number of rows this cell spans.
   */
  rowspan?: number
  /**
   * An array of column widths for each spanned column, or null for default width.
   */
  colwidth?: number[] | null
}
