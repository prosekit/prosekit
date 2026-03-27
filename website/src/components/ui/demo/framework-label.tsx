/** @jsxImportSource react */

import { frameworkIcons } from '../framework-icons'
import { frameworkNames } from '../framework-names'

interface FrameworkLabelProps {
  framework: string
}

export function FrameworkLabel({ framework }: FrameworkLabelProps) {
  const name = frameworkNames[framework]
  const icon = frameworkIcons[framework]

  if (!name || !icon) {
    throw new Error(`Unknown framework: ${framework}`)
  }

  return (
    <span className="flex flex-row space-x-2 w-full items-center">
      <span className={`${icon} size-4 min-w-4 block`}></span>
      <span>{name}</span>
    </span>
  )
}
