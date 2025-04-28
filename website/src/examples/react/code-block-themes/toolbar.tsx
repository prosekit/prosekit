import { Themes } from '@prosekit/themes'

import { ThemeSelector } from './theme-selector'

export default function Toolbar() {
  return (
    <div className={Themes.CSS_TOOLBAR}>
      <ThemeSelector />
    </div>
  )
}
