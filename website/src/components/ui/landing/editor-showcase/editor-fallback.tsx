/** @jsxImportSource react */

// Keep the same structure as registry/src/react/examples/full/editor.tsx

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { clsx } from 'clsx/lite'
import type { FC } from 'react'

import sampleHtml from './sample-content.gen.html?raw'
import { ToolbarFallback } from './toolbar-fallback'

export const EditorFallback: FC = () => {
  return (
    <div className={clsx('CSS_EDITOR_VIEWPORT', '*:opacity-50')}>
      <ToolbarFallback />
      <div className="CSS_EDITOR_SCROLLING">
        <div className="CSS_EDITOR_CONTENT" dangerouslySetInnerHTML={{ __html: sampleHtml }}>
        </div>
      </div>
    </div>
  )
}
