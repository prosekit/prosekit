'use client'

import { renderMermaidSVG, THEMES } from 'beautiful-mermaid'
import { hasCodeBlockPreviewHiddenDecoration, shikiBundledLanguagesInfo, type CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { TextSelection } from 'prosekit/pm/state'
import type { ReactNodeViewProps } from 'prosekit/react'
import { useMemo } from 'react'

export default function CodeBlockView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as CodeBlockAttrs
  const language = attrs.language || ''
  const showPreview = language === 'mermaid'
    && !hasCodeBlockPreviewHiddenDecoration(props.decorations)

  const setLanguage = (language: string) => {
    const attrs: CodeBlockAttrs = { language }
    props.setAttrs(attrs)
  }

  const focusSource = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault()
    const pos = props.getPos()
    if (typeof pos !== 'number') return
    const { state, dispatch } = props.view
    const selection = TextSelection.near(state.doc.resolve(pos + 1), 1)
    dispatch(state.tr.setSelection(selection as never))
    props.view.focus()
  }

  const code = props.node.textContent
  const { svg, error } = useMemo(() => {
    if (language !== 'mermaid') return { svg: null, error: null }
    try {
      return { svg: renderMermaidSVG(code, THEMES['tokyo-night']), error: null }
    } catch (err) {
      return { svg: null, error: err instanceof Error ? err : new Error(String(err)) }
    }
  }, [code, language])

  return (
    <>
      <div className="CSS_LANGUAGE_WRAPPER" contentEditable={false}>
        <select
          aria-label="Code block language"
          className="CSS_LANGUAGE_SELECT"
          onChange={(event) => setLanguage(event.target.value)}
          value={language}
        >
          <option value="">Plain Text</option>
          {shikiBundledLanguagesInfo.map((info) => (
            <option key={info.id} value={info.id}>
              {info.name}
            </option>
          ))}
        </select>
      </div>
      <pre
        ref={props.contentRef}
        className={showPreview ? 'CSS_CODE_BLOCK_PREVIEW_SOURCE' : undefined}
        data-language={language}
      ></pre>
      {showPreview && (error
        ? <pre>{error.message}</pre>
        : (
          <div
            aria-label="Edit code block source"
            className="CSS_CODE_BLOCK_PREVIEW_DISPLAY"
            contentEditable={false}
            dangerouslySetInnerHTML={{ __html: svg || '' }}
            onMouseDown={focusSource}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') focusSource(event)
            }}
            role="button"
            tabIndex={0}
          />
        ))}
    </>
  )
}
