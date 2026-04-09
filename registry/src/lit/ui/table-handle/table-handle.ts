import 'prosekit/lit/table-handle'

import { ContextConsumer } from '@lit/context'
import { html, LitElement, nothing, type PropertyDeclaration, type PropertyValues } from 'lit'
import type { Editor } from 'prosekit/core'
import { defineUpdateHandler } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'

import { editorContext } from '../editor-context'

function getTableHandleState(editor: Editor<TableExtension>) {
  return {
    addTableColumnBefore: {
      canExec: editor.commands.addTableColumnBefore.canExec(),
      command: () => editor.commands.addTableColumnBefore(),
    },
    addTableColumnAfter: {
      canExec: editor.commands.addTableColumnAfter.canExec(),
      command: () => editor.commands.addTableColumnAfter(),
    },
    deleteCellSelection: {
      canExec: editor.commands.deleteCellSelection.canExec(),
      command: () => editor.commands.deleteCellSelection(),
    },
    deleteTableColumn: {
      canExec: editor.commands.deleteTableColumn.canExec(),
      command: () => editor.commands.deleteTableColumn(),
    },
    addTableRowAbove: {
      canExec: editor.commands.addTableRowAbove.canExec(),
      command: () => editor.commands.addTableRowAbove(),
    },
    addTableRowBelow: {
      canExec: editor.commands.addTableRowBelow.canExec(),
      command: () => editor.commands.addTableRowBelow(),
    },
    deleteTableRow: {
      canExec: editor.commands.deleteTableRow.canExec(),
      command: () => editor.commands.deleteTableRow(),
    },
    deleteTable: {
      canExec: editor.commands.deleteTable.canExec(),
      command: () => editor.commands.deleteTable(),
    },
  }
}

class LitTableHandle extends LitElement {
  static override properties = {
    dir: { type: String } satisfies PropertyDeclaration<'ltr' | 'rtl'>,
  }

  override dir: string = ''

  private editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  private removeUpdateExtension?: VoidFunction

  override createRenderRoot() {
    return this
  }

  override connectedCallback() {
    super.connectedCallback()
    this.classList.add('contents')
    this.attachEditorListener()
  }

  override disconnectedCallback() {
    this.detachEditorListener()
    super.disconnectedCallback()
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)
    this.attachEditorListener()
  }

  private attachEditorListener() {
    this.detachEditorListener()

    const editor = this.editorConsumer.value
    if (!editor) return

    this.removeUpdateExtension = editor.use(defineUpdateHandler(() => this.requestUpdate()))
  }

  private detachEditorListener() {
    this.removeUpdateExtension?.()
    this.removeUpdateExtension = undefined
  }

  override render() {
    const editor = this.editorConsumer.value as Editor<TableExtension> | undefined
    if (!editor) {
      return nothing
    }

    const state = getTableHandleState(editor)
    const placement = this.dir === 'rtl' ? 'right' : 'left'

    return html`<prosekit-table-handle-root .editor=${editor} class="contents">
      <prosekit-table-handle-drag-preview .editor=${editor}></prosekit-table-handle-drag-preview>
      <prosekit-table-handle-drop-indicator .editor=${editor}></prosekit-table-handle-drop-indicator>
      <prosekit-table-handle-column-root .editor=${editor} class="CSS_TABLE_COLUMN_HANDLE">
        <prosekit-table-handle-column-trigger .editor=${editor} class="CSS_TABLE_COLUMN_HANDLE_TRIGGER">
          <div class="CSS_ICON_TABLE_COLUMN_HANDLE"></div>
        </prosekit-table-handle-column-trigger>
        <prosekit-table-handle-popover-content class="CSS_TABLE_HANDLE_MENU">
          ${
            state.addTableColumnBefore.canExec
              ? html`<prosekit-table-handle-popover-item
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select=${state.addTableColumnBefore.command}
              >
                <span>Insert Left</span>
              </prosekit-table-handle-popover-item>`
              : nothing
          }
          ${
            state.addTableColumnAfter.canExec
              ? html`<prosekit-table-handle-popover-item
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select=${state.addTableColumnAfter.command}
              >
                <span>Insert Right</span>
              </prosekit-table-handle-popover-item>`
              : nothing
          }
          ${
            state.deleteCellSelection.canExec
              ? html`<prosekit-table-handle-popover-item
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select=${state.deleteCellSelection.command}
              >
                <span>Clear Contents</span>
                <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
              </prosekit-table-handle-popover-item>`
              : nothing
          }
          ${
            state.deleteTableColumn.canExec
              ? html`<prosekit-table-handle-popover-item
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select=${state.deleteTableColumn.command}
              >
                <span>Delete Column</span>
              </prosekit-table-handle-popover-item>`
              : nothing
          }
          ${
            state.deleteTable.canExec
              ? html`<prosekit-table-handle-popover-item
                class="CSS_TABLE_CELL_MENU_ITEM"
                data-danger=""
                @select=${state.deleteTable.command}
              >
                <span>Delete Table</span>
              </prosekit-table-handle-popover-item>`
              : nothing
          }
        </prosekit-table-handle-popover-content>
      </prosekit-table-handle-column-root>
      <prosekit-table-handle-row-root
        .editor=${editor}
        placement=${placement}
        class="CSS_TABLE_ROW_HANDLE"
      >
        <prosekit-table-handle-row-trigger .editor=${editor} class="CSS_TABLE_ROW_HANDLE_TRIGGER">
          <div class="CSS_ICON_TABLE_ROW_HANDLE"></div>
        </prosekit-table-handle-row-trigger>
        <prosekit-table-handle-popover-content class="CSS_TABLE_HANDLE_MENU">
          ${
            state.addTableRowAbove.canExec
              ? html`<prosekit-table-handle-popover-item
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select=${state.addTableRowAbove.command}
              >
                <span>Insert Above</span>
              </prosekit-table-handle-popover-item>`
              : nothing
          }
          ${
            state.addTableRowBelow.canExec
              ? html`<prosekit-table-handle-popover-item
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select=${state.addTableRowBelow.command}
              >
                <span>Insert Below</span>
              </prosekit-table-handle-popover-item>`
              : nothing
          }
          ${
            state.deleteCellSelection.canExec
              ? html`<prosekit-table-handle-popover-item
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select=${state.deleteCellSelection.command}
              >
                <span>Clear Contents</span>
                <span class="CSS_TABLE_CELL_MENU_ITEM_SHORTCUT">Del</span>
              </prosekit-table-handle-popover-item>`
              : nothing
          }
          ${
            state.deleteTableRow.canExec
              ? html`<prosekit-table-handle-popover-item
                class="CSS_TABLE_CELL_MENU_ITEM"
                @select=${state.deleteTableRow.command}
              >
                <span>Delete Row</span>
              </prosekit-table-handle-popover-item>`
              : nothing
          }
          ${
            state.deleteTable.canExec
              ? html`<prosekit-table-handle-popover-item
                class="CSS_TABLE_CELL_MENU_ITEM"
                data-danger=""
                @select=${state.deleteTable.command}
              >
                <span>Delete Table</span>
              </prosekit-table-handle-popover-item>`
              : nothing
          }
        </prosekit-table-handle-popover-content>
      </prosekit-table-handle-row-root>
    </prosekit-table-handle-root>`
  }
}

customElements.define('lit-editor-table-handle', LitTableHandle)

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-table-handle': LitTableHandle
  }
}
