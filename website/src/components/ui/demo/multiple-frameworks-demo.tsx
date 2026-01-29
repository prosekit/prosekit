/** @jsxImportSource react */

import type { ReactNode } from 'react'
import {
  useCallback,
  useState,
} from 'react'

import { useFramework } from '../use-framework'

import { DropdownMenu } from './dropdown-menu.tsx'
import { FrameworkSelect } from './framework-select.tsx'
import { ToggleCodeButton } from './toggle-code-button.tsx'

interface MultipleFrameworksDemoProps {
  showCode?: boolean
  frameworks: string[]
  story: string
  storyContent?: ReactNode
  codeContent?: ReactNode
}

export function MultipleFrameworksDemo({
  showCode: initialShowCode = true,
  frameworks,
  story,
  storyContent,
  codeContent,
}: MultipleFrameworksDemoProps) {
  const [framework, setFramework] = useFramework(frameworks)
  const [showCode, setShowCode] = useState(initialShowCode)

  const toggleShowCode = useCallback(() => {
    setShowCode(value => !value)
  }, [])

  return (
    <div className="not-content flex flex-col rounded-lg my-4 bg-background overflow-hidden border border-border">
      <div>
        <div className="flex items-center justify-between pt-4 px-4 pb-1 gap-2">
          <FrameworkSelect
            frameworks={frameworks}
            framework={framework}
            onFrameworkChange={setFramework}
          />
          <span className="flex-1"></span>
          <ToggleCodeButton showCode={showCode} onShowCodeChange={toggleShowCode} />
          <DropdownMenu framework={framework} story={story} />
        </div>

        {storyContent}
      </div>

      {showCode && codeContent}
    </div>
  )
}
