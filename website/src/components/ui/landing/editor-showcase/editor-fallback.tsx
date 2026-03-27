/** @jsxImportSource react */

// Keep the same structure as registry/src/react/examples/full/editor.tsx

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { FC } from 'react'

import sampleHtml from './sample-content.gen.html?raw'
import { ToolbarFallback } from './toolbar-fallback'

export const EditorFallback: FC = () => {
  return (
    <div className="CSS_EDITOR_VIEWPORT">
      <ToolbarFallback />
      <div className="CSS_EDITOR_SCROLLING">
        <div className="CSS_EDITOR_CONTENT" dangerouslySetInnerHTML={{ __html: sampleHtml }} />
      </div>
    </div>
  )
}
