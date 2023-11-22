import ToggleButton from './ToggleButton'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { readonly, toggleReadonly } = useReadonly()

  return (
    <div class="TOOLBAR">
      <ToggleButton
        available={true}
        active={readonly}
        onChange={toggleReadonly}
      >
        Readonly
      </ToggleButton>

      <ToggleButton
        available={true}
        active={!readonly}
        onChange={toggleReadonly}
      >
        Editable
      </ToggleButton>
    </div>
  )
}
