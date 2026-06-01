import { html, render } from 'lit'
import type { Extension } from 'prosekit/core'
import { defineNodeView } from 'prosekit/core'
import { UploadTask } from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import {
  registerResizableHandleElement,
  registerResizableRootElement,
  type ResizeEndEvent,
} from 'prosekit/lit/resizable'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import type { Decoration, EditorView } from 'prosekit/pm/view'

interface ResizeEndEventDetail {
  width: number
  height: number
}

class ImageNodeView {
  dom: HTMLElement
  private node: ProseMirrorNode
  private view: EditorView
  private getPos: () => number | undefined
  private selected = false

  private aspectRatio: number | undefined
  private error: string | undefined
  private progress = 0
  private unsubscribeProgress?: VoidFunction
  private canceled = false
  private lastUrl = ''

  constructor(
    node: ProseMirrorNode,
    view: EditorView,
    getPos: () => number | undefined,
  ) {
    this.node = node
    this.view = view
    this.getPos = getPos

    this.dom = document.createElement('div')
    this.dom.setAttribute('data-node-view-root', 'true')

    registerResizableRootElement()
    registerResizableHandleElement()

    this.sync()
  }

  private setAttrs(attrs: Partial<ImageAttrs>) {
    const pos = this.getPos()
    if (typeof pos !== 'number') return
    const next: ImageAttrs = { ...(this.node.attrs as ImageAttrs), ...attrs }
    this.view.dispatch(this.view.state.tr.setNodeMarkup(pos, undefined, next))
  }

  private handleResizeEnd = (event: Event) => {
    const detail = (event as ResizeEndEvent).detail as ResizeEndEventDetail
    this.setAttrs({ width: detail.width, height: detail.height })
  }

  private handleImageLoad = (event: Event) => {
    const img = event.target as HTMLImageElement
    const { naturalWidth, naturalHeight } = img
    const ratio = naturalWidth / naturalHeight
    if (ratio && Number.isFinite(ratio)) {
      this.aspectRatio = ratio
    }
    const attrs = this.node.attrs as ImageAttrs
    if (naturalWidth && naturalHeight && (!attrs.width || !attrs.height)) {
      this.setAttrs({ width: naturalWidth, height: naturalHeight })
    } else {
      this.sync()
    }
  }

  private subscribeUpload(url: string) {
    this.unsubscribeUpload()
    this.canceled = false

    const uploadTask = UploadTask.get<string>(url)
    if (!uploadTask) return

    uploadTask.finished.catch((err) => {
      if (this.canceled) return
      this.error = String(err)
      this.sync()
    })
    this.unsubscribeProgress = uploadTask.subscribeProgress(({ loaded, total }) => {
      if (this.canceled) return
      this.progress = total ? loaded / total : 0
      this.sync()
    })
  }

  private unsubscribeUpload() {
    this.canceled = true
    this.unsubscribeProgress?.()
    this.unsubscribeProgress = undefined
  }

  private sync() {
    const attrs = this.node.attrs as ImageAttrs
    const url = attrs.src || ''
    const uploading = url.startsWith('blob:')

    if (url !== this.lastUrl) {
      this.lastUrl = url
      this.error = undefined
      this.progress = 0
      if (uploading) {
        this.subscribeUpload(url)
      } else {
        this.unsubscribeUpload()
      }
    }

    render(
      html`
        <prosekit-resizable-root
          class="CSS_IMAGE_RESIZABLE"
          .width=${attrs.width ?? null}
          .height=${attrs.height ?? null}
          .aspectRatio=${this.aspectRatio ?? null}
          data-selected=${this.selected ? '' : (undefined as unknown as string)}
          @resizeEnd=${this.handleResizeEnd}
        >
          ${url && !this.error
            ? html`
                <img
                  src=${url}
                  alt="upload preview"
                  class="CSS_IMAGE_RESIZABLE_IMAGE"
                  @load=${this.handleImageLoad}
                />
              `
            : ''}
          ${uploading && !this.error
            ? html`
                <div class="CSS_IMAGE_UPLOAD_PROGRESS">
                  <div class="CSS_ICON_LOADER"></div>
                  <div>${Math.round(this.progress * 100)}%</div>
                </div>
              `
            : ''}
          ${this.error
            ? html`
                <div class="CSS_IMAGE_UPLOAD_ERROR">
                  <div class="CSS_ICON_IMAGE_ERROR"></div>
                  <div class="CSS_IMAGE_UPLOAD_ERROR_MESSAGE">Failed to upload image</div>
                </div>
              `
            : ''}
          <prosekit-resizable-handle
            class="CSS_IMAGE_RESIZABLE_HANDLE"
            position="bottom-right"
          ><div class="CSS_ICON_CORNER_HANDLE"></div></prosekit-resizable-handle>
        </prosekit-resizable-root>
      `,
      this.dom,
    )
  }

  update(node: ProseMirrorNode, _decorations: readonly Decoration[]) {
    if (node.type !== this.node.type) return false
    this.node = node
    this.sync()
    return true
  }

  selectNode() {
    this.selected = true
    this.sync()
  }

  deselectNode() {
    this.selected = false
    this.sync()
  }

  destroy() {
    this.unsubscribeUpload()
    render(null, this.dom)
  }
}

export function defineImageView(): Extension {
  return defineNodeView({
    name: 'image',
    constructor: (node, view, getPos) => new ImageNodeView(node, view, getPos),
  })
}
