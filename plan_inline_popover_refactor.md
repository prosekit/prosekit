# Inline-Popover Refactoring Plan: Single Element → Root + Positioner + Popup

## 1. 现状分析

### 当前结构：单元素

```
<prosekit-inline-popover>   ← 一个元素同时负责: open 状态 + 定位 + 显示/隐藏 + data-state + 编辑器跟踪
  {用户内容}
</prosekit-inline-popover>
```

`setupInlinePopover` 在一个 setup 函数里做了所有事情：
1. 跟踪编辑器焦点状态 (`useEditorFocusChangeEvent`)
2. 跟踪选区变化 (`useEditorUpdateEvent`) → 更新 virtual reference
3. 根据 reference 和 `defaultOpen` 自动管理 open 状态
4. Escape 键关闭 (`useKeymap`)
5. 直接调用 `updatePlacement()` 定位
6. `usePresence()` 管理显示/隐藏动画
7. `data-state` 属性

Props 把 `OverlayPositionerProps` + Root 级别的 props (`defaultOpen`, `open`, `dismissOnEscape`) + 编辑器 props (`editor`) 混在一起。

### 目标结构：三层

```
<prosekit-inline-popover-root>          ← open 状态管理, OverlayStore 创建
  <prosekit-inline-popover-positioner>  ← floating-ui 定位 + Popover API + 显示/隐藏
    <prosekit-inline-popover-popup>     ← data-state + role + 内容容器
      {用户内容}
    </prosekit-inline-popover-popup>
  </prosekit-inline-popover-positioner>
</prosekit-inline-popover-root>
```

### 参考实现

Popover 的三层结构 (`aria-ui/packages/elements/src/popover/`):
- `popover-root.ts` → 调用 `setupOverlayRoot(host, props, PopoverStoreContext)`
- `popover-positioner.ts` → 调用 `setupOverlayPositioner(host, props, PopoverStoreContext)`
- `popover-popup.ts` → 调用 `setupOverlayPopup(host, props, PopoverStoreContext, 'dialog')`
- `popover-store.ts` → `createContext<OverlayStore>('PopoverStoreContext')`

---

## 2. 架构决策

### 代码放在哪里？

Inline-popover 是编辑器特有组件（需要 `editor` prop、跟踪选区），不属于通用 aria-ui 组件库。

**决策：放在 `packages/web/src/components/inline-popover/`**（和 block-handle 一样），直接调用 `setupOverlayRoot`、`setupOverlayPositioner`、`setupOverlayPopup` 这些 `@internal` API。

### Props 如何拆分？

| 层 | Props | 来源 |
|---|---|---|
| **Root** | `defaultOpen`, `open`, `disabled`, `editor`, `dismissOnEscape` | Root 管理 open 状态；编辑器跟踪逻辑放在 Root 因为它需要修改 open 状态 |
| **Positioner** | 所有 `OverlayPositionerProps` | 纯定位配置 |
| **Popup** | 无 (继承 `OverlayPopupProps` 即可) | 只设 role 和 data-state |

### 编辑器逻辑放在哪一层？

当前的编辑器逻辑（跟踪选区、管理 reference、Escape 键处理）需要同时控制 `open` 状态和 `anchorElement`。两者都在 `OverlayStore` 上。

**决策：放在 Root。** Root 创建 OverlayStore，可以直接调用 `store.emitOpenChange()` 和 `store.anchorElement.set()`。这和普通 Popover 不同（普通 Popover 的 Root 只管 open，anchor 由 Trigger 设置），但 inline-popover 没有 Trigger 元素——reference 由编辑器选区自动决定。

---

## 3. 文件级计划

### 新文件结构

```
inline-popover/
  inline-popover-root.ts          ← NEW: Root + 编辑器跟踪逻辑
  inline-popover-positioner.ts    ← NEW: 纯定位，复用 setupOverlayPositioner
  inline-popover-popup.ts         ← NEW: 纯语义，复用 setupOverlayPopup
  store.ts                        ← NEW: OverlayStore context
  virtual-selection-element.ts    ← NO CHANGE
  index.ts                        ← REWRITE: 导出三个组件
```

### 要删除的文件

```
inline-popover/inline-popover/inline-popover.ts  ← 被三个新文件替代
```

---

## 4. 组件实现细节

### 4.1 `store.ts`

```typescript
import { createContext } from '@aria-ui-v2/core'
import type { OverlayStore } from '@aria-ui-v2/elements/overlay'

export const InlinePopoverStoreContext = createContext<OverlayStore>(
  'prosekit-inline-popover-store',
)
```

### 4.2 `inline-popover-root.ts`

Props:

```typescript
export interface InlinePopoverRootProps extends OverlayRootProps {
  /** @default null @hidden */
  editor: Editor | null

  /** @default true */
  defaultOpen: boolean  // override: 默认 true（普通 popover 默认 false）

  /** @default true */
  dismissOnEscape: boolean
}
```

Setup:

