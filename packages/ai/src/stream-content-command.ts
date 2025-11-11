import { DOMParser } from '@prosekit/pm/model'
import type {
  Command,
  EditorState,
  Transaction,
} from '@prosekit/pm/state'
import {
  Plugin,
  PluginKey,
  TextSelection,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'
import {
  Decoration,
  DecorationSet,
} from '@prosekit/pm/view'

/**
 * 流式状态接口
 */
interface StreamingState {
  active: boolean
  from: number
  to: number
}

/**
 * 流式插件的 PluginKey
 */
export const streamingPluginKey: PluginKey<StreamingState> = new PluginKey<StreamingState>('streaming')

/**
 * 创建流式状态管理插件
 *
 * 该插件负责：
 * 1. 管理流式内容的状态（范围）
 * 2. 为流式内容区域添加样式装饰（Decoration）
 * 3. 阻止用户在流式内容区域进行编辑（通过 editable prop）
 */
export function createStreamingPlugin(): Plugin<StreamingState> {
  return new Plugin<StreamingState>({
    key: streamingPluginKey,

    state: {
      init(): StreamingState {
        return { active: false, from: 0, to: 0 }
      },
      apply(
        tr: Transaction,
        oldState: StreamingState,
      ): StreamingState {
        const meta = tr.getMeta(streamingPluginKey)

        // 流开始
        if (meta?.streamStarted) {
          return {
            active: true,
            from: meta.from,
            to: meta.to,
          }
        }

        // 流结束
        if (meta?.streamEnded) {
          return { active: false, from: 0, to: 0 }
        }

        // 流进行中，需要根据事务的映射更新范围
        if (oldState.active) {
          // 如果 meta 中有新的位置信息，使用它；否则使用 mapping 来追踪位置变化
          if (meta?.from !== undefined && meta?.to !== undefined) {
            return {
              active: true,
              from: meta.from,
              to: meta.to,
            }
          }
          // 使用 mapping 来追踪位置变化（当文档结构改变时，位置会自动映射）
          return {
            active: true,
            from: tr.mapping.map(oldState.from),
            to: tr.mapping.map(oldState.to),
          }
        }

        return oldState
      },
    },

    props: {
      // 为流式内容区域添加样式装饰
      decorations(state: EditorState): DecorationSet {
        const streamingState = streamingPluginKey.getState(state)
        if (!streamingState || !streamingState.active) {
          return DecorationSet.empty
        }

        // 创建 inline decoration，可以跨 block 添加样式
        const decoration = Decoration.inline(
          streamingState.from,
          streamingState.to,
          {
            class: 'is-streaming',
          },
        )

        return DecorationSet.create(state.doc, [decoration])
      },

      // 阻止用户在流式内容区域编辑
      editable(state: EditorState): boolean {
        const streamingState = streamingPluginKey.getState(state)
        if (!streamingState || !streamingState.active) {
          return true
        }

        // 检查当前光标位置是否在流式区域内
        const selectionFrom = state.selection.from
        const isInStreamingArea = selectionFrom >= streamingState.from
          && selectionFrom <= streamingState.to

        // 如果在流式区域内，则不可编辑
        return !isInStreamingArea
      },
    },
  })
}

/**
 * 流式内容处理选项
 */
export interface StreamContentOptions {
  /**
   * 流式输出内容要覆盖的范围起始位置
   */
  from: number

  /**
   * 流式输出内容要覆盖的范围结束位置
   */
  to: number

  /**
   * 回调函数，接收一个 write 函数用于写入 chunk 内容
   *
   * @param write - 写入函数，每次调用会累积内容并更新编辑器
   * @example
   * ```ts
   * onStream: async (write) => {
   *   for (const chunk of chunks) {
   *     write(chunk)
   *     await delay(100)
   *   }
   * }
   * ```
   */
  onStream: (write: (chunk: string) => void) => Promise<void> | void
}

/**
 * 处理 HTML 字符串流的异步函数
 *
 * 简化实现：每次接收到 chunk 后，累积所有内容并全量解析替换
 */
async function handleHtmlStreaming(
  view: EditorView,
  options: StreamContentOptions,
): Promise<void> {
  const { from, to, onStream } = options

  let htmlBuffer = ''
  let currentStreamEndPos = from

  const schema = view.state.schema
  const domParser = DOMParser.fromSchema(schema)

  // 创建一个临时 DOM 容器用于解析 HTML
  const tempDiv = document.createElement('div')

  // 流开始：先删除 from 到 to 之间的内容（如果存在），然后通知插件流开始
  const { state } = view
  const startTr = state.tr

  if (to > from) {
    startTr.delete(from, to)
    // 更新当前状态
    currentStreamEndPos = from
  }

  // 通知插件流开始（流式输出期间必定阻止编辑）
  startTr.setMeta(streamingPluginKey, {
    streamStarted: true,
    from,
    to: from,
  })
  startTr.setMeta('addToHistory', false)
  view.dispatch(startTr)

  // 创建 write 函数，用于写入 chunk
  const write = (chunk: string): void => {
    // 1. 累积 HTML 内容
    htmlBuffer += chunk

    // 2. 解析累积后的所有内容
    tempDiv.innerHTML = htmlBuffer
    const newSlice = domParser.parseSlice(tempDiv)

    const { state } = view
    const tr = state.tr

    // 3. 替换文档中的流式内容区域（从 from 到当前结束位置）
    tr.replace(from, currentStreamEndPos, newSlice)

    // 4. 更新当前流末尾位置
    currentStreamEndPos = from + newSlice.size

    // 5. 移动光标到新内容的末尾
    const newSelection = TextSelection.create(tr.doc, currentStreamEndPos)
    tr.setSelection(newSelection)
    tr.scrollIntoView()

    // 6. 标记这个事务来自流式更新，并传递最新的位置信息
    tr.setMeta(streamingPluginKey, {
      streamUpdating: true,
      from,
      to: currentStreamEndPos,
    })
    tr.setMeta('addToHistory', false)

    // 7. 分发事务
    view.dispatch(tr)
  }

  try {
    // 调用用户提供的 onStream 回调，传入 write 函数
    await onStream(write)

    // 通知插件流已结束
    view.dispatch(
      view.state.tr.setMeta(streamingPluginKey, { streamEnded: true }),
    )
  } catch (error) {
    console.error('流式内容处理失败:', error)

    // 确保在出错时也结束流式状态
    view.dispatch(
      view.state.tr.setMeta(streamingPluginKey, { streamEnded: true }),
    )
  }
}

/**
 * 创建一个 streamContent 命令
 *
 * @param options - 流式内容选项
 * @returns ProseMirror 命令
 *
 * @example
 * ```ts
 * const command = streamContentCommand({
 *   from: 0,
 *   to: 10,
 *   onStream: async (write) => {
 *     for (const chunk of chunks) {
 *       write(chunk)
 *       await delay(100)
 *     }
 *   },
 * })
 * ```
 */
export function streamContentCommand(
  options: StreamContentOptions,
): Command {
  return (
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined,
    view: EditorView | undefined,
  ): boolean => {
    // 命令需要 view 才能执行异步操作
    if (!view) {
      return false
    }

    if (dispatch) {
      // 使用 setTimeout 确保命令同步返回 true，然后再开始异步操作
      setTimeout(() => {
        handleHtmlStreaming(view, options)
      }, 0)
    }

    return true
  }
}
