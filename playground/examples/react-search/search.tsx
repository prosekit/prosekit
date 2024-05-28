import { Themes } from '@prosekit/themes'
import { clsx } from 'prosekit/core'
import { useState } from 'react'

import Toggle from './button'

export default function Search({ onClose }: { onClose: VoidFunction }) {
  const [showReplace, setShowReplace] = useState(false)
  const toggleReplace = () => setShowReplace((value) => !value)

  return (
    <div className={Themes.SEARCH}>
      <Toggle tooltip="Toggle Replace" onClick={toggleReplace}>
        <span
          className={clsx(
            Themes.ICON_CHEVRON_RIGHT,
            showReplace
              ? 'rotate-90 transition-transform'
              : 'transition-transform',
          )}
        />
      </Toggle>
      <input className={Themes.SEARCH_INPUT} placeholder="Search" type="text" />
      <div className={Themes.SEARCH_CONTROLLER}>
        <Toggle tooltip="Previous">
          <span className={Themes.ICON_ARROW_LEFT} />
        </Toggle>
        <Toggle tooltip="Next">
          <span className={Themes.ICON_ARROW_RIGHT} />
        </Toggle>
        <Toggle tooltip="Close" onClick={onClose}>
          <span className={Themes.ICON_CLOSE} />
        </Toggle>
      </div>
      {showReplace && (
        <input
          className={Themes.SEARCH_INPUT}
          placeholder="Replace"
          type="text"
        />
      )}
      {showReplace && (
        <div className={Themes.SEARCH_CONTROLLER}>
          <Toggle tooltip="Replace">Replace</Toggle>
          <Toggle tooltip="Replace All">All</Toggle>
        </div>
      )}
    </div>
  )
}
