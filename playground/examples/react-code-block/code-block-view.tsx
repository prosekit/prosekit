import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { type ReactNodeViewProps } from 'prosekit/react'

import LanguageSelector from './language-selector'

export default function CodeBlockView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as CodeBlockAttrs
  const language = attrs.language

  const setLanguage = (language: string) => {
    props.setAttrs({ language })
  }

  return (
    <>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <pre ref={props.contentRef} data-language={language}></pre>
    </>
  )
}
