import React from 'react'

import { useExampleEditor } from './use-example-editor'

export default function Toolbar() {
  const editor = useExampleEditor({ update: true })

  return (
    <div>
      <ToggleButton
        active={editor.marks.italic.isActive()}
        onChange={editor.commands.toggleItalic}
      >
        <div className="ICON_ITALIC" />
      </ToggleButton>

      <ToggleButton
        active={editor.marks.bold.isActive()}
        onChange={editor.commands.toggleBold}
      >
        <div className="ICON_BOLD" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.heading.isActive({ level: 1 })}
        onChange={() => editor.commands.toggleHeading({ level: 1 })}
      >
        <div className="ICON_H1" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.heading.isActive({ level: 2 })}
        onChange={() => editor.commands.toggleHeading({ level: 2 })}
      >
        <div className="ICON_H2" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.heading.isActive({ level: 3 })}
        onChange={() => editor.commands.toggleHeading({ level: 3 })}
      >
        <div className="ICON_H3" />
      </ToggleButton>
    </div>
  )
}

function ToggleButton({
  active,
  onChange,
  children,
}: {
  active: boolean
  onChange: () => void
  children: React.ReactNode
}) {
  return (
    <div
      aria-checked={active}
      data-state={active ? 'on' : 'off'}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onChange()}
      className="TOGGLE_BUTTON"
    >
      {children}
    </div>
  )
}
