import {
  collectChildren,
  defineDefaultState,
  definePlugin,
  jsonFromNode,
  union,
  type NodeJSON,
  type PlainExtension,
  type StepJSON,
} from '@prosekit/core'
import {
  DOMSerializer,
  Fragment,
  Slice,
  type ProseMirrorNode,
} from '@prosekit/pm/model'
import {
  PluginKey,
  ProseMirrorPlugin,
  type Transaction,
} from '@prosekit/pm/state'
import { Step } from '@prosekit/pm/transform'
import {
  Decoration,
  DecorationSet,
  type EditorView,
} from '@prosekit/pm/view'
import {
  ChangeSet,
  type Change,
} from 'prosemirror-changeset'

/**
 * A JSON representation of a commit.
 */
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
  steps: StepJSON[]
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

function renderDivWeight(view: EditorView): HTMLElement {
  const document = view.dom.ownerDocument
  return document.createElement('div')
}

function decorateDeletionSlice(
  slice: Slice,
): Array<(view: EditorView) => HTMLElement> {
  // Get the fragment of the deleted content
  let { openStart, openEnd, content } = slice

  while (openStart > 0 && openEnd > 0 && content.childCount === 1) {
    openStart--
    openEnd--
    content = content.child(0).content
  }

  // Nothing to render
  if (content.childCount === 0) {
    return []
  }

  // For example, if the slice is
  //   {
  //     openStart: 1,
  //     openEnd: 1,
  //     content: <p>Hello</p><p>World</p>
  //   }
  // We should render the following decorations:
  //   <span>Hello</span>
  //   <div></div>
  //   <span>World</span>
  if (openStart > 0 && openEnd > 0 && content.childCount === 2) {
    const head = Fragment.from([content.child(0)])
    const tail = Fragment.from([content.child(1)])
    return [
      ...decorateDeletionSlice(new Slice(head, openStart, openStart)),
      renderDivWeight,
      ...decorateDeletionSlice(new Slice(tail, openEnd, openEnd)),
    ]
  }

  // For example, if the slice is
  //   {
  //     openStart: 1,
  //     openEnd: 0,
  //     content: <p>Hello</p><p>World</p>
  //   }
  // We should render the following decorations:
  //   <span>Hello</span>
  //   <div><p>World</p></div>
  if (openStart > 0 && content.childCount >= 2) {
    const nodes = collectChildren(content)
    const head = Fragment.from(nodes.slice(0, 1))
    const body = Fragment.from(nodes.slice(1))

    return [
      ...decorateDeletionSlice(new Slice(head, openStart, openStart)),
      ...decorateDeletionSlice(new Slice(body, 0, openEnd)),
    ]
  }

  // For example, if the slice is
  //   {
  //     openStart: 0,
  //     openEnd: 1,
  //     content: <p>Hello</p><p>World</p>
  //   }
  // We should render the following decorations:
  //   <div><p>Hello</p></div>
  //   <span>World</span>
  if (openEnd > 0 && content.childCount >= 2) {
    const nodes = collectChildren(content)
    const body = Fragment.from(nodes.slice(0, -1))
    const tail = Fragment.from(nodes.slice(-1))
    return [
      ...decorateDeletionSlice(new Slice(body, openStart, 0)),
      ...decorateDeletionSlice(new Slice(tail, openEnd, openEnd)),
    ]
  }

  const schema = content.child(0).type.schema
  const isInline = content.child(0).isInline

  const render = (view: EditorView): HTMLElement => {
    const document = view.dom.ownerDocument

    // Render the fragment to HTML
    const element = document.createElement(isInline ? 'span' : 'div')
    const serializer = DOMSerializer.fromSchema(schema)
    serializer.serializeFragment(content, { document }, element)

    // Add the class to the element
    element.classList.add('prosekit-commit-deletion')
    return element
  }

  return [render]
}

function decorateDeletion(
  /** The doc node before the deletion */
  doc: ProseMirrorNode,
  /** The start position of the deleted text in the doc node */
  from: number,
  /** The end position of the deleted text in the doc node */
  to: number,
  /** The insert position of the decoration in the doc node after the change */
  pos: number,
): Decoration[] {
  const slice = doc.slice(from, to)

  const renders = decorateDeletionSlice(slice)
  const count = renders.length

  return renders.map((render, index) =>
    Decoration.widget(pos, render, {
      side: -20 - count + index,
      // Ensure the text in the decoration is able to be selected.
      ignoreSelection: true,
    })
  )
}

function decorateAddition(
  /** The start position of the inserted text in the doc node */
  from: number,
  /** The end position of the inserted text in the doc node */
  to: number,
): Decoration {
  return Decoration.inline(from, to, { class: 'prosekit-commit-addition' })
}

function decorateChange(prev: ProseMirrorNode, change: Change): Decoration[] {
  const { fromA, toA, fromB, toB } = change
  const decorations: Decoration[] = []

  if (fromA < toA) {
    decorations.push(...decorateDeletion(prev, fromA, toA, fromB))
  }
  if (fromB < toB) {
    decorations.push(decorateAddition(fromB, toB))
  }

  return decorations
}

function decorateCommit(
  doc: ProseMirrorNode,
  parent: ProseMirrorNode,
  steps: Step[],
): DecorationSet {
  const changes = getChanges(doc, parent, steps)
  const decorations = changes.flatMap((change) => decorateChange(parent, change))
  return DecorationSet.create(doc, decorations)
}

function defineCommitDecoration(commit: Commit): PlainExtension {
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

/**
 * Define an extension to display the changes from the given commit in the editor.
 */
function defineCommitViewer(commit: Commit): PlainExtension {
  return union(
    defineDefaultState({ defaultDoc: commit.doc }),
    defineCommitDecoration(commit),
  )
}

class CommitRecorder {
  private parent: ProseMirrorNode | null = null
  private doc: ProseMirrorNode | null = null
  private steps: Step[] = []

  /**
   * Return a commit object including all changes since the last commit. `null`
   * will be returned if there is no change.
   */
  commit(): Commit | null {
    if (
      !this.parent
      || !this.doc
      || this.steps.length === 0
      || this.parent.eq(this.doc)
    ) {
      return null
    }

    const commit: Commit = {
      doc: jsonFromNode(this.doc),
      parent: jsonFromNode(this.parent),
      steps: this.steps.map((step) => step.toJSON() as StepJSON),
    }
    this.init(this.doc)
    return commit
  }

  /**
   * @internal
   */
  init(doc: ProseMirrorNode): void {
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

/**
 * Define an extension that can record the changes in the editor.
 */
function defineCommitRecorder(commitRecorder: CommitRecorder): PlainExtension {
  const key = new PluginKey<DecorationSet>('prosekit-commit-recorder')

  return definePlugin(
    new ProseMirrorPlugin({
      key,
      state: {
        init: (_, state): void => {
          commitRecorder.init(state.doc)
        },
        apply: (tr): void => {
          commitRecorder.apply(tr)
        },
      },
    }),
  )
}

export {
  CommitRecorder,
  defineCommitRecorder,
  defineCommitViewer,
  type Commit,
}
