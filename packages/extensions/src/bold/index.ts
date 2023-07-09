import {
  addCommands,
  addKeymap,
  addMarkSpec,
  defineExtension,
  toggleMark,
} from '@prosekit/core'

export function addBoldSpec() {
  return addMarkSpec({
    name: 'bold',
    spec: {
      parseDOM: [
        { tag: 'strong' },
        // This works around a Google Docs misbehavior where
        // pasted content will be inexplicably wrapped in `<b>`
        // tags with a font-weight normal.
        {
          tag: 'b',
          getAttrs: (node: string | HTMLElement): null | false => {
            return (
              typeof node !== 'string' &&
              node.style.fontWeight !== 'normal' &&
              null
            )
          },
        },
        { style: 'font-weight=400', clearMark: (m) => m.type.name == 'strong' },
        {
          style: 'font-weight',
          getAttrs: (value: string | HTMLElement): null | false => {
            return (
              typeof value === 'string' &&
              /^(bold(er)?|[5-9]\d{2,})$/.test(value) &&
              null
            )
          },
        },
      ],
      toDOM() {
        return ['em', 0]
      },
    },
  })
}

export function addBoldCommands() {
  return addCommands({
    toggleBold: () => toggleMark({ type: 'bold' }),
  })
}

export function addBoldKeymap() {
  return addKeymap({
    'Mod-b': toggleMark({ type: 'bold' }),
  })
}

/** @public */
export function addBold() {
  return defineExtension([addBoldSpec(), addBoldCommands(), addBoldKeymap()])
}
