import {
  defineCommands,
  union,
} from 'prosekit/core'
import {
  createStreamingPlugin,
  streamContentCommand,
} from '@prosekit/ai'
import { definePlugin } from 'prosekit/core'
import { defineBasicExtension } from 'prosekit/basic'
import { defineCodeBlockShiki } from 'prosekit/extensions/code-block'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'
import { defineMention } from 'prosekit/extensions/mention'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { defineCodeBlockView } from '../../ui/code-block-view'

export function defineExtension() {
  return union(
    // 添加流式插件
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
    defineMention(),
    defineCodeBlockShiki(),
    defineHorizontalRule(),
    defineCodeBlockView(),
    definePlugin(createStreamingPlugin()),

    // 定义流式内容命令
    defineCommands({
      streamContent: () => (state, dispatch, view) => {
        const from = state.selection.from
        const to = state.selection.to
        const command = streamContentCommand({
          from,
          to,
          onStream: async (write) => {
            const parts = [
              '<p>这是流式内容的<strong>开始</strong>。',
              '内容会<em>实时</em>显示在编辑器中。',
              '</p><p>让我们看看列表：</p><ul><li>',
              '第一项</li><li>',
              '第二项</li><li>',
              '第三项</li></ul><p>',
              '现在是一个代码块：</p><pre><code>',
              'const x = 10;\n',
              'console.log(x);',
              '</code></pre><p>',
              '流式内容展示完成！</p>',
            ]

            for (const part of parts) {
              write(part)
              // 模拟网络延迟
              await new Promise((resolve) => setTimeout(resolve, 200))
            }
          },
        })
        return command(state, dispatch, view)
      },
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>

