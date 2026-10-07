import { renderMermaidSVG, THEMES } from 'beautiful-mermaid'
import type { JSX } from 'preact'
import { useMemo, useRef } from 'preact/hooks'
import { isCodeBlockPreviewHiddenDecoration, shikiBundledLanguagesInfo, type CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { TextSelection } from 'prosekit/pm/state'
import type { PreactNodeViewProps } from 'prosekit/preact'

export default function CodeBlockView(props: PreactNodeViewProps) {
  const attrs = props.node.attrs as CodeBlockAttrs
  const language = attrs.language || ''
  const hidePreview = props.decorations.some(isCodeBlockPreviewHiddenDecoration)
  const preRef = useRef<HTMLPreElement | null>(null)

  const showMermaidPreview = !hidePreview && language === 'mermaid'

  const setLanguage = (language: string) => {
    const attrs: CodeBlockAttrs = { language }
    props.setAttrs(attrs)
  }

  const handleChange = (
    event: JSX.TargetedEvent<HTMLSelectElement, Event>,
  ) => {
    setLanguage(event.currentTarget.value)
  }

  const focusSource = (event: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    const pos = props.getPos()
    if (typeof pos !== 'number') return
    const { state, dispatch } = props.view
    const selection = TextSelection.near(state.doc.resolve(pos + 1), 1)
    dispatch(state.tr.setSelection(selection))
    props.view.focus()
    preRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const code = props.node.textContent

  const mermaidPreview = useMemo(() => {
    if (language !== 'mermaid') return { svg: null as string | null, error: null as Error | null }
    try {
      return { svg: renderMermaidSVG(code, THEMES['tokyo-night']), error: null }
    } catch (err) {
      return { svg: null, error: err instanceof Error ? err : new Error(String(err)) }
    }
  }, [code, language])

  return (
    <>
      <div
        className="CSS_LANGUAGE_WRAPPER"
        contentEditable={false}
        data-preview={showMermaidPreview ? '' : undefined}
      >
        <select
          aria-label="Code block language"
          className="CSS_LANGUAGE_SELECT"
          onChange={handleChange}
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
        ref={(element) => {
          props.contentRef(element)
          preRef.current = element
        }}
        className="CSS_CODE_BLOCK_PREVIEW_SOURCE"
        data-preview={showMermaidPreview ? '' : undefined}
        data-language={language}
      ></pre>
      {showMermaidPreview && (
        <div
          aria-label="Edit source"
          className="CSS_CODE_BLOCK_PREVIEW_DISPLAY"
          contentEditable={false}
          onMouseDown={focusSource}
        >
          {mermaidPreview.error ? <pre>{mermaidPreview.error.message}</pre> : null}
          {mermaidPreview.svg
            ? <div dangerouslySetInnerHTML={{ __html: mermaidPreview.svg }}></div>
            : null}
        </div>
      )}
    </>
  )
}
