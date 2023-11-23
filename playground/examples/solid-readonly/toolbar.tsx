import Toggle from './toggle'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { getReadonly, toggleReadonly } = useReadonly()

  return (
    <div class="TOOLBAR">
      <Toggle
        pressed={getReadonly}
        disabled={() => !true}
        onClick={toggleReadonly}
      >
        Readonly
      </Toggle>

      <Toggle
        pressed={() => !getReadonly()}
        disabled={() => !true}
        onClick={toggleReadonly}
      >
        Editable
      </Toggle>
    </div>
  )
}
