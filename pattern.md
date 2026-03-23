# 迁移模式：从 Context 传递数据改为 Props 传递数据

本文档描述将 `@prosemirror-adapter` 的 context-based API 迁移为 props-based API 的完整模式。当前分支已完成 React 和 Vue 的迁移，剩余 Preact、Solid、Svelte 需要按照相同模式迁移。

## 背景

之前的架构依赖 `@prosemirror-adapter/{framework}` 提供的 `ProsemirrorAdapterProvider` 组件和 `useXxxViewFactory` / `useXxxViewContext` 等 hooks 来通过 context 传递 view factory 和 view props。新架构改用 `useXxxRenderer` hook 获取 renderer，然后通过自定义的 `AbstractXxxView` 子类直接将 props 传给用户组件，不再需要 Provider 或 Context。

## 一、依赖变更（pnpm-workspace.yaml）

在 `overrides` 中将所有 `@prosemirror-adapter/*` 包指向新版本：

```yaml
overrides:
  "@prosemirror-adapter/core": "https://pkg.pr.new/@prosemirror-adapter/core@1a5465f"
  "@prosemirror-adapter/react": "https://pkg.pr.new/@prosemirror-adapter/react@1a5465f"
  # ... 其他框架同理
```

## 二、扩展文件迁移（`{framework}-node-view.ts` / `{framework}-mark-view.ts`）

这是改动最核心的部分。每个文件涉及三处改动：删除 `withXxxViewProps` wrapper、删除 Consumer 组件并替换为导出的 factory 函数、简化 `defineXxxView` 函数。

### 2.1 Import 变更

**删除的 imports：**
- `MarkViewConstructor` / `NodeViewConstructor`（来自 `@prosekit/pm/view`）——整行删除
- 来自 `@prosemirror-adapter/{framework}` 的 `useXxxViewContext`、`useXxxViewFactory`、`{Framework}XxxViewUserOptions`
- 来自框架的 hooks：如 React 的 `useMemo`、Vue 的 `computed`
- `useExtension`（来自 `../hooks/use-extension.ts`）
- Vue 特有：`renderNothing`（来自 `./helpers.ts`）

**新增的 imports：**
- 来自 `@prosemirror-adapter/{framework}` 的 `Abstract{Framework}XxxView`、`build{Framework}XxxViewCreator`、`XxxViewContext`（类型）、`{Framework}RendererResult`（类型）
- 渲染相关：React 使用 `createPortal`（from `react-dom`），Vue 使用 `Teleport` 和 `markRaw`（from `vue`）

**Import 排序规则：**
1. `@prosekit/core`
2. `@prosemirror-adapter/core`（如有）
3. `@prosemirror-adapter/{framework}`
4. 框架自身的 imports（`react`、`react-dom`、`vue` 等）
5. 空行
6. 本地相对 imports（迁移后此区域为空，整个 import 块后不保留多余空行）

**重要：** 迁移后不再有本地相对 imports（`useExtension`、`renderNothing` 均已移除），所以最后一个 import group 后面不需要额外的空行分隔。

### 2.2 类型声明区域（保持不变）

以下部分 **完全不动**，保持原样：
- `{Framework}XxxViewProps` interface（`extends XxxViewContext`）
- `{Framework}XxxViewComponent` type alias
- `{Framework}XxxViewOptions` interface（`extends CoreXxxViewUserOptions<...>`，含 `name: string`）

### 2.3 删除 `withXxxViewProps` 函数，替换为 `ProseKit{Framework}XxxView` 类

**删除：** 原来的 `withXxxViewProps(component)` 函数。这个函数的作用是将 context hook 获取的 props 传递给用户组件——迁移后不再需要。

**新增：** 在相同位置创建一个继承 `Abstract{Framework}XxxView` 的类。

#### React 版 NodeView/MarkView 类模式：

```ts
class ProseKitReactMarkView extends AbstractReactMarkView<ReactMarkViewComponent> {
  render = (): ReactPortal => {
    const UserComponent = this.component
    const props = { ...this.context }
    return createPortal(
      createElement(UserComponent, props),
      this.dom,
      this.key,
    )
  }
}
```

关键细节：
- 类名格式：`ProseKit{Framework}{View类型}`，如 `ProseKitReactMarkView`、`ProseKitReactNodeView`
- 继承：`Abstract{Framework}{View类型}View<{Framework}{View类型}ViewComponent>`
- `render` 是箭头函数赋值（`render = (): ... =>`），不是方法声明
- React 返回 `ReactPortal`，使用 `createPortal(createElement(UserComponent, props), this.dom, this.key)`
- React 中 props 使用展开拷贝：`{ ...this.context }`

