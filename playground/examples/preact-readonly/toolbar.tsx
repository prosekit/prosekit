import Toggle from './toggle'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { readonly, toggleReadonly } = useReadonly()

  return (
    <div class="TOOLBAR">
      <Toggle available={true} active={readonly} onChange={toggleReadonly}>
        Readonly
      </Toggle>

      <Toggle available={true} active={!readonly} onChange={toggleReadonly}>
        Editable
      </Toggle>
    </div>
  )
}
