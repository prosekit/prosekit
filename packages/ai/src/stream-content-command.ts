import type { Command, EditorState, Transaction } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'
import {
  Plugin,
  PluginKey,
  TextSelection,
} from '@prosekit/pm/state'
import {
  Decoration,
  DecorationSet,
} from '@prosekit/pm/view'
import { DOMParser } from '@prosekit/pm/model'

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
export const streamingPluginKey: PluginKey<StreamingState> =
  new PluginKey<StreamingState>('streaming')

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
          return {
            active: true,
            // 使用 mapping 来追踪位置变化
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
        const isInStreamingArea =
          selectionFrom >= streamingState.from &&
          selectionFrom <= streamingState.to

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
   * 内容流（异步迭代器）
   */
  stream: AsyncIterable<string>

  /**
   * 插入内容的起始位置，默认为当前光标位置
   */
  from?: number

  /**
   * 是否在流式输出期间阻止用户编辑该区域
   * @default true
   */
  preventEditing?: boolean
}

/**
 * 处理 HTML 字符串流的异步函数
 * 
 * 使用混合策略：
 * - 已完成的块：一次性解析并提交，不再重复解析
 * - 活动块：每次更新时重新解析，依赖 ProseMirror 的 diff 算法实现增量更新
 */
async function handleHtmlStreaming(
  view: EditorView,
  options: StreamContentOptions,
): Promise<void> {
  const { stream, from: initialFrom, preventEditing = true } = options

  let htmlBuffer = ''
  let committedBoundaryInText = 0 // 文本缓冲区中最后一个已确认的块边界位置
  let committedBoundaryInDoc = initialFrom ?? view.state.selection.from // 文档中已确认的块边界位置
  let currentStreamEndPos = committedBoundaryInDoc // 当前流内容的末尾位置

  const schema = view.state.schema
  const domParser = DOMParser.fromSchema(schema)

  // 创建一个临时 DOM 容器用于解析 HTML
  const tempDiv = document.createElement('div')

  // 流开始：通知插件
  if (preventEditing) {
    view.dispatch(
      view.state.tr.setMeta(streamingPluginKey, {
        streamStarted: true,
        from: committedBoundaryInDoc,
        to: committedBoundaryInDoc,
      }),
    )
  }

  try {
    for await (const chunk of stream) {
      // 1. 累积 HTML 内容
      htmlBuffer += chunk

      // 2. 寻找新的完整块边界
      // 这里我们寻找闭合的块级标签，如 </p>, </li>, </h1>-</h6>, </div> 等
      const blockBoundaryRegex = /<\/(p|li|h[1-6]|div|blockquote|pre|code|ul|ol|table|tr|td|th)>/g
      let lastMatchIndex = -1
      let match: RegExpExecArray | null

      // 从上次确认的边界之后开始查找
      const searchStart = committedBoundaryInText
      const searchText = htmlBuffer.substring(searchStart)

      while ((match = blockBoundaryRegex.exec(searchText)) !== null) {
        lastMatchIndex = searchStart + match.index + match[0].length
      }

      const { state } = view
      const tr = state.tr

      if (lastMatchIndex !== -1) {
        // 情况 A：找到了新的完整块边界
        const newlyCompletedPart = htmlBuffer.substring(
          committedBoundaryInText,
          lastMatchIndex,
        )
        const activePart = htmlBuffer.substring(lastMatchIndex)

        // 解析已完成的部分
        tempDiv.innerHTML = newlyCompletedPart
        const completedSlice = domParser.parseSlice(tempDiv)

        // 解析活动部分
        tempDiv.innerHTML = activePart
        const activeSlice = domParser.parseSlice(tempDiv)

        // 替换旧的活动块为已完成的部分
        tr.replace(committedBoundaryInDoc, currentStreamEndPos, completedSlice)

        // 更新已确认边界
        committedBoundaryInDoc += completedSlice.size

        // 在已确认边界后插入新的活动块
        tr.insert(committedBoundaryInDoc, activeSlice.content)

        // 更新当前流末尾位置
        currentStreamEndPos = committedBoundaryInDoc + activeSlice.size

        // 更新文本缓冲区边界
        committedBoundaryInText = lastMatchIndex
      } else {
        // 情况 B：没有找到新的完整块边界（仍在活动块中）
        const activePart = htmlBuffer.substring(committedBoundaryInText)

        // 只解析活动部分
        tempDiv.innerHTML = activePart
        const activeSlice = domParser.parseSlice(tempDiv)

        // 替换文档中的活动区域
        tr.replace(committedBoundaryInDoc, currentStreamEndPos, activeSlice)

        // 更新当前流末尾位置
        currentStreamEndPos = committedBoundaryInDoc + activeSlice.size
      }

      // 移动光标到新内容的末尾
      const newSelection = TextSelection.create(tr.doc, currentStreamEndPos)
      tr.setSelection(newSelection)
      tr.scrollIntoView()

      // 标记这个事务来自流式更新，并且不计入 undo 历史
      tr.setMeta(streamingPluginKey, { streamUpdating: true })
      tr.setMeta('addToHistory', false)

      // 更新插件中的流式范围
      if (preventEditing) {
        tr.setMeta(streamingPluginKey, {
          streamUpdating: true,
          // 让插件的 apply 函数通过 mapping 自动计算新位置
        })
      }

      // 分发事务
      view.dispatch(tr)
    }

    // 流结束：最后一次更新，确保所有内容都被正确解析
    const finalTr = view.state.tr
    const remainingPart = htmlBuffer.substring(committedBoundaryInText)

    if (remainingPart.trim()) {
      tempDiv.innerHTML = remainingPart
      const finalSlice = domParser.parseSlice(tempDiv)

      finalTr.replace(committedBoundaryInDoc, currentStreamEndPos, finalSlice)
      const finalPos = committedBoundaryInDoc + finalSlice.size

      const finalSelection = TextSelection.create(finalTr.doc, finalPos)
      finalTr.setSelection(finalSelection)
      finalTr.scrollIntoView()

      finalTr.setMeta(streamingPluginKey, { streamUpdating: true })
      finalTr.setMeta('addToHistory', false)

      view.dispatch(finalTr)
    }

    // 通知插件流已结束
    if (preventEditing) {
      view.dispatch(
        view.state.tr.setMeta(streamingPluginKey, { streamEnded: true }),
      )
    }
  } catch (error) {
    console.error('流式内容处理失败:', error)

    // 确保在出错时也结束流式状态
    if (preventEditing) {
      view.dispatch(
        view.state.tr.setMeta(streamingPluginKey, { streamEnded: true }),
      )
    }
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
 *   stream: async function* () {
 *     for (const chunk of chunks) {
 *       yield chunk
 *       await delay(100)
 *     }
 *   }(),
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