#### Vue 版 NodeView 类模式：

```ts
class ProseKitVueNodeView extends AbstractVueNodeView<VueNodeViewComponent> {
  render = (): VueRendererComponent => {
    const UserComponent = this.component
    const render = () => {
      const props = this.context
      return h(Teleport, { key: this.key, to: this.dom }, [h(UserComponent, props)])
    }
    const RendererComponent: VueRendererComponent = defineComponent({
      name: 'ProsemirrorNodeView',
      setup: () => {
        return render
      },
    })
    return markRaw(RendererComponent)
  }
}
```

关键细节：
- Vue 返回 `VueRendererComponent`
- 使用 `Teleport` 组件挂载到 `this.dom`
- 内部创建一个 `defineComponent`，其 `setup` 返回渲染函数
- `defineComponent` 的 `name` 格式为 `'Prosemirror{NodeView|MarkView}'`
- 最终用 `markRaw()` 包裹，防止 Vue 将其转为响应式
- Vue 中 props 直接引用 `this.context`（不展开），因为 Vue 的响应式系统需要保持引用

### 2.4 删除 Consumer 组件，替换为导出的 factory 函数

**删除：** 原来的 Consumer 组件（React: `ReactXxxViewConsumer`，Vue: `VueXxxViewsConsumer`）。

**新增：** 在相同位置创建一个 **导出的** `define{Framework}XxxViewFactory` 函数。

#### 旧代码（React 版示例）：

```ts
/**
 * @internal
 */
export const ReactMarkViewConsumer: FC = () => {
  const markViewFactory = useMarkViewFactory()
  const extension = useMemo(
    () => defineReactMarkViewFactory(markViewFactory),
    [markViewFactory],
  )
  useExtension(extension)

  return null
}
```

#### 新代码（React 版示例）：

```ts
/**
 * @internal
 */
export function defineReactMarkViewFactory(
  renderReactRenderer: ReactRendererResult['renderReactRenderer'],
  removeReactRenderer: ReactRendererResult['removeReactRenderer'],
): Extension {
  const factory = buildReactMarkViewCreator(renderReactRenderer, removeReactRenderer, ProseKitReactMarkView)
  return defineMarkViewFactory<ReactMarkViewOptions>({
    group: 'react',
    factory,
  })
}
```

#### Vue 版示例：

```ts
/**
 * @internal
 */
export function defineVueNodeViewFactory(
  renderVueRenderer: VueRendererResult['renderVueRenderer'],
  removeVueRenderer: VueRendererResult['removeVueRenderer'],
): Extension {
  const factory = buildVueNodeViewCreator(renderVueRenderer, removeVueRenderer, ProseKitVueNodeView)
  return defineNodeViewFactory<VueNodeViewOptions>({
    group: 'vue',
    factory,
  })
}
```

关键细节：
- 函数名格式：`define{Framework}{View类型}ViewFactory`
- 保持 `@internal` JSDoc 注释
- 参数为 `render{Framework}Renderer` 和 `remove{Framework}Renderer`，类型使用 `{Framework}RendererResult['renderXxxRenderer']` 索引类型
- 使用 `build{Framework}{View类型}ViewCreator` 创建 factory，第三个参数是上面定义的 ProseKit 类
- `defineXxxViewFactory` 的泛型参数从旧的 `{Framework}XxxViewUserOptions` 改为 `{Framework}XxxViewOptions`（即 ProseKit 自己定义的 Options 类型）
- `group` 保持框架名不变

### 2.5 简化 `define{Framework}XxxView` 函数

**旧代码：**

```ts
export function defineReactMarkView(options: ReactMarkViewOptions): Extension {
  const { name, component, ...userOptions } = options

  const args: ReactMarkViewUserOptions = {
    ...userOptions,
    component: withMarkViewProps(component),
  }

  return defineMarkViewComponent<ReactMarkViewUserOptions>({
    group: 'react',
    name,
    args,
  })
}
```

**新代码：**

```ts
export function defineReactMarkView(options: ReactMarkViewOptions): Extension {
  return defineMarkViewComponent<ReactMarkViewOptions>({
    group: 'react',
    name: options.name,
    args: options,
  })
}
```

关键细节：
- 不再解构 options
- 不再调用 `withXxxViewProps` 包装 component
- 不再创建中间的 `args` 变量
- 泛型参数从 `{Framework}XxxViewUserOptions` 改为 `{Framework}XxxViewOptions`
- 直接传 `options.name` 和 `options`（即 `args: options`）
- 函数签名不变，仍然保持 `@public` JSDoc 注释

