import {
  addInputRule,
  addKeymap,
  addNodeSpec,
  addPlugin,
  defineExtension,
} from '@prosekit/core'
import {
  createListPlugins,
  createListSpec,
  listInputRules,
  listKeymap,
} from 'prosemirror-flat-list'

export function addListSpec() {
  return addNodeSpec({ name: 'list', spec: createListSpec() })
}

export function addListPlugins() {
  return addPlugin({ plugins: ({ schema }) => createListPlugins({ schema }) })
}

export function addListKeymap() {
  return addKeymap(listKeymap)
}

export function addListInputRules() {
  return addInputRule(() => listInputRules)
}

/** @public */
export function addList() {
  return defineExtension([
    addListSpec(),
    addListPlugins(),
    addListKeymap(),
    addListInputRules(),
  ])
}
