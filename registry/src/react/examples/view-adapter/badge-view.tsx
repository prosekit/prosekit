import type { ReactNodeViewProps } from 'prosekit/react'

export function AtomBlockView(props: ReactNodeViewProps) {
  return (
    <div data-atom-block="true" data-atom-block-view="true" className="bg-green-500/50">
      Atom Block View
    </div>
  )
}
