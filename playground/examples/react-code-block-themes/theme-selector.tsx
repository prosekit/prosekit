import { defineCodeBlockShikiji } from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/react'
import { useMemo, useState } from 'react'
import { bundledThemesInfo, type BundledTheme } from 'shikiji'

export function ThemeSelector() {
  const [theme, setTheme] = useState('github-dark')
  const extension = useMemo(() => {
    return defineCodeBlockShikiji({ theme: theme as BundledTheme })
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
        {bundledThemesInfo.map((info) => (
          <option key={info.id} value={info.id}>
            {info.id}
          </option>
        ))}
      </select>
    </>
  )
}
