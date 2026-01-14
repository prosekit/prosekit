import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'

export function setupVanillaEditor() {
  const extension = defineBasicExtension()
  const editor = createEditor({ extension })

  return {
    render: () => {
      const element = document.createElement('div')
      element.className = 'CSS_MINIMAL_EDITOR'
      editor.mount(element)
      return element
    },
    destroy: () => {
      editor.unmount()
    },
  }
}
