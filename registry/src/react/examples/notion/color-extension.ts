import {
  defineCommands,
  defineMarkSpec,
  toggleMark,
  union,
} from 'prosekit/core'

const VALID_COLORS = [
  'gray',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red',
] as const

/**
 * @public
 */
export type ValidColor = typeof VALID_COLORS[number]

const COLOR_CLASSNAMES = {
  gray: 'text-gray-500',
  orange: 'text-orange-500',
  yellow: 'text-yellow-500',
  green: 'text-green-500',
  blue: 'text-blue-500',
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  red: 'text-red-500',
} as const

function isValidColor(color: string): color is ValidColor {
  return VALID_COLORS.includes(color as ValidColor)
}

/**
 * @public
 */
export interface ColorAttrs {
  textColor: ValidColor | null
}

function getAttrs(node: HTMLElement): ColorAttrs | false {
  const textColor = node.getAttribute('data-text-color')
  if (textColor && isValidColor(textColor)) {
    return { textColor }
  }
  return false
}

function defineColorSpec() {
  return defineMarkSpec({
    name: 'color',
    attrs: {
      textColor: {
        default: null,
        validate: 'string|null',
      },
    },
    parseDOM: [
      { tag: 'span[data-text-color]', getAttrs },
      { tag: 'div[data-text-color]', getAttrs },
    ],
    toDOM(mark, inline) {
      const { textColor } = mark.attrs as ColorAttrs
      const tag = inline ? 'span' : 'div'
      const className = textColor && COLOR_CLASSNAMES[textColor]
      return [tag, { 'data-text-color': textColor, 'class': className || undefined }, 0]
    },
  })
}

function defineColorCommands() {
  return defineCommands({
    toggleColor: (attrs: ColorAttrs) => toggleMark({ type: 'color', attrs }),
  })
}

/**
 * @public
 */
export function defineColor() {
  return union(
    defineColorSpec(),
    defineColorCommands(),
  )
}
