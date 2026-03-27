import type { JSX } from 'preact'
import { useMemo, useState } from 'preact/hooks'
import { defineCodeBlockShiki, shikiBundledThemesInfo, type ShikiBundledTheme } from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/preact'

export function ThemeSelector() {
  const [theme, setTheme] = useState('github-dark')
  const extension = useMemo(() => {
    return defineCodeBlockShiki({ themes: [theme as ShikiBundledTheme] })
  }, [theme])
  useExtension(extension)

  const handleChange = (
    event: JSX.TargetedEvent<HTMLSelectElement, Event>,
  ) => {
    setTheme(event.currentTarget.value)
  }

  return (
    <>
      <label htmlFor="code-block-theme-selector">Theme</label>
      <select
        id="code-block-theme-selector"
        value={theme}
        onChange={handleChange}
        className="CSS_TOGGLE_BUTTON"
      >
        {shikiBundledThemesInfo.map((info) => (
          <option key={info.id} value={info.id}>
            {info.id}
          </option>
        ))}
      </select>
    </>
  )
}
