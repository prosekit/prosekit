import {
  defineBaseKeymap,
  defineCommands,
  union,
} from 'prosekit/core'
import {
  createStreamingPlugin,
  streamContentCommand,
} from '@prosekit/ai'
import { definePlugin } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    // 添加流式插件
    definePlugin(createStreamingPlugin()),
    // 定义流式内容命令
    defineCommands({
      streamContent: () => streamContentCommand({
        stream: createMockHtmlStream(),
        preventEditing: true,
      }),
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>

/**
 * 模拟一个 HTML 字符串流
 * 在实际应用中，这应该是一个从服务器接收的异步迭代器
 */
async function* createMockHtmlStream(): AsyncIterable<string> {
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
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 10000))
    yield part
  }
}

