import Toggle from './toggle'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { readonly, toggleReadonly } = useReadonly()

  return (
    <div className="TOOLBAR">
      <Toggle pressed={readonly} onClick={toggleReadonly}>
        Readonly
      </Toggle>

      <Toggle pressed={!readonly} onClick={toggleReadonly}>
        Editable
      </Toggle>
    </div>
  )
}
