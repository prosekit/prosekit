/** @jsxImportSource react */

import { useFramework } from '../use-framework'

import type { ReactFrameworkContents } from './framework-content'
import { FrameworkContent } from './framework-content'

interface FrameworkContentProps extends ReactFrameworkContents {
  frameworks: string[]
  className?: string
}

export function CurrentFrameworkContent({
  frameworks,
  className,
  ...props
}: FrameworkContentProps) {
  const [currentFramework] = useFramework(frameworks)

  return (
    <div className={className}>
      <FrameworkContent framework={currentFramework} {...props} />
    </div>
  )
}
