/** @jsxImportSource react */

import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'

import { useFramework } from '../use-framework'

import { DropdownMenu } from './dropdown-menu.tsx'
import { FrameworkContent } from './framework-content.ts'
import { FrameworkSelect } from './framework-select.tsx'
import { ToggleCodeButton } from './toggle-code-button.tsx'

interface MultipleFrameworksDemoProps {
  initialShowCode?: boolean
  frameworks: string[]
  story: string

  litStoryContent?: ReactNode
  preactStoryContent?: ReactNode
  reactStoryContent?: ReactNode
  solidStoryContent?: ReactNode
  svelteStoryContent?: ReactNode
  vanillaStoryContent?: ReactNode
  vueStoryContent?: ReactNode

  litCodeContent?: ReactNode
  preactCodeContent?: ReactNode
  reactCodeContent?: ReactNode
  solidCodeContent?: ReactNode
  svelteCodeContent?: ReactNode
  vanillaCodeContent?: ReactNode
  vueCodeContent?: ReactNode
}

export function MultipleFrameworksDemo(props: MultipleFrameworksDemoProps) {
  const [framework, setFramework] = useFramework(props.frameworks)
  const [showCode, setShowCode] = useState(props.initialShowCode ?? true)

  const toggleShowCode = useCallback(() => {
    setShowCode(value => !value)
  }, [])

  return (
    <div className="not-content flex flex-col rounded-lg my-4 bg-background overflow-hidden border border-border">
      <div>
        <div className="flex items-center justify-between pt-4 px-4 pb-1 gap-2">
          <FrameworkSelect
            frameworks={props.frameworks}
            framework={framework}
            onFrameworkChange={setFramework}
          />
          <span className="flex-1"></span>
          <ToggleCodeButton showCode={showCode} onShowCodeChange={toggleShowCode} />
          <DropdownMenu framework={framework} story={props.story} />
        </div>

        <div className="min-h-50 h-100 max-h-dvh overflow-y-hidden">
          <FrameworkContent
            framework={framework}
            lit={props.litStoryContent}
            preact={props.preactStoryContent}
            react={props.reactStoryContent}
            solid={props.solidStoryContent}
            svelte={props.svelteStoryContent}
            vanilla={props.vanillaStoryContent}
            vue={props.vueStoryContent}
          />
        </div>
      </div>

      <div className={showCode ? 'block' : 'hidden'}>
        <FrameworkContent
          framework={framework}
          lit={props.litCodeContent}
          preact={props.preactCodeContent}
          react={props.reactCodeContent}
          solid={props.solidCodeContent}
          svelte={props.svelteCodeContent}
          vanilla={props.vanillaCodeContent}
          vue={props.vueCodeContent}
        />
      </div>
    </div>
  )
}