```typescript
function setupInlinePopoverRoot(
  host: HostElement,
  props: Store<InlinePopoverRootProps>,
): void {
  // 1. 复用 setupOverlayRoot — 创建 OverlayStore, 管理 open 状态
  setupOverlayRoot(host, props, InlinePopoverStoreContext)

  // 2. 获取 store (刚被 provide 到 context)
  const getStore = InlinePopoverStoreContext.consume(host)

  // 3. 编辑器跟踪: 选区变化 → 更新 store.anchorElement
  let editorFocused = false
  useEditorFocusChangeEvent(host, props.editor.get, (focus) => {
    editorFocused = focus
  })

  let prevSelection: Selection | undefined
  useEditorUpdateEvent(host, props.editor.get, (view) => {
    const isPopoverFocused = !editorFocused && host.contains(host.ownerDocument.activeElement)
    if (isPopoverFocused) return

    const { selection } = view.state
    if (prevSelection?.eq(selection)) return
    prevSelection = selection

    const reference = getVirtualSelectionElement(view) || null
    const store = getStore()
    if (!store) return

    store.anchorElement.set(reference as any)

    // Auto-manage open state
    if (reference && props.defaultOpen.get()) {
      store.emitOpenChange(true)
    } else if (!reference) {
      store.emitOpenChange(false)
    }
  })

  // 4. Escape 键处理
  useKeymap(host, props.editor.get, {
    Escape: () => {
      const store = getStore()
      if (!store) return false
      if (!props.dismissOnEscape.get() || !store.getOpen()) return false
      store.emitOpenChange(false)
      return true
    },
  })
}
```

注意: `store.anchorElement` 类型是 `Signal<HTMLElement | undefined>`，但 inline-popover 需要传 `ReferenceElement` (virtual element)。需要检查 `setupOverlayPositioner` 是否接受 `ReferenceElement`。

看 `overlay-positioner.ts:249`：`updatePlacement(host, anchorElement, { ... })` — `updatePlacement` 的第二个参数类型是什么？

```typescript
// positioning.ts
export function updatePlacement(
  host: HTMLElement,
  reference: ReferenceElement,
  options: PlacementOptions,
): VoidFunction
```

它接受 `ReferenceElement`，但 `OverlayStore.anchorElement` 是 `Signal<HTMLElement | undefined>`。这是一个**类型不匹配**。

**解决方案**:
1. 修改 `OverlayStore.anchorElement` 的类型为 `Signal<ReferenceElement | undefined>` — 但这会影响所有使用者
2. 或者在 inline-popover-root 里不用 `store.anchorElement`，而是用单独的 signal 传递 reference，然后在 positioner 里覆盖定位逻辑
3. 或者扩展 OverlayStore 支持 ReferenceElement

**推荐方案 1**: 修改 `OverlayStore.anchorElement` 类型。`ReferenceElement` 是 floating-ui 的类型，`HTMLElement` 是它的子类型。把 `HTMLElement` 放宽为 `ReferenceElement` 是向后兼容的。`setupOverlayPositioner` 里 `updatePlacement(host, anchorElement, ...)` 已经接受 `ReferenceElement`。

### 4.3 `inline-popover-positioner.ts`

纯定位层，完全复用 `setupOverlayPositioner`：

```typescript
export interface InlinePopoverPositionerProps extends OverlayPositionerProps {
  // Override defaults
  /** @default "top" */
  placement: OverlayPositionerProps['placement']
  /** @default 12 */
  offset: OverlayPositionerProps['offset']
  /** @default true */
  hide: OverlayPositionerProps['hide']
  /** @default true */
  overlap: OverlayPositionerProps['overlap']
  /** @default true */
  inline: OverlayPositionerProps['inline']
  /** @default 8 */
  overflowPadding: OverlayPositionerProps['overflowPadding']
}

function setupInlinePopoverPositioner(
  host: HostElement,
  props: Store<InlinePopoverPositionerProps>,
): void {
  setupOverlayPositioner(host, props, InlinePopoverStoreContext)
}
```

这个 setup 函数只有一行！所有定位逻辑、Popover API、显示/隐藏都由 `setupOverlayPositioner` 处理。

### 4.4 `inline-popover-popup.ts`

纯语义层：

```typescript
export interface InlinePopoverPopupProps extends OverlayPopupProps {}

function setupInlinePopoverPopup(
  host: HostElement,
  props: Store<InlinePopoverPopupProps>,
): void {
  setupOverlayPopup(host, props, InlinePopoverStoreContext, 'dialog')
  usePresence(host, () => {
    const store = InlinePopoverStoreContext.consume(host)()
    return store?.getOpen() ?? false
  })
}
```

`data-state` 和 role 由 `setupOverlayPopup` 处理。`usePresence` 放在 Popup 而不是 Positioner，因为动画作用于内容容器。

---

## 5. 对用户 API 的影响 (Breaking Change)

### 之前

```tsx
// React
<InlinePopover className="..." open={open} onOpenChange={handleChange}>
  {toolbar content}
</InlinePopover>
```

### 之后

```tsx
// React
<InlinePopoverRoot open={open} onOpenChange={handleChange}>
  <InlinePopoverPositioner>
    <InlinePopoverPopup className="...">
      {toolbar content}
    </InlinePopoverPopup>
  </InlinePopoverPositioner>
</InlinePopoverRoot>
```

