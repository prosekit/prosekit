import Toggle from './toggle'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { getReadonly, toggleReadonly } = useReadonly()

  return (
    <div class="TOOLBAR">
      <Toggle
        active={getReadonly}
        available={() => true}
        onChange={toggleReadonly}
      >
        Readonly
      </Toggle>

      <Toggle
        active={() => !getReadonly()}
        available={() => true}
        onChange={toggleReadonly}
      >
        Editable
      </Toggle>
    </div>
  )
}
