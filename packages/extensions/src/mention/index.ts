import {
  defineCommands,
  defineNodeSpec,
  insertNode,
  union,
} from '@prosekit/core'

export interface MentionAttrs {
  id: string
  value: string
  kind: string
}

/**
 * @public
 */
export function defineMentionSpec() {
  return defineNodeSpec<'mention', MentionAttrs>({
    name: 'mention',
    atom: true,
    group: 'inline',
    attrs: {
      id: { validate: 'string' },
      value: { validate: 'string' },
      kind: { default: '', validate: 'string' },
    },
    inline: true,
    leafText: (node) => (node.attrs as MentionAttrs).value.toString(),
    parseDOM: [
      {
        tag: `span[data-mention]`,
        getAttrs: (dom: HTMLElement): MentionAttrs => ({
          id: dom.getAttribute('data-id') || '',
          kind: dom.getAttribute('data-mention') || '',
          value: dom.textContent || '',
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
  return union(defineMentionSpec(), defineMentionCommands())
}
