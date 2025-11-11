import {
  defineCodeBlockShiki,
  shikiBundledThemesInfo,
  type ShikiBundledTheme,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/solid'
import {
  createMemo,
  createSignal,
  For,
  type JSX,
} from 'solid-js'

export function ThemeSelector(): JSX.Element {
  const [theme, setTheme] = createSignal('github-dark')
  const extension = createMemo(() => {
    return defineCodeBlockShiki({ themes: [theme() as ShikiBundledTheme] })
  })
  useExtension(extension)

  return (
    <>
      <label for="code-block-theme-selector">Theme</label>
      <select
        id="code-block-theme-selector"
        value={theme()}
        onChange={(event) => setTheme(event.target.value)}
        class="CSS_TOGGLE_BUTTON"
      >
        <For each={shikiBundledThemesInfo}>
          {(info) => (
            <option value={info.id}>
              {info.id}
            </option>
          )}
        </For>
      </select>
    </>
  )
}
