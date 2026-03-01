import { defineBasicExtension } from 'prosekit/basic'
import { defineNodeSpec, union } from 'prosekit/core'

function defineTweetSpec() {
  return defineNodeSpec({
    name: 'tweet',
    group: 'block',
    attrs: {
      tweetId: { default: null },
    },
    parseDOM: [{
      tag: 'iframe[src^="https://platform.twitter.com/embed/Tweet.html"]',
      getAttrs: (node) => {
        const src = node.getAttribute('src')
        const match = src?.match(/id=([^&]+)/)
        return {
          tweetId: match?.[1] ?? null,
        }
      },
    }],
    toDOM: (node) => {
      return [
        'iframe',
        {
          src: `https://platform.twitter.com/embed/Tweet.html?id=${node.attrs.tweetId}&theme=dark`,
          style: 'height: 300px',
        },
      ]
    },
  })
}

function defineTweet() {
  return union(
    defineTweetSpec(),
  )
}

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineTweet(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
