import type { ReactNode } from 'react'

export default function Toggle({
  active,
  available,
  onChange,
  children,
}: {
  active?: boolean
  available: boolean
  onChange: () => void
  children: ReactNode
}) {
  return (
    <button
      data-state={active ? 'on' : 'off'}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onChange()}
      disabled={!available}
      className="TOGGLE_BUTTON"
    >
      {children}
    </button>
  )
}
