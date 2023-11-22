import type { ComponentChild } from 'preact'

export default function Toggle({
  active,
  available,
  onChange,
  children,
}: {
  active?: boolean
  available: boolean
  onChange: () => void
  children: ComponentChild
}) {
  return (
    <button
      data-state={active ? 'on' : 'off'}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onChange()}
      disabled={!available}
      class="TOGGLE_BUTTON"
    >
      {children}
    </button>
  )
}