**优势:**
- `className` / 样式放在 Popup 上（内容容器），不再和定位逻辑冲突
- Positioner 可以设置 `overflow: visible`，Popup 可以设置 `overflow: auto` / 圆角 / 阴影
- 动画在 Popup 上通过 `data-state` 控制，不会被 `display:none` 阻断
- 和 Popover / Tooltip / TableHandle 的使用方式一致

**需要更新的地方:**
- 所有 `registry/` 下使用 `InlinePopover` 的示例文件
- 文档（如果有）

---

## 6. 前置条件

在实现之前需要确认/修改:

### 6.1 `OverlayStore.anchorElement` 类型

当前:
```typescript
readonly anchorElement = createSignal<HTMLElement | undefined>(undefined)
```

需要改为:
```typescript
readonly anchorElement = createSignal<ReferenceElement | undefined>(undefined)
```

检查所有使用者是否兼容。`HTMLElement` 实现了 `ReferenceElement` 接口，所以现有代码传 `HTMLElement` 仍然有效。

### 6.2 `setupOverlayRoot` 后能否立即 consume context

`setupOverlayRoot` 调用 `storeContext.provide(host, store)`。在同一个 setup 函数里接着调用 `storeContext.consume(host)` 能否拿到刚 provide 的值？

需要验证 aria-ui-v2 的 context 机制是否支持 provide 和 consume 在同一个元素上。如果不支持，需要换一种方式：直接在 root 里持有 store 引用，不通过 context 消费。

**替代方案**: 不 consume，直接保留 store 变量：

```typescript
function setupInlinePopoverRoot(...) {
  const getOpen = computed(() => { ... })
  const store = new OverlayStore(getOpen, emitOpenChange)
  InlinePopoverStoreContext.provide(host, store)

  // 直接用 store，不需要 consume
  store.anchorElement.set(reference)
  store.emitOpenChange(true)
}
```

这更简单也更可靠。`setupOverlayRoot` 内部也是这么做的。但如果要调用 `setupOverlayRoot`（它内部会创建 store），我们就无法直接拿到 store 引用。

**最终决策**: 不调用 `setupOverlayRoot`，而是复制其逻辑（只有 ~20 行），这样可以直接持有 store 引用。这和 table-handle-row-root 的做法一致。

---

## 7. TODO

### Phase 1: 前置修改

- [ ] **1.1** 修改 `OverlayStore.anchorElement` 类型: `HTMLElement` → `ReferenceElement`
  - [ ] 更新 `aria-ui/packages/elements/src/overlay/overlay-store.ts`
  - [ ] 检查所有使用者兼容性
  - [ ] 运行测试

### Phase 2: 创建新文件

- [ ] **2.1** 创建 `store.ts` — InlinePopoverStoreContext
- [ ] **2.2** 创建 `inline-popover-root.ts`
  - [ ] Props: `editor`, `defaultOpen` (默认 true), `open`, `disabled`, `dismissOnEscape`
  - [ ] 创建 OverlayStore 并 provide
  - [ ] 编辑器跟踪逻辑: focus + selection → anchorElement
  - [ ] Auto-open 逻辑: reference 存在 + defaultOpen → open
  - [ ] Escape 键处理
  - [ ] OpenChangeEvent 事件
- [ ] **2.3** 创建 `inline-popover-positioner.ts`
  - [ ] Props: 继承 OverlayPositionerProps，覆盖默认值
  - [ ] Setup: 一行 `setupOverlayPositioner(host, props, InlinePopoverStoreContext)`
- [ ] **2.4** 创建 `inline-popover-popup.ts`
  - [ ] Props: 继承 OverlayPopupProps
  - [ ] Setup: `setupOverlayPopup` + `usePresence`

### Phase 3: 更新导出和注册

- [ ] **3.1** 重写 `index.ts` — 导出三个组件
- [ ] **3.2** 删除 `inline-popover/inline-popover/inline-popover.ts`
- [ ] **3.3** `packages/web/build.mjs` — 无需修改（'inline-popover' 已在列表中）

### Phase 4: 更新示例

- [ ] **4.1** 更新所有 `registry/` 下使用 InlinePopover 的示例文件
  - React, Vue, Svelte, Solid, Preact
  - 从 `<InlinePopover>` 改为 `<InlinePopoverRoot><InlinePopoverPositioner><InlinePopoverPopup>...</InlinePopoverPopup></InlinePopoverPositioner></InlinePopoverRoot>`
  - 样式 className 从 Root 移到 Popup

### Phase 5: 验证

- [ ] **5.1** `pnpm -w run build:package`
- [ ] **5.2** `pnpm -w run fix`
- [ ] **5.3** `pnpm -w run typecheck`
- [ ] **5.4** `pnpm -w run lint`
- [ ] **5.5** 确认框架 wrapper 正确生成 (root + positioner + popup × 5 frameworks)
- [ ] **5.6** 手动测试 inline-menu 示例
