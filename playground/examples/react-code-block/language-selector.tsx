import { bundledLanguagesInfo } from 'shikiji'

export default function LanguageSelector({
  language,
  setLanguage,
}: {
  language?: string
  setLanguage: (language: string) => void
}) {
  return (
    <div className="LANGUAGE_WRAPPER">
      <select
        className="LANGUAGE_SELECT"
        onChange={(event) => setLanguage(event.target.value)}
        value={language || ''}
      >
        <option value="">Plain Text</option>
        {bundledLanguagesInfo.map((info) => (
          <option key={info.id} value={info.id}>
            {info.name}
          </option>
        ))}
      </select>
    </div>
  )
}