### 2.6 删除文件末尾的私有 factory 函数

**删除：** 原来位于文件末尾的私有 `define{Framework}XxxViewFactory` 函数。这个函数现在已经被 2.4 节中的新版本替代（从文件末尾移到了 Consumer 的位置，且签名完全不同）。

### 2.7 文件内函数/代码块的最终排序

迁移后文件的代码块顺序（从上到下）：

1. **Import 声明**
2. **空行**
3. **`{Framework}XxxViewProps` interface**（`@public`）
4. **空行**
5. **`{Framework}XxxViewComponent` type**（`@public`）
6. **空行**
7. **`{Framework}XxxViewOptions` interface**（`@public`，含 JSDoc `Options for {@link ...}`）
8. **空行**
9. **`ProseKit{Framework}XxxView` class**（无 JSDoc）
10. **空行**
11. **`define{Framework}XxxViewFactory` function**（`@internal`）
12. **空行**
13. **`define{Framework}XxxView` function**（`@public`，含 JSDoc `Defines a xxx view using a {Framework} component.`）

文件末尾：最后一个函数的 `}` 后有一个换行符（即文件以空行结尾）。

## 三、新增 ViewRenderer 组件（`components/view-renderer.ts`）

每个框架新增一个 `view-renderer.ts` 文件，位于 `components/` 目录下。

### 3.1 React 版 `view-renderer.ts`

```ts
import { union, type Editor } from '@prosekit/core'
import { useReactRenderer } from '@prosemirror-adapter/react'
import { createElement, Fragment, useMemo, type ComponentType, type ReactNode } from 'react'

import { defineReactMarkViewFactory } from '../extensions/react-mark-view.ts'
import { defineReactNodeViewFactory } from '../extensions/react-node-view.ts'
import { useEditorExtension } from '../hooks/use-editor-extension.ts'

interface ViewRendererProps {
  editor: Editor
  children: ReactNode
}

export const ViewRenderer: ComponentType<ViewRendererProps> = ({ editor, children }): ReactNode => {
  const { renderReactRenderer, removeReactRenderer, render } = useReactRenderer()

  const extension = useMemo(() => {
    return union([
      defineReactMarkViewFactory(renderReactRenderer, removeReactRenderer),
      defineReactNodeViewFactory(renderReactRenderer, removeReactRenderer),
    ])
  }, [renderReactRenderer, removeReactRenderer])

  useEditorExtension(editor, extension)

  return createElement(Fragment, null, createElement(Fragment, null, children), createElement(Fragment, null, render()))
}
```

### 3.2 Vue 版 `view-renderer.ts`

```ts
import { union, type Editor } from '@prosekit/core'
import { useVueRenderer } from '@prosemirror-adapter/vue'
import { defineComponent, type DefineSetupFnComponent, type PropType } from 'vue'

import { defineVueNodeViewFactory } from '../extensions/vue-node-view.ts'
import { defineVueMarkViewFactory } from '../extensions/vue-mark-view.ts'
import { useEditorExtension } from '../hooks/use-editor-extension.ts'

/**
 * @internal
 */
export interface ViewRendererProps {
  editor: Editor
}

/**
 * @internal
 */
export const ViewRenderer: DefineSetupFnComponent<ViewRendererProps> = defineComponent<ViewRendererProps>({
  name: 'ViewRenderer',
  props: { editor: { type: Object as PropType<Editor>, required: true } },
  setup: (props, { slots }) => {
    const { renderVueRenderer, removeVueRenderer, render } = useVueRenderer()

    const extension = union([
      defineVueMarkViewFactory(renderVueRenderer, removeVueRenderer),
      defineVueNodeViewFactory(renderVueRenderer, removeVueRenderer),
    ])

    useEditorExtension(() => props.editor, extension)

    return () => [slots.default?.(), render()]
  },
})
```

### 3.3 ViewRenderer 关键模式

**renderer hook 的解构：**
- React: `const { renderReactRenderer, removeReactRenderer, render } = useReactRenderer()`
- Vue: `const { renderVueRenderer, removeVueRenderer, render } = useVueRenderer()`
- 命名模式：`render{Framework}Renderer`、`remove{Framework}Renderer`、`render`

**extension 的创建：**
- 使用 `union([...])` 合并 mark 和 node 的 factory extension
- React 中用 `useMemo` 包裹，依赖为 `[renderReactRenderer, removeReactRenderer]`
- Vue 中 **不用** 响应式包裹（不用 `computed`），直接在 `setup` 中创建，因为 renderer 不会改变
- 先写 MarkView factory，再写 NodeView factory（按字母序排列）——但 Vue 版目前是先 NodeView 再 MarkView，保持和 import 顺序一致即可

