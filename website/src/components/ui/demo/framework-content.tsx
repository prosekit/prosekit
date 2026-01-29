/** @jsxImportSource react */

import type { ReactNode } from 'react'

import { useFramework } from '../use-framework'

interface FrameworkContentProps {
  frameworks: string[]
  className?: string
  litContent?: ReactNode
  preactContent?: ReactNode
  reactContent?: ReactNode
  solidContent?: ReactNode
  svelteContent?: ReactNode
  vanillaContent?: ReactNode
  vueContent?: ReactNode
}

export function FrameworkContent(props: FrameworkContentProps) {
  const [currentFramework] = useFramework(props.frameworks)

  return (
    <div className={props.className}>
      {currentFramework === 'lit' && (props.litContent)}
      {currentFramework === 'preact' && (props.preactContent)}
      {currentFramework === 'react' && (props.reactContent)}
      {currentFramework === 'solid' && (props.solidContent)}
      {currentFramework === 'svelte' && (props.svelteContent)}
      {currentFramework === 'vanilla' && (props.vanillaContent)}
      {currentFramework === 'vue' && (props.vueContent)}
    </div>
  )
}
