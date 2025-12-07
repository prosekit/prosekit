'use client'

import TiltComponent, { type ReactParallaxTiltProps } from 'react-parallax-tilt'

export function Tilt({ children, ...props }: ReactParallaxTiltProps) {
  return <TiltComponent {...props}>{children}</TiltComponent>
}