**extension 的注册：**
- 使用 `useEditorExtension`（不是 `useExtension`）——这是关键区别，因为 editor 是通过 props 传入而非从 context 获取
- React: `useEditorExtension(editor, extension)` —— editor 直接传值
- Vue: `useEditorExtension(() => props.editor, extension)` —— editor 用 getter 函数包裹

**渲染输出：**
- React: `createElement(Fragment, null, createElement(Fragment, null, children), createElement(Fragment, null, render()))`
  - 渲染 children 和 `render()` 的结果，各用 Fragment 包裹
- Vue: `return () => [slots.default?.(), render()]`
  - 返回一个数组，包含默认 slot 内容和 `render()` 结果

**Props 接口：**
- React: `ViewRendererProps` 包含 `editor: Editor` 和 `children: ReactNode`，无 JSDoc
- Vue: `ViewRendererProps` 仅包含 `editor: Editor`（children 通过 slots 传递），有 `@internal` JSDoc

**React 与 Vue 差异：**
- React 不需要 `@internal` JSDoc（因为 `interface` 没有 `export`）
- Vue 需要 `@internal` JSDoc 因为 interface 和组件都有 `export`

## 四、ProseKit 组件迁移（`components/prosekit.ts`）

### 4.1 Import 变更

**删除：**
- `ProsemirrorAdapterProvider`（from `@prosemirror-adapter/{framework}`）
- `{Framework}MarkViewConsumer` / `{Framework}MarkViewsConsumer`（from `../extensions/...`）
- `{Framework}NodeViewConsumer` / `{Framework}NodeViewsConsumer`（from `../extensions/...`）

**新增：**
- `ViewRenderer`（from `./view-renderer.ts`）

**Import 排序规则和空行：**

React 迁移后的 import 顺序：
```ts
import type { Editor } from '@prosekit/core'
import { createElement, type ComponentType, type ReactNode } from 'react'

import { EditorContextProvider } from '../contexts/editor-context.ts'

import { ViewRenderer } from './view-renderer.ts'
```

Vue 迁移后的 import 顺序：
```ts
import type { Editor } from '@prosekit/core'
import { defineComponent, h, type DefineSetupFnComponent, type PropType } from 'vue'

import { provideEditor } from '../injection/editor-context.ts'

import { ViewRenderer } from './view-renderer.ts'
```

注意 import 分组之间用空行分隔：
1. 外部包（`@prosekit/core`）
2. 框架包（`react`、`vue` 等）
3. 空行
4. 内部 imports（`../contexts/...` 或 `../injection/...`）
5. 空行
6. 同目录 imports（`./view-renderer.ts`）

### 4.2 组件 render 变更

**React 旧代码：**
```ts
return createElement(
  EditorContextProvider,
  { value: editor },
  createElement(
    ProsemirrorAdapterProvider,
    null,
    createElement(ReactNodeViewConsumer),
    createElement(ReactMarkViewConsumer),
    children,
  ),
)
```

**React 新代码：**
```ts
return createElement(
  EditorContextProvider,
  { value: editor },
  createElement(
    ViewRenderer,
    { editor, children },
  ),
)
```

**Vue 旧代码：**
```ts
return () => {
  return h(ProsemirrorAdapterProvider, null, () => [
    h(VueNodeViewsConsumer),
    h(VueMarkViewsConsumer),
    slots.default?.(),
  ])
}
```

**Vue 新代码：**
```ts
return () =>
  h(
    ViewRenderer,
    { editor: props.editor },
    slots.default?.(),
  )
```

关键细节：
- `ProsemirrorAdapterProvider` 被 `ViewRenderer` 完全替代
- Consumer 组件被移除（它们的逻辑现在在 ViewRenderer 内部）
- `editor` 通过 props 显式传给 `ViewRenderer`
- React: children 作为 ViewRenderer 的 prop 传递
- Vue: children 作为 `h()` 的第三个参数（slot）传递
- Vue 旧代码中 `return () => { return h(...) }` 简化为 `return () => h(...)`（去掉了花括号和 return）

## 五、待迁移框架的特殊注意事项

### 5.1 Preact

