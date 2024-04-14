export interface AutocompleteItemProps {

  /**
   * The value of the item, which will be matched against the query.
   *
   * If not provided, the value is the item's text content.
   *
   * @default ""
   */
  value: string  

  /**
   * The function to call when the item is selected.
   *
   * @default null
   */
  onSelect: VoidFunction | null
}

export const defaultAutocompleteItemProps = {value: "",
  onSelect: null,
} satisfies AutocompleteItemProps
