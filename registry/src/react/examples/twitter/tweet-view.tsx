import type { ReactNodeViewProps } from 'prosekit/react'
import { Tweet } from 'react-tweet'

import { Tilt } from './tilt'

export function TweetView({ node }: ReactNodeViewProps) {
  const tweetId = node.attrs.tweetId as string
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="8px"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
      <Tweet id={tweetId} />
    </Tilt>
  )
}