Preact 的结构与 React 几乎完全一致。区别：
- 使用 `h` 而非 `createElement`
- hooks 从 `preact/hooks` 导入
- 组件类型用 `FunctionComponent` 而非 `FC`
- `@prosemirror-adapter/preact` 中的类型和 API 以 `Preact` 开头
- `useEditorExtension` 的签名与 React 一样（使用 `useEffect`）
- Consumer 名称：`PreactNodeViewConsumer`、`PreactMarkViewConsumer`

### 5.2 Solid

Solid 有独特之处：
- Consumer 不是组件，而是函数：`consumeSolidNodeViews()`、`consumeSolidMarkViews()`
- 使用 `createMemo` 而非 `useMemo`
- 使用 `createComponent` 而非 `createElement`
- Props 上下文使用 `Accessor` 和 getter pattern
- `useEditorExtension` 使用 `createEffect` + `onCleanup`
- Props 类型名为 `NodeViewContextProps`/`MarkViewContextProps`（不是 `NodeViewContext`/`MarkViewContext`）
- Solid 的 `withXxxViewProps` 函数更复杂——包含逐个属性的 getter 代理，迁移后这些全部删除

### 5.3 Svelte

Svelte 的架构有较大不同：
- Consumer 是 `.svelte` 文件而非 `.ts` 文件
- Consumer 中使用 `readable` store 包裹 extension
- ProseKit 组件也是 `.svelte` 文件
- 使用 `useProsemirrorAdapterProvider` 而非 `ProsemirrorAdapterProvider` 组件
- `defineSvelteXxxView` 中有 SSR 检查 `isServer`（这部分保持不变）
- 有 `wrapComponent` 而非 `withXxxViewProps`，使用 `NodeViewWrapper`/`MarkViewWrapper` 组件
- `useEditorExtension` 使用 `onMount` + `subscribe` 模式
- Svelte 的 ViewRenderer 可能需要写成 `.svelte` 文件或使用 `defineComponent` 等方式

## 六、代码风格规范

以下是在本次迁移中观察到的代码风格规则：

1. **尾随逗号**：多行参数列表、数组中的最后一个元素后有逗号
2. **无分号**：不使用分号（但 class 中的属性赋值除外：`render = (): ... => {`）
3. **单引号**：字符串使用单引号
4. **类型导入**：使用 `type` 关键字（`import type { ... }` 或 `type Extension`）
5. **空行**：
   - import 块内不同分组之间用空行分隔
   - 每个顶层声明（interface、type、class、function）之间用一个空行分隔
   - 函数体内的逻辑块之间用空行分隔
   - 文件末尾有一个空行
6. **JSDoc 注释**：保留原有的 `@public` 和 `@internal` 标注，不增不减
7. **缩进**：2 个空格
8. **换行**：
   - 单行 import 如果太长则拆成多行，每个 named import 一行
   - `createPortal` / `h(Teleport, ...)` 的参数列表在多行时，每个参数一行，最后一个参数后有逗号
   - 类中 `render` 箭头函数的 body 内正常换行缩进

## 七、迁移检查清单

对每个待迁移的框架（Preact / Solid / Svelte），执行以下步骤：

### 扩展文件（`{framework}-node-view.ts` 和 `{framework}-mark-view.ts`）：
- [ ] 更新 imports：删除旧 API imports，添加新 API imports
- [ ] 删除 `withXxxViewProps` 函数
- [ ] 添加 `ProseKit{Framework}XxxView` 类
- [ ] 删除 Consumer 组件/函数
- [ ] 添加导出的 `define{Framework}XxxViewFactory` 函数
- [ ] 简化 `define{Framework}XxxView` 函数
- [ ] 删除文件末尾的旧 `define{Framework}XxxViewFactory` 私有函数

### 新增 ViewRenderer 组件（`components/view-renderer.ts`）：
- [ ] 创建文件，从 `@prosemirror-adapter/{framework}` 导入 `use{Framework}Renderer`
- [ ] 解构获得 `render{Framework}Renderer`、`remove{Framework}Renderer`、`render`
- [ ] 使用 `union([...])` 合并两个 factory extension
- [ ] 使用 `useEditorExtension` 注册 extension（传入 editor prop）
- [ ] 渲染 children/slots 和 `render()` 的结果

### ProseKit 组件（`components/prosekit.ts` 或 `prosekit.svelte`）：
- [ ] 删除 `ProsemirrorAdapterProvider` / `useProsemirrorAdapterProvider` 导入
- [ ] 删除 Consumer 组件导入
- [ ] 添加 `ViewRenderer` 导入
- [ ] 替换 render 逻辑：用 `ViewRenderer` 替代 `ProsemirrorAdapterProvider` + Consumer
- [ ] 确保 `editor` 通过 props 传给 `ViewRenderer`
