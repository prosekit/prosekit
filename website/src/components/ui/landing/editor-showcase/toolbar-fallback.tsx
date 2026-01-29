/** @jsxImportSource react */

// Keep the same structure as registry/src/react/ui/toolbar/toolbar.tsx

import type { FC } from 'react'

import { ButtonFallback } from './button-fallback'

export const ToolbarFallback: FC = () => {
  return (
    <div className="CSS_TOOLBAR">
      <ButtonFallback>
        <div className="CSS_ICON_UNDO" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_REDO" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_BOLD" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_ITALIC" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_UNDERLINE" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_STRIKETHROUGH" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_CODE" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_CODE_BLOCK" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_H1" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_H2" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_H3" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_MINUS" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_BLOCKQUOTE" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_LIST_BULLET" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_LIST_ORDERED" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_LIST_TASK" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_LIST_TOGGLE" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_LIST_INDENT" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_LIST_DEDENT" />
      </ButtonFallback>
      <ButtonFallback>
        <div className="CSS_ICON_IMAGE" />
      </ButtonFallback>
    </div>
  )
}
