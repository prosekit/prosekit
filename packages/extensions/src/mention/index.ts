import {
  defineCommands,
  defineNodeSpec,
  insertNode,
  union,
  type AttrsSpec,
} from '@prosekit/core'

export interface MentionAttrs {
  id: string
  value: string
  kind: string
}

const attrs: AttrsSpec<MentionAttrs> = {
  id: {},
  value: {},
  kind: { default: '' },
}

/**
 * @public
 */
export function defineMentionSpec() {
  return defineNodeSpec({
    name: 'mention',
    atom: true,
    group: 'inline',
    attrs,
    inline: true,
    leafText: (node) => (node.attrs as MentionAttrs).value.toString(),
    parseDOM: [
      {
        tag: `span[data-mention]`,
        getAttrs: (dom): MentionAttrs => ({
          id: (dom as HTMLElement).getAttribute('data-id') || '',
          kind: (dom as HTMLElement).getAttribute('data-mention') || '',
          value: (dom as HTMLElement).textContent || '',
        }),
      },
    ],
    toDOM(node) {
      return [
        'span',
        {
          'data-id': (node.attrs as MentionAttrs).id.toString(),
          'data-mention': (node.attrs as MentionAttrs).kind.toString(),
        },
        (node.attrs as MentionAttrs).value.toString(),
      ]
    },
  })
}

export function defineMentionCommands() {
  return defineCommands({
    insertMention: (attrs: MentionAttrs) => {
      return insertNode({ type: 'mention', attrs })
    },
  })
}

/**
 * @public
 */
export function defineMention() {
  return union([defineMentionSpec(), defineMentionCommands()])
}
