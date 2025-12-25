import {
  useEditorDerivedValue,
  type ReactNodeViewProps,
} from 'prosekit/react'
import { useCallback } from 'react'

export function AtomBlockView(props: ReactNodeViewProps) {
  const docJSON = useEditorDerivedValue(useCallback(editor => {
    return JSON.stringify(editor.getDocJSON(), null, 2)
  }, []))

  return (
    <div data-atom-block="true" data-atom-block-view="true" className="bg-green-500/30">
      <div data-testid="atom-block-view-label">Atom Block View</div>
      <div data-testid="atom-block-view-pos">{props.getPos()}</div>
      <div data-testid="atom-block-view-context">
        <pre>{docJSON}</pre>
      </div>
    </div>
  )
}
