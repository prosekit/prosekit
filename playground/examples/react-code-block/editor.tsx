import 'prosekit/basic/style.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultDoc })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div className="EDITOR_DOCUMENT">
          <Toolbar />
          <div ref={editor.mount} className="EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

const codeJs = `
async function main() {
  while (true) {
    await sleep();
    await eat();
    await code('JavaScript!');
  }
}
`.trim()

const codePy = `
async def main():
    while True:
        await sleep()
        await eat()
        await code("Python!")
`.trim()

const codeGo = `
func main() {
	for {
		sleep()
		eat()
		code("Go!")
	}
}
`.trim()

const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'codeBlock',
      attrs: {
        language: 'javascript',
      },
      content: [{ type: 'text', text: codeJs }],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'python',
      },
      content: [{ type: 'text', text: codePy }],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'go',
      },
      content: [{ type: 'text', text: codeGo }],
    },
  ],
}
