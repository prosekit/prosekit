import React from 'react'

import { ToggleButton } from './ToggleButton'
import { useExampleEditor } from './use-example-editor'

export default function Toolbar() {
  const editor = useExampleEditor({ update: true })

  return (
    <div className="TOOLBAR">
      <ToggleButton
        available={editor.commands.undo.canApply()}
        onChange={editor.commands.undo}
      >
        <div className="ICON_UNDO" />
      </ToggleButton>

      <ToggleButton
        available={editor.commands.redo.canApply()}
        onChange={editor.commands.redo}
      >
        <div className="ICON_REDO" />
      </ToggleButton>

      <ToggleButton
        active={editor.marks.italic.isActive()}
        available={editor.commands.toggleItalic.canApply()}
        onChange={editor.commands.toggleItalic}
      >
        <div className="ICON_ITALIC" />
      </ToggleButton>

      <ToggleButton
        active={editor.marks.bold.isActive()}
        available={editor.commands.toggleBold.canApply()}
        onChange={editor.commands.toggleBold}
      >
        <div className="ICON_BOLD" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.heading.isActive({ level: 1 })}
        available={editor.commands.toggleHeading.canApply({ level: 1 })}
        onChange={() => editor.commands.toggleHeading({ level: 1 })}
      >
        <div className="ICON_H1" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.heading.isActive({ level: 2 })}
        available={editor.commands.toggleHeading.canApply({ level: 2 })}
        onChange={() => editor.commands.toggleHeading({ level: 2 })}
      >
        <div className="ICON_H2" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.heading.isActive({ level: 3 })}
        available={editor.commands.toggleHeading.canApply({ level: 3 })}
        onChange={() => editor.commands.toggleHeading({ level: 3 })}
      >
        <div className="ICON_H3" />
      </ToggleButton>
    </div>
  )
}
