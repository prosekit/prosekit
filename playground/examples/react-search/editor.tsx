import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo, useState } from 'react'

import { defineExtension } from './extension'
import Search from './search'
import Toolbar from './toolbar'

export default function Editor() {
  const [search, setSearch] = useState(false)
  const toggleSearch = () => setSearch((value) => !value)

  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <div className={Themes.EDITOR_DOCUMENT}>
          <Toolbar search={search} toggleSearch={toggleSearch} />
          {search ? <Search onClose={() => setSearch(false)} /> : null}
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}
