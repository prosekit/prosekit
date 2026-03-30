/** @jsxImportSource react */

// Keep the same structure as registry/src/react/examples/full/editor.tsx

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { FC } from 'react'

import { ToolbarFallback } from './toolbar-fallback'

export const EditorFallback: FC<{ fallbackHTML: string }> = ({ fallbackHTML }) => {
  return (
    <div className="CSS_EDITOR_VIEWPORT">
      <ToolbarFallback />
      <div className="CSS_EDITOR_SCROLLING">
        <div className="CSS_EDITOR_CONTENT" dangerouslySetInnerHTML={{ __html: fallbackHTML }} />
      </div>
    </div>
  )
}
