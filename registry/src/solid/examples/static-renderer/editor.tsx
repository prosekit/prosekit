import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type Union } from 'prosekit/core'
import type { BasicExtension } from 'prosekit/basic'
import { ProseKit, useEditorDerivedValue } from 'prosekit/solid'
import { createHTMLRenderer, createMarkdownRenderer, createSolidRenderer } from 'prosekit/static-renderer'
import { createMemo, type JSX } from 'solid-js'

import { defineExtension } from './extension.ts'
import { sampleContent } from './sample-content.ts'

type OutputType = 'html' | 'markdown' | 'solid'

function RenderJson(props: { type: OutputType; extension: Union<readonly [BasicExtension]> }): JSX.Element {
  const docJSON = useEditorDerivedValue((editor) => {
    return editor.getDocJSON()
  })

  const output = createMemo(() => {
    const json = docJSON()
    if (!json) return ''
    if (props.type === 'html') {
      const render = createHTMLRenderer({ extension: props.extension })
      return render(json)
    } else if (props.type === 'markdown') {
      const render = createMarkdownRenderer({ extension: props.extension })
      return render(json)
    } else if (props.type === 'solid') {
      const render = createSolidRenderer({ extension: props.extension })
      return render(json)
    }
    return ''
  })

  const title = () => {
    if (props.type === 'html') return 'renderToHTMLString Output'
    if (props.type === 'markdown') return 'renderToMarkdown Output'
    return 'renderToSolidElement Output'
  }

  return (
    <div class="border border-solid border-gray-300 rounded flex flex-col" style={{ 'min-height': '150px', 'max-height': '300px' }}>
      <div class="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300 shrink-0">
        {title()}
      </div>
      <pre class="p-3 text-xs overflow-auto whitespace-pre-wrap flex-1 m-0">
        {output()}
      </pre>
    </div>
  )
}

export default function Editor(): JSX.Element {
  const extension = defineExtension()
  const editor = createEditor({ extension, defaultContent: sampleContent })

  return (
    <ProseKit editor={editor}>
      <div class="flex flex-col gap-4 max-h-[80vh] overflow-y-auto p-4">
        {/* Editor */}
        <div class="border border-solid border-gray-300 rounded flex flex-col" style={{ 'min-height': '200px' }}>
          <div class="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300 shrink-0">
            Editor
          </div>
          <div class="overflow-y-auto flex-1" style={{ 'max-height': '300px' }}>
            <div ref={editor.mount} class="ProseMirror box-border min-h-full px-4 py-4 outline-hidden"></div>
          </div>
        </div>

        {/* HTML Output */}
        <RenderJson type="html" extension={extension} />

        {/* Markdown Output */}
        <RenderJson type="markdown" extension={extension} />

        {/* Solid Output */}
        <RenderJson type="solid" extension={extension} />
      </div>
    </ProseKit>
  )
}
