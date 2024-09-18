import { Themes } from '@prosekit/themes'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import { createMemo, For } from 'solid-js'

export default function LanguageSelector({
  language,
  setLanguage,
}: {
  language?: string
  setLanguage: (language: string) => void
}) {
  const valueLanguage = createMemo(() => {
    return language
  })
  return (
    <div class={Themes.LANGUAGE_WRAPPER} contentEditable={false}>
      <select
        class={Themes.LANGUAGE_SELECT}
        onChange={(event) => setLanguage(event.target.value)}
        value={valueLanguage() || ''}
      >
        <option value="">Plain Text</option>
        <For each={shikiBundledLanguagesInfo}>
          {(info) => (
            <option value={info.id}>
              {info.name}
            </option>
          )}
        </For>
      </select>
    </div>
  )
}
