import { Themes } from '@prosekit/themes'

import Button from './button'

export default function Toolbar({
  search,
  toggleSearch,
}: {
  search: boolean
  toggleSearch: VoidFunction
}) {
  return (
    <div className={Themes.TOOLBAR}>
      <Button pressed={search} onClick={toggleSearch} tooltip="Search">
        <div className={Themes.ICON_SEARCH} />
      </Button>
    </div>
  )
}
