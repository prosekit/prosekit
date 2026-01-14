import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'

import { renderSlashMenu } from '../../ui/slash-menu'

import { defineExtension } from './extension'

export function setupVanillaEditor() {
  const extension = defineExtension()
  const editor = createEditor({ extension })

  return {
    render: () => {
      const port = document.createElement('div')
      port.className = 'CSS_EDITOR_VIEWPORT'

      const scrolling = document.createElement('div')
      scrolling.className = 'CSS_EDITOR_SCROLLING'
      port.append(scrolling)

      const content = document.createElement('div')
      content.className = 'CSS_EDITOR_CONTENT'
      scrolling.append(content)

      scrolling.append(renderSlashMenu(editor))

      editor.mount(content)

      return port
    },
    destroy: () => {
      editor.unmount()
    },
  }
}
