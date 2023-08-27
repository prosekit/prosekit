import 'highlight.js/styles/github-dark-dimmed.css'
import 'prosekit/basic/internal/example.css'
import 'prosekit/basic/style.css'

import hljs from 'highlight.js/lib/common'
import { addBasicExtension } from 'prosekit/basic'
import { createEditor, defineExtension } from 'prosekit/core'
import {
  addCodeBlock,
  addCodeBlockHovering,
} from 'prosekit/extensions/code-block'
import { Fragment, Slice } from 'prosekit/pm/model'
import { ProseKit, useEditor } from 'prosekit/react'
import { CodeBlockMenuPopover } from 'prosekit/react/components/code-block-menu-popover'
import { useEffect, useMemo } from 'react'

function addRootExtension() {
  return defineExtension([addBasicExtension(), addCodeBlock({ hljs })])
}

export default function App() {
  const editor = useMemo(() => {
    return createEditor({ extension: addRootExtension() })
  }, [])

  const a = `
    EDITOR_BOX
    SLASH_MENU
    SLASH_MENU_ITEM
    LANGUAGE_COMBO_BOX
    LANGUAGE_COMBO_BOX_INPUT
    LANGUAGE_COMBO_BOX_LIST    
    LANGUAGE_COMBO_BOX_ITEM    
  `
  if (Math.random() === 0.1) {
    console.log(a)
  }

  return (
    <ProseKit editor={editor}>
      <div className={`example-editor EDITOR_BOX`}>
        <div ref={editor.mount}></div>
        <CodeBlockMenuPopover editor={editor} />
        <Hooks />
      </div>
    </ProseKit>
  )
}

function Hooks() {
  useInsertContent()
  useEventHandler()
  return null
}

function useInsertContent() {
  const editor = useEditor()

  useEffect(() => {
    const tr = editor.view.state.tr

    const json = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: {
            level: 1,
          },
          content: [
            {
              type: 'text',
              text: 'Code Block',
            },
          ],
        },
        {
          type: 'codeBlock',
          attrs: {
            language: 'python',
          },
          content: [
            {
              type: 'text',
              text: 'if __name__ == "__main__":\n    print("hello world!")\n\n'.repeat(
                20,
              ),
            },
          ],
        },
      ],
    }

    const doc = editor.schema.nodeFromJSON(json)
    const slice = new Slice(Fragment.from(doc), 0, 0)

    tr.replace(0, tr.doc.content.size, slice)

    editor.view.dispatch(tr)
  }, [editor])
}

function useEventHandler() {
  const editor = useEditor()

  useEffect(() => {
    const extension = addCodeBlockHovering({
      onHover: ({ pos }) => {
        console.log(`hovering code block at position ${pos}`)
      },
      onLeave: () => {
        console.log('leaving code block')
      },
    })

    editor.use(extension)
  }, [editor])
}
