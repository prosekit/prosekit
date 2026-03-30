import type { ReactNodeViewProps } from 'prosekit/react'
import { Tweet } from 'react-tweet'

export function TweetView({ node }: ReactNodeViewProps) {
  const tweetId = node.attrs.tweetId as string
  return (
    <div className="[&_img]:m-0!">
      <div>
        <strong>
          Rendered in React using library{' '}
          <span>
            <a href="https://github.com/vercel/react-tweet" target="_blank" rel="noopener noreferrer">react-tweet</a>
          </span>
        </strong>
      </div>
      <Tweet id={tweetId} />
    </div>
  )
}
