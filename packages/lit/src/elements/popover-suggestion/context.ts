export interface PopoverSuggestionContext {
  active: boolean
  query?: string
  onDismiss?: () => void
  onSubmit?: () => void
}
