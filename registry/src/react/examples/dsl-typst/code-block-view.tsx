'use client'

import rendererWasmUrl from '@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url'
import compilerWasmUrl from '@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url'
import { $typst } from '@myriaddreamin/typst.ts'
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import { TextSelection } from 'prosekit/pm/state'
import type { ReactNodeViewProps } from 'prosekit/react'
import { useEffect, useRef } from 'react'

import { hideCodeBlockPreviewDecorationKey } from '../../utils/code-block-preview-decorations'

interface TypstSvgOptions {
  mainContent: string
}

interface TypstApi {
  setCompilerInitOptions: (options: { getModule: () => string }) => void
  setRendererInitOptions: (options: { getModule: () => string }) => void
  svg: (options: TypstSvgOptions) => Promise<string> | string
}

let typstPromise: Promise<TypstApi> | undefined

function getTypst(): Promise<TypstApi> {
  typstPromise ??= Promise.resolve(configureTypst($typst as TypstApi))
  return typstPromise
}

function configureTypst(typst: TypstApi): TypstApi {
  typst.setCompilerInitOptions({
    getModule: () => compilerWasmUrl,
  })
  typst.setRendererInitOptions({
    getModule: () => rendererWasmUrl,
  })
  return typst
}

function mountTypstSvg(container: HTMLElement, markup: string): void {
  container.innerHTML = markup
  const svg = container.querySelector('svg')
  if (!svg) return

  svg.style.maxWidth = '100%'
  svg.style.height = 'auto'
  svg.style.display = 'block'
}

async function renderTypst(code: string, container: HTMLElement): Promise<void> {
  const typst = await getTypst()
  const mainContent = `#set page(width: 640pt, height: auto, margin: 24pt)\n${code}`
  const svg = await typst.svg({ mainContent })
  mountTypstSvg(container, svg)
}

const previewErrorClass = 'CSS_CODE_BLOCK_PREVIEW_ERROR'

function togglePreviewError(element: HTMLElement, force: boolean): void {
  for (const className of previewErrorClass.split(/\s+/)) {
    element.classList.toggle(className, force)
  }
}

export default function TypstCodeBlockView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as CodeBlockAttrs
  const language = attrs.language || ''
  const displayRef = useRef<HTMLDivElement>(null)
  const showPreview = language === 'typst'
    && !props.decorations.some((decoration) => decoration.spec[hideCodeBlockPreviewDecorationKey])

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

  useEffect(() => {
    const display = displayRef.current
    if (!showPreview || !display) return

    let stale = false
    display.innerHTML = ''
    togglePreviewError(display, false)

    renderTypst(props.node.textContent, display)
      .catch((error: unknown) => {
        if (stale) return
        display.textContent = error instanceof Error ? error.message : String(error)
        togglePreviewError(display, true)
      })

    return () => {
      stale = true
    }
  }, [props.node, showPreview])

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
      {showPreview && (
        <div
          ref={displayRef}
          aria-label="Edit code block source"
          className="CSS_CODE_BLOCK_PREVIEW_DISPLAY"
          contentEditable={false}
          onMouseDown={focusSource}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') focusSource(event)
          }}
          role="button"
          tabIndex={0}
        >
        </div>
      )}
    </>
  )
}
