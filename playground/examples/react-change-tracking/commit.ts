import {
  defineDefaultState,
  definePlugin,
  union,
  type NodeJSON,
} from 'prosekit/core'
import { DOMSerializer, type ProseMirrorNode } from 'prosekit/pm/model'
import { PluginKey, ProseMirrorPlugin, Transaction } from 'prosekit/pm/state'
import { Step } from 'prosekit/pm/transform'
import { Decoration, DecorationSet, EditorView } from 'prosekit/pm/view'
import { Change, ChangeSet } from 'prosemirror-changeset'

interface Commit {
  /**
   * The current doc node in the JSON format
   */
  doc: NodeJSON
  /**
   * The parent node in the JSON format
   */
  parent: NodeJSON
  /**
   * An array of steps in the JSON format that transform the parent node to the
   * current doc node.
   */
  steps: any[]
}

function getChanges(
  doc: ProseMirrorNode,
  parent: ProseMirrorNode,
  steps: Step[],
): readonly Change[] {
  const initSet = ChangeSet.create(parent)
  const currSet = initSet.addSteps(
    doc,
    steps.map((step) => step.getMap()),
    null,
  )
  return currSet.changes
}

function decorateDeleted(
  /** The doc node before the deletion */
  doc: ProseMirrorNode,
  /** The start position of the deleted text in the doc node */
  from: number,
  /** The end position of the deleted text in the doc node */
  to: number,
  /** The insert position of the decoration in the doc node after the change */
  pos: number,
): Decoration {
  const slice = doc.slice(from, to)

  // Get the fragment of the deleted content
  let { openStart, openEnd, content } = slice
  while (openStart > 0 && openEnd > 0 && content.childCount === 1) {
    openStart--
    openEnd--
    content = content.child(0).content
  }

  const render = (view: EditorView): HTMLElement => {
    const document = view.dom.ownerDocument
    const isInline = content.firstChild?.isInline

    // Render the fragment to HTML
    const element = document.createElement(isInline ? 'span' : 'div')
    const serializer = DOMSerializer.fromSchema(doc.type.schema)
    serializer.serializeFragment(content, { document }, element)

    // Add the class to the element
    element.classList.add('prosekit-commit-deleted')
    return element
  }

  return Decoration.widget(pos, render, { side: -20 })
}

function decorateInserted(
  /** The start position of the inserted text in the doc node */
  from: number,
  /** The end position of the inserted text in the doc node */
  to: number,
): Decoration {
  return Decoration.inline(from, to, { class: 'prosekit-commit-inserted' })
}

function decorateChange(prev: ProseMirrorNode, change: Change): Decoration[] {
  const { fromA, toA, fromB, toB } = change
  const decorations: Decoration[] = []

  if (fromA < toA) {
    decorations.push(decorateDeleted(prev, fromA, toA, fromB))
  }
  if (fromB < toB) {
    decorations.push(decorateInserted(fromB, toB))
  }

  return decorations
}

function decorateCommit(
  doc: ProseMirrorNode,
  parent: ProseMirrorNode,
  steps: Step[],
): DecorationSet {
  const changes = getChanges(doc, parent, steps)
  const decorations = changes.flatMap((change) =>
    decorateChange(parent, change),
  )
  return DecorationSet.create(doc, decorations)
}

function defineCommitDecoration(commit: Commit) {
  const key = new PluginKey<DecorationSet>('prosekit-commit-decoration')

  return definePlugin(({ schema }): ProseMirrorPlugin => {
    const parent = schema.nodeFromJSON(commit.parent)
    const steps = commit.steps.map((step) => Step.fromJSON(schema, step))

    return new ProseMirrorPlugin({
      key,
      state: {
        init: (_, instance): DecorationSet => {
          return decorateCommit(instance.doc, parent, steps)
        },
        apply: (tr, deco: DecorationSet): DecorationSet => {
          return deco.map(tr.mapping, tr.doc)
        },
      },
      props: {
        decorations: (state): DecorationSet | undefined => {
          return key.getState(state)
        },
      },
    })
  })
}

function defineCommitViewer(commit: Commit) {
  return union([
    defineDefaultState({ defaultDoc: commit.doc }),
    defineCommitDecoration(commit),
  ])
}

class CommitRecorder {
  private parent: ProseMirrorNode | null = null
  private doc: ProseMirrorNode | null = null
  private steps: Step[] = []

  commit(): Commit | null {
    const parent = this.parent
    const doc = this.doc
    const steps = this.steps

    if (!parent || !doc) {
      return null
    }
    this.start(doc)
    return {
      parent: parent.toJSON(),
      doc: doc.toJSON(),
      steps: steps.map((step) => step.toJSON()),
    }
  }

  /**
   * @internal
   */
  start(doc: ProseMirrorNode): void {
    this.doc = doc
    this.parent = doc
    this.steps = []
  }

  /**
   * @internal
   */
  apply(tr: Transaction): void {
    this.steps.push(...tr.steps)
    this.doc = tr.doc
  }
}

function defineCommitRecorder(commitRecorder: CommitRecorder) {
  const key = new PluginKey<DecorationSet>('prosekit-commit-recorder')

  return definePlugin(
    new ProseMirrorPlugin({
      key,
      state: {
        init: (_, state): void => {
          commitRecorder.start(state.doc)
        },
        apply: (tr): void => {
          commitRecorder.apply(tr)
        },
      },
    }),
  )
}

export { defineCommitRecorder, defineCommitViewer, CommitRecorder, type Commit }
