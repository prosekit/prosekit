import type { JSX } from 'solid-js'

import { Button } from '../../ui/button'

import { useReadonly } from './use-readonly'

export default function Toolbar(): JSX.Element {
  const { readonly, setReadonly } = useReadonly()

  return (
    <div class="CSS_TOOLBAR">
      <Button pressed={readonly()} onClick={() => setReadonly(true)}>
        Readonly
      </Button>

      <Button pressed={!readonly()} onClick={() => setReadonly(false)}>
        Editable
      </Button>
    </div>
  )
}
