import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import type { SolidNodeViewProps } from 'prosekit/solid'
import { For } from 'solid-js'

export default function CodeBlockView(props: SolidNodeViewProps) {
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
          onChange={(event) => setLanguage(event.target.value)}
          value={language || ''}
        >
          <option value="">Plain Text</option>
          <For each={shikiBundledLanguagesInfo}>
            {(info) => <option value={info.id}>{info.name}</option>}
          </For>
        </select>
      </div>
      <pre ref={props.contentRef} data-language={language}></pre>
    </>
  )
}
