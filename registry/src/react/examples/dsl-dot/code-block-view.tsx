'use client'

import { instance } from '@viz-js/viz'
import type { Viz } from '@viz-js/viz'
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import { TextSelection } from 'prosekit/pm/state'
import type { ReactNodeViewProps } from 'prosekit/react'
import { useEffect, useRef, useState } from 'react'

import { isSelectionInsideCodeBlock } from '../../utils/is-selection-inside-code-block'

let vizPromise: Promise<Viz> | undefined

function getViz(): Promise<Viz> {
  vizPromise ??= instance()
  return vizPromise
}

function mountSvgElement(container: HTMLElement, svg: SVGSVGElement): void {
  container.replaceChildren(svg)
  container.style.overflowX = 'auto'
  svg.style.display = 'block'
  svg.style.width = '100%'
  svg.style.height = 'auto'
  svg.style.maxWidth = '100%'
}

const previewErrorClass = 'CSS_CODE_BLOCK_PREVIEW_ERROR'

function togglePreviewError(element: HTMLElement, force: boolean): void {
  for (const className of previewErrorClass.split(/\s+/)) {
    element.classList.toggle(className, force)
  }
}

export default function DotCodeBlockView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as CodeBlockAttrs
  const language = attrs.language || ''
  const [_selectionVersion, setSelectionVersion] = useState(0)
  const displayRef = useRef<HTMLDivElement>(null)
  const pos = props.getPos()
  const showPreview = typeof pos === 'number'
    && language === 'dot'
    && !isSelectionInsideCodeBlock(props.view.state, pos, props.node)

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
    const doc = props.view.dom.ownerDocument
    const handleSelectionChange = () => {
      setSelectionVersion((value) => value + 1)
    }

    doc.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      doc.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [props.view])

  useEffect(() => {
    const display = displayRef.current
    if (!showPreview || !display) return

    let stale = false
    display.innerHTML = ''
    togglePreviewError(display, false)

    getViz()
      .then((viz) => {
        const svg = viz.renderSVGElement(props.node.textContent, {
          engine: 'dot',
          graphAttributes: { bgcolor: 'transparent' },
        })
        if (stale) return
        mountSvgElement(display, svg)
      })
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
