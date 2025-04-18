import {
  defineCommands,
  defineNodeSpec,
  insertNode,
  union,
  type Extension,
  type Union,
} from '@prosekit/core'

export interface MentionAttrs {
  id: string
  value: string
  kind: string
}

/**
 * @internal
 */
export type MentionSpecExtension = Extension<{
  Nodes: {
    mention: MentionAttrs
  }
}>

/**
 * @public
 */
export function defineMentionSpec(): MentionSpecExtension {
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

/**
 * @internal
 */
export type MentionCommandsExtension = Extension<{
  Commands: {
    insertMention: [attrs: MentionAttrs]
  }
}>

export function defineMentionCommands(): MentionCommandsExtension {
  return defineCommands({
    insertMention: (attrs: MentionAttrs) => {
      return insertNode({ type: 'mention', attrs })
    },
  })
}

/**
 * @internal
 */
export type MentionExtension = Union<[MentionSpecExtension, MentionCommandsExtension]>

/**
 * @public
 */
export function defineMention(): MentionExtension {
  return union(defineMentionSpec(), defineMentionCommands())
}
