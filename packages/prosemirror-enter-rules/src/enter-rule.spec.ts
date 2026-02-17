import { Schema } from 'prosemirror-model'
import { EditorState, TextSelection } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { describe, expect, it, vi } from 'vitest'

import { createEnterRulePlugin, createTextBlockEnterRule, type EnterRule, type EnterRuleHandler } from './enter-rule'

const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: { group: 'block', content: 'inline*', parseDOM: [{ tag: 'p' }], toDOM: () => ['p', 0] },
    heading: {
      group: 'block',
      content: 'inline*',
      attrs: { level: { default: 1 } },
      parseDOM: [{ tag: 'h1', attrs: { level: 1 } }],
      toDOM: (node) => [`h${node.attrs.level}`, 0],
    },
    codeBlock: {
      group: 'block',
      content: 'text*',
      code: true,
      attrs: { language: { default: '' } },
      parseDOM: [{ tag: 'pre' }],
      toDOM: () => ['pre', ['code', 0]],
    },
    text: { group: 'inline' },
  },
})

function createView(text: string, rules: EnterRule[]): EditorView {
  const doc = schema.node('doc', null, [
    schema.node('paragraph', null, text ? [schema.text(text)] : []),
  ])
  const plugin = createEnterRulePlugin({ rules })
  const state = EditorState.create({ doc, schema, plugins: [plugin] })
  const view = new EditorView(document.body, { state })
  // Place cursor at the end of the text
  const pos = text.length + 1
  view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, pos)))
  return view
}

function pressEnter(view: EditorView): void {
  view.dom.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
}

describe('createEnterRulePlugin', () => {
  it('should convert paragraph to heading when Enter is pressed after "# "', () => {
    const rule = createTextBlockEnterRule({
      regex: /^#\s$/,
      type: schema.nodes.heading,
      attrs: { level: 1 },
    })
    const view = createView('# ', [rule])

    pressEnter(view)

    expect(view.state.doc.firstChild!.type.name).toBe('heading')
    expect(view.state.doc.firstChild!.attrs.level).toBe(1)
    view.destroy()
  })

  it('should convert paragraph to heading with dynamic attrs', () => {
    const rule = createTextBlockEnterRule({
      regex: /^(#{1,6})\s$/,
      type: schema.nodes.heading,
      attrs: (match) => ({ level: match[1].length }),
    })
    const view = createView('### ', [rule])

    pressEnter(view)

    expect(view.state.doc.firstChild!.type.name).toBe('heading')
    expect(view.state.doc.firstChild!.attrs.level).toBe(3)
    view.destroy()
  })

  it('should not convert when regex does not match', () => {
    const rule = createTextBlockEnterRule({
      regex: /^#\s$/,
      type: schema.nodes.heading,
    })
    const view = createView('hello', [rule])

    pressEnter(view)

    expect(view.state.doc.firstChild!.type.name).toBe('paragraph')
    view.destroy()
  })

  it('should call custom handler when Enter is pressed', () => {
    const handler = vi.fn<EnterRuleHandler>(({ state, from, to }) => {
      return state.tr.delete(from, to)
    })
    const rule: EnterRule = { regex: /^---$/, handler }
    const view = createView('---', [rule])

    pressEnter(view)

    expect(handler).toHaveBeenCalledOnce()
    expect(handler.mock.calls[0][0].match[0]).toBe('---')
    view.destroy()
  })

  it('should delete matched text in the handler', () => {
    const rule = createTextBlockEnterRule({
      regex: /^#\s$/,
      type: schema.nodes.heading,
    })
    const view = createView('# ', [rule])

    pressEnter(view)

    // The "# " text should be deleted, leaving an empty heading
    expect(view.state.doc.firstChild!.textContent).toBe('')
    view.destroy()
  })

  it('should stop processing rules after a rule with stop=true matches', () => {
    const handler1 = vi.fn<EnterRuleHandler>(({ state }) => state.tr)
    const handler2 = vi.fn<EnterRuleHandler>(({ state }) => state.tr)

    const rules: EnterRule[] = [
      { regex: /^test$/, handler: handler1, stop: true },
      { regex: /^test$/, handler: handler2 },
    ]
    const view = createView('test', rules)

    pressEnter(view)

    expect(handler1).toHaveBeenCalledOnce()
    expect(handler2).not.toHaveBeenCalled()
    view.destroy()
  })

  it('should continue processing rules when stop is false', () => {
    const handler1 = vi.fn<EnterRuleHandler>(({ state }) => state.tr)
    const handler2 = vi.fn<EnterRuleHandler>(({ state }) => state.tr)

    const rules: EnterRule[] = [
      { regex: /^test$/, handler: handler1, stop: false },
      { regex: /^test$/, handler: handler2 },
    ]
    const view = createView('test', rules)

    pressEnter(view)

    expect(handler1).toHaveBeenCalledOnce()
    expect(handler2).toHaveBeenCalledOnce()
    view.destroy()
  })

  it('should skip rules that return null and continue', () => {
    const handler1 = vi.fn<EnterRuleHandler>(() => null)
    const handler2 = vi.fn<EnterRuleHandler>(({ state }) => state.tr)

    const rules: EnterRule[] = [
      { regex: /^test$/, handler: handler1 },
      { regex: /^test$/, handler: handler2 },
    ]
    const view = createView('test', rules)

    pressEnter(view)

    expect(handler1).toHaveBeenCalledOnce()
    expect(handler2).toHaveBeenCalledOnce()
    view.destroy()
  })

  it('should not trigger in code blocks', () => {
    const handler = vi.fn<EnterRuleHandler>(({ state }) => state.tr)
    const rule: EnterRule = { regex: /^#\s$/, handler }
    const plugin = createEnterRulePlugin({ rules: [rule] })

    const doc = schema.node('doc', null, [
      schema.node('codeBlock', { language: '' }, [schema.text('# ')]),
    ])
    const state = EditorState.create({ doc, schema, plugins: [plugin] })
    const view = new EditorView(document.body, { state })
    const pos = 3 // inside the code block text
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, pos)))

    pressEnter(view)

    expect(handler).not.toHaveBeenCalled()
    view.destroy()
  })
})
