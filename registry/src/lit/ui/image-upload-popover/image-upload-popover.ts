import 'prosekit/lit/popover'

import {
  html,
  LitElement,
  nothing,
  type PropertyDeclaration,
} from 'lit'
import type { Editor } from 'prosekit/core'
import type { Uploader } from 'prosekit/extensions/file'
import type { ImageExtension } from 'prosekit/extensions/image'

import '../button/index'

let imageUploadId = 0

class LitImageUploadPopover extends LitElement {
  static override properties = {
    editor: { attribute: false } satisfies PropertyDeclaration<Editor>,
    uploader: { attribute: false } satisfies PropertyDeclaration<Uploader<string>>,
    tooltip: { type: String },
    disabled: { type: Boolean },
    icon: { type: String },
  }

  editor?: Editor<ImageExtension>
  uploader?: Uploader<string>
  tooltip = ''
  disabled = false
  icon = ''

  private open = false
  private url = ''
  private file: File | null = null
  private ariaId = `lit-image-upload-${imageUploadId++}`

  override createRenderRoot() {
    return this
  }

  override connectedCallback() {
    super.connectedCallback()
    this.classList.add('contents')
  }

  private handleOpenChange = (event: CustomEvent<boolean>) => {
    const isOpen = event.detail

    if (!isOpen) {
      this.deferResetState()
    }

    this.open = isOpen
    this.requestUpdate()
  }

  private handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const selectedFile = target.files?.[0]

    if (selectedFile) {
      this.file = selectedFile
      this.url = ''
    } else {
      this.file = null
    }

    this.requestUpdate()
  }

  private handleUrlChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const inputUrl = target.value

    if (inputUrl) {
      this.url = inputUrl
      this.file = null
    } else {
      this.url = ''
    }

    this.requestUpdate()
  }

  private deferResetState() {
    setTimeout(() => {
      this.url = ''
      this.file = null
      this.requestUpdate()
    }, 300)
  }

  private handleSubmit = () => {
    const editor = this.editor
    if (!editor) return

    if (this.url) {
      editor.commands.insertImage({ src: this.url })
    } else if (this.file && this.uploader) {
      editor.commands.uploadImage({ file: this.file, uploader: this.uploader })
    }

    this.open = false
    this.deferResetState()
    this.requestUpdate()
  }

  override render() {
    return html`
      <prosekit-popover-root
        .open=${this.open}
        @open-change=${this.handleOpenChange}
      >
        <prosekit-popover-trigger>
          <lit-editor-button
            .pressed=${this.open}
            .disabled=${this.disabled}
            .tooltip=${this.tooltip}
            .icon=${this.icon}
          ></lit-editor-button>
        </prosekit-popover-trigger>

        <prosekit-popover-content class="CSS_IMAGE_UPLOAD_CARD">
          ${!this.file
            ? html`
                <label for="id-link-${this.ariaId}">Embed Link</label>
                <input
                  id="id-link-${this.ariaId}"
                  class="CSS_IMAGE_UPLOAD_INPUT"
                  placeholder="Paste the image link..."
                  type="url"
                  .value=${this.url}
                  @input=${this.handleUrlChange}
                />
              `
            : nothing}

          ${!this.url
            ? html`
                <label for="id-upload-${this.ariaId}">Upload</label>
                <input
                  id="id-upload-${this.ariaId}"
                  class="CSS_IMAGE_UPLOAD_INPUT"
                  accept="image/*"
                  type="file"
                  @change=${this.handleFileChange}
                />
              `
            : nothing}

          ${this.url
            ? html`
                <button class="CSS_IMAGE_UPLOAD_BUTTON" @click=${this.handleSubmit}>
                  Insert Image
                </button>
              `
            : nothing}

          ${this.file
            ? html`
                <button class="CSS_IMAGE_UPLOAD_BUTTON" @click=${this.handleSubmit}>
                  Upload Image
                </button>
              `
            : nothing}
        </prosekit-popover-content>
      </prosekit-popover-root>
    `
  }
}

customElements.define('lit-editor-image-upload-popover', LitImageUploadPopover)

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-image-upload-popover': LitImageUploadPopover
  }
}
