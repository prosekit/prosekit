/** @jsxImportSource react */

interface ToggleCodeButtonProps {
  showCode: boolean
  onShowCodeChange: () => void
}

export function ToggleCodeButton({
  showCode,
  onShowCodeChange,
}: ToggleCodeButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center justify-center rounded-lg text-sm p-2 font-500 text-secondary-foreground bg-transparent transition-colors hover:bg-muted"
      onClick={onShowCodeChange}
    >
      <>{showCode ? 'Hide code' : 'Show code'}</>
    </button>
  )
}
