/** @jsxImportSource react */

import type { FC } from 'react'

import { useFramework } from '../use-framework'

import type { ReactFrameworkContents } from './framework-content'
import { FrameworkContent } from './framework-content'

interface FrameworkContentProps extends ReactFrameworkContents {
  frameworks: string[]
  className?: string
}

export const  CurrentFrameworkContent : FC<FrameworkContentProps> = ({
  frameworks,
  className,
  ...props
}) => {
  const [currentFramework] = useFramework(frameworks)

  return (
    <div className={className}>
      <FrameworkContent framework={currentFramework} {...props} />
    </div>
  )
}
