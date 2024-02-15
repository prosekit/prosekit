import {
  defineCodeBlockShiki,
  shikiBundledLanguagesInfo,
  type ShikiBundledTheme,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/react'
import { useMemo, useState } from 'react'

export function ThemeSelector() {
  const [theme, setTheme] = useState('github-dark')
  const extension = useMemo(() => {
    return defineCodeBlockShiki({ themes: [theme as ShikiBundledTheme] })
  }, [theme])
  useExtension(extension)

  return (
    <>
      <label>Theme:</label>
      <select
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        className="TOGGLE_BUTTON"
      >
        {shikiBundledLanguagesInfo.map((info) => (
          <option key={info.id} value={info.id}>
            {info.id}
          </option>
        ))}
      </select>
    </>
  )
}
