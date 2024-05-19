import { Themes } from '@prosekit/themes'

import Toggle from './toggle'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { getReadonly, setReadonly } = useReadonly()

  return (
    <div class={Themes.TOOLBAR}>
      <Toggle
        pressed={getReadonly}
        disabled={() => !true}
        onClick={() => setReadonly(true)}
      >
        Readonly
      </Toggle>

      <Toggle
        pressed={() => !getReadonly()}
        disabled={() => !true}
        onClick={() => setReadonly(false)}
      >
        Editable
      </Toggle>
    </div>
  )
}
