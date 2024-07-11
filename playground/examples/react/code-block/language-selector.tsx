import { Themes } from '@prosekit/themes'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

export default function LanguageSelector({
  language,
  setLanguage,
}: {
  language?: string
  setLanguage: (language: string) => void
}) {
  return (
    <div className={Themes.LANGUAGE_WRAPPER} contentEditable={false}>
      <select
        className={Themes.LANGUAGE_SELECT}
        onChange={(event) => setLanguage(event.target.value)}
        value={language || ''}
      >
        <option value="">Plain Text</option>
        {shikiBundledLanguagesInfo.map((info) => (
          <option key={info.id} value={info.id}>
            {info.name}
          </option>
        ))}
      </select>
    </div>
  )
}
