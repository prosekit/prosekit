import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import type { SolidNodeViewProps } from 'prosekit/solid'

import LanguageSelector from './language-selector'

export default function CodeBlockView(props: SolidNodeViewProps) {
  const attrs = props.node.attrs as CodeBlockAttrs
  const language = attrs.language

  const setLanguage = (language: string) => {
    const attrs: CodeBlockAttrs = { language }
    props.setAttrs(attrs)
  }

  return (
    <>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <pre ref={props.contentRef} data-language={language}></pre>
    </>
  )
}
