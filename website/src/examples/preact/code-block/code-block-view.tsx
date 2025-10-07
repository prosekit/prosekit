import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import type { PreactNodeViewProps } from 'prosekit/preact'

export default function CodeBlockView(props: PreactNodeViewProps) {
  const attrs = props.node.attrs as CodeBlockAttrs
  const language = attrs.language

  const setLanguage = (language: string) => {
    const attrs: CodeBlockAttrs = { language }
    props.setAttrs(attrs)
  }

  return (
    <>
      <div class="CSS_LANGUAGE_WRAPPER" contentEditable={false}>
        <select
          class="CSS_LANGUAGE_SELECT"
          onChange={(event) => setLanguage((event.target as HTMLSelectElement).value)}
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
      <pre ref={props.contentRef} data-language={language}></pre>
    </>
  )
}
