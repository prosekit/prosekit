import { Themes } from '@prosekit/themes'

import Button from './button'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { readonly, setReadonly } = useReadonly()

  return (
    <div class={Themes.TOOLBAR}>
      <Button pressed={readonly} onClick={() => setReadonly(true)}>
        Readonly
      </Button>

      <Button pressed={!readonly} onClick={() => setReadonly(false)}>
        Editable
      </Button>
    </div>
  )
}
