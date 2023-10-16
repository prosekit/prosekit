import {
  defineInputRule,
  defineKeymap,
  defineNodeSpec,
  definePlugin,
  union,
} from '@prosekit/core'
import {
  createListPlugins,
  createListSpec,
  listInputRules,
  listKeymap,
} from 'prosemirror-flat-list'

export function defineListSpec() {
  return defineNodeSpec({ ...createListSpec(), name: 'list' })
}

export function defineListPlugins() {
  return definePlugin(({ schema }) => createListPlugins({ schema }))
}

export function defineListKeymap() {
  return defineKeymap(listKeymap)
}

export function defineListInputRules() {
  return defineInputRule(() => listInputRules)
}

/** @public */
export function defineList() {
  return union([
    defineListSpec(),
    defineListPlugins(),
    defineListKeymap(),
    defineListInputRules(),
  ])
}
