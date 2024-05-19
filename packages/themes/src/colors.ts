// @unocss-include

import { mergeRecords } from './utils/merge-records'

export const Colors = mergeRecords(
  createColorAliases('background', 'white', 'neutral-900'),
  createColorAliases('foreground', 'neutral-900', 'zinc-50'),
  createColorAliases('primary', 'zinc-900', 'zinc-50'),
  createColorAliases('primary-foreground', 'zinc-50', 'zinc-900'),
  createColorAliases('secondary', 'zinc-100', 'zinc-800'),
  createColorAliases('secondary-foreground', 'zinc-900', 'zinc-50'),
  createColorAliases('muted', 'zinc-100', 'zinc-800'),
  createColorAliases('muted-foreground', 'zinc-500', 'zinc-500'),
  createColorAliases('accent', 'gray-200', 'gray-700'),
  createColorAliases('accent-foreground', 'zinc-900', 'zinc-50'),
  createColorAliases('destructive', 'red-500', 'red-900'),
  createColorAliases('destructive-foreground', 'zinc-50', 'zinc-50'),
  createColorAliases('border', 'zinc-200', 'zinc-800'),
  createColorAliases('input', 'zinc-200', 'zinc-800'),
  createColorAliases('ring', 'zinc-900', 'zinc-300'),
)

function createColorAliases<
  N extends string,
  A extends string,
  B extends string,
>(name: N, color: A, darkColor: B) {
  return mergeRecords(
    createColorAlias(name, color, darkColor, 'text'),
    createColorAlias(name, color, darkColor, 'bg'),
    createColorAlias(name, color, darkColor, 'border'),
    createColorAlias(name, color, darkColor, 'ring'),
    createColorAlias(name, color, darkColor, 'ring-offset'),
  )
}

function createColorAlias<
  N extends string,
  A extends string,
  B extends string,
  P extends string,
>(
  name: N,
  color: A,
  darkColor: B,
  prefix: P,
): Record<`${P}-${N}`, `${P}-${A} dark:${P}-${B}`> {
  type Key = `${P}-${N}`
  type Val = `${P}-${A} dark:${P}-${B}`
  const key: Key = `${prefix}-${name}`
  const val: Val = `${prefix}-${color} dark:${prefix}-${darkColor}`
  return { [key]: val } as Record<Key, Val>
}
