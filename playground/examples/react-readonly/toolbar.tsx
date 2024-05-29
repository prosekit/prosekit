import { Themes } from '@prosekit/themes'

import Toggle from './button'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { readonly, setReadonly } = useReadonly()

  return (
    <div className={Themes.TOOLBAR}>
      <Toggle pressed={readonly} onClick={() => setReadonly(true)}>
        Readonly
      </Toggle>

      <Toggle pressed={!readonly} onClick={() => setReadonly(false)}>
        Editable
      </Toggle>
    </div>
  )
}
