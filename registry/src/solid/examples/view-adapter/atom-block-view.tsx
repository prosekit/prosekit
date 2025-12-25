import {
  useEditorExtension,
  type SolidNodeViewProps,
} from 'prosekit/solid'
import {
  createMemo,
  type JSX,
} from 'solid-js'

export function AtomBlockView(props: SolidNodeViewProps): JSX.Element {
  const editor = useEditorExtension()

  const docJSON = createMemo(() => {
    return JSON.stringify(editor.getDocJSON(), null, 2)
  })

  return (
    <div attr:data-atom-block="true" attr:data-atom-block-view="true" class="bg-green-500/30">
      <div attr:data-testid="atom-block-view-label">Atom Block View</div>
      <div attr:data-testid="atom-block-view-pos">{props.getPos()}</div>
      <div attr:data-testid="atom-block-view-context">
        <pre>{docJSON()}</pre>
      </div>
    </div>
  )
}
