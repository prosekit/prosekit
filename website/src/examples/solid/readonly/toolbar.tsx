import { Themes } from '@prosekit/themes'

import Button from './button'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { getReadonly, setReadonly } = useReadonly()

  return (
    <div class={Themes.TOOLBAR}>
      <Button
        pressed={getReadonly}
        disabled={() => !true}
        onClick={() => setReadonly(true)}
      >
        Readonly
      </Button>

      <Button
        pressed={() => !getReadonly()}
        disabled={() => !true}
        onClick={() => setReadonly(false)}
      >
        Editable
      </Button>
    </div>
  )
}
