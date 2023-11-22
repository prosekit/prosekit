import ToggleButton from './ToggleButton'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { getReadonly, toggleReadonly } = useReadonly()

  return (
    <div class="TOOLBAR">
      <ToggleButton
        active={getReadonly}
        available={() => true}
        onChange={toggleReadonly}
      >
        Readonly
      </ToggleButton>

      <ToggleButton
        active={() => !getReadonly()}
        available={() => true}
        onChange={toggleReadonly}
      >
        Editable
      </ToggleButton>
    </div>
  )
}
