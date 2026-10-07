import type { JSX } from 'solid-js'

import { ThemeSelector } from './theme-selector.tsx'

export default function Toolbar(): JSX.Element {
  return (
    <div class="CSS_TOOLBAR">
      <ThemeSelector />
    </div>
  )
}
